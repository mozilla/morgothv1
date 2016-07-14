import pytest

from morgoth.addons.api.serializers import AddonSerializer, AddonGroupSerializer
from morgoth.addons.tests import AddonFactory, AddonGroupFactory


@pytest.mark.django_db()
class TestAddonSerializer(object):
    def test_it_works(self):
        addon = AddonFactory()
        serializer = AddonSerializer(addon)

        assert serializer.data == {
            'id': addon.id,
            'name': addon.name,
            'version': '%s' % addon.version,
            'ftp_url': addon.ftp_url
        }


@pytest.mark.django_db()
class TestAddonGroupSerializer(object):
    def test_it_works(self):
        addon = AddonFactory()
        group = AddonGroupFactory()
        group.addons.add(addon)

        serializer = AddonGroupSerializer(group)

        assert serializer.data == {
            'id': group.id,
            'channel_name': group.channel_name,
            'browser_version': '%s' % group.browser_version,
            'addons': [{
                'id': addon.id,
                'name': addon.name,
                'version': '%s' % addon.version,
                'ftp_url': addon.ftp_url
            }]
        }
