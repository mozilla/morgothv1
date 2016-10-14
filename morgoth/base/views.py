from django.contrib.auth import logout
from django.shortcuts import render

from morgoth.base.decorators import require_ldap_auth


@require_ldap_auth
def index(request, *args, **kwargs):
    return render(request, 'base/index.html')


def log_out(request):
    logout(request)
    return render(request, 'base/logout.html', status=401)
