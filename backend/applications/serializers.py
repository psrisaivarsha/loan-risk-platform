from rest_framework import serializers

from .models import (
    LoanApplication,
    AuditLog
)

# =========================================
# LOAN APPLICATION SERIALIZER
# =========================================

class LoanApplicationSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = LoanApplication

        fields = [

            "id",

            "user",

            "full_name",
            "email",
            "age",

            "monthly_income",
            "employment_type",

            "loan_amount",
            "existing_debt",

            "credit_score",
            "utility_payment_score",
            "mobile_usage_score",

            "risk_score",
            "risk_tier",
            "decision",

            "confidence_score",

            "status",
            "repayment_status",

            "explanations",
            "shap_factors",

            "created_at"
        ]

        read_only_fields = [

            "id",

            "user",

            "risk_score",
            "risk_tier",
            "decision",

            "confidence_score",

            "status",

            "explanations",
            "shap_factors",

            "created_at"
        ]

    # =========================================
    # VALIDATIONS
    # =========================================

    def validate_monthly_income(
        self,
        value
    ):

        if value <= 0:

            raise serializers.ValidationError(

                "Monthly income must be greater than 0"
            )

        return value

    def validate_loan_amount(
        self,
        value
    ):

        if value <= 0:

            raise serializers.ValidationError(

                "Loan amount must be greater than 0"
            )

        return value

    def validate_credit_score(
        self,
        value
    ):

        if value < 300 or value > 900:

            raise serializers.ValidationError(

                "Credit score must be between 300 and 900"
            )

        return value

    def validate_age(
        self,
        value
    ):

        if value < 18:

            raise serializers.ValidationError(

                "Applicant must be at least 18 years old"
            )

        return value

# =========================================
# AUDIT LOG SERIALIZER
# =========================================

class AuditLogSerializer(
    serializers.ModelSerializer
):

    applicant_name = serializers.CharField(

        source="application.full_name",

        read_only=True
    )

    class Meta:

        model = AuditLog

        fields = [

            "id",

            "application",

            "applicant_name",

            "model_version",

            "input_snapshot",

            "prediction_output",

            "created_at"
        ]

        read_only_fields = fields