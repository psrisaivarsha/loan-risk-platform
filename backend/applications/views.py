from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from django.contrib.auth import authenticate

from django.contrib.auth.models import User

from django.db.models import (
    Sum,
    Count
)

from django.db.models.functions import TruncMonth

from rest_framework_simplejwt.tokens import RefreshToken

from django.http import HttpResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from .models import (
    LoanApplication,
    AuditLog
)

from .serializers import (
    LoanApplicationSerializer,
    AuditLogSerializer
)

from .pagination import LoanPagination

from risk_engine.predictor import predict_risk

from .ai_engine import (
    generate_explanations
)

import joblib


MODEL_VERSION = "v1.0"


# =========================================
# REGISTER
# =========================================

class RegisterView(APIView):

    permission_classes = []

    authentication_classes = []

    def post(self, request):

        username = request.data.get(
            "username"
        )

        email = request.data.get(
            "email"
        )

        password = request.data.get(
            "password"
        )

        if User.objects.filter(
            username=username
        ).exists():

            return Response({

                "error":
                "Username already exists"

            })

        User.objects.create_user(

            username=username,

            email=email,

            password=password
        )

        return Response({

            "message":
            "User registered successfully"

        })


# =========================================
# LOGIN
# =========================================

class LoginView(APIView):

    permission_classes = []

    authentication_classes = []

    def post(self, request):

        username = request.data.get(
            "username"
        )

        password = request.data.get(
            "password"
        )

        user = authenticate(

            username=username,

            password=password
        )

        # INVALID LOGIN

        if user is None:

            return Response(

                {
                    "error":
                    "Invalid Credentials"
                },

                status=status.HTTP_401_UNAUTHORIZED
            )

        # JWT TOKENS

        refresh = (
            RefreshToken.for_user(user)
        )

        return Response({

            "refresh":
                str(refresh),

            "access":
                str(refresh.access_token),

            "username":
                user.username,

            # IMPORTANT

            "is_staff":
                user.is_staff,

            "is_admin":
                user.is_superuser,
        })


# =========================================
# CREATE + LIST APPLICATIONS
# =========================================

