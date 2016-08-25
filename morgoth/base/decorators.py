from functools import wraps

from django.conf import settings
from django.shortcuts import render


def short_circuit_middlewares(view_func):
    """
    Marks a view function as wanting to short circuit middlewares.
    """
    # Based on Django's csrf_exempt

    # We could just do view_func.short_circuit_middlewares = True, but
    # decorators are nicer if they don't have side-effects, so we return
    # a new function.
    def wrapped_view(*args, **kwargs):
        return view_func(*args, **kwargs)
    wrapped_view.short_circuit_middlewares = True
    return wraps(view_func)(wrapped_view)


def require_ldap_auth(view_func):
    """Marks a view as requiring auth using LDAP."""
    def wrapped_view(request, *args, **kwargs):
        if request.ldap:
            return view_func(request, *args, **kwargs)

        response = render(request, 'base/401.html', status=401)

        if settings.BASIC_AUTH_ENABLED:
            response['WWW-Authenticate'] = 'Basic realm="Morgoth"'

        return response
    return wraps(view_func)(wrapped_view)
