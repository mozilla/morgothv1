from rest_framework import serializers

from morgoth.addons.models import Addon, AddonGroup


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon
        fields = [
            'id',
            'name',
            'version',
            'ftp_url',
        ]


class AddonGroupSerializer(serializers.ModelSerializer):
    addons = AddonSerializer(many=True, read_only=True)
    addon_ids = serializers.PrimaryKeyRelatedField(source='addons', queryset=Addon.objects.all(),
                                                   many=True, write_only=True, required=False)

    class Meta:
        model = AddonGroup
        fields = [
            'id',
            'channel_name',
            'browser_version',
            'addons',
            'addon_ids',
        ]
