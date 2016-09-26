from rest_framework import serializers

from morgoth.addons.models import Addon, AddonGroup


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon
        fields = (
            'id',
            'name',
            'version',
            'ftp_url',
            'xpi_hash',
            'xpi_filesize',
        )
        read_only_fields = (
            'xpi_hash',
            'xpi_filesize',
        )


class AddonGroupSerializer(serializers.ModelSerializer):
    addons = serializers.PrimaryKeyRelatedField(many=True, queryset=Addon.objects.all(),
                                                required=False)

    class Meta:
        model = AddonGroup
        fields = (
            'id',
            'browser_version',
            'no_update_version',
            'addons',
        )
