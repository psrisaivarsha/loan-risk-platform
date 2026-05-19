from django.db import models

from django.contrib.auth.models import User


# =========================================
# LOAN APPLICATION MODEL
# =========================================

class LoanApplication(models.Model):

    # EMPLOYMENT TYPES

    EMPLOYMENT_CHOICES = [

        ('SALARIED', 'Salaried'),

        ('BUSINESS', 'Business'),

        ('FREELANCER', 'Freelancer'),
    ]

    # AI DECISION TYPES

    DECISION_CHOICES = [

        ('APPROVE', 'Approve'),

        ('CONDITIONAL', 'Conditional'),

        ('DECLINE', 'Decline'),
    ]

    # RISK TIERS

    RISK_TIER_CHOICES = [

        ('LOW_RISK', 'Low Risk'),

        ('MEDIUM_RISK', 'Medium Risk'),

        ('HIGH_RISK', 'High Risk'),

        ('PENDING', 'Pending')
    ]

    # APPLICATION STATUS

    STATUS_CHOICES = [

        ('PENDING', 'Pending'),

        ('APPROVED', 'Approved'),

        ('REJECTED', 'Rejected'),

        ('CONDITIONAL', 'Conditional'),

        ('ON_HOLD', 'On Hold'),
    ]
    # =========================================
# REPAYMENT TRACKING
# =========================================

    REPAYMENT_STATUS_CHOICES = [

    ('ACTIVE', 'Active'),

    ('REPAID', 'Repaid'),

    ('DEFAULTED', 'Defaulted'),
]

    repayment_status = models.CharField(

    max_length=50,

    choices=REPAYMENT_STATUS_CHOICES,

    default='ACTIVE'
)
    # =========================================
    # USER RELATION
    # =========================================

    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE
    )

    # =========================================
    # APPLICANT DETAILS
    # =========================================

    full_name = models.CharField(
        max_length=200
    )

    email = models.EmailField()

    age = models.IntegerField()

    employment_type = models.CharField(

        max_length=50,

        choices=EMPLOYMENT_CHOICES
    )

    # =========================================
    # FINANCIAL DETAILS
    # =========================================

    monthly_income = models.FloatField()

    loan_amount = models.FloatField()

    existing_debt = models.FloatField()

    credit_score = models.IntegerField()

    # =========================================
    # ALTERNATIVE DATA
    # =========================================

    utility_payment_score = models.FloatField(
        default=0
    )

    mobile_usage_score = models.FloatField(
        default=0
    )

    # =========================================
    # AI OUTPUTS
    # =========================================

    risk_score = models.FloatField(

        null=True,

        blank=True
    )

    confidence_score = models.FloatField(

        null=True,

        blank=True
    )

    risk_tier = models.CharField(

        max_length=50,

        choices=RISK_TIER_CHOICES,

        default="PENDING",

        blank=True
    )

    decision = models.CharField(

        max_length=50,

        choices=DECISION_CHOICES,

        null=True,

        blank=True
    )

    status = models.CharField(

        max_length=50,

        choices=STATUS_CHOICES,

        default='PENDING'
    )

    # =========================================
    # EXPLAINABLE AI
    # =========================================

    explanations = models.JSONField(
        default=list
    )

    # =========================================
    # TIMESTAMPS
    # =========================================

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    # =========================================
    # ORDERING
    # =========================================

    class Meta:

        ordering = ['-created_at']

    # =========================================
    # STRING
    # =========================================

    def __str__(self):

        return self.full_name


# =========================================
# AUDIT LOG MODEL
# =========================================

class AuditLog(models.Model):

    application = models.ForeignKey(

        LoanApplication,

        on_delete=models.CASCADE
    )

    # MODEL VERSION

    model_version = models.CharField(
        max_length=100
    )

    # INPUT SNAPSHOT

    input_snapshot = models.JSONField()

    # OUTPUT SNAPSHOT

    prediction_output = models.JSONField()

    # TIMESTAMP

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    # ORDERING

    class Meta:

        ordering = ['-created_at']

    # STRING

    def __str__(self):

        return (

            f"Audit Log - "

            f"{self.application.full_name}"
        )
# =========================================
# SHAP FACTORS
# =========================================

shap_factors = models.JSONField(

    default=list,

    blank=True
)