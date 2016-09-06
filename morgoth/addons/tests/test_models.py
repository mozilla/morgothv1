import pytest

from unittest.mock import patch

from morgoth.addons.models import Addon
from morgoth.addons.tests import (AddonFactory, AddonGroupFactory, FAKE_XPI_FILESIZE,
                                  FAKE_XPI_HASH, mock_urlretrieve)


@pytest.mark.django_db()
class TestAddon(object):
    def test_hash_and_filesize(self):
        addon = Addon(name='testaddon', version='1.0', ftp_url='ftp://test.com/something.xpi')

        with patch('urllib.request.urlretrieve', mock_urlretrieve):
            addon.save()

        assert addon.xpi_hash == FAKE_XPI_HASH
        assert addon.xpi_filesize == FAKE_XPI_FILESIZE

    def test_release_data(self):
        addon = AddonFactory()
        assert addon.release_data == {
            'platforms': {
                'default': {
                    'fileUrl': addon.ftp_url,
                    'filesize': FAKE_XPI_FILESIZE,
                    'hashValue': FAKE_XPI_HASH
                },
                'Darwin_x86-gcc3-u-i386-x86_64': {'alias': 'default'},
                'Darwin_x86_64-gcc3-u-i386-x86_64': {'alias': 'default'},
                'Linux_x86-gcc3': {'alias': 'default'},
                'Linux_x86_64-gcc3': {'alias': 'default'},
                'WINNT_x86-msvc': {'alias': 'default'},
                'WINNT_x86-msvc-x64': {'alias': 'default'},
                'WINNT_x86-msvc-x86': {'alias': 'default'},
                'WINNT_x86_64-msvc': {'alias': 'default'},
                'WINNT_x86_64-msvc-x64': {'alias': 'default'},
            }
        }


@pytest.mark.django_db
class TestAddonGroup(object):
    def test_release_data(self):
        addon = AddonFactory()
        addon_group = AddonGroupFactory(addons=[addon])
        assert addon_group.release_data == {
            'addons': {
                addon.name: {
                    'platforms': {
                        'Darwin_x86-gcc3-u-i386-x86_64': {'alias': 'default'},
                        'Darwin_x86_64-gcc3-u-i386-x86_64': {'alias': 'default'},
                        'Linux_x86-gcc3': {'alias': 'default'},
                        'Linux_x86_64-gcc3': {'alias': 'default'},
                        'WINNT_x86-msvc': {'alias': 'default'},
                        'WINNT_x86-msvc-x64': {'alias': 'default'},
                        'WINNT_x86-msvc-x86': {'alias': 'default'},
                        'WINNT_x86_64-msvc': {'alias': 'default'},
                        'WINNT_x86_64-msvc-x64': {'alias': 'default'},
                        'default': {
                            'fileUrl': addon.ftp_url,
                            'filesize': FAKE_XPI_FILESIZE,
                            'hashValue': FAKE_XPI_HASH
                        }
                    }
                }
            },
            'hashFunction': 'sha512',
            'name': 'SystemAddons-ff{}-{}-{}'.format(addon_group.browser_version, addon.name,
                                                     addon.version),
            'schema_version': 5000
        }
