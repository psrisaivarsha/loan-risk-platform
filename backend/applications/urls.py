from django.urls import path

from .views import (

    RegisterView,

    LoginView,

    LoanApplicationCreateView,

    UserLoanStatusView,

    BiasMonitoringView,

    AuditLogListView,

    LoanApplicationDetailView,

    UpdateLoanStatusView,

    LoanReportPDFView,

    PortfolioAnalyticsView,

    PerformanceAnalyticsView,

    AdminLoanApplicationsView,

    MonthlyTrendAnalyticsView,

    MLModelMetricsView
)

urlpatterns = [

    # =========================================
    # AUTH
    # =========================================

    path(

        'register/',

        RegisterView.as_view()
    ),

    path(

        'login/',

        LoginView.as_view()
    ),

    # =========================================
    # LOAN APPLICATIONS
    # =========================================

    path(

        'loan-applications/',

        LoanApplicationCreateView.as_view()
    ),

    # =========================================
    # PORTFOLIO ANALYTICS
    # =========================================

    path(

        'portfolio-analytics/',

        PortfolioAnalyticsView.as_view()
    ),

    # =========================================
    # PERFORMANCE ANALYTICS
    # =========================================

    path(

        'performance-analytics/',

        PerformanceAnalyticsView.as_view()
    ),

    # =========================================
    # MONTHLY TRENDS
    # =========================================

    path(

        'monthly-trends/',

        MonthlyTrendAnalyticsView.as_view()
    ),

    # =========================================
    # ML METRICS
    # =========================================

    path(

        'ml-metrics/',

        MLModelMetricsView.as_view()
    ),

    # =========================================
    # BIAS MONITORING
    # =========================================

    path(

        'bias-monitoring/',

        BiasMonitoringView.as_view()
    ),
# USER APPLICATIONS

path(

    'my-loans/',

    UserLoanStatusView.as_view()
),

# AUDIT LOGS

path(

    'audit-logs/',

    AuditLogListView.as_view()
),

# APPLICATION DETAIL

path(

    'loan-applications/<int:pk>/',

    LoanApplicationDetailView.as_view()
),

# UPDATE STATUS

path(

    'update-loan-status/<int:pk>/',

    UpdateLoanStatusView.as_view()
),

# PDF REPORT

path(

    'applications/<int:pk>/pdf/',

    LoanReportPDFView.as_view()
),

# ADMIN LOANS

path(

    'admin-loans/',

    AdminLoanApplicationsView.as_view()
),
]