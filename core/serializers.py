from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core import models


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])

        if not user:
            raise serializers.ValidationError('Incorrect username or password.')

        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')

        return {'user': user}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Module
        fields = '__all__'
        read_only_fields = ('id', )


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = '__all__'


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuestionAnswer
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = models.Question
        fields = '__all__'

    def get_answers(self, instance):
        answers = instance.answers.all().order_by('number')
        return QuestionAnswerSerializer(answers, many=True).data

    def to_representation(self, instance):
        data = super(QuestionSerializer, self).to_representation(instance)
        data.pop('is_right')
        return data


class DrugNDropAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DrugNDropAnswer
        fields = '__all__'
        write_only_fields = ('answer',)


class LessonResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LessonResult
        fields = '__all__'


class BotThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BotTheme
        fields = '__all__'


class BotAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BotAnswer
        fields = '__all__'


class SavedQuestionAnswerSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = self.context['user']
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context['user']
        if instance.user != user:
            raise ValidationError()
        validated_data['user'] = user
        return super().update(instance, validated_data)

    class Meta:
        model = models.SavedQuestionAnswer
        fields = '__all__'
