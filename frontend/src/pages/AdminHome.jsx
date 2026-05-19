import { useEffect } from "react"

import {
  toast
} from "react-toastify"

import {

  LayoutDashboard,

  ShieldCheck,

  BarChart3,

  BrainCircuit,

  FileSearch,

  Activity,

  ArrowRight,

  Bell,

  LogOut

} from "lucide-react"
import Navbar from "../components/Navbar"

export default function AdminHome() {

  // =========================================
  // PAGE LOAD TOAST
  // =========================================

  useEffect(() => {

    toast.success(

      "Admin Dashboard Loaded"

    )

  }, [])

  // =========================================
  // CARD STYLE
  // =========================================

  const cardStyle = {

    border: "none",

    borderRadius: "24px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",

    transition: "0.3s",

    overflow: "hidden"
  }

  // =========================================
  // SIDEBAR MENU
  // =========================================

  const menuStyle = {

    padding: "14px 18px",

    borderRadius: "14px",

    cursor: "pointer",

    transition: "0.3s",

    color: "#CBD5E1",

    fontWeight: "600",

    marginBottom: "10px"
  }

  return (

    <div
      style={{

        background:
          "#F1F5F9",

        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container-fluid">

        <div className="row">

          {/* ========================================= */}
          {/* SIDEBAR */}
          {/* ========================================= */}

          <div
            className="col-lg-2"
            style={{

              background:
                "#0F172A",

              minHeight:
                "100vh",

              padding:
                "30px 20px",

              borderRight:
                "1px solid rgba(255,255,255,0.08)"
            }}
          >

            {/* LOGO */}

            <div className="mb-5">

              <h3
                style={{

                  color: "white",

                  fontWeight: "800"
                }}
              >

                LoanRisk AI

              </h3>

              <p
                style={{
                  color: "#94A3B8"
                }}
              >

                Admin Portal

              </p>

            </div>

            {/* MENU */}

            <div>

              {/* DASHBOARD */}

              {/* DASHBOARD */}

<div
  style={{

    ...menuStyle,

    background:
      "#2563EB",

    color:
      "white"
  }}

  onClick={() => {

    toast.info(
      "Opening Dashboard"
    )

    window.location.href =
      "/dashboard"
  }}
>

  <LayoutDashboard
    size={18}
    className="me-2"
  />

  Dashboard

</div>

              
              {/* PORTFOLIO */}

              <div
                style={menuStyle}

                onClick={() => {

                  toast.info(
                    "Opening Portfolio Analytics"
                  )

                  window.location.href =
                    "/portfolio-dashboard"
                }}
              >

                <BarChart3
                  size={18}
                  className="me-2"
                />

                Portfolio

              </div>

              {/* BIAS */}

              <div
                style={menuStyle}

                onClick={() => {

                  toast.info(
                    "Opening Bias Monitoring"
                  )

                  window.location.href =
                    "/bias-monitoring"
                }}
              >

                <BrainCircuit
                  size={18}
                  className="me-2"
                />

                Bias Monitoring

              </div>

              {/* AUDIT */}

              <div
                style={menuStyle}

                onClick={() => {

                  toast.info(
                    "Opening Audit Logs"
                  )

                  window.location.href =
                    "/audit-logs"
                }}
              >

                <FileSearch
                  size={18}
                  className="me-2"
                />

                Audit Logs

              </div>

              {/* PERFORMANCE */}

              <div
                style={menuStyle}

                onClick={() => {

                  toast.info(
                    "Opening Performance Dashboard"
                  )

                  window.location.href =
                    "/performance-dashboard"
                }}
              >

                <Activity
                  size={18}
                  className="me-2"
                />

                Performance

              </div>

            </div>

            {/* LOGOUT */}

            <div
              className="mt-5"
            >

              <button
                className="
                  btn
                  btn-danger
                  w-100
                  d-flex
                  align-items-center
                  justify-content-center
                  gap-2
                "
                style={{

                  borderRadius:
                    "14px",

                  height:
                    "50px"
                }}

                onClick={() => {

                  toast.success(
                    "Logged Out Successfully"
                  )

                  localStorage.clear()

                  setTimeout(() => {

                    window.location.href = "/"

                  }, 1500)
                }}
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          </div>

          {/* ========================================= */}
          {/* MAIN CONTENT */}
          {/* ========================================= */}

          <div
            className="col-lg-10"
            style={{
              padding: "40px"
            }}
          >

            {/* ========================================= */}
            {/* TOP SECTION */}
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

                    fontWeight:
                      "800",

                    fontSize:
                      "48px",

                    color:
                      "#0F172A"
                  }}
                >

                  Admin Control Center

                </h1>

                <p
                  style={{

                    color:
                      "#64748B",

                    fontSize:
                      "18px"
                  }}
                >

                  Enterprise AI Loan Risk
                  Assessment Platform

                </p>

              </div>

              {/* NOTIFICATIONS */}

              <div
                className="
                  d-flex
                  align-items-center
                  gap-3
                "
              >

                <div
                  className="
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  style={{

                    width: "50px",

                    height: "50px",

                    borderRadius: "14px",

                    background: "#FFFFFF",

                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.08)"
                  }}
                >

                  <Bell
                    size={22}
                    color="#2563EB"
                  />

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* KPI CARDS */}
            {/* ========================================= */}

            <div className="row g-4 mb-5">

              {/* CARD 1 */}

              <div className="col-lg-3">

                <div
                  className="
                    card
                    p-4
                    h-100
                  "
                  style={cardStyle}
                >

                  <LayoutDashboard
                    size={45}
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
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    12,840

                  </h2>

                  <p
                    style={{
                      color: "#16A34A"
                    }}
                  >

                    +12% this month

                  </p>

                </div>

              </div>

              {/* CARD 2 */}

              <div className="col-lg-3">

                <div
                  className="
                    card
                    p-4
                    h-100
                  "
                  style={cardStyle}
                >

                  <ShieldCheck
                    size={45}
                    color="#16A34A"
                  />

                  <h6
                    className="mt-4"
                    style={{
                      color: "#64748B"
                    }}
                  >

                    Approval Rate

                  </h6>

                  <h2
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    68%

                  </h2>

                  <p
                    style={{
                      color: "#16A34A"
                    }}
                  >

                    AI optimized lending

                  </p>

                </div>

              </div>

              {/* CARD 3 */}

              <div className="col-lg-3">

                <div
                  className="
                    card
                    p-4
                    h-100
                  "
                  style={cardStyle}
                >

                  <BrainCircuit
                    size={45}
                    color="#9333EA"
                  />

                  <h6
                    className="mt-4"
                    style={{
                      color: "#64748B"
                    }}
                  >

                    AI Accuracy

                  </h6>

                  <h2
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    94.8%

                  </h2>

                  <p
                    style={{
                      color: "#9333EA"
                    }}
                  >

                    SHAP Explainability

                  </p>

                </div>

              </div>

              {/* CARD 4 */}

              <div className="col-lg-3">

                <div
                  className="
                    card
                    p-4
                    h-100
                  "
                  style={cardStyle}
                >

                  <Activity
                    size={45}
                    color="#F59E0B"
                  />

                  <h6
                    className="mt-4"
                    style={{
                      color: "#64748B"
                    }}
                  >

                    Fraud Detection

                  </h6>

                  <h2
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    99.2%

                  </h2>

                  <p
                    style={{
                      color: "#F59E0B"
                    }}
                  >

                    Real-time monitoring

                  </p>

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* MAIN ANALYTICS SECTION */}
            {/* ========================================= */}

            <div className="row g-4">

              {/* LEFT PANEL */}

              <div className="col-lg-8">

                <div
                  className="
                    card
                    border-0
                    p-5
                  "
                  style={cardStyle}
                >

                  <div
                    className="
                      d-flex
                      justify-content-between
                      align-items-center
                      flex-wrap
                    "
                  >

                    <div>

                      <h2
                        style={{
                          fontWeight: "800"
                        }}
                      >

                        AI Portfolio Overview

                      </h2>

                      <p
                        style={{
                          color: "#64748B"
                        }}
                      >

                        Enterprise-grade
                        underwriting analytics
                        and risk monitoring.

                      </p>

                    </div>

                    <button
                      className="
                        btn
                        btn-primary
                        d-flex
                        align-items-center
                        gap-2
                      "
                      style={{

                        borderRadius:
                          "14px",

                        padding:
                          "12px 20px"
                      }}

                      onClick={() => {

                        toast.success(
                          "Opening Analytics Dashboard"
                        )

                        window.location.href =
                          "/portfolio-dashboard"
                      }}
                    >

                      Open Analytics

                      <ArrowRight size={18} />

                    </button>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">

                    <div
                      className="
                        d-flex
                        justify-content-between
                        mb-2
                      "
                    >

                      <span>

                        AI Portfolio Health

                      </span>

                      <span>

                        87%

                      </span>

                    </div>

                    <div
                      className="progress"
                      style={{
                        height: "14px",
                        borderRadius: "20px"
                      }}
                    >

                      <div
                        className="progress-bar"

                        style={{

                          width: "87%",

                          background:
                            "linear-gradient(to right, #2563EB, #16A34A)"
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT PANEL */}

              <div className="col-lg-4">

                <div
                  className="
                    card
                    border-0
                    p-4
                    h-100
                  "
                  style={cardStyle}
                >

                  <h4
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    AI Risk Pulse

                  </h4>

                  <div
                    className="
                      text-center
                      mt-5
                    "
                  >

                    <h1
                      style={{

                        fontSize: "72px",

                        fontWeight: "800",

                        color: "#2563EB"
                      }}
                    >

                      742

                    </h1>

                    <p
                      style={{
                        color: "#64748B"
                      }}
                    >

                      Aggregate AI Score

                    </p>

                  </div>

                  <div className="mt-5">

                    <div
                      className="
                        d-flex
                        justify-content-between
                        mb-3
                      "
                    >

                      <span>

                        Low Risk

                      </span>

                      <span>

                        62%

                      </span>

                    </div>

                    <div
                      className="
                        d-flex
                        justify-content-between
                        mb-3
                      "
                    >

                      <span>

                        Medium Risk

                      </span>

                      <span>

                        24%

                      </span>

                    </div>

                    <div
                      className="
                        d-flex
                        justify-content-between
                      "
                    >

                      <span>

                        High Risk

                      </span>

                      <span>

                        14%

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}