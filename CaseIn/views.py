from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.utils.safestring import mark_safe
from rest_framework.authtoken.models import Token
from core import models


def floor_view(request, pk):
    floor = models.FloorData.objects.get(pk=pk)
    token = request.COOKIES.get('token', None)
    if not token:
        return HttpResponse(status=400)
    if not Token.objects.filter(key=token).exists():
        return HttpResponse(status=401)
    token = Token.objects.get(key=token)
    user = token.user.userextension
    room_number = ''
    if user.floor_data == floor and user.room_number:
        room_number = user.room_number
    response = TemplateResponse(request, 'floor_viewer.html',
                                {'json': mark_safe(floor.json_floor),
                                 'room_number': room_number})
    return response
