from time import sleep

from django.conf import settings


class SleepMiddleware(object):
    def process_request(self, request):
        if settings.DEBUG:
            sleep(getattr(settings, 'SLEEP_SECONDS', 0))
