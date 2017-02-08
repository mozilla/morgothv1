from morgoth.addons.models import Addon, AddonGroup
from morgoth.base.utils import BalrogAPI


def fetch_all_rules(auth):
    balrog = BalrogAPI(auth=auth)
    rules_res = balrog.request('rules?product=SystemAddons')

    rules = []
    for rule in rules_res.data['rules']:
        if rule['alias'] and rule['alias'].startswith('morgoth-sysaddons-'):
            if rule['mapping']:
                res = balrog.request('releases/{}'.format(rule['mapping']))
                rule['release_data'] = res.data
            rules.append(rule)

    return rules


def refresh_balrog_state(auth):
    rules = fetch_all_rules(auth=auth)

    for group in AddonGroup.objects.all():
        group.shipped_addons.clear()
        group.qa_addons.clear()

    for rule in rules:
        group = AddonGroup.objects.get(browser_version=rule['version'])
        release_data = rule.get('release_data')

        if release_data and 'addons' in release_data:
            for addon in release_data['addons']:
                addon_data = release_data['addons'][addon]
                addon = Addon.objects.get_or_create(
                    name=addon, version=addon_data['version'], defaults={
                        'ftp_url': addon_data['platforms']['default']['fileUrl']
                    })

                if rule['channel'] == 'release':
                    group.shipped_addons.add(addon)
                elif rule['channel'] == 'release-sysaddon':
                    group.qa_addons.add(addon)
