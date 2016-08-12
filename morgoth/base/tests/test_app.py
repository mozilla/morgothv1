import pytest


class TestApp(object):
    def test_pass(self):
        """A test that always passes to ensure tests are working."""
        assert True

    @pytest.mark.django_db()
    def test_catchall_url(self, client):
        res = client.get('/')
        assert res.status_code == 200

        res = client.get('/__lbheartbeat__/')
        assert res.status_code == 404

        res = client.get('/__heartbeat__/')
        assert res.status_code == 404

        res = client.get('/__version__/')
        assert res.status_code == 404
