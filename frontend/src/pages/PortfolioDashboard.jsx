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

  LineChart,
  Line,
  Legend

} from "recharts"
export default function PortfolioDashboard() {

  // =========================
  // STATE
  // =========================

  const [

    analytics,

    setAnalytics

  ] = useState(null)
  const [

  trendData,

  setTrendData

] = useState([])

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

    fetchAnalytics()
    fetchTrendData()

  }, [])

  const fetchAnalytics = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/portfolio-analytics/`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setAnalytics(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }
  // =========================================
// FETCH MONTHLY TRENDS
// =========================================

const fetchTrendData = async () => {

  try {

    const token =
      localStorage.getItem(
        "access"
      )

    const response =
      await axios.get(

        "http://127.0.0.1:8000/api/monthly-trends/",

        {

          headers: {

            Authorization:
              `Bearer ${token}`
          }
        }
      )

    console.log(
      response.data
    )

    // TRANSFORM DATA

    const grouped = {}

    response.data.forEach(

      (item) => {

        if (
          !grouped[item.month]
        ) {

          grouped[item.month] = {

            month: item.month,

            APPROVED: 0,

            REJECTED: 0,

            CONDITIONAL: 0
          }
        }

        grouped[item.month][
          item.status
        ] = item.total
      }
    )

    setTrendData(

      Object.values(grouped)
    )

  } catch (error) {

    console.log(error)
  }
}

  // =========================
  // PIE CHART DATA
  // =========================

  const pieData = [

    {
      name: "Approved",

      value:
        analytics?.approved_loans || 0
    },

    {
      name: "Declined",

      value:
        analytics?.declined_loans || 0
    },

    {
      name: "Conditional",

      value:
        analytics?.conditional_loans || 0
    }
  ]

  // =========================
  // BAR CHART DATA
  // =========================

  const riskData = [

    {
      name: "Low Risk",

      loans:
        analytics?.low_risk_loans || 0
    },

    {
      name: "Medium Risk",

      loans:
        analytics?.medium_risk_loans || 0
    },

    {
      name: "High Risk",

      loans:
        analytics?.high_risk_loans || 0
    }
  ]

  // =========================
  // LOADING
  // =========================

  if (!analytics) {

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

          Loading Portfolio Analytics...

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

          Portfolio Analytics

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

          {/* TOTAL PORTFOLIO */}

          <div className="col-md-4">

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
                Total Portfolio
              </h5>

              <h1>

  ₹
  {
    Number(
      analytics.total_portfolio
    ).toLocaleString(
      "en-IN"
    )
  }

</h1>

            </div>

          </div>

          {/* APPROVAL RATE */}

          <div className="col-md-4">

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
                  analytics.approval_rate
                }%

              </h1>

            </div>

          </div>

          {/* RISK EXPOSURE */}

          <div className="col-md-4">

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
                Risk Exposure
              </h5>

              <h1>

                {
                  analytics.risk_exposure
                }

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

            Portfolio Summary

          </h3>

          <table className="table">

            <thead>

              <tr>

                <th>Category</th>

                <th>Value</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Total Loans</td>

                <td>

                  {
                    analytics.total_loans
                  }

                </td>

              </tr>

              <tr>

                <td>Approved Loans</td>

                <td>

                  {
                    analytics.approved_loans
                  }

                </td>

              </tr>

              <tr>

                <td>Declined Loans</td>

                <td>

                  {
                    analytics.declined_loans
                  }

                </td>

              </tr>

              <tr>

                <td>Conditional Loans</td>

                <td>

                  {
                    analytics.conditional_loans
                  }

                </td>

              </tr>

              <tr>

                <td>High Risk Loans</td>

                <td>

                  {
                    analytics.high_risk_loans
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

            Loan Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
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

            Risk Tier Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={riskData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="loans"
                fill="#0d6efd"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
        {/* ========================================= */}
{/* MONTHLY TRENDS */}
{/* ========================================= */}

<div className="row mt-4">

  <div className="col-12">

    <div
      className="
        card
        p-4
      "
      style={cardStyle}
    >

      <h3 className="mb-4">

        Monthly Loan Trends

      </h3>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <LineChart
          data={trendData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          {/* APPROVED */}

          <Line

            type="monotone"

            dataKey="APPROVED"

            stroke="#198754"

            strokeWidth={3}
          />

          {/* REJECTED */}

          <Line

            type="monotone"

            dataKey="REJECTED"

            stroke="#dc3545"

            strokeWidth={3}
          />

          {/* CONDITIONAL */}

          <Line

            type="monotone"

            dataKey="CONDITIONAL"

            stroke="#ffc107"

            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

      </div>
      

    </div>
  )
}