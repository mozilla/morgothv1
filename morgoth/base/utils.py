import requests

from datetime import datetime

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

        expiry = self.csrf_token.split('##')[0]
        if datetime.strftime(expiry, '%Y%m%d%H%M%S') <= datetime.now():
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

    def request(self, url, prerequest_url=None, url_vars=None, data=None, method='GET'):
        url = url % url_vars

        data['csrf_token'] = self.csrf_token

        if prerequest_url is not None:
            prerequest_url = prerequest_url % url_vars
        else:
            prerequest_url = url

        # If we're modifying things, do a GET first to get a CSRF token and maybe a data_version.
        if method not in ('GET', 'HEAD'):
            # Use the URL of the resource we're going to modify first, because we'll need a CSRF
            # token, and maybe it's data version.
            try:
                res = self._make_request(prerequest_url, None, 'HEAD')
                self.csrf_token = res.headers['X-CSRF-Token']
            except requests.HTTPError as error:
                # However, if the resource doesn't exist yet we may as well not bother doing
                # another request solely for a token unless we don't have a valid one already.
                if error.response.status_code != 404:
                    raise
                if self._is_csrf_token_expired():
                    res = self._make_request('csrf_token', None, 'HEAD')
                    self.csrf_token = res.headers['X-CSRF-Token']

        return self._make_request(url, data, method)
