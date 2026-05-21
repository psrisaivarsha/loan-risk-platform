"""
Django settings for loanrisk project.
"""

from pathlib import Path

from datetime import timedelta

from decouple import config

# =========================================
# BASE DIRECTORY
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

# =========================================
# SECURITY
# =========================================

SECRET_KEY = config("SECRET_KEY")

DEBUG = config(
    "DEBUG",
    cast=bool,
    default=True
)

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default="127.0.0.1,localhost"
).split(",")

# =========================================
# INSTALLED APPS
# =========================================

INSTALLED_APPS = [

    # DJANGO APPS

    'django.contrib.admin',

    'django.contrib.auth',

    'django.contrib.contenttypes',

    'django.contrib.sessions',

    'django.contrib.messages',

    'django.contrib.staticfiles',

    # THIRD PARTY

    'rest_framework',

    'rest_framework_simplejwt',

    'rest_framework_simplejwt.token_blacklist',

    'corsheaders',

    'drf_yasg',

    # PROJECT APPS

    'applications',
]

# =========================================
# MIDDLEWARE
# =========================================

MIDDLEWARE = [

    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =========================================
# ROOT URLS
# =========================================

ROOT_URLCONF = 'loanrisk.urls'

# =========================================
# TEMPLATES
# =========================================

TEMPLATES = [

    {
        'BACKEND':
            'django.template.backends.django.DjangoTemplates',

        'DIRS': [],

        'APP_DIRS': True,

        'OPTIONS': {

            'context_processors': [

                'django.template.context_processors.request',

                'django.contrib.auth.context_processors.auth',

                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# =========================================
# WSGI
# =========================================

WSGI_APPLICATION = 'loanrisk.wsgi.application'

# =========================================
# DATABASE
# =========================================

DATABASES = {

    'default': {

        'ENGINE':
            'django.db.backends.sqlite3',

        'NAME':
            BASE_DIR / 'db.sqlite3',
    }
}

# =========================================
# PASSWORD VALIDATORS
# =========================================

AUTH_PASSWORD_VALIDATORS = [

    {
        'NAME':
            'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.MinimumLengthValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.CommonPasswordValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# =========================================
# INTERNATIONALIZATION
# =========================================

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# =========================================
# STATIC FILES
# =========================================

STATIC_URL = 'static/'

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"

# =========================================
# DEFAULT AUTO FIELD
# =========================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# =========================================
# DJANGO REST FRAMEWORK
# =========================================

REST_FRAMEWORK = {

    'DEFAULT_AUTHENTICATION_CLASSES': (

        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),

    'DEFAULT_PERMISSION_CLASSES': (

        'rest_framework.permissions.IsAuthenticated',
    ),

    'DEFAULT_PAGINATION_CLASS':

        'rest_framework.pagination.PageNumberPagination',

    'PAGE_SIZE': 10,
}

# =========================================
# JWT SETTINGS
# =========================================

SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME":
        timedelta(minutes=60),

    "REFRESH_TOKEN_LIFETIME":
        timedelta(days=1),

    "ROTATE_REFRESH_TOKENS":
        True,

    "BLACKLIST_AFTER_ROTATION":
        True,

    "UPDATE_LAST_LOGIN":
        True,
}

# =========================================
# CORS SETTINGS
# =========================================

CORS_ALLOWED_ORIGINS = [

    "http://localhost:5173",

    "http://127.0.0.1:5173",

    "http://localhost:5174",

    "http://127.0.0.1:5174",

    "http://localhost:5175",

    "http://127.0.0.1:5175",
]

CORS_ALLOWED_ORIGIN_REGEXES = [

    r"^https://.*\.vercel\.app$",
]

CORS_ALLOW_CREDENTIALS = True

# =========================================
# EMAIL CONFIGURATION
# =========================================

EMAIL_BACKEND = (
    'django.core.mail.backends.smtp.EmailBackend'
)

EMAIL_HOST = 'smtp.gmail.com'

EMAIL_PORT = 587

EMAIL_USE_TLS = True

EMAIL_HOST_USER = config(
    "EMAIL_HOST_USER",
    default=""
)

EMAIL_HOST_PASSWORD = config(
    "EMAIL_HOST_PASSWORD",
    default=""
)

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# =========================================
# SWAGGER SETTINGS
# =========================================

SWAGGER_SETTINGS = {

    'SECURITY_DEFINITIONS': {

        'Bearer': {

            'type': 'apiKey',

            'name': 'Authorization',

            'in': 'header',

            'description': (

                'JWT Authorization header '

                'using Bearer token.\n\n'

                'Example:\n'

                'Bearer <your_token>'
            )
        }
    },

    'USE_SESSION_AUTH': False,
}

# =========================================
# SECURITY SETTINGS
# =========================================

SECURE_BROWSER_XSS_FILTER = True

SECURE_CONTENT_TYPE_NOSNIFF = True

X_FRAME_OPTIONS = "DENY"

CSRF_COOKIE_SECURE = False

SESSION_COOKIE_SECURE = False