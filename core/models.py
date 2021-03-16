from django.contrib.auth.models import User
from django.db import models


class RegistrationCode(models.Model):
    code = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.code


class Module(models.Model):
    name = models.CharField(max_length=255)
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Lesson(models.Model):
    module = models.ForeignKey(to=Module,
                               on_delete=models.deletion.CASCADE, related_name='lessons')
    themes = models.TextField()
    video = models.FileField()
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.themes


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

    def __str__(self):
        return self.question


class QuestionAnswer(models.Model):
    question = models.ForeignKey(to=Question,
                                 on_delete=models.deletion.CASCADE,
                                 related_name="answers")
    answer = models.TextField()
    is_right = models.BooleanField(default=False)
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.answer


class DrugNDropAnswer(models.Model):
    answer = models.OneToOneField(to=QuestionAnswer,
                                  on_delete=models.deletion.CASCADE,
                                  related_name='dropdown_answer')
    text = models.TextField()
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.text


class SavedQuestionAnswer(models.Model):
    answer = models.ForeignKey(to=QuestionAnswer, on_delete=models.deletion.CASCADE,
                               related_name='saved_answer')
    user = models.ForeignKey(to=User, on_delete=models.deletion.CASCADE)
    user_text = models.TextField(default='', blank=True)
    drugNDropAnswer = models.OneToOneField(to=DrugNDropAnswer,
                                           on_delete=models.deletion.CASCADE,
                                           default=None, null=True)

    def __str__(self):
        return self.answer.answer


class LessonResult(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.deletion.CASCADE)
    lesson = models.ForeignKey(to=Lesson, on_delete=models.deletion.CASCADE)
    result_score = models.IntegerField()

    def __str__(self):
        return self.lesson.themes


class BotTheme(models.Model):
    question = models.CharField(max_length=255)
    parent_theme = models.ForeignKey("self", on_delete=models.deletion.CASCADE,
                                     null=True, blank=True, default=None)

    def save(self, *args, **kwargs):
        if not self.parent_theme:
            self.parent_theme = None
        super(BotTheme, self).save(*args, **kwargs)

    def __str__(self):
        return self.question


class BotAnswer(models.Model):
    theme = models.ForeignKey(to=BotTheme, on_delete=models.deletion.CASCADE)
    answer = models.TextField()

    def __str__(self):
        return self.answer
