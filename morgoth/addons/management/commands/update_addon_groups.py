from django.core.management.base import BaseCommand
from django.db import IntegrityError

from product_details import product_details
from product_details.version_compare import version_list

from morgoth.addons.models import AddonGroup


class Command(BaseCommand):
    help = 'Creates addon groups for all versions of Firefox'

    def handle(self, *args, **options):
        versions = version_list(product_details.firefox_history_major_releases)
        versions += version_list(product_details.firefox_history_stability_releases)

        for version in versions:
            try:
                AddonGroup.objects.create(browser_version=version)
            except IntegrityError:
                pass
