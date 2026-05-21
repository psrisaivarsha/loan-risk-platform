import { useEffect, useState } from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  FileText,
  ArrowLeft,
  Activity
} from "lucide-react"

import Navbar from "../components/Navbar"

import { Link } from "react-router-dom"

export default function MyApplications() {

  // =========================================
  // STATES
  // =========================================

  const [
    applications,
    setApplications
  ] = useState([])

  const [
    loading,
    setLoading
  ] = useState(true)

  // =========================================
  // FETCH APPLICATIONS
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("token")

    if (!token) {

      toast.error(
        "Session Expired"
      )

      window.location.href = "/"

      return
    }

    fetchApplications()

  }, [])

  // =========================================
  // API CALL
  // =========================================

  const fetchApplications = async () => {

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

      // =========================================
      // HANDLE PAGINATION RESPONSE
      // =========================================

      if (
        response.data.results
      ) {

        setApplications(
          response.data.results
        )

      } else {

        setApplications(
          response.data
        )
      }

    } catch (error) {

      console.log(error)

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
          "Failed To Load Applications"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // COUNTS
  // =========================================

  const approvedLoans =

    applications.filter(

      (app) =>
        app.status ===
        "APPROVED"

    ).length

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {

    return (

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
        "
        style={{
          height: "100vh",
          background:
            "linear-gradient(to bottom, #F1F5FF, #EEF2FF)"
        }}
      >

        <div className="text-center">

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

          <h4
            className="mt-4"
            style={{
              color: "#0F172A",
              fontWeight: "700"
            }}
          >

            Loading AI Applications...

          </h4>

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

        {/* HERO */}

        <div
          className="
            d-flex
            justify-content-between
            align-items-center
            flex-wrap
            mb-5
          "
        >

          <div>

            <h1
              style={{

                fontWeight: "800",

                fontSize: "52px",

                color: "#0F172A"
              }}
            >

              My Loan Applications

            </h1>

            <p
              style={{

                color: "#64748B",

                fontSize: "18px",

                maxWidth: "700px"
              }}
            >

              Monitor AI-generated loan
              decisions, track application
              status, and analyze explainable
              risk assessment outputs.

            </p>

          </div>

          <button

            className="
              btn
              btn-dark
              d-flex
              align-items-center
              gap-2
            "

            style={{

              borderRadius: "14px",

              padding: "12px 20px"
            }}

            onClick={() =>
              window.location.href =
              "/user-home"
            }
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">

          {/* TOTAL */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "28px",

                background: "#FFFFFF",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)"
              }}
            >

              <FileText
                size={42}
                color="#2563EB"
              />

              <h6
                className="mt-4"
                style={{
                  color: "#64748B"
                }}
              >

                Total Applications

              </h6>

              <h2
                className="mt-2"
                style={{
                  fontWeight: "800",
                  color: "#0F172A"
                }}
              >

                {applications.length}

              </h2>

            </div>

          </div>

          {/* APPROVED */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "28px",

                background: "#FFFFFF",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)"
              }}
            >

              <ShieldCheck
                size={42}
                color="#16A34A"
              />

              <h6
                className="mt-4"
                style={{
                  color: "#64748B"
                }}
              >

                Approved Loans

              </h6>

              <h2
                className="mt-2"
                style={{
                  fontWeight: "800",
                  color: "#16A34A"
                }}
              >

                {approvedLoans}

              </h2>

            </div>

          </div>

          {/* AI */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "28px",

                background: "#FFFFFF",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)"
              }}
            >

              <TrendingUp
                size={42}
                color="#F59E0B"
              />

              <h6
                className="mt-4"
                style={{
                  color: "#64748B"
                }}
              >

                AI Confidence

              </h6>

              <h2
                className="mt-2"
                style={{
                  fontWeight: "800",
                  color: "#F59E0B"
                }}
              >

                94%

              </h2>

            </div>

          </div>

          {/* SHAP */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius: "24px",

                padding: "28px",

                background: "#FFFFFF",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)"
              }}
            >

              <BrainCircuit
                size={42}
                color="#9333EA"
              />

              <h6
                className="mt-4"
                style={{
                  color: "#64748B"
                }}
              >

                Explainability

              </h6>

              <h2
                className="mt-2"
                style={{
                  fontWeight: "800",
                  color: "#9333EA"
                }}
              >

                SHAP AI

              </h2>

            </div>

          </div>

        </div>

        {/* EMPTY */}

        {
          applications.length === 0 && (

            <div
              className="
                card
                border-0
                text-center
                p-5
              "
              style={{

                borderRadius: "28px",

                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.08)"
              }}
            >

              <Activity
                size={70}
                color="#2563EB"
              />

              <h2
                className="mt-4"
                style={{
                  fontWeight: "800"
                }}
              >

                No Applications Found

              </h2>

              <p
                style={{
                  color: "#64748B"
                }}
              >

                Start your AI-powered
                lending journey today.

              </p>

              <Link
                to="/loan-form"
                className="
                  btn
                  btn-primary
                  mt-3
                "
                style={{

                  borderRadius: "14px",

                  padding:
                    "12px 24px"
                }}
              >

                Apply Loan

              </Link>

            </div>
          )
        }

        {/* APPLICATIONS TABLE */}

        {
          applications.length > 0 && (

            <div className="mt-5">

              <div
                className="card border-0"
                style={{

                  borderRadius: "24px",

                  padding: "30px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)"
                }}
              >

                <h3
                  className="mb-4"
                  style={{
                    fontWeight: "700"
                  }}
                >

                  Submitted Applications

                </h3>

                <div className="table-responsive">

                  <table className="table align-middle">

                    <thead>

                      <tr>

                        <th>Name</th>

                        <th>Loan Amount</th>

                        <th>Risk Score</th>

                        <th>Decision</th>

                        <th>Status</th>

                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        applications.map((app) => (

                          <tr key={app.id}>

                            <td>
                              {app.full_name}
                            </td>

                            <td>
                              ₹{app.loan_amount}
                            </td>

                            <td>
                              {app.risk_score}
                            </td>

                            <td>

                              <span
                                className={

                                  app.decision === "APPROVE"

                                    ? "badge bg-success"

                                    : app.decision === "DECLINE"

                                    ? "badge bg-danger"

                                    : "badge bg-warning text-dark"
                                }
                              >

                                {app.decision}

                              </span>

                            </td>

                            <td>

                              <span
                                className={

                                  app.status === "APPROVED"

                                    ? "badge bg-success"

                                    : app.status === "REJECTED"

                                    ? "badge bg-danger"

                                    : "badge bg-warning text-dark"
                                }
                              >

                                {app.status}

                              </span>

                            </td>

                            <td>

                              <Link
                                to={`/application/${app.id}`}
                                className="
                                  btn
                                  btn-primary
                                  btn-sm
                                "
                              >

                                View Full Report

                              </Link>

                            </td>

                          </tr>
                        ))
                      }

                    </tbody>

                  </table>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  )
}