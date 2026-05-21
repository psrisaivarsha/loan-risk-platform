import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import Navbar from "../components/Navbar"

export default function LoanStatus() {

  // =========================================
  // STATE
  // =========================================

  const [loans, setLoans] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // =========================================
  // SESSION CHECK
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("token")

    // SESSION EXPIRED

    if (!token) {

      toast.error(
        "Session Expired"
      )

      window.location.href = "/"

      return
    }

    fetchLoans()

  }, [])

  // =========================================
  // FETCH LOANS
  // =========================================

  const fetchLoans = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

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

      // SAFE DATA

      setLoans(
        response.data || []
      )

    } catch (error) {

      console.log(error)

      // TOKEN EXPIRED

      if (
        error.response?.status === 401
      ) {

        toast.error(
          "Session Expired"
        )

        localStorage.clear()

        setTimeout(() => {

          window.location.href = "/"

        }, 1200)

      } else {

        toast.error(
          "Failed to fetch loans"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // LOADING UI
  // =========================================

  if (loading) {

    return (

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
          flex-column
        "
        style={{
          height: "100vh"
        }}
      >

        <div
          className="
            spinner-border
            text-primary
          "
          style={{
            width: "4rem",
            height: "4rem"
          }}
        ></div>

        <h4 className="mt-4">

          Loading Loan Applications...

        </h4>

      </div>
    )
  }

  // =========================================
  // MAIN UI
  // =========================================

  return (

    <div
      style={{
        background:
          "linear-gradient(to bottom, #F1F5FF, #EEF2FF)",

        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        {/* ========================================= */}
        {/* HEADING */}
        {/* ========================================= */}

        <div className="mb-5">

          <h1
            className="fw-bold"
            style={{
              color: "#0F172A"
            }}
          >

            My Loan Applications

          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "17px"
            }}
          >

            Track your AI-powered
            loan approval status
            and underwriting decisions.

          </p>

        </div>

        {/* ========================================= */}
        {/* EMPTY STATE */}
        {/* ========================================= */}

        {
          !loading &&
          loans.length === 0 && (

            <div
              className="
                alert
                alert-warning
              "
              style={{
                borderRadius: "16px"
              }}
            >

              No loan applications found

            </div>
          )
        }

        {/* ========================================= */}
        {/* LOAN CARDS */}
        {/* ========================================= */}

        <div className="row">

          {
            loans.map((loan) => (

              <div
                className="
                  col-md-6
                  col-lg-4
                  mb-4
                "
                key={loan.id}
              >

                <div
                  className="
                    card
                    border-0
                    p-4
                    h-100
                  "
                  style={{

                    borderRadius: "24px",

                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.08)",

                    transition: "0.3s"
                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(-5px)"
                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(0px)"
                  }}
                >

                  {/* ========================================= */}
                  {/* LOAN AMOUNT */}
                  {/* ========================================= */}

                  <h3
                    className="fw-bold"
                    style={{
                      color: "#2563EB"
                    }}
                  >

                    ₹{loan.loan_amount}

                  </h3>

                  <hr />

                  {/* ========================================= */}
                  {/* DETAILS */}
                  {/* ========================================= */}

                  <p>

                    <strong>
                      Monthly Income:
                    </strong>

                    {" "}

                    ₹{loan.monthly_income}

                  </p>

                  <p>

                    <strong>
                      Credit Score:
                    </strong>

                    {" "}

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

                        ? "text-success fw-bold"

                        : loan.risk_tier ===
                          "MEDIUM_RISK"

                        ? "text-warning fw-bold"

                        : "text-danger fw-bold"
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

                        ? "text-success fw-bold"

                        : loan.decision ===
                          "CONDITIONAL"

                        ? "text-warning fw-bold"

                        : "text-danger fw-bold"
                      }
                    >

                      {" "}

                      {loan.decision}

                    </span>

                  </p>

                  {/* ========================================= */}
                  {/* STATUS */}
                  {/* ========================================= */}

                  <h5 className="mt-3">

                    Status:

                    <span
                      className={
                        loan.status ===
                        "APPROVED"

                        ? "text-success fw-bold"

                        : loan.status ===
                          "REJECTED"

                        ? "text-danger fw-bold"

                        : loan.status ===
                          "CONDITIONAL"

                        ? "text-warning fw-bold"

                        : "text-secondary fw-bold"
                      }
                    >

                      {" "}

                      {loan.status}

                    </span>

                  </h5>

                  {/* ========================================= */}
                  {/* CONFIDENCE */}
                  {/* ========================================= */}

                  <p className="mt-3">

                    <strong>
                      AI Confidence:
                    </strong>

                    {" "}

                    {
                      loan.confidence_score
                    }%

                  </p>

                  {/* ========================================= */}
                  {/* VIEW DETAILS */}
                  {/* ========================================= */}

                  <button

                    className="
                      btn
                      btn-primary
                      mt-3
                    "

                    style={{
                      borderRadius: "12px"
                    }}

                    onClick={() => {

                      window.location.href =
                        `/application/${loan.id}`
                    }}
                  >

                    View Details

                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}