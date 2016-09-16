import requests
import time

from django.conf import settings


class BalrogAPI(object):
    def __init__(self, auth=None):
        """ Creates an object which wraps the Balrog REST API."""
        self.auth = auth
        self.session = requests.session()
        self.csrf_token = None

    def _is_csrf_token_expired(self):
        if not self.csrf_token:
            return True

        expiry = int(self.csrf_token.split('##')[0])
        if expiry <= time.time():
            return True

        return False

    def _make_request(self, url, data, method):
        headers = {'Accept-Encoding': 'application/json',
                   'Accept': 'application/json'}

        url = '%s%s' % (settings.BALROG_API_BASE_URL, url)

        req = self.session.request(method=method, url=url, data=data,
                                   timeout=getattr(settings, 'BALROG_API_REQUEST_TIMEOUT', 60),
                                   verify=getattr(settings, 'BALROG_API_REQUEST_VERIFY', False),
                                   auth=self.auth, headers=headers)

        req.raise_for_status()
        return req

    def request(self, url, url_vars=None, data={}, method='GET'):
        if url_vars:
            url = url % url_vars

        if method not in ('GET', 'HEAD'):
            if not self.csrf_token or self._is_csrf_token_expired():
                res = self._make_request('csrf_token', None, 'HEAD')
                self.csrf_token = res.headers['X-CSRF-Token']

            data['csrf_token'] = self.csrf_token

        return self._make_request(url, data, method)
