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

        fields = "__all__"

        read_only_fields = [

            "user",

            "risk_score",

            "risk_tier",

            "decision",

            "confidence_score",

            "explanations",

            "shap_factors",

            "created_at"
        ]

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

        fields = "__all__"