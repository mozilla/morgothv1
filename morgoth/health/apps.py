from django.apps import AppConfig

from morgoth.health import checks


class HealthConfig(AppConfig):
    name = 'morgoth.health'
    label = 'health'
    verbose_name = 'Morgoth Health'

    def ready(self):
        checks.register()
