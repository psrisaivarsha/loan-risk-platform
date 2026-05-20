import { useEffect, useState } from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import {
  BrainCircuit,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  FileText,
  ArrowLeft,
  Activity
} from "lucide-react"

import Navbar from "../components/Navbar"

import { Link } from "react-router-dom"

export default function MyApplications() {

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

    fetchApplications()

  }, [])

  const fetchApplications = async () => {

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

      setApplications(
        response.data
      )

      toast.success(

        "Applications Loaded Successfully"

      )

    } catch (error) {

      console.log(error)

      toast.error(

        "Failed To Load Applications"

      )

    } finally {

      setLoading(false)
    }
  }

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

        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}

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

        {/* ========================================= */}
        {/* STATS SECTION */}
        {/* ========================================= */}

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

                {
                  applications.length
                }

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

                {
                  applications.filter(

                    (app) =>
                      app.status ===
                      "APPROVED"

                  ).length
                }

              </h2>

            </div>

          </div>

          {/* RISK */}

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

        {/* ========================================= */}
        {/* EMPTY STATE */}
        {/* ========================================= */}

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

        {/* ========================================= */}
        {/* APPLICATION CARDS */}
        {/* ========================================= */}

        <div className="row g-4">

          {
            applications.map((app) => (

              <div
                className="col-lg-6"
                key={app.id}
              >

                <div
                  className="
                    card
                    border-0
                    h-100
                  "
                  style={{

                    borderRadius: "28px",

                    overflow: "hidden",

                    boxShadow:
                      "0 15px 40px rgba(0,0,0,0.08)"
                  }}
                >

                  {/* TOP HEADER */}

                  <div
                    style={{

                      background:
                        "linear-gradient(135deg, #2563EB, #1D4ED8)",

                      padding: "30px",

                      color: "white"
                    }}
                  >

                    <div
                      className="
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >

                      <div>

                        <h3
                          style={{
                            fontWeight: "800"
                          }}
                        >

                          {app.full_name}

                        </h3>

                        <p
                          style={{
                            color:
                              "rgba(255,255,255,0.85)"
                          }}
                        >

                          AI Underwriting Report

                        </p>

                      </div>

                      <span
                        className="badge"
                        style={{

                          background:
                            app.decision ===
                            "APPROVE"

                              ? "#16A34A"

                              : app.decision ===
                                "CONDITIONAL"

                              ? "#F59E0B"

                              : "#DC2626",

                          padding:
                            "12px 18px",

                          borderRadius:
                            "12px",

                          fontSize:
                            "14px"
                        }}
                      >

                        {app.decision}

                      </span>

                    </div>

                  </div>

                  {/* BODY */}

                  <div
                    className="p-4"
                  >

                    {/* GRID */}

                    <div className="row">

                      <div className="col-6 mb-4">

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Loan Amount

                        </h6>

                        <h5
                          style={{
                            fontWeight: "700"
                          }}
                        >

                          ₹{app.loan_amount}

                        </h5>

                      </div>

                      <div className="col-6 mb-4">

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Monthly Income

                        </h6>

                        <h5
                          style={{
                            fontWeight: "700"
                          }}
                        >

                          ₹{app.monthly_income}

                        </h5>

                      </div>

                      <div className="col-6 mb-4">

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Credit Score

                        </h6>

                        <h5
                          style={{
                            fontWeight: "700"
                          }}
                        >

                          {app.credit_score}

                        </h5>

                      </div>

                      <div className="col-6 mb-4">

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Risk Score

                        </h6>

                        <h5
                          style={{
                            color: "#2563EB",
                            fontWeight: "800"
                          }}
                        >

                          {app.risk_score}

                        </h5>

                      </div>

                    </div>

                    {/* RISK */}

                    <div
                      className="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-4
                      "
                    >

                      <div>

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Risk Tier

                        </h6>

                        <span
                          className="badge"
                          style={{

                            background:
                              app.risk_tier ===
                              "LOW_RISK"

                                ? "#DCFCE7"

                                : app.risk_tier ===
                                  "MEDIUM_RISK"

                                ? "#FEF3C7"

                                : "#FEE2E2",

                            color:
                              app.risk_tier ===
                              "LOW_RISK"

                                ? "#166534"

                                : app.risk_tier ===
                                  "MEDIUM_RISK"

                                ? "#92400E"

                                : "#991B1B",

                            padding:
                              "10px 16px",

                            borderRadius:
                              "12px",

                            fontSize:
                              "13px"
                          }}
                        >

                          {app.risk_tier}

                        </span>

                      </div>

                      <div>

                        <h6
                          style={{
                            color: "#64748B"
                          }}
                        >

                          Confidence

                        </h6>

                        <h5
                          style={{
                            fontWeight: "700"
                          }}
                        >

                          {
                            app.confidence_score
                          }%

                        </h5>

                      </div>

                    </div>

                    {/* STATUS */}

                    <div
                      className="mb-4"
                    >

                      <h6
                        style={{
                          color: "#64748B"
                        }}
                      >

                        Application Status

                      </h6>

                      <span
                        className="badge"
                        style={{

                          background:
                            app.status ===
                            "APPROVED"

                              ? "#16A34A"

                              : app.status ===
                                "REJECTED"

                              ? "#DC2626"

                              : "#F59E0B",

                          padding:
                            "10px 16px",

                          borderRadius:
                            "12px",

                          fontSize:
                            "13px"
                        }}
                      >

                        {app.status}

                      </span>

                    </div>

                    {/* AI EXPLANATION */}

                    <div
                      className="
                        p-4
                        mb-4
                      "
                      style={{

                        borderRadius: "18px",

                        background: "#F8FAFC"
                      }}
                    >

                      <h5
                        style={{
                          fontWeight: "700"
                        }}
                      >

                        AI Explanation

                      </h5>

                      <ul
                        className="mt-3"
                      >

                        {
                          app.explanation?.map(

                            (
                              reason,
                              index
                            ) => (

                              <li
                                key={index}
                                className="mb-2"
                              >

                                {reason}

                              </li>
                            )
                          )
                        }

                      </ul>

                    </div>

                    {/* BUTTON */}

                    <Link

                      to={`/application/${app.id}`}

                      className="
                        btn
                        btn-primary
                        w-100
                        border-0
                      "

                      style={{

                        height: "55px",

                        borderRadius: "16px",

                        fontWeight: "700",

                        background:
                          "linear-gradient(135deg, #2563EB, #1D4ED8)"
                      }}
                    >

                      View Full AI Report

                    </Link>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}