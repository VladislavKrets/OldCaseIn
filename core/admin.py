from django.contrib import admin
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.template.response import TemplateResponse
from django.urls import path
from django.urls.resolvers import RoutePattern
from django.utils.safestring import mark_safe

from core.models import Module, Lesson, \
    Question, QuestionAnswer, SavedQuestionAnswer, \
    LessonResult, BotTheme, BotAnswer, DrugNDropAnswer, RegistrationCode, \
    EventCalendar, Documentation, UserExtension, BotTrainer, FloorData, Building, UserGroup
import nested_admin


class FloorDataAdmin(admin.ModelAdmin):
    change_form_template = 'custom_floor_add_template.html'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('add_floor/', self.admin_site.admin_view(self.create_floor)),
        ]
        return my_urls + urls

    def create_floor(self, request):
        context = dict(
           self.admin_site.each_context(request),
        )
        context['buildings'] = Building.objects.all()
        return TemplateResponse(request, "floor_editor.html", context)


class UserExtensionForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(UserExtensionForm, self).__init__(*args, **kwargs)
        self.fields['master'].queryset = \
            User.objects.filter(userextension__type='master').exclude(userextension=self.instance)


class UserExtensionInline(admin.TabularInline):
    model = UserExtension
    fk_name = 'user'
    form = UserExtensionForm


class UserAdmin(admin.ModelAdmin):
    inlines = (UserExtensionInline,)


class BotTrainerAdmin(admin.ModelAdmin):

    def has_add_permission(self, request):
        return not BotTrainer.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


class QuestionAnswerAdminInline(nested_admin.NestedTabularInline):
    model = QuestionAnswer


class QuestionAdmin(nested_admin.NestedModelAdmin):
    inlines = (QuestionAnswerAdminInline,)


class BotAnswerAdminInLine(admin.TabularInline):
    model = BotAnswer


class BotThemeAdminInline(admin.TabularInline):
    model = BotTheme


class BotThemeAdmin(admin.ModelAdmin):
    inlines = (BotAnswerAdminInLine,)


admin.site.register(Building)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(RegistrationCode)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Question, QuestionAdmin)
admin.site.register(BotTheme, BotThemeAdmin)
admin.site.register(FloorData, FloorDataAdmin)
admin.site.register(SavedQuestionAnswer)
admin.site.register(EventCalendar)
admin.site.register(LessonResult)
admin.site.register(Documentation)
admin.site.register(UserGroup)
admin.site.register(BotTrainer, BotTrainerAdmin)
