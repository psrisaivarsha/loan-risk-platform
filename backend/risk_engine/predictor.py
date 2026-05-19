import joblib

import numpy as np

from .shap_explainer import (
    generate_shap_explanation
)

# =========================================
# LOAD MODEL
# =========================================

model = joblib.load(

    "risk_engine/ml/loan_model.pkl"
)

# =========================================
# PREDICT RISK
# =========================================

def predict_risk(application):

    # =========================================
    # FEATURE MAPPING
    # =========================================

    gender = 1

    married = 1

    dependents = 0

    education = 0

    self_employed = 0

    applicant_income = (
        application.monthly_income
    )

    coapplicant_income = 0

    loan_amount = (
        application.loan_amount / 1000
    )

    loan_amount_term = 360

    credit_history = (

        1

        if application.credit_score >= 650

        else 0
    )

    property_area = 1

    # =========================================
    # FEATURES ARRAY
    # =========================================

    features = np.array([[

        gender,

        married,

        dependents,

        education,

        self_employed,

        applicant_income,

        coapplicant_income,

        loan_amount,

        loan_amount_term,

        credit_history,

        property_area
    ]])

    # =========================================
    # MODEL PREDICTION
    # =========================================

    prediction = model.predict(
        features
    )[0]

    probability = (

        model.predict_proba(
            features
        )[0]
    )

    confidence = round(

        max(probability) * 100,

        2
    )

    # =========================================
    # DECISION LOGIC
    # =========================================

    if prediction == 1:

        decision = "APPROVE"

        risk_tier = "LOW_RISK"

        risk_score = 780

    elif confidence > 60:

        decision = "CONDITIONAL"

        risk_tier = "MEDIUM_RISK"

        risk_score = 620

    else:

        decision = "DECLINE"

        risk_tier = "HIGH_RISK"

        risk_score = 350

    # =========================================
    # SHAP EXPLANATIONS
    # =========================================

    shap_explanations = (
        generate_shap_explanation(
            features
        )
    )

    # =========================================
    # RESPONSE
    # =========================================

    return {

        "risk_score":
            risk_score,

        "risk_tier":
            risk_tier,

        "decision":
            decision,

        "confidence":
            confidence,

        "shap_factors":
            shap_explanations
    }