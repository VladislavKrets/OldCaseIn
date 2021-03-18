from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core import models


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Incorrect email or password.')
        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')
        return {'user': user}


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    name = serializers.CharField()
    surname = serializers.CharField()
    registration_code = serializers.CharField()

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['email'],
                                   password=validated_data['password'],
                                   first_name=validated_data['name'],
                                   last_name=validated_data['surname'])
        user.set_password(validated_data['password'])
        user.save()
        models.RegistrationCode.objects \
            .filter(code=validated_data['registration_code']).delete()
        return user

    def validate(self, attrs):
        is_registration_code_exists = models.RegistrationCode \
            .objects.filter(code=attrs['registration_code']).exists()
        if not is_registration_code_exists:
            raise serializers.ValidationError('Registration code not exists.')
        is_user_exists = User.objects.filter(username=attrs["email"]).exists()
        if is_user_exists:
            raise serializers.ValidationError('User already exists.')
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        modules = models.Module.objects.all()
        serializer = ModuleResultSerializer(instance=modules, many=True)
        serializer.context['user'] = instance
        data['modules'] = serializer.data
        return data


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if 'user' in self.context:
            try:
                result = models.LessonResult.objects \
                    .get(user=self.context['user'], lesson=instance)
                serializer = LessonResultSerializer(instance=result)
                result = serializer.data
            except models.LessonResult.DoesNotExist:
                result = None
            data['result'] = result
        return data


class ModuleResultSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = models.Module
        fields = '__all__'

    def get_lessons(self, instance):
        lessons = models.LessonResult.objects.filter(lesson__module=instance, user=self.context['user'])\
            .values_list('lesson')
        lessons = models.Lesson.objects.filter(pk__in=lessons).order_by('number')
        serializer = LessonSerializer(instance=lessons, many=True)
        serializer.context['user'] = self.context['user']
        return serializer.data


class ModuleSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = models.Module
        fields = '__all__'
        read_only_fields = ('id',)

    def get_lessons(self, instance):
        lessons = models.Lesson.objects.filter(module=instance).order_by('number')
        return LessonSerializer(lessons, many=True).data


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuestionAnswer
        fields = '__all__'

    def to_representation(self, instance):
        data = super(QuestionAnswerSerializer, self).to_representation(instance)
        data.pop('is_right')
        if instance.question.question_type == "text":
            data.pop('answer')
        try:
            saved_question = models.SavedQuestionAnswer.objects.get(user=self.context['user'], answer=instance)
            serializer = SavedQuestionAnswerSerializer(instance=saved_question)
            data['saved_answer'] = serializer.data
        except models.SavedQuestionAnswer.DoesNotExist:
            data['saved_answer'] = None

        return data


class SavedQuestionAnswerSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = self.context['user']
        answer = self.context['answer']
        validated_data['user'] = user
        validated_data['answer'] = answer
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context['user']
        answer = self.context['answer']
        if instance.user != user:
            raise ValidationError()
        validated_data['user'] = user
        validated_data['answer'] = answer
        return super().update(instance, validated_data)

    class Meta:
        model = models.SavedQuestionAnswer
        fields = '__all__'
        read_only_fields = ('user', 'answer',)


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    class Meta:
        model = models.Question
        fields = '__all__'

    def get_answers(self, instance):
        answers = models.QuestionAnswer.objects.filter(question=instance).order_by('number')
        serializer = QuestionAnswerSerializer(answers, many=True)
        serializer.context['user'] = self.context['user']
        return serializer.data


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
