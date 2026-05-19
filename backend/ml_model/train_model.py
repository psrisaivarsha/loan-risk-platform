import pandas as pd

from sklearn.model_selection import (
    train_test_split
)

from sklearn.ensemble import (
    RandomForestClassifier
)

from sklearn.metrics import (
    accuracy_score
)

import joblib

# LOAD DATASET

df = pd.read_csv(
    "train.csv"
)

# FEATURES

features = [

    "ApplicantIncome",

    "LoanAmount",

    "Credit_History"
]

# REMOVE NULL VALUES

df = df.dropna(
    subset=features + ["Loan_Status"]
)

# INPUT DATA

X = df[features]

# OUTPUT LABEL

y = df["Loan_Status"]

# CONVERT LABELS

y = y.map({

    "Y": 1,

    "N": 0
})

# SPLIT DATA

X_train, X_test, y_train, y_test = (
    train_test_split(

        X,

        y,

        test_size=0.2,

        random_state=42
    )
)

# CREATE MODEL

model = (
    RandomForestClassifier()
)

# TRAIN MODEL

model.fit(
    X_train,
    y_train
)

# TEST MODEL

predictions = model.predict(
    X_test
)

# ACCURACY

accuracy = accuracy_score(
    y_test,
    predictions
)

print(
    f"Accuracy: {accuracy}"
)

# SAVE MODEL

joblib.dump(

    model,

    "loan_model.pkl"
)

print(
    "Model Saved Successfully"
)