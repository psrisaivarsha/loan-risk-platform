import { useEffect, useState } from "react"

import axios from "axios"

import { useParams } from "react-router-dom"

import { toast } from "react-toastify"

import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  FileText,
  Download,
  ArrowLeft,
  BadgeCheck,
  AlertTriangle
} from "lucide-react"

import Navbar from "../components/Navbar"

export default function ApplicationDetail() {

  // =========================================
  // PARAMS
  // =========================================

  const { id } = useParams()

  // =========================================
  // STATES
  // =========================================

  const [
    application,
    setApplication
  ] = useState(null)

  const [
    repaymentStatus,
    setRepaymentStatus
  ] = useState("")

  const [
    loading,
    setLoading
  ] = useState(true)

  // =========================================
  // FETCH APPLICATION
  // =========================================

  useEffect(() => {

    fetchApplication()

  }, [id])

  const fetchApplication = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

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
        response.data.repayment_status
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
  // UPDATE STATUS
  // =========================================

  const updateStatus = async (
    statusValue
  ) => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

      await axios.patch(

        `${import.meta.env.VITE_API_URL}/api/update-loan-status/${id}/`,

        {
          status: statusValue
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
          localStorage.getItem("access") ||
          localStorage.getItem("token")

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
  // DOWNLOAD PDF
  // =========================================

  const downloadPDF = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

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
  // NOT FOUND
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

      <div className="container py-5">

        {/* HEADER */}

        <div
          className="
            d-flex
            justify-content-between
            align-items-center
            flex-wrap
            mb-4
          "
        >

          <div>

            <h1
              style={{
                fontWeight: "800",
                color: "#0F172A"
              }}
            >

              AI Loan Application Report

            </h1>

            <p
              style={{
                color: "#64748B"
              }}
            >

              Detailed AI-powered underwriting analysis

            </p>

          </div>

          <div
            className="
              d-flex
              gap-3
              flex-wrap
            "
          >

            {/* BACK */}

            <button

              className="
                btn
                btn-dark
              "

              style={{
                borderRadius: "14px"
              }}

              onClick={() => {

                if (

                  localStorage.getItem(
                    "is_staff"
                  ) === "true"

                ) {

                  window.location.href =
                    "/dashboard"

                } else {

                  window.location.href =
                    "/my-applications"
                }
              }}
            >

              <ArrowLeft size={18} />

              {" "}Back

            </button>

            {/* PDF */}

            <button

              className="
                btn
                btn-danger
              "

              style={{
                borderRadius: "14px"
              }}

              onClick={downloadPDF}
            >

              <Download size={18} />

              {" "}Download PDF

            </button>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="row g-4 mb-5">

          {/* SCORE */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "25px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >

              <TrendingUp
                size={40}
                color="#2563EB"
              />

              <h6 className="mt-3">

                Risk Score

              </h6>

              <h2
                style={{
                  fontWeight: "800"
                }}
              >

                {application.risk_score}

              </h2>

            </div>

          </div>

          {/* TIER */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "25px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >

              <ShieldCheck
                size={40}
                color="#16A34A"
              />

              <h6 className="mt-3">

                Risk Tier

              </h6>

              <h2
                style={{
                  fontWeight: "800"
                }}
              >

                {application.risk_tier}

              </h2>

            </div>

          </div>

          {/* DECISION */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "25px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >

              <BadgeCheck
                size={40}
                color="#9333EA"
              />

              <h6 className="mt-3">

                Decision

              </h6>

              <h2
                style={{
                  fontWeight: "800"
                }}
              >

                {application.decision}

              </h2>

            </div>

          </div>

          {/* STATUS */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "25px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >

              <AlertTriangle
                size={40}
                color="#F59E0B"
              />

              <h6 className="mt-3">

                Status

              </h6>

              <h2
                style={{
                  fontWeight: "800"
                }}
              >

                {application.status}

              </h2>

            </div>

          </div>

        </div>

        {/* MAIN DETAILS */}

        <div
          className="
            card
            border-0
          "
          style={{

            borderRadius: "28px",

            padding: "40px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)"
          }}
        >

          {/* APPLICANT DETAILS */}

          <h3
            className="mb-4"
            style={{
              fontWeight: "800"
            }}
          >

            Applicant Details

          </h3>

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>Name:</strong>
                {" "}
                {application.full_name}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {application.email}
              </p>

              <p>
                <strong>Age:</strong>
                {" "}
                {application.age}
              </p>

              <p>
                <strong>Employment:</strong>
                {" "}
                {application.employment_type}
              </p>

              <p>
                <strong>Monthly Income:</strong>
                {" "}
                ₹{application.monthly_income}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>Loan Amount:</strong>
                {" "}
                ₹{application.loan_amount}
              </p>

              <p>
                <strong>Existing Debt:</strong>
                {" "}
                ₹{application.existing_debt}
              </p>

              <p>
                <strong>Credit Score:</strong>
                {" "}
                {application.credit_score}
              </p>

              <p>
                <strong>Utility Score:</strong>
                {" "}
                {application.utility_payment_score}
              </p>

              <p>
                <strong>Mobile Usage Score:</strong>
                {" "}
                {application.mobile_usage_score}
              </p>

            </div>

          </div>

          <hr className="my-5" />

          {/* EXPLAINABILITY */}

          <h3
            className="mb-4"
            style={{
              fontWeight: "800"
            }}
          >

            AI Explainability Factors

          </h3>

          {
            application.explanations?.map(

              (reason, index) => (

                <div
                  key={index}
                  className="
                    alert
                    alert-primary
                  "
                >

                  {reason}

                </div>
              )
            )
          }

          {/* SHAP */}

          {
            application.shap_factors?.length > 0 && (

              <>

                <hr className="my-5" />

                <h3
                  className="mb-4"
                  style={{
                    fontWeight: "800"
                  }}
                >

                  SHAP AI Factors

                </h3>

                {
                  application.shap_factors.map(

                    (item, index) => (

                      <div
                        key={index}
                        className="
                          alert
                          alert-warning
                        "
                      >

                        {item}

                      </div>
                    )
                  )
                }

              </>
            )
          }

          {/* ADMIN ACTIONS */}

          {
            localStorage.getItem(
              "is_staff"
            ) === "true"

            && (

              <>

                <hr className="my-5" />

                <h3
                  className="mb-4"
                  style={{
                    fontWeight: "800"
                  }}
                >

                  Underwriter Actions

                </h3>

                <div
                  className="
                    d-flex
                    gap-3
                    flex-wrap
                    mb-4
                  "
                >

                  <button
                    className="
                      btn
                      btn-success
                    "
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
                    onClick={() =>
                      updateStatus(
                        "ON_HOLD"
                      )
                    }
                  >

                    On Hold

                  </button>

                </div>

                {/* REPAYMENT */}

                <div className="mt-4">

                  <h5 className="mb-3">

                    Repayment Status

                  </h5>

                  <div
                    className="
                      d-flex
                      gap-3
                      flex-wrap
                    "
                  >

                    <select
                      className="form-select"
                      style={{
                        maxWidth: "250px"
                      }}
                      value={repaymentStatus}
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
                        btn-primary
                      "
                      onClick={
                        updateRepaymentStatus
                      }
                    >

                      Update Repayment

                    </button>

                  </div>

                </div>

              </>
            )
          }

        </div>

      </div>

    </div>
  )
}