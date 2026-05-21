import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend

} from "recharts"

export default function PerformanceDashboard() {

  // =========================================
  // STATE
  // =========================================

  const [

    performance,

    setPerformance

  ] = useState(null)

  const [

    loading,

    setLoading

  ] = useState(true)

  // =========================================
  // CARD STYLE
  // =========================================

  const cardStyle = {

    borderRadius: "24px",

    border: "none",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"
  }

  // =========================================
  // FETCH ANALYTICS
  // =========================================

  useEffect(() => {

    console.log(
      "PERFORMANCE DASHBOARD OPENED"
    )

    fetchPerformance()

  }, [])

  // =========================================
  // API CALL
  // =========================================

  const fetchPerformance = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/performance-analytics/`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setPerformance(
        response.data
      )

    } catch (error) {

      console.log(error)

      // =========================================
      // FALLBACK DEMO MODE
      // =========================================

      if (
        error.response?.status === 401
      ) {

        toast.warning(
          "Demo Analytics Mode Enabled"
        )

        setPerformance({

          total_loans: 120,

          approved: 84,

          declined: 20,

          conditional: 16,

          approval_rate: 70,

          decline_rate: 17,

          avg_confidence: 91,

          avg_risk_score: 78
        })

      } else {

        toast.error(
          "Failed to load analytics"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // PIE CHART DATA
  // =========================================

  const decisionData = [

    {

      name: "Approved",

      value:
        performance?.approved || 0
    },

    {

      name: "Declined",

      value:
        performance?.declined || 0
    },

    {

      name: "Conditional",

      value:
        performance?.conditional || 0
    }
  ]

  // =========================================
  // BAR CHART DATA
  // =========================================

  const metricsData = [

    {

      name: "Approval Rate",

      value:
        performance?.approval_rate || 0
    },

    {

      name: "Decline Rate",

      value:
        performance?.decline_rate || 0
    },

    {

      name: "Confidence",

      value:
        performance?.avg_confidence || 0
    }
  ]

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

          Loading Performance Analytics...

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

        {/* HEADER */}

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

                color: "#0F172A",

                fontSize: "48px"
              }}
            >

              Model Performance Dashboard

            </h1>

            <p
              style={{
                color: "#64748B",
                fontSize: "18px"
              }}
            >

              AI underwriting performance,
              risk analytics,
              and decision intelligence.

            </p>

          </div>

          {/* BACK BUTTON */}

          <button
            className="
              btn
              btn-dark
            "
            style={{
              borderRadius: "14px",
              padding: "12px 20px"
            }}
            onClick={() =>
              window.location.href =
              "/admin-home"
            }
          >

            ← Back to Admin Home

          </button>

        </div>

        {/* TOP CARDS */}

        <div className="row g-4">

          {/* TOTAL LOANS */}

          <div className="col-md-3">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{

                ...cardStyle,

                background:
                  "linear-gradient(135deg, #2563EB, #1D4ED8)"
              }}
            >

              <h5>
                Total Loans
              </h5>

              <h1>

                {
                  performance?.total_loans || 0
                }

              </h1>

            </div>

          </div>

          {/* APPROVAL RATE */}

          <div className="col-md-3">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{

                ...cardStyle,

                background:
                  "linear-gradient(135deg, #16A34A, #15803D)"
              }}
            >

              <h5>
                Approval Rate
              </h5>

              <h1>

                {
                  performance?.approval_rate || 0
                }%

              </h1>

            </div>

          </div>

          {/* DECLINE RATE */}

          <div className="col-md-3">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{

                ...cardStyle,

                background:
                  "linear-gradient(135deg, #DC2626, #B91C1C)"
              }}
            >

              <h5>
                Decline Rate
              </h5>

              <h1>

                {
                  performance?.decline_rate || 0
                }%

              </h1>

            </div>

          </div>

          {/* AVG CONFIDENCE */}

          <div className="col-md-3">

            <div
              className="
                card
                p-4
                text-dark
              "
              style={{

                ...cardStyle,

                background:
                  "linear-gradient(135deg, #FACC15, #EAB308)"
              }}
            >

              <h5>
                Avg Confidence
              </h5>

              <h1>

                {
                  performance?.avg_confidence || 0
                }%

              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}