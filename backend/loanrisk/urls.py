from django.contrib import admin

from django.urls import (
    path,
    include,
    re_path
)

from rest_framework import permissions

from drf_yasg.views import (
    get_schema_view
)

from drf_yasg import openapi

# =========================================
# SWAGGER CONFIG
# =========================================

schema_view = get_schema_view(

    openapi.Info(

        title=
            "Loan Risk Assessment API",

        default_version='v1',

        description=(

            "AI-Powered Loan Credit "

            "Risk Assessment Platform"
        ),

        contact=openapi.Contact(

            email=
            "support@loanrisk.ai"
        ),
    ),

    public=True,

    permission_classes=(
        permissions.AllowAny,
    ),
)

# =========================================
# URL PATTERNS
# =========================================

urlpatterns = [

    # ADMIN

    path(
        'admin/',
        admin.site.urls
    ),

    # API

    path(
        'api/',
        include('applications.urls')
    ),

    # SWAGGER UI

    re_path(

        r'^swagger(?P<format>\.json|\.yaml)$',

        schema_view.without_ui(
            cache_timeout=0
        ),

        name='schema-json'
    ),

    path(

        'swagger/',

        schema_view.with_ui(

            'swagger',

            cache_timeout=0
        ),

        name='schema-swagger-ui'
    ),

    # REDOC

    path(

        'redoc/',

        schema_view.with_ui(

            'redoc',

            cache_timeout=0
        ),

        name='schema-redoc'
    ),
]