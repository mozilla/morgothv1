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
            'ftp_url': addon.ftp_url,
            'xpi_hash': 'c383ffa8d660821158c1313690e7676eaeb917ac12de0bde06e3059920d106e8'
                        '656a6273655fbc2bc28d694dce433d11784807c27065f6f7f6e83b276b1d2926',
            'xpi_filesize': 9,
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
            'addons': [addon.id]
        }
