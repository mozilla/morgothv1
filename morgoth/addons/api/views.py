from rest_framework import permissions, status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from morgoth.addons.api.serializers import AddonSerializer, AddonGroupSerializer
from morgoth.addons.models import Addon, AddonGroup


class AddonViewSet(ModelViewSet):
    queryset = Addon.objects.all()
    serializer_class = AddonSerializer
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
    ]

    @detail_route(methods=['GET'])
    def groups(self, request, *args, **kwargs):
        addon = self.get_object()
        serializer = AddonGroupSerializer(addon.groups.all(), many=True)
        return Response(serializer.data)


class AddonGroupViewSet(ModelViewSet):
    queryset = AddonGroup.objects.all()
    serializer_class = AddonGroupSerializer
    permission_classes = [
        permissions.DjangoModelPermissionsOrAnonReadOnly,
    ]

    @detail_route(methods=['POST'])
    def add_addons(self, request, *args, **kwargs):
        group = self.get_object()
        addon_ids = request.data.get('addon_ids', [])
        addons = Addon.objects.filter(id__in=addon_ids)

        for addon in addons:
            group.addons.add(addon)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @detail_route(methods=['POST'])
    def remove_addons(self, request, *args, **kwargs):
        group = self.get_object()
        addon_ids = request.data.get('addon_ids', [])
        addons = Addon.objects.filter(id__in=addon_ids)

        for addon in addons:
            group.addons.remove(addon)

        return Response(status=status.HTTP_204_NO_CONTENT)
