def generate_explanations(application):

    reasons = []

    # ======================
    # INCOME
    # ======================

    if application.monthly_income >= 50000:

        reasons.append(

            "High monthly income improved approval chances"
        )

    else:

        reasons.append(

            "Low monthly income increased financial risk"
        )

    # ======================
    # EMPLOYMENT
    # ======================

    if application.employment_type == "SALARIED":

        reasons.append(

            "Stable salaried employment reduced default probability"
        )

    else:

        reasons.append(

            "Non-salaried employment increased uncertainty"
        )

    # ======================
    # EXISTING DEBT
    # ======================

    if application.existing_debt > 50000:

        reasons.append(

            "High existing debt negatively impacted repayment capability"
        )

    else:

        reasons.append(

            "Low existing debt improved financial stability"
        )

    # ======================
    # LOAN AMOUNT
    # ======================

    if application.loan_amount > 500000:

        reasons.append(

            "Large requested loan amount increased exposure risk"
        )

    else:

        reasons.append(

            "Requested loan amount is within acceptable range"
        )

    # ======================
    # CREDIT SCORE
    # ======================

    if application.credit_score >= 750:

        reasons.append(

            "Strong credit score positively influenced approval"
        )

    else:

        reasons.append(

            "Lower credit score increased lending risk"
        )

    return reasons[:5]