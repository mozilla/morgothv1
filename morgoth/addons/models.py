from django.db import models


class Addon(models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=32)
    ftp_url = models.URLField()


class AddonGroup(models.Model):
    channel_name = models.CharField(max_length=100)
    browser_version = models.CharField(max_length=32)
    addons = models.ManyToManyField(Addon, related_name='groups')
