import base64
import pytest


AUTH_HEADERS = {
    'HTTP_AUTHORIZATION': 'Basic {}'.format(base64.b64encode(b'user@test.com:testpass').decode()),
}


class TestApp(object):
    def test_pass(self):
        """A test that always passes to ensure tests are working."""
        assert True

    @pytest.mark.django_db
    def test_routing(self, client):
        """Make sure the catch-all works as intended."""
        res = client.get('/', **AUTH_HEADERS)
        assert res.status_code == 200

        res = client.get('/addons/', **AUTH_HEADERS)
        assert res.status_code == 200
