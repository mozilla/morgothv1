import os

from configurations import Configuration, values


class Core(Configuration):
    """Settings that don't change on a per-environment basis."""

    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',

        'morgoth.base',
    ]

    MIDDLEWARE_CLASSES = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
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

    # Media and static settings
    STATIC_URL = '/static/'
    STATIC_ROOT = values.Value(os.path.join(Core.BASE_DIR, 'static'))
    MEDIA_URL = values.Value('/media/')
    MEDIA_ROOT = values.Value(os.path.join(Core.BASE_DIR, 'media'))

    ADMIN_ENABLED = values.BooleanValue(True)


class Development(Base):
    """Settings for local development."""

    DOTENV_EXISTS = os.path.exists(os.path.join(Core.BASE_DIR, '.env'))
    DOTENV = '.env' if DOTENV_EXISTS else None

    DEBUG = values.BooleanValue(True)
    SECRET_KEY = values.Value('not a secret')


class Production(Base):
    """Settings for the production environment."""
    pass


class Test(Base):
    """Settings for test environment."""
    DOTENV_EXISTS = os.path.exists(os.path.join(Core.BASE_DIR, '.env'))
    DOTENV = '.env' if DOTENV_EXISTS else None
    SECRET_KEY = values.Value('not a secret')
