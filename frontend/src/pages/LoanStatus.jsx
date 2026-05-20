import { useEffect, useState } from "react"
import axios from "axios"

export default function LoanStatus() {

  const [loans, setLoans] = useState([])

  const [loading, setLoading] =
    useState(true)

  // Fetch Loans

  useEffect(() => {

    fetchLoans()

  }, [])

  const fetchLoans = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/my-loans/`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setLoans(response.data)

    } catch (error) {

      console.log(error)

      alert(
        "Failed to fetch loans"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="container mt-5">

      {/* Heading */}

      <div className="mb-4">

        <h2 className="fw-bold">

          My Loan Applications

        </h2>

        <p className="text-muted">

          Track your AI loan
          approval status

        </p>

      </div>

      {/* Loading */}

      {
        loading && (

          <div className="text-center">

            <div
              className="
                spinner-border
                text-primary
              "
            ></div>

          </div>
        )
      }

      {/* No Loans */}

      {
        !loading &&
        loans.length === 0 && (

          <div
            className="
              alert
              alert-warning
            "
          >

            No loan applications found

          </div>
        )
      }

      {/* Loan Cards */}

      <div className="row">

        {
          loans.map((loan) => (

            <div
              className="
                col-md-4
                mb-4
              "
              key={loan.id}
            >

              <div
                className="
                  card
                  shadow-lg
                  border-0
                  p-4
                  h-100
                "
                style={{
                  borderRadius: "18px"
                }}
              >

                {/* Loan Amount */}

                <h4 className="fw-bold">

                  ₹{loan.loan_amount}

                </h4>

                <hr />

                {/* Details */}

                <p>

                  <strong>
                    Income:
                  </strong>

                  ₹{loan.monthly_income}

                </p>

                <p>

                  <strong>
                    Credit Score:
                  </strong>

                  {loan.credit_score}

                </p>

                <p>

                  <strong>
                    Risk Tier:
                  </strong>

                  <span
                    className={
                      loan.risk_tier ===
                      "LOW_RISK"

                      ? "text-success"

                      : loan.risk_tier ===
                        "MEDIUM_RISK"

                      ? "text-warning"

                      : "text-danger"
                    }
                  >

                    {" "}
                    {loan.risk_tier}

                  </span>

                </p>

                <p>

                  <strong>
                    Decision:
                  </strong>

                  <span
                    className={
                      loan.decision ===
                      "APPROVE"

                      ? "text-success"

                      : "text-danger"
                    }
                  >

                    {" "}
                    {loan.decision}

                  </span>

                </p>

                {/* STATUS */}

                <h5 className="mt-3">

                  Status:

                  <span
                    className={
                      loan.status ===
                      "APPROVED"

                      ? "text-success"

                      : loan.status ===
                        "REJECTED"

                      ? "text-danger"

                      : "text-warning"
                    }
                  >

                    {" "}
                    {loan.status}

                  </span>

                </h5>

                {/* Confidence */}

                <p className="mt-3">

                  <strong>
                    AI Confidence:
                  </strong>

                  {" "}

                  {
                    loan.confidence_score
                  }%

                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}