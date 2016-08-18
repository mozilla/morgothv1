from base64 import b64encode

import pytest

from django.contrib.auth.models import AnonymousUser, User
from django.contrib.sessions.middleware import SessionMiddleware
from morgoth.base.tests import UserFactory
from morgoth.base.middleware import LDAPAuthenticationMiddleware


def setup_request(request):
    session_mw = SessionMiddleware()
    session_mw.process_request(request)
    request.user = AnonymousUser()


@pytest.mark.django_db
class TestLDAPAuthenticationMiddleware():
    def test_no_auth_header(self, request_factory):
        mw = LDAPAuthenticationMiddleware()
        request = request_factory.get('/')
        mw.process_request(request=request)
        assert request.ldap is None

    def test_existing_user(self, request_factory):
        auth_header = 'basic {}'.format(b64encode(b'test@mozilla.com:testpass').decode())
        request = request_factory.get('/', AUTHORIZATION=auth_header)
        setup_request(request)

        u = UserFactory(username='test@mozilla.com')
        mw = LDAPAuthenticationMiddleware()
        mw.process_request(request=request)

        assert request.ldap == ('test@mozilla.com', 'testpass')
        assert request.user == u

    def test_create_user(self, request_factory):
        auth_header = 'basic {}'.format(b64encode(b'newuser@mozilla.com:testpass').decode())
        request = request_factory.get('/', AUTHORIZATION=auth_header)
        setup_request(request)

        assert User.objects.count() == 0

        mw = LDAPAuthenticationMiddleware()
        mw.process_request(request=request)

        assert User.objects.filter(username='newuser@mozilla.com').exists()
        assert request.ldap == ('newuser@mozilla.com', 'testpass')
        assert request.user.username == 'newuser@mozilla.com'
