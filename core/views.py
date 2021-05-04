from django.db.models.functions import RowNumber, Rank
from drf_yasg import openapi
from drf_yasg.openapi import Parameter, IN_QUERY
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, permissions, response, status
from rest_framework.authtoken.models import Token
from rest_framework.mixins import RetrieveModelMixin, \
    ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView

from core import serializers
from core import models
from rest_framework.authentication import TokenAuthentication
from django.db.models import F, Window
from core.permissions import IsStudentsAccessed, IsOwner, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from core import bot


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=serializers.LoginSerializer,
                         operation_description="This endpoint gets credentials and returns token")
    def post(self, request):  # auth
        serializer = serializers.LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response({'error': serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
        user = serializer.validated_data['user']
        token = Token.objects.get_or_create(user=user)
        return response.Response({'token': token[0].key})

    @swagger_auto_schema(request_body=serializers.RegistrationSerializer,
                         operation_description="This endpoint gets registration data and returns token")
    def put(self, request):  # registration
        serializer = serializers.RegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        token = Token.objects.get_or_create(user=user)
        return response.Response({'token': token[0].key})

    @swagger_auto_schema(manual_parameters=[
        Parameter('registration_code', IN_QUERY, type='string', required=True)
    ],
        operation_description="This endpoint checks registration code")
    def patch(self, request):  # check code
        is_registration_code_exists = models.RegistrationCode \
            .objects.filter(code=request.data['registration_code']).exists()
        return response.Response({'exists': is_registration_code_exists})


class UserDataApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="This endpoint returns user data")
    def get(self, request):
        serializer = serializers.UserSerializer(instance=request.user)
        return response.Response(serializer.data)


class ModuleMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ModuleSerializer
    queryset = models.Module.objects.all().order_by('number')

    @swagger_auto_schema(operation_description="This endpoint returns modules list")
    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class LessonMixin(RetrieveModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.LessonSerializer
    queryset = models.Lesson.objects.all().order_by('number')

    @swagger_auto_schema(operation_description="This endpoint returns lesson data")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, args, kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class QuestionMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.QuestionSerializer
    queryset = models.Question.objects.all()

    def get_queryset(self):
        lesson = self.kwargs['lesson']
        return models.Question.objects.filter(lesson=lesson)

    @swagger_auto_schema(operation_description="This endpoint returns questions list")
    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class DrugNDropAnswerMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DrugNDropAnswerSerializer
    queryset = models.DrugNDropAnswer.objects.all()

    def get_queryset(self):
        question = self.kwargs['answer__question']
        return models.DrugNDropAnswer.objects.filter(answer__question=question)

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class BotThemeMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.BotThemeSerializer

    def get_queryset(self):
        parent_theme = self.kwargs['parent_theme']
        return models.BotTheme.objects.filter(parent_theme=parent_theme)

    def get(self, request, *args, **kwargs):
        if 'parent_theme' not in self.kwargs:
            self.kwargs['parent_theme'] = None
            kwargs['parent_theme'] = None
        return self.list(request, args, kwargs)


class BotAnswerMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.BotAnswerSerializer

    def get_queryset(self):
        theme = self.kwargs['theme']
        return models.BotAnswer.objects.filter(theme=theme)

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class SavedQuestionAnswerMixin(CreateModelMixin, UpdateModelMixin, GenericAPIView, DestroyModelMixin):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.SavedQuestionAnswerSerializer

    def get_queryset(self):
        return models.SavedQuestionAnswer.objects.filter(user=self.request.user,
                                                         answer=self.kwargs['answer'])

    @swagger_auto_schema(operation_description="This endpoint saves user answer")
    def post(self, request, *args, **kwargs):
        answer = self.kwargs['answer']
        answer = models.QuestionAnswer.objects.get(pk=answer)
        if models.LessonResult.objects.filter(user=self.request.user,
                                              lesson=answer.question.lesson).exists():
            return response.Response(data={'error': 'Test already closed'},
                                     status=status.HTTP_400_BAD_REQUEST)
        question = answer.question
        if question.question_type == 'radio':
            models.SavedQuestionAnswer.objects.filter(answer__question=question,
                                                      user=self.request.user).delete()
            return self.create(request, args, kwargs)
        queryset = models.SavedQuestionAnswer.objects.filter(user=self.request.user,
                                                             answer=answer)
        if queryset.exists():
            elem = queryset.first()
            kwargs['pk'] = elem.id
            self.kwargs['pk'] = kwargs['pk']
            return self.partial_update(request, args, kwargs)
        return self.create(request, args, kwargs)

    @swagger_auto_schema(operation_description="This endpoint deletes user answer")
    def delete(self, request, *args, **kwargs):
        if self.get_queryset().exists():
            lesson = self.get_queryset().first().answer.question.lesson
            if models.LessonResult.objects.filter(user=self.request.user,
                                                  lesson=lesson).exists():
                return response.Response(data={'error': 'Test already closed'},
                                         status=status.HTTP_400_BAD_REQUEST)
            kwargs['pk'] = self.get_queryset().first().id
            self.kwargs['pk'] = kwargs['pk']
        return self.destroy(request, args, kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        context['answer'] = models.QuestionAnswer.objects.get(pk=self.kwargs['answer'])
        return context


class ResultTestApiView(APIView):

    @swagger_auto_schema(responses={'200': serializers.LessonResultSerializer},
                         operation_description="This endpoint submits current lesson test")
    def get(self, request, *args, **kwargs):
        lesson_pk = kwargs['lesson']
        test_results = models.LessonResult.objects.get(user=request.user, lesson_pk=lesson_pk)
        serializer = serializers.LessonResultSerializer(instance=test_results)
        return response.Response(data=serializer.data)

    @swagger_auto_schema(responses={'200': serializers.LessonResultSerializer},
                         operation_description="This endpoint submits current lesson test")
    def post(self, request, *args, **kwargs):
        lesson_pk = kwargs['lesson']
        lesson = models.Lesson.objects.get(pk=lesson_pk)
        saved_answers = models.SavedQuestionAnswer \
            .objects.filter(answer__question__lesson=lesson, user=request.user)
        types = ('radio', 'checkbox')
        right_check_answers = saved_answers.filter(answer__question__question_type__in=types,
                                                   answer__is_right=True).count()
        right_text_answers = saved_answers.filter(answer__question__question_type='text',
                                                  answer__answer=F('user_text')).count()
        all_right_non_text_answers = models.QuestionAnswer \
            .objects.filter(question__question_type__in=types,
                            question__lesson=lesson, is_right=True).count()
        all_text_answers = models.Question.objects.filter(lesson=lesson, question_type='text').count()
        all_right_answers = all_right_non_text_answers + all_text_answers
        test_results = models.LessonResult.objects.get_or_create(user=request.user, lesson=lesson)[0]
        test_results.result_score = right_check_answers + right_text_answers
        test_results.max_score = all_right_answers
        test_results.save()
        score = round(test_results.result_score / test_results.max_score * 100, 2)
        userextension = request.user.userextension
        userextension.total_score += score
        userextension.save()
        serializer = serializers.LessonResultSerializer(instance=test_results)
        return response.Response(data=serializer.data)

    def put(self, request):
        test_results = models.LessonResult.objects.filter(user=request.user)
        serializer = serializers.LessonResultSerializer(instance=test_results, many=True)
        return response.Response(data=serializer.data)


class EventsModelViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = serializers.EventCalendarSerializer

    def get_queryset(self):
        return models.EventCalendar.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class DocumentsModelMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.DocumentationSerializer
    queryset = models.Documentation.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class StudentsModelMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsStudentsAccessed]
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return models.User.objects.filter(userextension__master=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class BotApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=serializers.BotTrainerSerializer,
                         operation_description="This endpoint requests question to bot and returns answer")
    def post(self, request):
        serializer = serializers.BotTrainerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text = serializer.validated_data['text']
        bot_response = bot.bot(text)
        user = request.user
        user.userextension.bot_messages_count += 1
        user.userextension.save()
        return response.Response(data={'text': bot_response}, status=status.HTTP_200_OK)


class BuildingModelMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.BuildingSerializer
    queryset = models.Building.objects.all().order_by('address')

    @swagger_auto_schema(operation_description="This endpoint returns buildings list")
    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class CurrentBuildingModelMixin(RetrieveModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.BuildingSerializer
    queryset = models.Building.objects.all().order_by('address')

    @swagger_auto_schema(operation_description="This endpoint returns current building")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, args, kwargs)


class FloorModelMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.FloorSerializer

    def get_queryset(self):
        return models.FloorData.objects.filter(building=self.kwargs['building']).order_by('floor_number')

    @swagger_auto_schema(operation_description="This endpoint returns floors list")
    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class GroupUserMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.PrivateUserSerializer

    def get_queryset(self):
        user = self.request.user
        group = user.userextension.group
        if not group:
            return models.User.objects.none()
        queryset = models.User.objects.filter(userextension__group=group) \
            .order_by('-userextension__total_score', 'first_name', 'last_name')
        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)
