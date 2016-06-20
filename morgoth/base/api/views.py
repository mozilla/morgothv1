from django.contrib.auth.models import User

from rest_framework import viewsets

from morgoth.base.api.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for reading Django users."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
