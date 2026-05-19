from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser
)
from .pagination import (
    LoanPagination
)
import joblib

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from django.db.models import (
    Avg,
    Sum,
    Count
)

from django.db.models.functions import TruncMonth

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from django.core.mail import (
    send_mail
)

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

from risk_engine.predictor import (
    predict_risk
)

from .ai_engine import (
    generate_explanations
)

# =========================================
# MODEL VERSION
# =========================================

MODEL_VERSION = "v1.0"

# =========================================
# REGISTER
# =========================================

class RegisterView(APIView):

    permission_classes = []

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

        # USER EXISTS

        if User.objects.filter(
            username=username
        ).exists():

            return Response({

                "error":
                    "Username already exists"
            })

        # CREATE USER

        user = User.objects.create_user(

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

        if user is not None:

            refresh = (
                RefreshToken.for_user(user)
            )

            return Response({

                "access":
                    str(refresh.access_token),

                "refresh":
                    str(refresh),

                "username":
                    user.username,

                "is_admin":
                    user.is_staff
            })

        return Response({

            "error":
                "Invalid credentials"
        })
# =========================================
# CREATE + LIST LOAN APPLICATIONS
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

        if user.is_staff:

            return (
                LoanApplication.objects.all()
            )

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

        # =========================================
        # EXPLANATIONS
        # =========================================

        explanations = (
            generate_explanations(
                application
            )
        )

        # =========================================
        # SAVE AI OUTPUTS
        # =========================================

        application.risk_score = (
            result['risk_score']
        )

        application.risk_tier = (
            result['risk_tier']
        )

        application.decision = (
            result['decision']
        )

        application.confidence_score = (
            result['confidence']
        )

        application.explanations = (
            explanations
        )
        
             # =========================================
        # SHAP FACTORS
        # =========================================

        application.shap_factors = (

            result.get(
                "shap_factors",
                []
            )
        )
        # =========================================
        # STATUS
        # =========================================

        if (
            result['decision']
            == "APPROVE"
        ):

            application.status = (
                "APPROVED"
            )

        elif (
            result['decision']
            == "CONDITIONAL"
        ):

            application.status = (
                "CONDITIONAL"
            )

        else:

            application.status = (
                "REJECTED"
            )

        application.save()

        # =========================================
        # EMAIL
        # =========================================

        send_mail(

            subject=
                "Loan Application Status Update",

            message=(

                f"Hello "

                f"{application.full_name},\n\n"

                f"Your loan application "

                f"has been processed.\n\n"

                f"Current Status: "

                f"{application.status}\n\n"

                f"AI Decision: "

                f"{application.decision}\n"

                f"Risk Tier: "

                f"{application.risk_tier}\n"

                f"Risk Score: "

                f"{application.risk_score}\n"

                f"Confidence Score: "

                f"{application.confidence_score}%\n\n"

                f"Top AI Factors:\n"

                + "\n".join(
                    [
                        f"- {reason}"
                        for reason in (
                            application.explanations
                        )
                    ]
                )

                +

                "\n\nThank you for using "

                "our AI Loan Platform."
            ),

            from_email=
                "psrisaivarsha@gmail.com",

            recipient_list=[
                application.email
            ],

            fail_silently=True
        )

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

                "existing_debt":
                    application.existing_debt,

                "credit_score":
                    application.credit_score,

                "employment_type":
                    application.employment_type,

                "mobile_usage_score":
                    application.mobile_usage_score,

                "utility_payment_score":
                    application.utility_payment_score
            },

            prediction_output={

                "risk_score":
                    application.risk_score,

                "risk_tier":
                    application.risk_tier,

                "decision":
                    application.decision,

                "confidence":
                    application.confidence_score,

                "explanations":
                    application.explanations
            }
        )

# =========================================
# PORTFOLIO ANALYTICS
# =========================================

