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

  LineChart,
  Line,
  Legend

} from "recharts"

export default function PortfolioDashboard() {

  // =========================================
  // STATE
  // =========================================

  const [

    analytics,

    setAnalytics

  ] = useState(null)

  const [

    trendData,

    setTrendData

  ] = useState([])

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
  // FETCH
  // =========================================

  useEffect(() => {

    console.log(
      "ADMIN PAGE OPENED"
    )

    fetchAnalytics()

    fetchTrendData()

  }, [])

  // =========================================
  // FETCH ANALYTICS
  // =========================================

  const fetchAnalytics = async () => {

    try {

      const token =
        localStorage.getItem("access")

      const response =
        await axios.get(

          "http://127.0.0.1:8000/api/portfolio-analytics/",

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

      setAnalytics(
        response.data
      )
      console.log(response.data)

    } catch (error) {

      console.log(error)

      // =========================================
      // IGNORE 401
      // =========================================

      if (
        error.response?.status === 401
      ) {

        console.log(
          "401 ignored"
        )

        toast.warning(
          "Backend auth disabled"
        )

        // DEMO DATA

        setAnalytics({

          total_portfolio: 2500000,

          approval_rate: 82,

          risk_exposure: 12,

          total_loans: 25,

          approved_loans: 18,

          declined_loans: 5,

          conditional_loans: 2,

          high_risk_loans: 3,

          low_risk_loans: 14,

          medium_risk_loans: 8
        })

      } else {

        toast.error(
          "Failed to load portfolio analytics"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // FETCH TRENDS
  // =========================================

  const fetchTrendData = async () => {

    try {

      const token =
        localStorage.getItem("access")

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

      // DEMO TREND DATA

      setTrendData([

        {
          month: "Jan",
          APPROVED: 5,
          REJECTED: 1,
          CONDITIONAL: 1
        },

        {
          month: "Feb",
          APPROVED: 8,
          REJECTED: 2,
          CONDITIONAL: 1
        },

        {
          month: "Mar",
          APPROVED: 10,
          REJECTED: 3,
          CONDITIONAL: 2
        }
      ])
    }
  }

  // =========================================
  // CHART DATA
  // =========================================

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
            mb-5
          "
        >

          <div>

            <h1
              style={{
                fontWeight: "800"
              }}
            >

              Portfolio Analytics

            </h1>

          </div>

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

          <div className="col-md-4">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{
                ...cardStyle,
                background:
                  "linear-gradient(135deg,#2563EB,#1D4ED8)"
              }}
            >

              <h5>
                Total Portfolio
              </h5>

              <h1>

                ₹
                {
                  analytics?.total_portfolio
                }

              </h1>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{
                ...cardStyle,
                background:
                  "linear-gradient(135deg,#16A34A,#15803D)"
              }}
            >

              <h5>
                Approval Rate
              </h5>

              <h1>

                {
                  analytics?.approval_rate
                }%

              </h1>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{
                ...cardStyle,
                background:
                  "linear-gradient(135deg,#DC2626,#B91C1C)"
              }}
            >

              <h5>
                Risk Exposure
              </h5>

              <h1>

                {
                  analytics?.risk_exposure
                }

              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}