from django.shortcuts import render

from morgoth.base.decorators import require_ldap_auth


@require_ldap_auth
def index(request):
    return render(request, 'base/index.html')


def logout(request):
    return render(request, 'base/logout.html', status=401)
