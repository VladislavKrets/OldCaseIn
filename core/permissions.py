from rest_framework import permissions
from datetime import datetime


class IsStudentsAccessed(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.userextension.type == 'master'


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        is_authenticated = bool(request.user and request.user.is_authenticated)
        try:
            last_login = request.user.last_login
            now = datetime.now()
            if is_authenticated and (last_login is None or last_login.date() != now.date()):
                request.user.last_login = now
                request.user.save()
                userextension = request.user.userextension
                userextension.days_count += 1
                userextension.save()
        except AttributeError:
            pass
        return is_authenticated
