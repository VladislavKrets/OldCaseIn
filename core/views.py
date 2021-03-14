from rest_framework import views, permissions, response
from rest_framework.authtoken.models import Token
from rest_framework.mixins import RetrieveModelMixin,\
    ListModelMixin, CreateModelMixin, UpdateModelMixin
from rest_framework.generics import GenericAPIView
from core import serializers
from core import models
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response({'error': serializer.errors})
        user = serializer.validated_data['user']
        token = Token.objects.get_or_create(user=user)
        return response.Response({'token': token[0].key})


class ModuleMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ModuleSerializer
    queryset = models.Module.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class LessonMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.LessonSerializer
    queryset = models.Lesson.objects.all()

    def get_queryset(self):
        module = self.kwargs['module']
        return models.Lesson.objects.filter(module=module)

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


class QuestionMixin(ListModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.QuestionSerializer
    queryset = models.Question.objects.all()

    def get_queryset(self):
        lesson = self.kwargs['lesson']
        return models.Question.objects.filter(lesson=lesson)

    def get(self, request, *args, **kwargs):
        return self.list(request, args, kwargs)


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


class SavedQuestionAnswerMixin(CreateModelMixin, UpdateModelMixin, GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.SavedQuestionAnswerSerializer

    def get_queryset(self):
        return models.SavedQuestionAnswer.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, args, kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, args, kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        context['answer'] = models.QuestionAnswer.objects.get(pk=self.kwargs['answer'])
        return context


