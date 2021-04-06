from rest_framework import permissions


class IsStudentsAccessed(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.userextension.type == 'master'