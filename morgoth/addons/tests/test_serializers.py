import pytest

from morgoth.addons.api.serializers import AddonSerializer, AddonGroupSerializer
from morgoth.addons.tests import AddonFactory, AddonGroupFactory, FAKE_XPI_FILESIZE, FAKE_XPI_HASH


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
            'xpi_hash': FAKE_XPI_HASH,
            'xpi_filesize': FAKE_XPI_FILESIZE,
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
            'browser_version': '%s' % group.browser_version,
            'addons': [addon.id]
        }
