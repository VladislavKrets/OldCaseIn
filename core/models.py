import sys
from io import BytesIO

from PIL import Image
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from gdstorage.storage import GoogleDriveStorage
from rest_framework.exceptions import ValidationError

gd_storage = GoogleDriveStorage()


class UserGroup(models.Model):
    name = models.CharField(default='', max_length=255)
    master = models.ForeignKey(to=User, related_name='managed_groups',
                               on_delete=models.deletion.CASCADE)

    def __str__(self):
        return self.name


class RegistrationCode(models.Model):
    class UserTypes(models.TextChoices):
        USER = 'user', 'user'
        MASTER = 'master', 'master'

    type = models.CharField(max_length=100, choices=UserTypes.choices, default='user')
    code = models.CharField(max_length=255, unique=True)
    group = models.ForeignKey(to=UserGroup, default=None, blank=True,
                              null=True, on_delete=models.deletion.SET_NULL)

    def save(self, *args, **kwargs):
        if not self.group:
            self.group = None
        super(RegistrationCode, self).save(*args, **kwargs)

    def __str__(self):
        return self.code


class Course(models.Model):
    name = models.CharField(max_length=255)
    preview_photo = models.ImageField(upload_to='course_previews', storage=gd_storage)

    def __str__(self):
        return self.name


class Module(models.Model):
    name = models.CharField(max_length=255)
    number = models.PositiveIntegerField()
    course = models.ForeignKey(to=Course, on_delete=models.deletion.CASCADE, null=True)

    def __str__(self):
        return self.name


class Lesson(models.Model):
    module = models.ForeignKey(to=Module,
                               on_delete=models.deletion.CASCADE, related_name='lessons')
    themes = models.TextField()
    video = models.FileField(upload_to='videos', storage=gd_storage)
    number = models.PositiveIntegerField()

    def __str__(self):
        return self.themes


class Question(models.Model):
    class QuestionTypes(models.TextChoices):
        RADIO = 'radio', 'radio'
        CHECKBOX = 'checkbox', 'checkbox'
        # DROPDOWN = 'dropdown', 'dropdown'
        # DRUG_N_DROP = 'drug&drop', 'drug&drop'
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
    result_score = models.PositiveIntegerField(default=0)
    max_score = models.PositiveIntegerField(default=0)

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
    theme = models.ForeignKey(to=BotTheme, on_delete=models.deletion.CASCADE, related_name='answers')
    answer = models.TextField()

    def __str__(self):
        return self.answer


class EventCalendar(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.deletion.CASCADE)
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Documentation(models.Model):
    title = models.CharField(max_length=255)
    document = models.FileField(upload_to='documents', storage=gd_storage)

    def __str__(self):
        return self.title


def restrict_type(value):
    master = User.objects.get(pk=value)
    if master.userextension.type != 'master':
        raise ValidationError('This user is not master')


class Building(models.Model):
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.address


class FloorData(models.Model):
    floor_number = models.PositiveIntegerField()
    json_floor = models.TextField()
    building = models.ForeignKey(to=Building, on_delete=models.deletion.CASCADE)

    def __str__(self):
        return self.building.address + ' этаж ' + str(self.floor_number)


class SavedImage(models.Model):
    date = models.DateTimeField(auto_now_add=True, blank=True)
    image = models.ImageField(null=True, default=None, storage=gd_storage)

    def save(self, *args, **kwargs):
        im = Image.open(self.image)
        width, height = im.size
        output = BytesIO()
        if width > height:
            coeff = width / height
            height = 100
            width = int(height * coeff)
        else:
            coeff = height / width
            width = 100
            height = int(width * coeff)
        im = im.resize((width, height))
        im.save(output, format='JPEG', quality=90)
        output.seek(0)
        self.image = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image.name.split('.')[0], 'image/jpeg',
                                          sys.getsizeof(output), None)

        super(SavedImage, self).save()


class UserExtension(models.Model):
    class UserTypes(models.TextChoices):
        USER = 'user', 'user'
        MASTER = 'master', 'master'

    user = models.OneToOneField(to=User, on_delete=models.deletion.CASCADE)
    total_score = models.IntegerField(default=0)
    type = models.CharField(max_length=100, choices=UserTypes.choices, default='user')
    days_count = models.PositiveIntegerField(default=0)
    master_mark = models.PositiveIntegerField(default=0)
    completed_tasks_count = models.PositiveIntegerField(default=0)
    bot_messages_count = models.PositiveIntegerField(default=0)
    chat_messages_count = models.PositiveIntegerField(default=0)
    group = models.ForeignKey(to=UserGroup, on_delete=models.deletion.CASCADE, related_name='users')
    floor_data = models.ForeignKey(to=FloorData, on_delete=models.deletion.SET_NULL, null=True, blank=True)
    room_number = models.PositiveIntegerField(null=True, blank=True)
    avatar = models.ForeignKey(null=True, default=None, to=SavedImage, on_delete=models.deletion.SET_NULL)

    def save(self, *args, **kwargs):
        if not self.type:
            self.type = None
        if not self.group:
            self.group = None
        if not self.floor_data:
            self.floor_data = None
        if not self.room_number:
            self.room_number = None
        super(UserExtension, self).save(*args, **kwargs)


class BotTrainer(models.Model):
    text = models.TextField(default='', blank=True)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        from core import bot
        instance = super().save(force_insert=force_insert, force_update=force_update,
                                using=using, update_fields=update_fields)
        bot.train()
        return instance


def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid'
        )


class Dialog(models.Model):
    first_user = models.ForeignKey(to=User,
                                   related_name='dialogs', on_delete=models.deletion.CASCADE)
    second_user = models.ForeignKey(to=User,
                                    related_name='second_dialogs', on_delete=models.deletion.CASCADE)

    class Meta:
        unique_together = [['first_user', 'second_user']]


class Message(models.Model):

    author = models.ForeignKey(
        to=User,
        related_name='author_messages',
        on_delete=models.CASCADE
    )
    dialog = models.ForeignKey(to=Dialog, related_name='messages', on_delete=models.deletion.CASCADE)
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    is_read = models.BooleanField(default=False)

    def last_50_messages():
        return Message.objects.order_by('-created_at').all()[:50]

