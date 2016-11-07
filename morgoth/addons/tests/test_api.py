import pytest

from morgoth.addons.models import Addon, AddonGroup
from morgoth.addons.tests import AddonFactory, AddonGroupFactory


@pytest.mark.django_db()
class TestAddonAPI(object):
    def test_it_works(self, api_client):
        res = api_client.get('/api/v1/addon/')
        assert res.status_code == 200
        assert res.data == []

    def test_it_serves_addons(self, api_client):
        addon = AddonFactory()

        res = api_client.get('/api/v1/addon/')
        assert res.status_code == 200
        assert res.data[0]['name'] == addon.name

    def test_it_can_create_addons(self, api_client):
        res = api_client.post('/api/v1/addon/', {
            'name': 'Test Addon',
            'version': '1.1',
            'ftp_url': ''
        })
        assert res.status_code == 201

        addons = Addon.objects.all()
        assert addons.count() == 1

    def test_it_can_edit_addons(self, api_client):
        addon = AddonFactory(name='unchanged')

        res = api_client.patch('/api/v1/addon/%s/' % addon.id, {
            'name': 'changed'
        })
        assert res.status_code == 200

        addon = Addon.objects.first()
        assert addon.name == 'changed'

    def test_it_can_delete_addons(self, api_client):
        addon = AddonFactory()

        res = api_client.delete('/api/v1/addon/%s/' % addon.id)
        assert res.status_code == 204

        addons = Addon.objects.all()
        assert addons.count() == 0

    def test_groups(self, api_client):
        addon = AddonFactory()
        group = AddonGroupFactory()
        group.addons.add(addon)

        res = api_client.get('/api/v1/addon/%s/groups/' % addon.id)
        assert res.status_code == 200

        assert res.data[0]['id'] == group.id


@pytest.mark.django_db()
class TestAddonGroupAPI(object):
    def test_it_works(self, api_client):
        res = api_client.get('/api/v1/addon_group/')
        assert res.status_code == 200
        assert res.data == []

    def test_it_serves_groups(self, api_client):
        group = AddonGroupFactory()
        addon = AddonFactory()
        group.addons.add(addon)

        res = api_client.get('/api/v1/addon_group/')
        assert res.status_code == 200
        assert res.data[0]['addons'][0] == addon.id

    def test_it_can_create_groups(self, api_client):
        res = api_client.post('/api/v1/addon_group/', {
            'browser_version': '3.1',
        })
        assert res.status_code == 201

        groups = AddonGroup.objects.all()
        assert groups.count() == 1

    def test_it_can_edit_groups(self, api_client):
        group = AddonGroupFactory(browser_version='1.0')

        res = api_client.patch('/api/v1/addon_group/%s/' % group.id, {
            'browser_version': '2.0a'
        })
        assert res.status_code == 200

        group = AddonGroup.objects.first()
        assert group.browser_version == '2.0a'

    def test_it_can_delete_groups(self, api_client):
        group = AddonGroupFactory()

        res = api_client.delete('/api/v1/addon_group/%s/' % group.id)
        assert res.status_code == 204

        groups = AddonGroup.objects.all()
        assert groups.count() == 0

    def test_it_can_add_addons_to_group(self, api_client):
        group = AddonGroupFactory()
        a1 = AddonFactory()

        res = api_client.post('/api/v1/addon_group/%s/add_addons/' % group.id, {
            'addon_ids': [a1.pk]
        })

        assert res.status_code == 204
        assert group.addons.count() == 1

        a2 = AddonFactory()
        a3 = AddonFactory()

        res = api_client.post('/api/v1/addon_group/%s/add_addons/' % group.id, {
            'addon_ids': [a2.pk, a3.pk]
        })

        assert res.status_code == 204
        assert group.addons.count() == 3

    def test_adding_an_addon_that_doesnt_exist(self, api_client):
        group = AddonGroupFactory()

        res = api_client.post('/api/v1/addon_group/%s/add_addons/' % group.id, {
            'addon_ids': [1]
        })

        assert res.status_code == 400
        assert group.addons.count() == 0

    def test_it_can_remove_addons_from_group(self, api_client):
        group = AddonGroupFactory()
        group.addons.add(AddonFactory())
        group.addons.add(AddonFactory())
        group.addons.add(AddonFactory())

        res = api_client.post('/api/v1/addon_group/%s/remove_addons/' % group.id, {
            'addon_ids': [group.addons.first().pk]
        })

        assert res.status_code == 204
        assert group.addons.count() == 2

        res = api_client.post('/api/v1/addon_group/%s/remove_addons/' % group.id, {
            'addon_ids': [group.addons.first().pk, group.addons.last().pk]
        })

        assert res.status_code == 204
        assert group.addons.count() == 0

    def test_removing_an_addon_that_doesnt_exist(self, api_client):
        group = AddonGroupFactory()
        addon = AddonFactory()
        group.addons.add(addon)

        res = api_client.post('/api/v1/addon_group/%s/add_addons/' % group.id, {
            'addon_ids': [addon.id + 1]
        })

        assert res.status_code == 400
        assert group.addons.count() == 1

    def test_update_built_in_addons_no_browser_version(self, api_client):
        addon = AddonFactory()

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'addons': [addon.id]
        })

        assert res.status_code == 400

    def test_update_built_in_addons_invalid_addons(self, api_client):
        group = AddonGroupFactory()
        addon = AddonFactory()
        group.built_in_addons.add(addon)

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'browser_version': group.browser_version,
        })

        assert res.status_code == 400
        assert group.built_in_addons.count() == 1

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'browser_version': group.browser_version,
            'addons': addon.id
        })

        assert res.status_code == 400
        assert group.built_in_addons.count() == 1

    def test_update_built_in_addons_existing_addon(self, api_client):
        group = AddonGroupFactory()
        addon = AddonFactory()

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'browser_version': group.browser_version,
            'addons': [
                {
                    'name': addon.name,
                    'version': addon.version,
                }
            ]
        })

        assert res.status_code == 204
        assert group.built_in_addons.count() == 1
        assert Addon.objects.count() == 1

    def test_update_built_in_addons_new_addon(self, api_client):
        group = AddonGroupFactory()

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'browser_version': group.browser_version,
            'addons': [
                {
                    'name': 'something@mozilla.org',
                    'version': '1.2',
                }
            ]
        })

        assert res.status_code == 204
        assert group.built_in_addons.count() == 1
        assert Addon.objects.count() == 1

    def test_update_built_in_addons_new_group(self, api_client):
        addon = AddonFactory()

        res = api_client.post('/api/v1/addon_group/update_built_in/', {
            'browser_version': '1.0.0',
            'addons': [
                {
                    'name': addon.name,
                    'version': addon.version,
                }
            ]
        })

        assert res.status_code == 204
        assert AddonGroup.objects.count() == 1

    def test_sync(self, api_client):
        group = AddonGroupFactory()
        addon = AddonFactory()
        group.addons.add(addon)

        res = api_client.post('/api/v1/addon_group/sync/')

        assert res.status_code == 200

        # this API should not modify existing groups in Morgoth
        assert AddonGroup.objects.count() == 1
        assert group.addons.count() == 1

        # FIXME mock BalrogAPI instead of depending on this result
        release, rule = res.data

        # the blob is an embedded JSON string, so this is not automatically
        # converted into an object.
        import json
        blob = json.loads(release['data']['blob'])

        assert release['data']['name'] == group.name
        assert rule['data']['mapping'] == group.name
        assert list(blob['addons'].keys())[0] == group.addons.get(pk=1).name
