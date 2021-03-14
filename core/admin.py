from django.contrib import admin
from core.models import Module, Lesson,\
    Question, QuestionAnswer, SavedQuestionAnswer,\
    LessonResult, BotTheme, BotAnswer, DrugNDropAnswer


class QuestionAnswerAdminInline(admin.TabularInline):
    model = QuestionAnswer


class QuestionAdmin(admin.ModelAdmin):
    inlines = (QuestionAnswerAdminInline, )


admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(Question, QuestionAdmin)
admin.site.register(BotTheme)
admin.site.register(BotAnswer)
admin.site.register(DrugNDropAnswer)
