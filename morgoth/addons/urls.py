from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from morgoth.addons.api.views import (
    AddonViewSet,
    AddonGroupViewSet,
)

# API Router
router = DefaultRouter()
router.register(r'addon', AddonViewSet, base_name='addon')
router.register(r'addon_group', AddonGroupViewSet)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
]
