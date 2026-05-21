from django.contrib import admin

from django.urls import (

    path,

    include,

    re_path
)

from django.conf import settings

from django.conf.urls.static import (
    static
)

from rest_framework import permissions

from drf_yasg.views import (
    get_schema_view
)

from drf_yasg import openapi

from .views import home

# =========================================
# ADMIN PANEL CUSTOMIZATION
# =========================================

admin.site.site_header = (
    "AI Loan Risk Admin"
)

admin.site.site_title = (
    "Loan Risk Platform"
)

admin.site.index_title = (
    "AI Credit Risk Dashboard"
)

# =========================================
# SWAGGER CONFIGURATION
# =========================================

schema_view = get_schema_view(

    openapi.Info(

        title=
            "Loan Risk Assessment API",

        default_version='v1',

        description=(

            "AI-Powered Loan Credit "

            "Risk Assessment Platform "
            
            "using Machine Learning, "
            
            "Explainable AI, JWT "
            
            "Authentication, Portfolio "
            
            "Analytics, and Audit Logging."
        ),

        terms_of_service=
            "https://www.google.com/policies/terms/",

        contact=openapi.Contact(

            email=
                "support@loanrisk.ai"
        ),

        license=openapi.License(

            name="MIT License"
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

    # =========================================
    # HOME
    # =========================================

    path(
        '',
        home,
        name="home"
    ),

    # =========================================
    # ADMIN PANEL
    # =========================================

    path(
        'admin/',
        admin.site.urls
    ),

    # =========================================
    # API ROUTES
    # =========================================

    path(
        'api/',
        include('applications.urls')
    ),

    # =========================================
    # SWAGGER JSON/YAML
    # =========================================

    re_path(

        r'^swagger(?P<format>\.json|\.yaml)$',

        schema_view.without_ui(
            cache_timeout=0
        ),

        name='schema-json'
    ),

    # =========================================
    # SWAGGER UI
    # =========================================

    path(

        'swagger/',

        schema_view.with_ui(

            'swagger',

            cache_timeout=0
        ),

        name='schema-swagger-ui'
    ),

    # =========================================
    # REDOC UI
    # =========================================

    path(

        'redoc/',

        schema_view.with_ui(

            'redoc',

            cache_timeout=0
        ),

        name='schema-redoc'
    ),
]

# =========================================
# MEDIA FILES
# =========================================

if settings.DEBUG:

    urlpatterns += static(

        settings.MEDIA_URL,

        document_root=settings.MEDIA_ROOT
    )

    urlpatterns += static(

        settings.STATIC_URL,

        document_root=settings.STATIC_ROOT
    )