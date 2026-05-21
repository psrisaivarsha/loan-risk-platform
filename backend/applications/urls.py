from django.urls import path

from .views import (

    RegisterView,
    LoginView,

    LoanApplicationCreateView,
    UserLoanStatusView,
    LoanApplicationDetailView,
    UpdateLoanStatusView,

    PortfolioAnalyticsView,
    PerformanceAnalyticsView,
    MonthlyTrendAnalyticsView,
    MLModelMetricsView,
    BiasMonitoringView,

    AuditLogListView,
    LoanReportPDFView,

    AdminLoanApplicationsView
)

urlpatterns = [

    # =========================================
    # AUTHENTICATION
    # =========================================

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),

    # =========================================
    # LOAN APPLICATIONS
    # =========================================

    path(
        "loan-applications/",
        LoanApplicationCreateView.as_view(),
        name="loan-applications"
    ),

    path(
        "loan-applications/<int:pk>/",
        LoanApplicationDetailView.as_view(),
        name="loan-application-detail"
    ),

    path(
        "update-loan-status/<int:pk>/",
        UpdateLoanStatusView.as_view(),
        name="update-loan-status"
    ),

    path(
        "my-loans/",
        UserLoanStatusView.as_view(),
        name="my-loans"
    ),

    # =========================================
    # ADMIN APPLICATION QUEUE
    # =========================================

    path(
        "admin-loans/",
        AdminLoanApplicationsView.as_view(),
        name="admin-loans"
    ),

    # =========================================
    # PORTFOLIO ANALYTICS
    # =========================================

    path(
        "portfolio-analytics/",
        PortfolioAnalyticsView.as_view(),
        name="portfolio-analytics"
    ),

    # =========================================
    # PERFORMANCE ANALYTICS
    # =========================================

    path(
        "performance-analytics/",
        PerformanceAnalyticsView.as_view(),
        name="performance-analytics"
    ),

    # =========================================
    # MONTHLY TREND ANALYTICS
    # =========================================

    path(
        "monthly-trends/",
        MonthlyTrendAnalyticsView.as_view(),
        name="monthly-trends"
    ),

    # =========================================
    # ML MODEL METRICS
    # =========================================

    path(
        "ml-metrics/",
        MLModelMetricsView.as_view(),
        name="ml-metrics"
    ),

    # =========================================
    # BIAS MONITORING
    # =========================================

    path(
        "bias-monitoring/",
        BiasMonitoringView.as_view(),
        name="bias-monitoring"
    ),

    # =========================================
    # AUDIT LOGS
    # =========================================

    path(
        "audit-logs/",
        AuditLogListView.as_view(),
        name="audit-logs"
    ),

    # =========================================
    # PDF REPORTS
    # =========================================

    path(
        "applications/<int:pk>/pdf/",
        LoanReportPDFView.as_view(),
        name="loan-pdf-report"
    ),
]