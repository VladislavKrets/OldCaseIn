from django.urls import path
from core import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'events', views.EventsModelViewSet, basename='events')

urlpatterns = router.urls
urlpatterns += [
    path('login/', views.LoginView.as_view()),
    path('user/', views.UserDataApiView.as_view()),
    path('modules/', views.ModuleMixin.as_view()),
    path('lessons/<int:pk>/', views.LessonMixin.as_view()),
    path('lesson/<int:lesson>/questions/', views.QuestionMixin.as_view()),
    # path('question/<int:answer__question>/drugndrop/',
    # views.DrugNDropAnswerMixin.as_view()),
    path('answer/<int:answer>/save/',
         views.SavedQuestionAnswerMixin.as_view()),
    path('answer/<int:answer>/save/<int:pk>/',
         views.SavedQuestionAnswerMixin.as_view()),
    path('test/<int:lesson>/result/',
         views.ResultTestApiView.as_view()),
    path('test/results/',
         views.ResultTestApiView.as_view()),
    path('bot_themes/', views.BotThemeMixin.as_view()),
    path('bot_themes/<int:parent_theme>/', views.BotThemeMixin.as_view()),
    path('bot_theme/<int:theme>/answers/', views.BotThemeMixin.as_view()),
    path('documents/', views.DocumentsModelMixin.as_view()),
    path('students/', views.StudentsModelMixin.as_view()),
    path('bot/', views.BotApiView.as_view()),
    path('buildings/<int:building>/floors/', views.FloorModelMixin.as_view()),
    path('buildings/', views.BuildingModelMixin.as_view()),
    path('bot/', views.BotApiView.as_view())
]
