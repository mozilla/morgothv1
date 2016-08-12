from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = []

if settings.ADMIN_ENABLED:
    urlpatterns += [url(r'^admin/', admin.site.urls)]

urlpatterns += [
    url(r'', include('morgoth.addons.urls')),
    url(r'', include('morgoth.health.urls')),

    # This should always go last
    url(r'', include('morgoth.base.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
