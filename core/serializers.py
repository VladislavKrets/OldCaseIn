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
        user.userextension = models.UserExtension.objects.get_or_create(user=user)[0]
        return {'user': user}


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    name = serializers.CharField()
    surname = serializers.CharField()
    registration_code = serializers.CharField()

    @transaction.atomic
    def create(self, validated_data):
        registration_code = models.RegistrationCode.objects \
            .get(code=validated_data['registration_code'])
        user = User.objects.create(username=validated_data['email'],
                                   password=validated_data['password'],
                                   first_name=validated_data['name'],
                                   last_name=validated_data['surname'])
        user.set_password(validated_data['password'])
        userextension = models.UserExtension.objects.get_or_create(user=user,
                                                                   type=registration_code.type,
                                                                   group=registration_code.group)[0]
        user.userextension = userextension
        user.save()
        registration_code.delete()
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
    total_score = serializers.IntegerField(source='userextension.total_score')
    type = serializers.CharField(source='userextension.type')
    master = serializers.PrimaryKeyRelatedField(read_only=True, source='userextension.master')
    days_count = serializers.IntegerField(source='userextension.days_count')
    master_mark = serializers.IntegerField(source='userextension.master_mark')
    completed_tasks_count = serializers.IntegerField(source='userextension.completed_tasks_count')
    bot_messages_count = serializers.IntegerField(source='userextension.bot_messages_count')
    chat_messages_count = serializers.IntegerField(source='userextension.chat_messages_count')
    group = serializers.PrimaryKeyRelatedField(source='userextension.group', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'total_score', 'type', 'master',
                  'days_count', 'master_mark', 'completed_tasks_count',
                  'bot_messages_count', 'chat_messages_count', 'group')

    def get_related_field(self, model_field):
        return UserSerializer()

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if instance.userextension.group:
            first_rank = models.User.objects \
                .order_by('-userextension__total_score', 'first_name', 'last_name') \
                .filter(userextension__group=instance.userextension.group,
                        userextension__total_score__gt=instance.userextension.total_score) \
                .count()
            second_rank = models.User.objects \
                .order_by('first_name', 'last_name') \
                .filter(userextension__group=instance.userextension.group,
                        userextension__total_score=instance.userextension.total_score,
                        first_name__lt=instance.first_name) \
                .count()
            third_rank = models.User.objects \
                .order_by('last_name') \
                .filter(userextension__group=instance.userextension.group,
                        userextension__total_score=instance.userextension.total_score,
                        first_name=instance.first_name, last_name__lte=instance.last_name) \
                .count()
            data['rank'] = first_rank + second_rank + third_rank
        modules = models.Module.objects.all()
        serializer = ModuleResultSerializer(instance=modules, many=True)
        serializer.context['user'] = instance
        data['modules'] = serializer.data
        return data


class PrivateUserSerializer(serializers.ModelSerializer):
    total_score = serializers.IntegerField(source='userextension.total_score')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'total_score')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            if instance.userextension.group:
                rank = models.User.objects \
                    .order_by('-userextension__total_score', 'first_name', 'last_name') \
                    .filter(userextension__group=instance.userextension.group,
                            userextension__total_score__gte=instance.userextension.total_score,
                            first_name__lte=instance.first_name, last_name__lte=instance.last_name) \
                    .count()
                data['rank'] = rank
        except models.UserExtension.DoesNotExist:
            pass
        return data


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context['user']
        result = models.LessonResult.objects.filter(user=user, lesson=instance)
        if len(result) == 0:
            data['result'] = None
        else:
            serializer = LessonResultSerializer(instance=result.first())
            data['result'] = serializer.data
        data['has_test'] = models.Question.objects.filter(lesson=instance).exists()
        return data


class LessonMinifiedSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['has_test'] = models.Question.objects.filter(lesson=instance).exists()
        return data

    class Meta:
        model = models.Lesson
        fields = ('id', 'number')


class LessonResultSerializer(serializers.ModelSerializer):
    number = serializers.IntegerField(source='lesson.number')

    class Meta:
        model = models.LessonResult
        fields = '__all__'


class ModuleResultSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = models.Module
        fields = ('number', 'lessons')

    def get_lessons(self, instance):
        lessons = models.LessonResult.objects.filter(lesson__module=instance, user=self.context['user'])
        serializer = LessonResultSerializer(instance=lessons, many=True)
        return serializer.data


class ModuleSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = models.Module
        fields = '__all__'
        read_only_fields = ('id',)

    def get_lessons(self, instance):
        lessons = models.Lesson.objects.filter(module=instance).order_by('number')
        serializer = LessonMinifiedSerializer(lessons, many=True)
        return serializer.data


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


class BotAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BotAnswer
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = '__all__'


class BotThemeSerializer(serializers.ModelSerializer):
    answers = BotAnswerSerializer(many=True)

    class Meta:
        model = models.BotTheme
        fields = '__all__'


class EventCalendarSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    def create(self, validated_data):
        user = self.context['user']
        event_calendar = models.EventCalendar.objects.create(user=user, **validated_data)
        return event_calendar

    def update(self, instance, validated_data):
        user = self.context['user']
        if instance.user == user:
            return super(EventCalendarSerializer, self).update()
        raise ValidationError('Not permitted')

    class Meta:
        model = models.EventCalendar
        fields = '__all__'


class DocumentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Documentation
        fields = '__all__'


class BotTrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BotTrainer
        fields = '__all__'


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Building
        fields = '__all__'


class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FloorData
        fields = ('id', 'floor_number', 'building',)


class DialogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dialog
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    author = PrivateUserSerializer()

    def to_representation(self, instance):
        data = super(MessageSerializer, self).to_representation(instance)
        dialog = instance.dialog
        author = instance.author
        first_user = dialog.first_user
        second_user = dialog.second_user
        print(author)
        print(first_user)
        print(second_user)
        print()
        if first_user == author:
            serializer = PrivateUserSerializer(instance=second_user)
            data['recipient'] = serializer.data
        else:
            serializer = PrivateUserSerializer(instance=first_user)
            data['recipient'] = serializer.data
        return data

    class Meta:
        model = models.Message
        fields = '__all__'
