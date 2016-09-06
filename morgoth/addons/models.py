import hashlib
import os

from urllib import request

from django.db import models

from dirtyfields import DirtyFieldsMixin


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


class AddonGroup(models.Model):
    channel_name = models.CharField(max_length=100)
    browser_version = models.CharField(max_length=32)
    addons = models.ManyToManyField(Addon, related_name='groups')
