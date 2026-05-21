import { useEffect } from "react"

import {
  toast
} from "react-toastify"

import {

  LayoutDashboard,

  BarChart3,

  BrainCircuit,

  FileSearch,

  Activity,

  Bell,

  LogOut,

  ShieldCheck,

  XCircle,

  TrendingUp

} from "lucide-react"

import Navbar from "../components/Navbar"

export default function AdminHome() {

  // =========================================
  // ADMIN AUTH CHECK
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("token")

    const isStaff =
      localStorage.getItem("is_staff")

    if (!token) {

      toast.error(
        "Session Expired"
      )

      window.location.href = "/"

      return
    }

    if (isStaff !== "true") {

      toast.error(
        "Unauthorized Access"
      )

      window.location.href =
        "/user-home"

      return
    }

  }, [])

  // =========================================
  // MENU STYLE
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

  // =========================================
  // CARD STYLE
  // =========================================

  const cardStyle = {

    border: "none",

    borderRadius: "24px",

    padding: "28px",

    background: "#FFFFFF",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)"
  }

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.clear()

    toast.success(
      "Logged Out Successfully"
    )

    setTimeout(() => {

      window.location.href = "/"

    }, 1000)
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

          {/* SIDEBAR */}

          <div
            className="col-lg-2"
            style={{

              background:
                "#0F172A",

              minHeight:
                "100vh",

              padding:
                "30px 20px"
            }}
          >

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

              <div
                style={{
                  ...menuStyle,
                  background: "#2563EB",
                  color: "white"
                }}
              >

                <LayoutDashboard
                  size={18}
                  className="me-2"
                />

                Dashboard

              </div>

              <div
                style={menuStyle}
                onClick={() =>
                  window.location.href =
                  "/portfolio-dashboard"
                }
              >

                <BarChart3
                  size={18}
                  className="me-2"
                />

                Portfolio

              </div>

              <div
                style={menuStyle}
                onClick={() =>
                  window.location.href =
                  "/bias-monitoring"
                }
              >

                <BrainCircuit
                  size={18}
                  className="me-2"
                />

                Bias Monitoring

              </div>

              <div
                style={menuStyle}
                onClick={() =>
                  window.location.href =
                  "/audit-logs"
                }
              >

                <FileSearch
                  size={18}
                  className="me-2"
                />

                Audit Logs

              </div>

              <div
                style={menuStyle}
                onClick={() =>
                  window.location.href =
                  "/performance-dashboard"
                }
              >

                <Activity
                  size={18}
                  className="me-2"
                />

                Performance

              </div>

            </div>

            {/* LOGOUT */}

            <div className="mt-5">

              <button
                className="
                  btn
                  btn-danger
                  w-100
                "
                style={{
                  borderRadius: "14px",
                  height: "50px"
                }}
                onClick={handleLogout}
              >

                <LogOut
                  size={18}
                  className="me-2"
                />

                Logout

              </button>

            </div>

          </div>

          {/* MAIN CONTENT */}

          <div
            className="col-lg-10"
            style={{
              padding: "40px"
            }}
          >

            {/* TOP */}

            <div
              className="
                d-flex
                justify-content-between
                align-items-center
                mb-5
              "
            >

              <div>

                <h1
                  style={{

                    fontWeight:
                      "800",

                    fontSize:
                      "52px",

                    color:
                      "#0F172A"
                  }}
                >

                  Admin Control Center

                </h1>

                <p
                  style={{
                    color: "#64748B",
                    fontSize: "18px"
                  }}
                >

                  Enterprise AI Loan Risk Assessment Platform

                </p>

              </div>

              <div
                style={{

                  width: "52px",

                  height: "52px",

                  borderRadius: "14px",

                  background: "#FFFFFF",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

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

            {/* DASHBOARD CARDS */}

            <div className="row g-4">

              <div className="col-md-3">

                <div style={cardStyle}>

                  <LayoutDashboard
                    size={40}
                    color="#2563EB"
                  />

                  <h6 className="mt-4">

                    Total Applications

                  </h6>

                  <h1
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    124

                  </h1>

                </div>

              </div>

              <div className="col-md-3">

                <div style={cardStyle}>

                  <ShieldCheck
                    size={40}
                    color="#16A34A"
                  />

                  <h6 className="mt-4">

                    Approved Loans

                  </h6>

                  <h1
                    style={{
                      fontWeight: "800",
                      color: "#16A34A"
                    }}
                  >

                    98

                  </h1>

                </div>

              </div>

              <div className="col-md-3">

                <div style={cardStyle}>

                  <XCircle
                    size={40}
                    color="#DC2626"
                  />

                  <h6 className="mt-4">

                    Rejected Loans

                  </h6>

                  <h1
                    style={{
                      fontWeight: "800",
                      color: "#DC2626"
                    }}
                  >

                    26

                  </h1>

                </div>

              </div>

              <div className="col-md-3">

                <div style={cardStyle}>

                  <TrendingUp
                    size={40}
                    color="#9333EA"
                  />

                  <h6 className="mt-4">

                    AI Accuracy

                  </h6>

                  <h1
                    style={{
                      fontWeight: "800",
                      color: "#9333EA"
                    }}
                  >

                    94%

                  </h1>

                </div>

              </div>

            </div>

            {/* TABLE */}

            <div
              className="
                card
                border-0
                mt-5
              "
              style={{

                borderRadius: "24px",

                padding: "30px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)"
              }}
            >

              <h3
                style={{
                  fontWeight: "800"
                }}
              >

                Recent Applications

              </h3>

              <table className="table mt-4">

                <thead>

                  <tr>

                    <th>Name</th>

                    <th>Risk Score</th>

                    <th>Status</th>

                    <th>Risk Tier</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>Sathwik</td>

                    <td>780</td>

                    <td>APPROVED</td>

                    <td>LOW RISK</td>

                  </tr>

                  <tr>

                    <td>Rahul</td>

                    <td>620</td>

                    <td>CONDITIONAL</td>

                    <td>MEDIUM RISK</td>

                  </tr>

                  <tr>

                    <td>Anjali</td>

                    <td>480</td>

                    <td>REJECTED</td>

                    <td>HIGH RISK</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}