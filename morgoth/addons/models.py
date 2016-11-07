import hashlib
import math
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


class VersionNumber(object):
    def __init__(self, major=0, minor=0, build=0):
        self.major = int(major)
        self.minor = int(minor)
        self.build = int(build)

        if any([i < 0 or i > 999 for i in self.version]):
            raise ValueError('Version number components must between 0 and 999, inclusive')

    def __int__(self):
        major, minor, build = self.version
        return (major * 1000000) + (minor * 1000) + build

    def __str__(self):
        return '.'.join([str(v) for v in self.version])

    def __repr__(self):
        return '<VersionNumber: {}>'.format(self)

    @property
    def version(self):
        return self.major, self.minor, self.build

    @classmethod
    def from_integer(cls, value):
        major = math.floor(value / 1000000)
        minor = math.floor(value / 1000) - (major * 1000)
        build = value - (minor * 1000) - (major * 1000000)
        return cls(major, minor, build)

    @classmethod
    def from_string(cls, value):
        return cls(*value.split('.'))


class VersionNumberField(models.Field):
    def get_internal_type(self):
        return 'IntegerField'

    def from_db_value(self, value, *args, **kwargs):
        return self.to_python(value)

    def to_python(self, value):
        if value is None:
            return None
        elif isinstance(value, VersionNumber):
            return value
        elif isinstance(value, tuple):
            return VersionNumber(*value)
        elif isinstance(value, str):
            return VersionNumber.from_string(value)
        else:
            return VersionNumber.from_integer(value)

    def get_prep_value(self, value):
        if value is None:
            return None
        elif isinstance(value, tuple):
            return int(VersionNumber(*value))
        elif isinstance(value, str):
            return int(VersionNumber.from_string(value))
        else:
            return int(value)

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)


class Addon(DirtyFieldsMixin, models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=32)
    ftp_url = models.URLField(blank=True, null=True)
    xpi_hash = models.CharField(max_length=128, null=True)
    xpi_filesize = models.IntegerField(null=True)

    class Meta:
        unique_together = ('name', 'version',)

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

        super().save(*args, **kwargs)

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
    browser_version = VersionNumberField(unique=True)
    addons = models.ManyToManyField(Addon, related_name='groups')
    built_in_addons = models.ManyToManyField(Addon, related_name='built_in_groups')
    qa_addons = models.ManyToManyField(Addon, related_name='qa_groups')
    shipped_addons = models.ManyToManyField(Addon, related_name='shipped_groups')

    class Meta:
        ordering = ('-browser_version',)

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

    @property
    def qa_synced(self):
        """A boolean that indicates if the QA channel on Balrog is in sync with Morgoth."""
        qa_addons_list = list(self.qa_addons.order_by('id'))
        built_in_addons_list = list(self.addons.order_by('id'))
        return qa_addons_list == built_in_addons_list

    @property
    def shipped_synced(self):
        """A boolean that indicates if the release channel on Balrog is in sync with Morgoth."""
        shipped_addons_list = list(self.shipped_addons.order_by('id'))
        built_in_addons_list = list(self.addons.order_by('id'))
        return shipped_addons_list == built_in_addons_list
