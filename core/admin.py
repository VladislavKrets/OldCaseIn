from django.contrib import admin
from core.models import Module, Lesson,\
    Question, QuestionAnswer, SavedQuestionAnswer,\
    LessonResult, BotTheme, BotAnswer, DrugNDropAnswer, RegistrationCode, \
    EventCalendar, Documentation

import nested_admin


class QuestionAnswerAdminInline(nested_admin.NestedTabularInline):
    model = QuestionAnswer


class QuestionAdmin(nested_admin.NestedModelAdmin):
    inlines = (QuestionAnswerAdminInline, )


class BotAnswerAdminInLine(admin.TabularInline):
    model = BotAnswer


class BotThemeAdminInline(admin.TabularInline):
    model = BotTheme


class BotThemeAdmin(admin.ModelAdmin):
    inlines = (BotAnswerAdminInLine, )


admin.site.register(RegistrationCode)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Question, QuestionAdmin)
admin.site.register(BotTheme, BotThemeAdmin)
#admin.site.register(DrugNDropAnswer)
admin.site.register(SavedQuestionAnswer)
admin.site.register(EventCalendar)
admin.site.register(LessonResult)
admin.site.register(Documentation)
