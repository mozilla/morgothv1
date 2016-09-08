import hashlib
import os

from urllib import request

from django.db import models

from dirtyfields import DirtyFieldsMixin


PLATFORMS = (
    'Darwin_x86-gcc3-u-i386-x86_64',
    'Darwin_x86_64-gcc3-u-i386-x86_64',
    'Linux_x86-gcc3',
    'Linux_x86_64-gcc3',
    'WINNT_x86-msvc',
    'WINNT_x86-msvc-x64',
    'WINNT_x86-msvc-x86',
    'WINNT_x86_64-msvc',
    'WINNT_x86_64-msvc-x64',
)


class Addon(DirtyFieldsMixin, models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=32)
    ftp_url = models.URLField(blank=True, null=True)
    xpi_hash = models.CharField(max_length=128, null=True)
    xpi_filesize = models.IntegerField(null=True)

    def save(self, *args, **kwargs):
        if self.is_dirty():
            dirty_fields = self.get_dirty_fields()

            if 'ftp_url' in dirty_fields and self.ftp_url:
                # Download the XPI file
                file_name, headers = request.urlretrieve(self.ftp_url)

                # Calculate the hash of the XPI file
                with open(file_name, 'rb') as f:
                    data = f.read()
                    self.xpi_hash = hashlib.sha512(data).hexdigest()

                self.xpi_filesize = os.path.getsize(file_name)
            elif not self.ftp_url:
                self.xpi_hash = None
                self.xpi_filesize = None

        super(Addon, self).save(*args, **kwargs)

    @property
    def release_data(self):
        data = {
            'platforms': {
                'default': {
                    'fileUrl': self.ftp_url,
                    'hashValue': self.xpi_hash,
                    'filesize': self.xpi_filesize,
                }
            }
        }

        for p in PLATFORMS:
            data['platforms'][p] = {'alias': 'default'}

        return data


class AddonGroup(models.Model):
    channel_name = models.CharField(max_length=100)
    browser_version = models.CharField(max_length=32)
    addons = models.ManyToManyField(Addon, related_name='groups')

    @property
    def name(self):
        n = 'SystemAddons-ff{}'.format(self.browser_version)
        for a in self.addons.order_by('name'):
            n = '{}-{}-{}'.format(n, a.name, a.version)
        return n

    @property
    def release_data(self):
        data = {
            'addons': {},
            'hashFunction': 'sha512',
            'name': self.name,
            'schema_version': 5000,
        }

        for a in self.addons.order_by('name'):
            data['addons'][a.name] = a.release_data

        return data
