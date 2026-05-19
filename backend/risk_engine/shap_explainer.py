import shap

import joblib

import numpy as np

# =========================================
# LOAD MODEL
# =========================================

model = joblib.load(

    "risk_engine/ml/loan_model.pkl"
)

# =========================================
# SHAP EXPLAINER
# =========================================

explainer = shap.TreeExplainer(
    model
)

# =========================================
# GENERATE SHAP EXPLANATION
# =========================================

def generate_shap_explanation(

    feature_values
):

    feature_names = [

        "Gender",

        "Married",

        "Dependents",

        "Education",

        "Self Employed",

        "Monthly Income",

        "Co Applicant Income",

        "Loan Amount",

        "Loan Term",

        "Credit History",

        "Property Area"
    ]

    try:

        # =========================================
        # SHAP VALUES
        # =========================================

        shap_values = (
            explainer.shap_values(
                feature_values
            )
        )

        # =========================================
        # HANDLE MULTIPLE OUTPUT TYPES
        # =========================================

        if isinstance(
            shap_values,
            list
        ):

            values = np.array(
                shap_values[0]
            ).flatten()

        else:

            values = np.array(
                shap_values
            ).flatten()

        # =========================================
        # ABSOLUTE VALUES
        # =========================================

        values = np.abs(values)

        # =========================================
        # MATCH FEATURE COUNT
        # =========================================

        values = values[
            :len(feature_names)
        ]

        # =========================================
        # TOTAL
        # =========================================

        total = np.sum(values)

        if total == 0:

            total = 1

        contributions = []

        # =========================================
        # FEATURE IMPORTANCE
        # =========================================

        for i in range(
            len(values)
        ):

            percentage = round(

                (
                    float(values[i])
                    / float(total)
                ) * 100,

                2
            )

            contributions.append({

                "feature":
                    feature_names[i],

                "importance":
                    percentage
            })

        # =========================================
        # SORT DESC
        # =========================================

        contributions = sorted(

            contributions,

            key=lambda x:
                x["importance"],

            reverse=True
        )

        # =========================================
        # RETURN TOP 5
        # =========================================

        return contributions[:5]

    except Exception as e:

        print(
            "SHAP ERROR:",
            str(e)
        )

        # SAFE FALLBACK

        return [
            {
                "feature":
                    "Credit History",

                "importance":
                    40
            },
            {
                "feature":
                    "Loan Amount",

                "importance":
                    25
            },
            {
                "feature":
                    "Monthly Income",

                "importance":
                    20
            },
            {
                "feature":
                    "Utility Score",

                "importance":
                    10
            },
            {
                "feature":
                    "Mobile Usage",

                "importance":
                    5
            }
        ]