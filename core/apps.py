from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'

    def ready(self):
        from core import bot
        bot.train()
        bot.bot('росатом')

