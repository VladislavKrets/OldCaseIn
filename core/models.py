from django.contrib.auth.models import User
from django.db import models


class Module(models.Model):
    name = models.CharField(max_length=255)


class Lesson(models.Model):
    module = models.ForeignKey(to=Module, on_delete=models.deletion.CASCADE)
    themes = models.TextField()
    video = models.FileField()


class Question(models.Model):
    class QuestionTypes(models.TextChoices):
        RADIO = 'radio', 'radio'
        CHECKBOX = 'checkbox', 'checkbox'
        DROPDOWN = 'dropdown', 'dropdown'
        DRUG_N_DROP = 'drug&drop', 'drug&drop'
        TEXT = 'text', 'text'

    lesson = models.ForeignKey(to=Lesson, on_delete=models.deletion.CASCADE)
    question_type = models.CharField(max_length=20, choices=QuestionTypes.choices)
    question = models.TextField()
    score = models.IntegerField(default=1)
    number = models.PositiveIntegerField()


class QuestionAnswer(models.Model):
    question = models.ForeignKey(to=Question,
                                 on_delete=models.deletion.CASCADE,
                                 related_name="answers")
    answer = models.TextField()
    is_right = models.BooleanField(default=False)
    number = models.PositiveIntegerField()


class DrugNDropAnswer(models.Model):
    answer = models.OneToOneField(to=QuestionAnswer,
                                  on_delete=models.deletion.CASCADE,
                                  related_name='dropdown_answer')
    text = models.TextField()
    number = models.PositiveIntegerField()


class SavedQuestionAnswer(models.Model):
    answer = models.ForeignKey(to=QuestionAnswer, on_delete=models.deletion.CASCADE,
                               related_name='saved_answer')
    user = models.ForeignKey(to=User, on_delete=models.deletion.CASCADE)
    user_text = models.TextField(default='')
    drugNDropAnswer = models.OneToOneField(to=DrugNDropAnswer,
                                           on_delete=models.deletion.CASCADE,
                                           default=None, null=True)


class LessonResult(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.deletion.CASCADE)
    lesson = models.ForeignKey(to=Lesson, on_delete=models.deletion.CASCADE)
    result_score = models.IntegerField()


class BotTheme(models.Model):
    question = models.CharField(max_length=255)
    parent_theme = models.ForeignKey("self", on_delete=models.deletion.CASCADE,
                                     null=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        if not self.parent_theme:
            self.parent_theme = None
        super(BotTheme, self).save(*args, **kwargs)


class BotAnswer(models.Model):
    theme = models.ForeignKey(to=BotTheme, on_delete=models.deletion.CASCADE)
    answer = models.TextField()
