def generate_explanations(application):

    reasons = []

    # =====================================
    # MONTHLY INCOME
    # =====================================

    if application.monthly_income >= 100000:

        reasons.append(
            "Very high monthly income significantly improved repayment capability"
        )

    elif application.monthly_income >= 50000:

        reasons.append(
            "Stable monthly income positively influenced loan approval"
        )

    else:

        reasons.append(
            "Lower monthly income increased financial repayment risk"
        )

    # =====================================
    # EMPLOYMENT TYPE
    # =====================================

    if application.employment_type == "SALARIED":

        reasons.append(
            "Salaried employment reduced default probability due to stable income"
        )

    elif application.employment_type == "BUSINESS":

        reasons.append(
            "Business income introduced moderate income variability"
        )

    else:

        reasons.append(
            "Unstable employment profile increased lending uncertainty"
        )

    # =====================================
    # EXISTING DEBT
    # =====================================

    if application.existing_debt >= 300000:

        reasons.append(
            "High existing liabilities negatively affected debt-to-income ratio"
        )

    elif application.existing_debt >= 100000:

        reasons.append(
            "Moderate existing debt slightly increased financial obligations"
        )

    else:

        reasons.append(
            "Low existing debt improved overall financial stability"
        )

    # =====================================
    # LOAN AMOUNT
    # =====================================

    if application.loan_amount >= 1000000:

        reasons.append(
            "Large loan request increased portfolio exposure risk"
        )

    elif application.loan_amount >= 500000:

        reasons.append(
            "Requested loan amount contributed moderate lending risk"
        )

    else:

        reasons.append(
            "Requested loan amount remained within acceptable underwriting limits"
        )

    # =====================================
    # CREDIT SCORE
    # =====================================

    if application.credit_score >= 800:

        reasons.append(
            "Excellent credit score strongly improved approval confidence"
        )

    elif application.credit_score >= 700:

        reasons.append(
            "Good credit score positively influenced risk assessment"
        )

    elif application.credit_score >= 600:

        reasons.append(
            "Average credit score resulted in moderate lending risk"
        )

    else:

        reasons.append(
            "Poor credit score significantly increased default probability"
        )

    # =====================================
    # AI CONFIDENCE
    # =====================================

    if hasattr(application, "confidence_score"):

        if application.confidence_score >= 90:

            reasons.append(
                "AI model produced very high prediction confidence"
            )

        elif application.confidence_score >= 75:

            reasons.append(
                "AI confidence level remained reasonably strong"
            )

        else:

            reasons.append(
                "Prediction confidence was lower due to mixed financial indicators"
            )

    # =====================================
    # RETURN TOP REASONS
    # =====================================

    return reasons[:6]