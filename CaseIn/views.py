from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.utils.safestring import mark_safe
from rest_framework.authtoken.models import Token
from core import models


def my_view(request, pk):
    floor = models.FloorData.objects.get(pk=pk)
    token = request.COOKIES.get('token', None)
    if not token:
        return HttpResponse(status=400)
    if not Token.objects.filter(key=token).exists():
        return HttpResponse(status=401)
    response = TemplateResponse(request, 'floor_viewer.html', {'json': mark_safe(floor.json_floor)})
    return response
