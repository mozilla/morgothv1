from django.db import transaction

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
    addons = AddonSerializer(many=True, read_only=True)
    addon_ids = serializers.ListField(required=False, write_only=True)
    built_in_addons = AddonSerializer(many=True, read_only=True)
    qa_addons = AddonSerializer(many=True, read_only=True)
    shipped_addons = AddonSerializer(many=True, read_only=True)
    browser_version = VersionField()
    qa_synced = serializers.BooleanField(read_only=True)
    shipped_synced = serializers.BooleanField(read_only=True)
    qa_sync_diff = serializers.JSONField(read_only=True)
    shipped_sync_diff = serializers.JSONField(read_only=True)

    class Meta:
        model = AddonGroup
        fields = (
            'id',
            'browser_version',
            'addons',
            'addon_ids',
            'built_in_addons',
            'qa_addons',
            'shipped_addons',
            'qa_synced',
            'shipped_synced',
            'qa_sync_diff',
            'shipped_sync_diff',
        )

    @transaction.atomic
    def create(self, validated_data):
        addon_ids = validated_data.pop('addon_ids', [])

        group = AddonGroup.objects.create(**validated_data)

        for addon_id in addon_ids:
            group.addons.add(Addon.objects.get(id=addon_id))

        return group

    @transaction.atomic
    def update(self, instance, validated_data):
        addon_ids = validated_data.pop('addon_ids', None)

        AddonGroup.objects.filter(pk=instance.pk).update(**validated_data)

        if addon_ids:
            instance.addons.clear()
            for addon_id in addon_ids:
                instance.addons.add(Addon.objects.get(id=addon_id))

        return instance
