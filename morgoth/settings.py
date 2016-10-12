import os

from configurations import Configuration, values


class Core(Configuration):
    """Settings that don't change on a per-environment basis."""

    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    INSTALLED_APPS = [
        'morgoth.base.apps.BaseConfig',
        'morgoth.addons.apps.AddonsConfig',
        'morgoth.health.apps.HealthConfig',

        'product_details',
        'rest_framework',
        'rest_framework.authtoken',
        'webpack_loader',

        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'whitenoise.runserver_nostatic',
        'django.contrib.staticfiles',
    ]

    MIDDLEWARE_CLASSES = [
        'morgoth.base.middleware.ShortCircuitMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'whitenoise.middleware.WhiteNoiseMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'morgoth.base.middleware.LDAPAuthenticationMiddleware',
    ]

    AUTHENTICATION_BACKENDS = [
        'morgoth.base.backends.LDAPBackend',
        'django.contrib.auth.backends.ModelBackend',
    ]

    ROOT_URLCONF = 'morgoth.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'morgoth.wsgi.application'

    # Internationalization
    # https://docs.djangoproject.com/en/1.9/topics/i18n/
    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = False
    USE_L10N = False
    USE_TZ = True

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.TokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
        ),
        'TEST_REQUEST_DEFAULT_FORMAT': 'json',
    }

    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
    }


class Base(Core):
    """Settings that may change on a per-environment basis, some with defaults."""

    # General settings
    DEBUG = values.BooleanValue(False)

    # Database settings
    DATABASES = values.DatabaseURLValue('postgres://postgres@localhost/morgoth')

    # Security settings
    SECRET_KEY = values.SecretValue()
    ALLOWED_HOSTS = values.ListValue([])
    AUTH_PASSWORD_VALIDATORS = [
        {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
        {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
        {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
        {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
    ]
    PASSWORD_HASHERS = values.ListValue([
        'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
        'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    ])
    USE_X_FORWARDED_HOST = values.BooleanValue(False)
    SECURE_PROXY_SSL_HEADER = values.TupleValue()
    SECURE_HSTS_SECONDS = values.IntegerValue(3600)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = values.BooleanValue(True)
    CSRF_COOKIE_HTTPONLY = values.BooleanValue(True)
    CSRF_COOKIE_SECURE = values.BooleanValue(True)
    SECURE_SSL_REDIRECT = values.BooleanValue(True)
    SECURE_REDIRECT_EXEMPT = values.ListValue([])
    SESSION_COOKIE_SECURE = values.BooleanValue(True)
    SECURE_BROWSER_XSS_FILTER = values.BooleanValue(True)
    SECURE_CONTENT_TYPE_NOSNIFF = values.BooleanValue(True)
    X_FRAME_OPTIONS = values.Value('DENY')

    # Media and static settings
    STATIC_URL = '/static/'
    STATIC_ROOT = values.Value(os.path.join(Core.BASE_DIR, 'static'))
    MEDIA_URL = values.Value('/media/')
    MEDIA_ROOT = values.Value(os.path.join(Core.BASE_DIR, 'media'))

    STATICFILES_DIRS = (
        os.path.join(Core.BASE_DIR, 'assets'),
    )

    STATICFILES_STORAGE = values.Value('whitenoise.django.GzipManifestStaticFilesStorage')

    ADMIN_ENABLED = values.BooleanValue(True)
    BASIC_AUTH_ENABLED = values.BooleanValue(False)

    # statsd
    STATSD_HOST = values.Value('localhost')
    STATSD_PORT = values.IntegerValue(8125)
    STATSD_IPV6 = values.BooleanValue(False)
    STATSD_PREFIX = values.Value('morgoth')
    STATSD_MAXUDPSIZE = values.IntegerValue(512)

    # Balrog
    BALROG_API_BASE_URL = values.Value('https://aus4-admin-dev.allizom.org/api/')
    BALROG_API_REQUEST_TIMEOUT = values.IntegerValue(60)


class Development(Base):
    """Settings for local development."""

    DOTENV_EXISTS = os.path.exists(os.path.join(Core.BASE_DIR, '.env'))
    DOTENV = '.env' if DOTENV_EXISTS else None

    DEBUG = values.BooleanValue(True)
    SECRET_KEY = values.Value('not a secret')

    INSTALLED_APPS = Base.INSTALLED_APPS + ['sslserver']
    MIDDLEWARE_CLASSES = Base.MIDDLEWARE_CLASSES + ['morgoth.base.middleware.SleepMiddleware']

    AUTH_PASSWORD_VALIDATORS = values.ListValue([])
    SECURE_SSL_REDIRECT = values.Value(False)
    SLEEP_SECONDS = values.IntegerValue(0)
    BASIC_AUTH_ENABLED = values.BooleanValue(True)


class Production(Base):
    """Settings for the production environment."""
    USE_X_FORWARDED_HOST = values.BooleanValue(True)
    SECURE_PROXY_SSL_HEADER = values.TupleValue(('HTTP_X_FORWARDED_PROTO', 'https'))


class Build(Production):
    """Settings for building the Docker image for production."""
    SECRET_KEY = values.Value('not a secret')


class Test(Base):
    """Settings for test environment."""
    DOTENV_EXISTS = os.path.exists(os.path.join(Core.BASE_DIR, '.env'))
    DOTENV = '.env' if DOTENV_EXISTS else None
    SECRET_KEY = values.Value('not a secret')
    SECURE_SSL_REDIRECT = values.BooleanValue(False)
