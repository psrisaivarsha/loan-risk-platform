from django.contrib import admin

from .models import (
    LoanApplication,
    AuditLog
)

admin.site.register(LoanApplication)

admin.site.register(AuditLog)