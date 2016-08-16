import pytest


class TestApp(object):
    def test_pass(self):
        """A test that always passes to ensure tests are working."""
        assert True

    @pytest.mark.django_db
    def test_routing(self, client):
        """Make sure the catch-all works as intended."""
        res = client.get('/')
        assert res.status_code == 200

        res = client.get('/addons/')
        assert res.status_code == 200
