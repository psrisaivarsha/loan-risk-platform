import { useEffect, useState } from "react"

import axios from "axios"
import.meta.env.VITE_API_URL

import { useParams } from "react-router-dom"

import { toast } from "react-toastify"

import Navbar from "../components/Navbar"

export default function ApplicationDetail() {

  const { id } = useParams()

  const [application, setApplication] =
    useState(null)

  const [
    repaymentStatus,
    setRepaymentStatus
  ] = useState("")

  const [loading, setLoading] =
    useState(true)

  // =========================================
  // FETCH APPLICATION
  // =========================================

  useEffect(() => {

    fetchApplication()

  }, [])

  const fetchApplication = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/loan-applications/${id}/`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setApplication(
        response.data
      )

      setRepaymentStatus(
        response.data
          .repayment_status
      )

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to load application details"
      )

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // UPDATE LOAN STATUS
  // =========================================

  const updateStatus = async (
    statusValue
  ) => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      await axios.patch(

        `${import.meta.env.VITE_API_URL}/api/update-loan-status/${id}/`,

        {
          status:
            statusValue
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      setApplication({

        ...application,

        status: statusValue
      })

      toast.success(
        "Loan status updated successfully"
      )

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed to update status"
      )
    }
  }

  // =========================================
  // UPDATE REPAYMENT STATUS
  // =========================================

  const updateRepaymentStatus =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "access"
          )

        await axios.patch(

          `${import.meta.env.VITE_API_URL}/api/update-loan-status/${application.id}/`,

          {
            repayment_status:
              repaymentStatus
          },

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

        toast.success(
          "Repayment status updated!"
        )

        fetchApplication()

      } catch (error) {

        console.log(error)

        toast.error(
          "Failed to update repayment status"
        )
      }
    }

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
          vh-100
        "
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

      </div>
    )
  }

  // =========================================
  // NO DATA
  // =========================================

  if (!application) {

    return (

      <div className="container py-5">

        <div
          className="
            alert
            alert-danger
          "
        >

          Application not found.

        </div>

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

      <div
        className="
          container
          py-5
        "
      >

        <div
          className="
            card
            border-0
          "

          style={{

            borderRadius: "28px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",

            transition: "0.3s"
          }}

          onMouseEnter={(e) => {

            e.currentTarget.style.transform =
              "translateY(-4px)"
          }}

          onMouseLeave={(e) => {

            e.currentTarget.style.transform =
              "translateY(0px)"
          }}
        >

          <div className="card-body p-5">

            {/* ========================================= */}
            {/* HEADING */}
            {/* ========================================= */}

            <h2
              className="mb-4"

              style={{

                fontWeight: "800",

                color: "#0F172A"
              }}
            >

              AI Loan Application Report

            </h2>

            {/* ========================================= */}
            {/* BUTTONS */}
            {/* ========================================= */}

            <div
              className="
                d-flex
                gap-3
                mb-4
                flex-wrap
              "
            >

              {/* BACK BUTTON */}

              <button

                className="
                  btn
                  btn-dark
                "

                style={{

                  borderRadius: "14px",

                  padding:
                    "12px 20px"
                }}

                onClick={() => {

                  if (

                    localStorage.getItem(
                      "is_admin"
                    ) === "true"
                  ) {

                    window.location.href =
                      "/dashboard"
                  }

                  else {

                    window.location.href =
                      "/user-home"
                  }
                }}
              >

                ← Back

              </button>

              {/* DOWNLOAD BUTTON */}

              <button

                className="
                  btn
                  btn-danger
                "

                style={{

                  borderRadius: "14px",

                  padding:
                    "12px 20px"
                }}

                onClick={async () => {

                  try {

                    const token =
                      localStorage.getItem(
                        "access"
                      )

                    const response =
                      await axios.get(

                            `${import.meta.env.VITE_API_URL}/api/applications/${application.id}/pdf/`,

                        {

                          responseType: "blob",

                          headers: {

                            Authorization:
                              `Bearer ${token}`
                          }
                        }
                      )

                    const fileURL =
                      window.URL.createObjectURL(

                        new Blob([response.data], {

                          type: "application/pdf"
                        })
                      )

                    const link =
                      document.createElement("a")

                    link.href = fileURL

                    link.setAttribute(

                      "download",

                      `loan_report_${application.id}.pdf`
                    )

                    document.body.appendChild(link)

                    link.click()

                    link.remove()

                    toast.success(
                      "PDF Download Started"
                    )

                  } catch (error) {

                    console.log(error)

                    toast.error(
                      "PDF download failed"
                    )
                  }
                }}
              >

                Download PDF Report

              </button>

            </div>

            {/* ========================================= */}
            {/* APPLICANT DETAILS */}
            {/* ========================================= */}

            <h4
              className="mb-3"

              style={{

                fontWeight: "700",

                color: "#0F172A"
              }}
            >

              Applicant Details

            </h4>

            <div className="row">

              <div className="col-md-6">

                <p>
                  <strong>Name:</strong>
                  {" "}
                  {application.full_name}
                </p>

                <p>
                  <strong>Age:</strong>
                  {" "}
                  {application.age}
                </p>

                <p>
                  <strong>Income:</strong>
                  {" "}
                  ₹
                  {
                    application.monthly_income
                  }
                </p>

                <p>
                  <strong>Employment:</strong>
                  {" "}
                  {
                    application.employment_type
                  }
                </p>

              </div>

              <div className="col-md-6">

                <p>
                  <strong>Loan Amount:</strong>
                  {" "}
                  ₹
                  {
                    application.loan_amount
                  }
                </p>

                <p>
                  <strong>Existing Debt:</strong>
                  {" "}
                  ₹
                  {
                    application.existing_debt
                  }
                </p>

                <p>
                  <strong>Credit Score:</strong>
                  {" "}
                  {
                    application.credit_score
                  }
                </p>

              </div>

            </div>

            <hr />

            {/* ========================================= */}
            {/* UNDERWRITER ACTIONS */}
            {/* ========================================= */}

            {
              localStorage.getItem(
                "is_admin"
              ) === "true"

              && (

                <div className="mb-4">

                  <h4
                    className="mb-3"

                    style={{

                      fontWeight: "700",

                      color: "#0F172A"
                    }}
                  >

                    Underwriter Actions

                  </h4>

                  <div
                    className="
                      d-flex
                      flex-wrap
                      gap-3
                    "
                  >

                    <button
                      className="
                        btn
                        btn-success
                      "
                      style={{
                        borderRadius: "12px"
                      }}
                      onClick={() =>
                        updateStatus(
                          "APPROVED"
                        )
                      }
                    >

                      Approve

                    </button>

                    <button
                      className="
                        btn
                        btn-danger
                      "
                      style={{
                        borderRadius: "12px"
                      }}
                      onClick={() =>
                        updateStatus(
                          "REJECTED"
                        )
                      }
                    >

                      Reject

                    </button>

                    <button
                      className="
                        btn
                        btn-warning
                      "
                      style={{
                        borderRadius: "12px"
                      }}
                      onClick={() =>
                        updateStatus(
                          "CONDITIONAL"
                        )
                      }
                    >

                      Conditional

                    </button>

                    <button
                      className="
                        btn
                        btn-secondary
                      "
                      style={{
                        borderRadius: "12px"
                      }}
                      onClick={() =>
                        updateStatus(
                          "ON_HOLD"
                        )
                      }
                    >

                      On Hold

                    </button>

                  </div>

                </div>
              )
            }

            {/* ========================================= */}
            {/* REPAYMENT STATUS */}
            {/* ========================================= */}

            {
              localStorage.getItem(
                "is_admin"
              ) === "true"

              && (

                <div className="mt-4">

                  <h5
                    style={{
                      fontWeight: "700"
                    }}
                  >

                    Repayment Status

                  </h5>

                  <div
                    className="
                      d-flex
                      gap-3
                      mt-3
                    "
                  >

                    <select

                      className="
                        form-select
                      "

                      style={{
                        borderRadius: "12px"
                      }}

                      value={
                        repaymentStatus
                      }

                      onChange={(e) =>

                        setRepaymentStatus(
                          e.target.value
                        )
                      }
                    >

                      <option value="ACTIVE">

                        ACTIVE

                      </option>

                      <option value="REPAID">

                        REPAID

                      </option>

                      <option value="DEFAULTED">

                        DEFAULTED

                      </option>

                    </select>

                    <button

                      className="
                        btn
                        btn-dark
                      "

                      style={{
                        borderRadius: "12px"
                      }}

                      onClick={
                        updateRepaymentStatus
                      }
                    >

                      Update

                    </button>

                  </div>

                </div>
              )
            }

            <hr />

            {/* ========================================= */}
            {/* AI DECISION */}
            {/* ========================================= */}

            <h4
              className="mb-3"

              style={{

                fontWeight: "700",

                color: "#0F172A"
              }}
            >

              AI Risk Decision

            </h4>

            <p>

              <strong>Risk Score:</strong>

              {" "}

              {
                application.risk_score
              }

            </p>

            <p>

              <strong>Risk Tier:</strong>

              {" "}

              <span
                className={
                  application.risk_tier ===
                  "LOW_RISK"

                    ? "badge bg-success"

                    : application.risk_tier ===
                      "MEDIUM_RISK"

                    ? "badge bg-warning text-dark"

                    : "badge bg-danger"
                }
              >

                {
                  application.risk_tier
                }

              </span>

            </p>

            <p>

              <strong>Decision:</strong>

              {" "}

              <span
                className={
                  application.decision ===
                  "APPROVE"

                    ? "badge bg-success"

                    : application.decision ===
                      "CONDITIONAL"

                    ? "badge bg-warning text-dark"

                    : "badge bg-danger"
                }
              >

                {
                  application.decision
                }

              </span>

            </p>

            <p>

              <strong>Status:</strong>

              {" "}

              <span
                className={
                  application.status ===
                  "APPROVED"

                    ? "badge bg-success"

                    : application.status ===
                      "REJECTED"

                    ? "badge bg-danger"

                    : application.status ===
                      "CONDITIONAL"

                    ? "badge bg-warning text-dark"

                    : "badge bg-secondary"
                }
              >

                {
                  application.status
                }

              </span>

            </p>

            <p>

              <strong>Confidence:</strong>

              {" "}

              {
                application.confidence_score
              }%

            </p>

            <hr />

            {/* ========================================= */}
            {/* AI EXPLANATIONS */}
            {/* ========================================= */}

            <h4
              className="mb-3"

              style={{

                fontWeight: "700",

                color: "#0F172A"
              }}
            >

              AI Decision Factors

            </h4>

            {
              application?.explanations
                ?.length > 0

                ? (

                  <ul
                    className="list-group"

                    style={{

                      borderRadius: "18px",

                      overflow: "hidden"
                    }}
                  >

                    {
                      application
                        .explanations
                        .map(

                          (
                            reason,
                            index
                          ) => (

                            <li
                              key={index}
                              className="
                                list-group-item
                              "
                            >

                              {reason}

                            </li>
                          )
                        )
                    }

                  </ul>

                ) : (

                  <div
                    className="
                      alert
                      alert-warning
                    "
                  >

                    No AI explanations available

                  </div>
                )
            }

            {/* ========================================= */}
            {/* DECLINE MESSAGE */}
            {/* ========================================= */}

            {
              application.decision ===
              "DECLINE"

              && (

                <div
                  className="
                    alert
                    alert-danger
                    mt-4
                  "
                >

                  <h5>

                    Why was this application declined?

                  </h5>

                  <p className="mb-0">

                    The application was declined
                    because the AI system identified
                    high lending risk based on
                    income stability,
                    existing debt,
                    credit score,
                    and repayment capability.

                  </p>

                </div>
              )
            }

          </div>

        </div>

      </div>

    </div>
  )
}