# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-26 09:55
from __future__ import unicode_literals

from django.db import migrations
import morgoth.addons.models


class Migration(migrations.Migration):

    dependencies = [
        ('addons', '0009_auto_20161026_0942'),
    ]

    operations = [
        migrations.AddField(
            model_name='addon',
            name='version_tmp',
            field=morgoth.addons.models.VersionNumberField(default=0),
            preserve_default=False,
        ),
    ]
