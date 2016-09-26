from django.db import IntegrityError

from product_details import product_details
from product_details.version_compare import version_list

from morgoth.addons.models import AddonGroup


def update_addon_groups():
    """Creates addon groups for all browser versions."""
    versions = version_list(product_details.firefox_history_major_releases)
    versions += version_list(product_details.firefox_history_stability_releases)

    for version in versions:
        try:
            AddonGroup.objects.create(browser_version=version)
        except IntegrityError:
            pass
