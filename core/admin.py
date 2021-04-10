from django.contrib import admin
from django.contrib.auth.models import User
from django.forms import ModelForm

from core.models import Module, Lesson, \
    Question, QuestionAnswer, SavedQuestionAnswer, \
    LessonResult, BotTheme, BotAnswer, DrugNDropAnswer, RegistrationCode, \
    EventCalendar, Documentation, UserExtension, BotTrainer

import nested_admin


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


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(RegistrationCode)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Question, QuestionAdmin)
admin.site.register(BotTheme, BotThemeAdmin)
# admin.site.register(DrugNDropAnswer)
admin.site.register(SavedQuestionAnswer)
admin.site.register(EventCalendar)
admin.site.register(LessonResult)
admin.site.register(Documentation)
admin.site.register(BotTrainer, BotTrainerAdmin)
