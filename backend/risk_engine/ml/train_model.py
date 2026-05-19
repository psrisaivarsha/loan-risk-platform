import pandas as pd

import joblib

from sklearn.model_selection import (
    train_test_split
)

from sklearn.ensemble import (
    RandomForestClassifier
)

from sklearn.preprocessing import (
    LabelEncoder
)

from sklearn.metrics import (

    accuracy_score,

    precision_score,

    recall_score,

    f1_score,

    roc_auc_score
)

# =========================================
# LOAD DATASET
# =========================================

df = pd.read_csv(

    "risk_engine/datasets/train.csv"
)

print(

    "Dataset Loaded Successfully!"
)

# =========================================
# DROP UNUSED COLUMN
# =========================================

if "Loan_ID" in df.columns:

    df.drop(

        "Loan_ID",

        axis=1,

        inplace=True
    )

# =========================================
# HANDLE MISSING VALUES
# =========================================

for column in df.columns:

    # OBJECT COLUMNS

    if df[column].dtype == "object":

        df[column].fillna(

            df[column].mode()[0],

            inplace=True
        )

    # NUMERIC COLUMNS

    else:

        df[column].fillna(

            df[column].median(),

            inplace=True
        )

# =========================================
# LABEL ENCODING
# =========================================

encoder = LabelEncoder()

for column in df.columns:

    if df[column].dtype == "object":

        df[column] = encoder.fit_transform(

            df[column]
        )

# =========================================
# FEATURES + TARGET
# =========================================

X = df.drop(

    "Loan_Status",

    axis=1
)

y = df["Loan_Status"]

# =========================================
# TRAIN TEST SPLIT
# =========================================

X_train, X_test, y_train, y_test = (

    train_test_split(

        X,
        y,

        test_size=0.2,

        random_state=42
    )
)

# =========================================
# MODEL
# =========================================

model = RandomForestClassifier(

    n_estimators=200,

    max_depth=10,

    random_state=42
)

# =========================================
# TRAIN MODEL
# =========================================

model.fit(

    X_train,

    y_train
)

print(

    "Model Trained Successfully!"
)

# =========================================
# PREDICTIONS
# =========================================

y_pred = model.predict(
    X_test
)

y_prob = model.predict_proba(
    X_test
)[:, 1]

# =========================================
# METRICS
# =========================================

metrics = {

    "accuracy":

        round(

            accuracy_score(
                y_test,
                y_pred
            ) * 100,

            2
        ),

    "precision":

        round(

            precision_score(
                y_test,
                y_pred
            ) * 100,

            2
        ),

    "recall":

        round(

            recall_score(
                y_test,
                y_pred
            ) * 100,

            2
        ),

    "f1_score":

        round(

            f1_score(
                y_test,
                y_pred
            ) * 100,

            2
        ),

    "roc_auc":

        round(

            roc_auc_score(
                y_test,
                y_prob
            ) * 100,

            2
        )
}

# =========================================
# SAVE MODEL
# =========================================

joblib.dump(

    model,

    "risk_engine/ml/loan_model.pkl"
)

# =========================================
# SAVE METRICS
# =========================================

joblib.dump(

    metrics,

    "risk_engine/ml/model_metrics.pkl"
)

print(

    "Model Saved Successfully!"
)

print(

    "Metrics Saved Successfully!"
)

print(

    metrics
)