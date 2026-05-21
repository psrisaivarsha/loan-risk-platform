import { Link } from "react-router-dom"

import {

  ShieldCheck,
  BadgeDollarSign,
  BarChart3,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  Activity,
  CircleDollarSign

} from "lucide-react"

import Navbar from "../components/Navbar"

export default function UserHome() {

  // =====================================
  // USERNAME
  // =====================================

  const username =

    localStorage.getItem(
      "username"
    ) || "User"

  // =====================================
  // CARD STYLE
  // =====================================

  const cardStyle = {

    borderRadius: "24px",

    padding: "28px",

    background: "#FFFFFF",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",

    transition: "0.3s"
  }

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div
      style={{

        background:
          "linear-gradient(to bottom, #F1F5FF, #EEF2FF)",

        minHeight: "100vh"
      }}
    >

      {/* ===================================== */}
      {/* NAVBAR */}
      {/* ===================================== */}

      <Navbar />

      <div className="container py-5">

        {/* ===================================== */}
        {/* HERO SECTION */}
        {/* ===================================== */}

        <div
          className="
            row
            align-items-center
            mb-5
          "
        >

          {/* LEFT SIDE */}

          <div className="col-lg-7 mb-4">

            <span
              className="badge mb-4"
              style={{

                background:
                  "#DBEAFE",

                color:
                  "#1D4ED8",

                padding:
                  "10px 18px",

                borderRadius:
                  "20px",

                fontSize:
                  "14px"
              }}
            >

              AI Powered Financial Intelligence

            </span>

            <h1
              style={{

                fontSize:
                  "58px",

                fontWeight:
                  "800",

                lineHeight:
                  "1.1",

                color:
                  "#0F172A"
              }}
            >

              Welcome Back,
              <br />

              <span
                style={{

                  background:
                    "linear-gradient(to right, #2563EB, #1D4ED8)",

                  WebkitBackgroundClip:
                    "text",

                  WebkitTextFillColor:
                    "transparent"
                }}
              >

                {username}

              </span>

            </h1>

            <p
              className="mt-4"
              style={{

                color:
                  "#475569",

                fontSize:
                  "20px",

                maxWidth:
                  "650px",

                lineHeight:
                  "1.8"
              }}
            >

              Experience enterprise-grade
              AI-powered underwriting with
              explainable risk analysis,
              intelligent portfolio insights,
              and real-time financial analytics.

            </p>

            {/* BUTTONS */}

            <div
              className="
                d-flex
                flex-wrap
                gap-3
                mt-4
              "
            >

              {/* APPLY LOAN */}

              <Link
                to="/loan-form"
                className="
                  btn
                  btn-primary
                  btn-lg
                  border-0
                  d-flex
                  align-items-center
                  gap-2
                "
                style={{

                  borderRadius:
                    "16px",

                  padding:
                    "14px 28px",

                  fontWeight:
                    "700",

                  background:
                    "linear-gradient(135deg, #2563EB, #1D4ED8)",

                  boxShadow:
                    "0 10px 25px rgba(37,99,235,0.25)"
                }}
              >

                Apply Loan

                <ArrowRight size={20} />

              </Link>

              {/* VIEW APPLICATIONS */}

              <Link
                to="/my-applications"
                className="
                  btn
                  btn-light
                  btn-lg
                  d-flex
                  align-items-center
                  gap-2
                "
                style={{

                  borderRadius:
                    "16px",

                  padding:
                    "14px 28px",

                  fontWeight:
                    "700",

                  background:
                    "#FFFFFF",

                  color:
                    "#0F172A",

                  border:
                    "1px solid #E2E8F0",

                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.05)"
                }}
              >

                View Applications

              </Link>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-5">

            <div
              style={{

                borderRadius:
                  "30px",

                overflow:
                  "hidden",

                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.12)"
              }}
            >

              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80"
                alt="Fintech Dashboard"
                className="img-fluid"
                style={{

                  width:
                    "100%",

                  height:
                    "450px",

                  objectFit:
                    "cover"
                }}
              />

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* KPI SECTION */}
        {/* ===================================== */}

        <div className="row g-4 mb-5">

          {/* CARD 1 */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={cardStyle}
            >

              <ShieldCheck
                size={42}
                color="#2563EB"
              />

              <h6
                className="mt-4"
                style={{

                  color:
                    "#64748B",

                  fontWeight:
                    "600"
                }}
              >

                AI Accuracy

              </h6>

              <h2
                className="mt-2"
                style={{

                  fontWeight:
                    "800",

                  color:
                    "#0F172A"
                }}
              >

                94.8%

              </h2>

              <p
                style={{
                  color:
                    "#16A34A"
                }}
              >

                +3.2% this month

              </p>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={cardStyle}
            >

              <CircleDollarSign
                size={42}
                color="#0EA5E9"
              />

              <h6
                className="mt-4"
                style={{

                  color:
                    "#64748B",

                  fontWeight:
                    "600"
                }}
              >

                Loans Processed

              </h6>

              <h2
                className="mt-2"
                style={{

                  fontWeight:
                    "800",

                  color:
                    "#0F172A"
                }}
              >

                12,840

              </h2>

              <p
                style={{
                  color:
                    "#0EA5E9"
                }}
              >

                Enterprise scale analytics

              </p>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={cardStyle}
            >

              <TrendingUp
                size={42}
                color="#F59E0B"
              />

              <h6
                className="mt-4"
                style={{

                  color:
                    "#64748B",

                  fontWeight:
                    "600"
                }}
              >

                Approval Rate

              </h6>

              <h2
                className="mt-2"
                style={{

                  fontWeight:
                    "800",

                  color:
                    "#0F172A"
                }}
              >

                68%

              </h2>

              <p
                style={{
                  color:
                    "#F59E0B"
                }}
              >

                Risk optimized lending

              </p>

            </div>

          </div>

          {/* CARD 4 */}

          <div className="col-md-3">

            <div
              className="
                card
                border-0
                h-100
              "
              style={cardStyle}
            >

              <BrainCircuit
                size={42}
                color="#9333EA"
              />

              <h6
                className="mt-4"
                style={{

                  color:
                    "#64748B",

                  fontWeight:
                    "600"
                }}
              >

                Explainability

              </h6>

              <h2
                className="mt-2"
                style={{

                  fontWeight:
                    "800",

                  color:
                    "#0F172A"
                }}
              >

                SHAP AI

              </h2>

              <p
                style={{
                  color:
                    "#9333EA"
                }}
              >

                Transparent decisions

              </p>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* FEATURE SECTION */}
        {/* ===================================== */}

        <div className="row g-4 mb-5">

          {/* APPLY CARD */}

          <div className="col-lg-6">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius:
                  "28px",

                padding:
                  "36px",

                background:
                  "linear-gradient(135deg, #2563EB, #1D4ED8)",

                color:
                  "white",

                boxShadow:
                  "0 15px 40px rgba(37,99,235,0.25)"
              }}
            >

              <BadgeDollarSign
                size={56}
              />

              <h2
                className="mt-4"
                style={{
                  fontWeight:
                    "800"
                }}
              >

                Smart Loan Applications

              </h2>

              <p
                className="mt-3"
                style={{

                  color:
                    "rgba(255,255,255,0.85)",

                  fontSize:
                    "18px",

                  lineHeight:
                    "1.8"
                }}
              >

                Submit loan requests and receive
                explainable AI-based underwriting
                decisions powered by intelligent
                risk prediction systems.

              </p>

              <Link
                to="/loan-form"
                className="
                  btn
                  btn-light
                  mt-4
                  fw-bold
                "
                style={{

                  width:
                    "fit-content",

                  borderRadius:
                    "14px",

                  padding:
                    "12px 24px"
                }}
              >

                Start Application

              </Link>

            </div>

          </div>

          {/* ANALYTICS CARD */}

          <div className="col-lg-6">

            <div
              className="
                card
                border-0
                h-100
              "
              style={{

                borderRadius:
                  "28px",

                padding:
                  "36px",

                background:
                  "#FFFFFF",

                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.08)"
              }}
            >

              <BarChart3
                size={56}
                color="#16A34A"
              />

              <h2
                className="mt-4"
                style={{

                  fontWeight:
                    "800",

                  color:
                    "#0F172A"
                }}
              >

                AI Risk Insights

              </h2>

              <p
                className="mt-3"
                style={{

                  color:
                    "#475569",

                  fontSize:
                    "18px",

                  lineHeight:
                    "1.8"
                }}
              >

                Track approvals, monitor
                explainable AI outputs,
                and analyze portfolio
                performance using enterprise
                analytics dashboards.

              </p>

              <Link
                to="/my-applications"
                className="
                  btn
                  btn-success
                  mt-4
                  fw-bold
                "
                style={{

                  width:
                    "fit-content",

                  borderRadius:
                    "14px",

                  padding:
                    "12px 24px"
                }}
              >

                View Applications

              </Link>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* AI INSIGHTS */}
        {/* ===================================== */}

        <div
          className="
            card
            border-0
            p-5
          "
          style={{

            borderRadius:
              "28px",

            background:
              "linear-gradient(135deg, #0F172A, #111827)",

            color:
              "white",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.15)"
          }}
        >

          <div
            className="
              d-flex
              justify-content-between
              flex-wrap
              align-items-center
            "
          >

            <div>

              <div
                className="
                  d-flex
                  align-items-center
                  gap-2
                "
              >

                <Activity
                  size={22}
                  color="#22C55E"
                />

                <h5
                  style={{
                    letterSpacing:
                      "2px"
                  }}
                >

                  AI RISK PULSE

                </h5>

              </div>

              <h1
                className="mt-3"
                style={{

                  fontSize:
                    "64px",

                  fontWeight:
                    "800"
                }}
              >

                742

              </h1>

              <p
                style={{
                  color:
                    "#CBD5E1"
                }}
              >

                Aggregate Financial Health Score

              </p>

            </div>

            <div>

              <div
                className="
                  px-4
                  py-3
                "
                style={{

                  borderRadius:
                    "18px",

                  background:
                    "rgba(255,255,255,0.08)"
                }}
              >

                <h3
                  style={{
                    color:
                      "#22C55E"
                  }}
                >

                  +12%

                </h3>

                <p
                  className="m-0"
                  style={{
                    color:
                      "#CBD5E1"
                  }}
                >

                  Portfolio Growth

                </p>

              </div>

            </div>

          </div>

          {/* PROGRESS */}

          <div
            className="progress mt-5"
            style={{

              height:
                "14px",

              borderRadius:
                "20px",

              background:
                "#334155"
            }}
          >

            <div
              className="progress-bar"
              style={{

                width:
                  "74%",

                background:
                  "linear-gradient(to right, #22C55E, #FACC15)"
              }}
            ></div>

          </div>

          <p
            className="mt-4"
            style={{

              color:
                "#CBD5E1",

              fontSize:
                "17px",

              lineHeight:
                "1.8"
            }}
          >

            Your financial profile remains
            highly stable. AI prediction models
            indicate strong eligibility for
            premium loan products and low-risk
            lending categories.

          </p>

        </div>

        {/* ===================================== */}
        {/* FOOTER */}
        {/* ===================================== */}

        <div className="text-center mt-5">

          <h5
            style={{

              color:
                "#0F172A",

              fontWeight:
                "700"
            }}
          >

            Enterprise AI Lending Platform

          </h5>

          <p
            style={{
              color:
                "#64748B"
            }}
          >

            Built using React, Django REST Framework,
            Machine Learning, SHAP Explainability,
            JWT Authentication, and Enterprise Analytics.

          </p>

        </div>

      </div>

    </div>
  )
}