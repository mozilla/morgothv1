from base64 import b64decode
from time import sleep

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.core.urlresolvers import Resolver404, resolve


class LDAPAuthenticationMiddleware(object):
    """Middleware that handles LDAP authentication."""

    def process_request(self, request):
        request.ldap = None
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if auth_header:
            credentials = b64decode(auth_header.split()[1]).decode()
            username, password = credentials.split(':', 1)
            request.ldap = (username, password)

        if request.ldap and not request.user.is_authenticated():
            user = authenticate(ldap_username=request.ldap[0])
            if user:
                login(request, user)


class ShortCircuitMiddleware(object):
    """
    Middleware that skips remaining middleware when a view is marked with
    morgoth.base.decorators.short_circuit_middlewares
    """

    def process_request(self, request):
        try:
            result = resolve(request.path)
        except Resolver404:
            return

        if getattr(result.func, 'short_circuit_middlewares', False):
            return result.func(request, *result.args, **result.kwargs)
        else:
            return None


class SleepMiddleware(object):
    def process_request(self, request):
        sleep(getattr(settings, 'SLEEP_SECONDS', 0))