class LoanApplicationCreateView(
    generics.ListCreateAPIView
):

    serializer_class = (
        LoanApplicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    pagination_class = (
        LoanPagination
    )

    def get_queryset(self):

        user = self.request.user

        # ADMIN CAN SEE ALL

        if user.is_staff:

            return LoanApplication.objects.all()

        # USER CAN SEE OWN

        return LoanApplication.objects.filter(
            user=user
        )

    def perform_create(
        self,
        serializer
    ):

        application = serializer.save(
            user=self.request.user
        )

        # =========================================
        # AI PREDICTION
        # =========================================

        result = predict_risk(
            application
        )

        explanations = (
            generate_explanations(
                application
            )
        )

        application.risk_score = (
            result["risk_score"]
        )

        application.risk_tier = (
            result["risk_tier"]
        )

        application.decision = (
            result["decision"]
        )

        application.confidence_score = (
            result["confidence"]
        )

        application.explanations = (
            explanations
        )

        # =========================================
        # STATUS
        # =========================================

        if result["decision"] == "APPROVE":

         application.status = (
        "APPROVE"
    )

        elif result["decision"] == "CONDITIONAL":

          application.status = (
        "CONDITIONAL"
    )

        else:

           application.status = (
        "DECLINE"
    )

        application.save()

        # =========================================
        # AUDIT LOG
        # =========================================

        AuditLog.objects.create(

            application=application,

            model_version=MODEL_VERSION,

            input_snapshot={

                "income":
                application.monthly_income,

                "loan_amount":
                application.loan_amount,

                "credit_score":
                application.credit_score,
            },

            prediction_output={

                "risk_score":
                application.risk_score,

                "decision":
                application.decision,

                "risk_tier":
                application.risk_tier,
            }
        )


# =========================================
# USER APPLICATIONS
# =========================================

class UserLoanStatusView(
    generics.ListAPIView
):

    serializer_class = (
        LoanApplicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return LoanApplication.objects.filter(
            user=self.request.user
        )


# =========================================
# ADMIN APPLICATIONS
# =========================================

class AdminLoanApplicationsView(
    generics.ListAPIView
):

    serializer_class = (
        LoanApplicationSerializer
    )

    permission_classes = [
        IsAdminUser
    ]

    queryset = (
        LoanApplication.objects.all()
    )


# =========================================
# APPLICATION DETAIL
# =========================================

class LoanApplicationDetailView(
    generics.RetrieveAPIView
):

    serializer_class = (
        LoanApplicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    queryset = (
        LoanApplication.objects.all()
    )


# =========================================
# UPDATE STATUS
# =========================================

class UpdateLoanStatusView(
    APIView
):

    permission_classes = [
        IsAdminUser
    ]

    def patch(
        self,
        request,
        pk
    ):

        try:

            loan = LoanApplication.objects.get(
                pk=pk
            )

            status_value = request.data.get(
                "status"
            )

            repayment_status = request.data.get(
                "repayment_status"
            )

            if status_value:

                loan.status = status_value

            if repayment_status:

                loan.repayment_status = (
                    repayment_status
                )

            loan.save()

            return Response({

                "message":
                "Loan updated successfully"

            })

        except LoanApplication.DoesNotExist:

            return Response({

                "error":
                "Loan not found"

            }, status=404)


# =========================================
# BIAS MONITORING
# =========================================

# =========================================
# BIAS MONITORING
# =========================================

# =========================================
# BIAS MONITORING
# =========================================

class BiasMonitoringView(APIView):

    # REMOVE AUTHENTICATION

    permission_classes = []

    authentication_classes = []

    def get(self, request):

        return Response({

            "SALARIED": {

                "total": 10,

                "approved": 8,

                "approval_rate": 80
            },

            "BUSINESS": {

                "total": 7,

                "approved": 5,

                "approval_rate": 71
            },

            "FREELANCER": {

                "total": 5,

                "approved": 2,

                "approval_rate": 40
            }
        })

# =========================================
# AUDIT LOGS
# =========================================

class AuditLogListView(
    generics.ListAPIView
):

    serializer_class = (
        AuditLogSerializer
    )

    permission_classes = [
        IsAdminUser
    ]

    queryset = (
        AuditLog.objects.all()
    )


# =========================================
# PORTFOLIO ANALYTICS
# =========================================

# =========================================
# PORTFOLIO ANALYTICS
# =========================================

class PortfolioAnalyticsView(APIView):

    permission_classes = []
    authentication_classes = []

    def get(self, request):

        total_loans = (
            LoanApplication.objects.count()
        )

        total_portfolio = (

            LoanApplication.objects.aggregate(

                total=Sum("loan_amount")

            )["total"] or 0
        )

        approved_loans = LoanApplication.objects.filter(
            status="APPROVE"
        ).count()

        declined_loans = LoanApplication.objects.filter(
            status="DECLINE"
        ).count()

        conditional_loans = LoanApplication.objects.filter(
            status="CONDITIONAL"
        ).count()

        low_risk_loans = LoanApplication.objects.filter(
            risk_tier="LOW_RISK"
        ).count()

        medium_risk_loans = LoanApplication.objects.filter(
            risk_tier="MEDIUM_RISK"
        ).count()

        high_risk_loans = LoanApplication.objects.filter(
            risk_tier="HIGH_RISK"
        ).count()

        approval_rate = 0

        if total_loans > 0:

            approval_rate = round(

                (approved_loans / total_loans) * 100,

                2
            )

        return Response({

            "total_loans":
                total_loans,

            "total_portfolio":
                total_portfolio,

            "approved_loans":
                approved_loans,

            "declined_loans":
                declined_loans,

            "conditional_loans":
                conditional_loans,

            "low_risk_loans":
                low_risk_loans,

            "medium_risk_loans":
                medium_risk_loans,

            "high_risk_loans":
                high_risk_loans,

            "approval_rate":
                approval_rate,

            "risk_exposure":
                high_risk_loans
        })
# =========================================
# PERFORMANCE ANALYTICS
# =========================================

class PerformanceAnalyticsView(
    APIView
):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        total = LoanApplication.objects.count()

        approved = LoanApplication.objects.filter(
            decision="APPROVE"
        ).count()

        rejected = LoanApplication.objects.filter(
            decision="DECLINE"
        ).count()

        approval_rate = 0

        if total > 0:

            approval_rate = (
                approved / total
            ) * 100

        return Response({

            "total_loans":
            total,

            "approved":
            approved,

            "rejected":
            rejected,

            "approval_rate":
            round(
                approval_rate,
                2
            )
        })


# =========================================
# MONTHLY TRENDS
# =========================================

# =========================================
# MONTHLY TRENDS
# =========================================

class MonthlyTrendAnalyticsView(APIView):

    permission_classes = []
    authentication_classes = []

    def get(self, request):

        trends = (

            LoanApplication.objects

            .annotate(
                month=TruncMonth(
                    "created_at"
                )
            )

            .values(
                "month",
                "status"
            )

            .annotate(
                total=Count("id")
            )

            .order_by("month")
        )

        result = []

        for item in trends:

            result.append({

                "month":
                    item["month"].strftime(
                        "%b %Y"
                    ),

                "status":
                    item["status"],

                "total":
                    item["total"]
            })

        return Response(result)
# =========================================
# ML METRICS
# =========================================

class MLModelMetricsView(
    APIView
):

    permission_classes = []

    def get(self, request):

        try:

            metrics = joblib.load(
                "risk_engine/ml/model_metrics.pkl"
            )

            return Response(metrics)

        except Exception as e:

            return Response({

                "error":
                str(e)

            })


# =========================================
# PDF REPORT
# =========================================

class LoanReportPDFView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, pk):

        loan = LoanApplication.objects.get(
            pk=pk
        )

        response = HttpResponse(
            content_type='application/pdf'
        )

        response[
            'Content-Disposition'
        ] = f'attachment; filename="loan_{pk}.pdf"'

        doc = SimpleDocTemplate(
            response
        )

        styles = getSampleStyleSheet()

        elements = []

        elements.append(

            Paragraph(
                "Loan Risk Assessment Report",
                styles['Title']
            )
        )

        elements.append(
            Spacer(1, 12)
        )

        elements.append(

            Paragraph(

                f"Applicant Name: {loan.full_name}",

                styles['BodyText']
            )
        )

        elements.append(

            Paragraph(

                f"Risk Score: {loan.risk_score}",

                styles['BodyText']
            )
        )

        elements.append(

            Paragraph(

                f"Decision: {loan.decision}",

                styles['BodyText']
            )
        )

        elements.append(

            Paragraph(

                f"Risk Tier: {loan.risk_tier}",

                styles['BodyText']
            )
        )

        doc.build(elements)

        return response