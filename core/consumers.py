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
        to = User.objects.get(pk=data['to'])
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username: ' + user.first_name
            self.send_message(content)
        content['success'] = 'Chatting in with success with username: ' + user.first_name
        try:
            dialog = models.Dialog.objects.get(first_user=to, second_user=user)
        except models.Dialog.DoesNotExist:
            dialog = models.Dialog.objects.get_or_create(first_user=user, second_user=to)[0]

        self.room_name = str(dialog.id)
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.send_message(content)

    def fetch_messages(self, data):
        token = data['token']
        token = Token.objects.get(key=token)
        user = token.user
        to = User.objects.get(pk=data['to'])
        try:
            dialog = models.Dialog.objects.get(first_user=to, second_user=user)
        except models.Dialog.DoesNotExist:
            dialog = models.Dialog.objects.get_or_create(first_user=user, second_user=to)[0]
        messages = dialog.messages.order_by('-created_at')
        serializer = serializers.MessageSerializer(instance=messages, many=True)
        content = {
            'command': 'messages',
            'messages': serializer.data
        }
        self.send_message(content)

    def new_message(self, data):
        token = data['token']
        token = Token.objects.get(key=data['token'])
        author_user = token.user
        to = User.objects.get(pk=data['to'])
        try:
            dialog = models.Dialog.objects.get(first_user=to, second_user=author_user)
        except models.Dialog.DoesNotExist:
            dialog = models.Dialog.objects.get_or_create(first_user=author_user, second_user=to)[0]
        message = Message.objects.create(author=author_user, dialog=dialog, content=data['text'])
        serializer = serializers.MessageSerializer(instance=message)
        content = {
            'command': 'new_message',
            'message': serializer.data
        }
        self.send_chat_message(content)
        self.send_dialog(content, to)
        self.send_dialog(content, author_user)

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = 'chat'
        self.room_group_name = 'chat_%s' % self.room_name
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
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_dialog(self, message, user):
        async_to_sync(self.channel_layer.group_send)(
            "user_{}".format(user.id),
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


class NotificationConsumer(WebsocketConsumer):

    def connect(self):
        self.room_name = 'notification'
        self.room_group_name = 'user_%s' % self.room_name
        self.accept()

    def init(self, data):
        token = data['token']
        token = Token.objects.get(key=token)
        user = token.user
        content = {
            'command': 'init'
        }
        self.room_name = str(user.id)
        self.room_group_name = 'user_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.send_message(content)

    commands = {
        'init': init,
    }

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

    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
