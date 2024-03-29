from django.urls import path
from core import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'events', views.EventsModelViewSet, basename='events')
router.register(r'buildings', views.BuildingViewSet, basename='buildings')
router.register(r'courses/(?P<course>\d+)/modules', views.ModuleViewSet, basename='modules')
router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'all_users', views.UserViewSet, basename='all_users')
router.register(r'groups', views.GroupViewSet, basename='groups')
router.register(r'master_users', views.MasterUserViewSet, basename='master_users')

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('user/', views.UserDataApiView.as_view()),
    path('lessons/<int:pk>/', views.LessonMixin.as_view()),
    path('lesson/<int:lesson>/questions/', views.QuestionMixin.as_view()),
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
    path('bot/', views.BotApiView.as_view()),
    path('group_user_data/', views.GroupUserMixin.as_view()),
    path('dialogs/', views.LastMessagesApiView.as_view()),
    path('events_search/', views.EventsSearchApiView.as_view()),
    path('upload_image/', views.ImageUploadView.as_view())
]

urlpatterns += router.urls
