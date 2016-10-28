from rest_framework import serializers

from morgoth.addons.models import Addon, AddonGroup


class VersionField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, value):
        return value


class AddonSerializer(serializers.ModelSerializer):
    version = serializers.CharField()

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
    addons = AddonSerializer(many=True, required=False)
    built_in_addons = AddonSerializer(many=True)
    qa_addons = AddonSerializer(many=True)
    shipped_addons = AddonSerializer(many=True)
    browser_version = VersionField()

    class Meta:
        model = AddonGroup
        fields = (
            'id',
            'browser_version',
            'addons',
            'built_in_addons',
            'qa_addons',
            'shipped_addons',
        )
        read_only_fields = (
            'built_in_addons',
            'qa_addons',
            'shipped_addons',
        )
