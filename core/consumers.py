from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from django.db.models import F
from django.db.models import Q
from core import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from core.models import Message
from core import serializers


class ChatConsumer(WebsocketConsumer):

    def init_chat(self, data):
        token = data['token']
        token = Token.objects.get(key=token)
        user = token.user
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username: ' + user.first_name
            self.send_message(content)
        content['success'] = 'Chatting in with success with username: ' + user.first_name
        self.send_message(content)

    def fetch_messages(self, data):
        token = data['token']
        token = Token.objects.get(key=token)
        user = token.user
        messages = Message.objects.filter(Q(author=user) | Q(recipient=user)).order_by('created_at')
        serializer = serializers.MessageSerializer(instance=messages, many=True)
        content = {
            'command': 'messages',
            'messages': serializer.data
        }
        self.send_message(content)

    def new_message(self, data):
        print(data)
        token = data['token']
        token = Token.objects.get(key=data['token'])
        author_user = token.user
        message = Message.objects.create(author=author_user, content=data['text'])
        serializer = serializers.MessageSerializer(instance=message)
        content = {
            'command': 'new_message',
            'message': serializer.data
        }
        self.send_chat_message(content)

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = 'room'
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # leave group room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))