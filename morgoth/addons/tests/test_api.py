import pytest

from morgoth.addons.models import Addon
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
            'version': 1.1,
            'ftp_url': 'ftp://something.com/'
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

        addon = Addon.objects.all()[0]
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

        assert res.data[0]['channel_name'] == group.channel_name
