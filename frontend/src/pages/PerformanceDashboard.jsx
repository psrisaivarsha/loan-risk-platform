import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

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

  // =========================
  // STATE
  // =========================

  const [

    performance,

    setPerformance

  ] = useState(null)

  // =========================
  // CARD STYLE
  // =========================

  const cardStyle = {

    borderRadius: "20px",

    border: "none",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  }

  // =========================
  // FETCH ANALYTICS
  // =========================

  useEffect(() => {

    fetchPerformance()

  }, [])

  const fetchPerformance = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/performance-analytics/`,

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
    }
  }

  // =========================
  // PIE CHART DATA
  // =========================

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

  // =========================
  // BAR CHART DATA
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (!performance) {

    return (

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
        "
        style={{
          height: "100vh"
        }}
      >

        <h2>

          Loading Performance Analytics...

        </h2>

      </div>
    )
  }

  // =========================
  // MAIN UI
  // =========================

  return (

    <div
      style={{
        background: "#F4F7FC",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        {/* HEADING */}

        <h1 className="mb-4">

          Model Performance Dashboard

        </h1>

        {/* BACK BUTTON */}

        <div className="mb-4">

          <button
            className="
              btn
              btn-dark
            "
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
                bg-primary
                text-white
              "
              style={cardStyle}
            >

              <h5>
                Total Loans
              </h5>

              <h1>

                {
                  performance.total_loans
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
                bg-success
                text-white
              "
              style={cardStyle}
            >

              <h5>
                Approval Rate
              </h5>

              <h1>

                {
                  performance.approval_rate
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
                bg-danger
                text-white
              "
              style={cardStyle}
            >

              <h5>
                Decline Rate
              </h5>

              <h1>

                {
                  performance.decline_rate
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
                bg-warning
                text-dark
              "
              style={cardStyle}
            >

              <h5>
                Avg Confidence
              </h5>

              <h1>

                {
                  performance.avg_confidence
                }%

              </h1>

            </div>

          </div>

        </div>

        {/* SUMMARY TABLE */}

        <div
          className="
            card
            mt-5
            p-4
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

            Performance Summary

          </h3>

          <table className="table">

            <thead>

              <tr>

                <th>Metric</th>

                <th>Value</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Total Loans</td>

                <td>

                  {
                    performance.total_loans
                  }

                </td>

              </tr>

              <tr>

                <td>Approved Loans</td>

                <td>

                  {
                    performance.approved
                  }

                </td>

              </tr>

              <tr>

                <td>Declined Loans</td>

                <td>

                  {
                    performance.declined
                  }

                </td>

              </tr>

              <tr>

                <td>Conditional Loans</td>

                <td>

                  {
                    performance.conditional
                  }

                </td>

              </tr>

              <tr>

                <td>Average Risk Score</td>

                <td>

                  {
                    performance.avg_risk_score
                  }

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* PIE CHART */}

        <div
          className="
            card
            p-4
            mt-5
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

            Decision Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={decisionData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#198754" />

                <Cell fill="#dc3545" />

                <Cell fill="#ffc107" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div
          className="
            card
            p-4
            mt-5
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

            Model Metrics

          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={metricsData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#0d6efd"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}