class PortfolioAnalyticsView(
    APIView
):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        total_loans = (
            LoanApplication.objects.count()
        )

        approved_loans = (
            LoanApplication.objects.filter(
                decision="APPROVE"
            ).count()
        )

        declined_loans = (
            LoanApplication.objects.filter(
                decision="DECLINE"
            ).count()
        )

        conditional_loans = (
            LoanApplication.objects.filter(
                decision="CONDITIONAL"
            ).count()
        )

        high_risk_loans = (
            LoanApplication.objects.filter(
                risk_tier="HIGH_RISK"
            ).count()
        )

        medium_risk_loans = (
            LoanApplication.objects.filter(
                risk_tier="MEDIUM_RISK"
            ).count()
        )

        low_risk_loans = (
            LoanApplication.objects.filter(
                risk_tier="LOW_RISK"
            ).count()
        )

        total_portfolio = (

            LoanApplication.objects.aggregate(

                total=Sum(
                    "loan_amount"
                )

            )["total"]

            or 0
        )

        approval_rate = 0

        if total_loans > 0:

            approval_rate = round(

                (
                    approved_loans
                    / total_loans
                ) * 100,

                2
            )

        # =========================================
        # RISK EXPOSURE
        # =========================================

        if high_risk_loans > 5:

            risk_exposure = "HIGH"

        elif high_risk_loans > 2:

            risk_exposure = "MEDIUM"

        else:

            risk_exposure = "LOW"

        return Response({

            "total_loans":
                total_loans,

            "approved_loans":
                approved_loans,

            "declined_loans":
                declined_loans,

            "conditional_loans":
                conditional_loans,

            "high_risk_loans":
                high_risk_loans,

            "medium_risk_loans":
                medium_risk_loans,

            "low_risk_loans":
                low_risk_loans,

            "total_portfolio":
                total_portfolio,

            "approval_rate":
                approval_rate,

            "risk_exposure":
                risk_exposure
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

        total_loans = (
            LoanApplication.objects.count()
        )

        approved = (
            LoanApplication.objects.filter(
                decision="APPROVE"
            ).count()
        )

        declined = (
            LoanApplication.objects.filter(
                decision="DECLINE"
            ).count()
        )

        conditional = (
            LoanApplication.objects.filter(
                decision="CONDITIONAL"
            ).count()
        )

        avg_risk_score = (

            LoanApplication.objects.aggregate(

                avg=Avg(
                    "risk_score"
                )

            )["avg"]

            or 0
        )

        avg_confidence = (

            LoanApplication.objects.aggregate(

                avg=Avg(
                    "confidence_score"
                )

            )["avg"]

            or 0
        )

        approval_rate = 0

        if total_loans > 0:

            approval_rate = round(

                (
                    approved
                    / total_loans
                ) * 100,

                2
            )

        decline_rate = 0

        if total_loans > 0:

            decline_rate = round(

                (
                    declined
                    / total_loans
                ) * 100,

                2
            )

        default_rate = round(

            (
                declined
                / total_loans
            ) * 100,

            2

        ) if total_loans > 0 else 0

        return Response({

            "total_loans":
                total_loans,

            "approved":
                approved,

            "declined":
                declined,

            "conditional":
                conditional,

            "approval_rate":
                approval_rate,

            "decline_rate":
                decline_rate,

            "default_rate":
                default_rate,

            "avg_risk_score":
                round(
                    avg_risk_score,
                    2
                ),

            "avg_confidence":
                round(
                    avg_confidence,
                    2
                )
        })

# =========================================
# MONTHLY TREND ANALYTICS
# =========================================

class MonthlyTrendAnalyticsView(APIView):

    permission_classes = []

    def get(self, request):

        trends = (

            LoanApplication.objects

            .annotate(
                month=TruncMonth(
                    "created_at"
                )
            )

            .values("month", "status")

            .annotate(
                total=Count("id")
            )

            .order_by("month")
        )

        result = []

        for item in trends:

            result.append({

                "month":
                    item["month"].strftime("%b %Y"),

                "status":
                    item["status"],

                "total":
                    item["total"]
            })

        return Response(result)

# =========================================
# REAL ML MODEL METRICS
# =========================================

class MLModelMetricsView(APIView):

    permission_classes = []

    def get(self, request):

        try:

            metrics = joblib.load(

    "risk_engine/ml/model_metrics.pkl"
)

            return Response(metrics)

        except Exception as e:

            return Response({

                "error": str(e)
            })

# =========================================
# BIAS MONITORING
# =========================================

class BiasMonitoringView(
    APIView
):

    permission_classes = [
        IsAdminUser
    ]

    def get(self, request):

        salaried_total = (
            LoanApplication.objects.filter(
                employment_type="SALARIED"
            ).count()
        )

        business_total = (
            LoanApplication.objects.filter(
                employment_type="BUSINESS"
            ).count()
        )

        freelancer_total = (
            LoanApplication.objects.filter(
                employment_type="FREELANCER"
            ).count()
        )

        salaried_approved = (
            LoanApplication.objects.filter(
                employment_type="SALARIED",
                decision="APPROVE"
            ).count()
        )

        business_approved = (
            LoanApplication.objects.filter(
                employment_type="BUSINESS",
                decision="APPROVE"
            ).count()
        )

        freelancer_approved = (
            LoanApplication.objects.filter(
                employment_type="FREELANCER",
                decision="APPROVE"
            ).count()
        )

        def calculate_rate(
            approved,
            total
        ):

            if total == 0:

                return 0

            return round(

                (
                    approved / total
                ) * 100,

                2
            )

        return Response({

            "SALARIED": {

                "total":
                    salaried_total,

                "approved":
                    salaried_approved,

                "approval_rate":
                    calculate_rate(

                        salaried_approved,

                        salaried_total
                    )
            },

            "BUSINESS": {

                "total":
                    business_total,

                "approved":
                    business_approved,

                "approval_rate":
                    calculate_rate(

                        business_approved,

                        business_total
                    )
            },

            "FREELANCER": {

                "total":
                    freelancer_total,

                "approved":
                    freelancer_approved,

                "approval_rate":
                    calculate_rate(

                        freelancer_approved,

                        freelancer_total
                    )
            }
        })
    
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

        return (
            LoanApplication.objects.filter(

                user=self.request.user
            )
        )

# =========================================
# ADMIN APPLICATION QUEUE
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
    pagination_class = (
    LoanPagination
)

    queryset = (
        LoanApplication.objects.all()
    )

# =========================================
# APPLICATION DETAIL VIEW
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
# UPDATE LOAN STATUS
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

            loan = (
                LoanApplication.objects.get(
                    pk=pk
                )
            )

            status = request.data.get(
                "status"
            )

            repayment_status = request.data.get(
                "repayment_status"
            )

            # UPDATE STATUS

            if status:

                loan.status = status

            # UPDATE REPAYMENT

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
# PDF REPORT
# =========================================

class LoanReportPDFView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(

        self,

        request,

        pk
    ):

        loan = (
            LoanApplication.objects.get(
                pk=pk
            )
        )

        response = HttpResponse(

            content_type='application/pdf'
        )

        response[
            'Content-Disposition'
        ] = (

            f'attachment; '

            f'filename="loan_report_{pk}.pdf"'
        )

        doc = SimpleDocTemplate(
            response
        )

        styles = (
            getSampleStyleSheet()
        )

        elements = []

        # TITLE

        elements.append(

            Paragraph(

                "Loan Risk Report",

                styles['Title']
            )
        )

        elements.append(
            Spacer(1, 12)
        )

        # DETAILS

        details = [

            f"<b>Name:</b> {loan.full_name}",

            f"<b>Email:</b> {loan.email}",

            f"<b>Risk Score:</b> {loan.risk_score}",

            f"<b>Risk Tier:</b> {loan.risk_tier}",

            f"<b>Decision:</b> {loan.decision}",

            f"<b>Status:</b> {loan.status}",

            f"<b>Repayment Status:</b> {loan.repayment_status}",

            f"<b>Confidence:</b> {loan.confidence_score}%"
        ]

        for item in details:

            elements.append(

                Paragraph(
                    item,
                    styles['BodyText']
                )
            )

            elements.append(
                Spacer(1, 8)
            )

        # EXPLANATIONS

        elements.append(

            Paragraph(

                "<b>AI Explainability Factors:</b>",

                styles['Heading2']
            )
        )

        for reason in loan.explanations:

            elements.append(

                Paragraph(

                    f"• {reason}",

                    styles['BodyText']
                )
            )

        doc.build(elements)

        return response