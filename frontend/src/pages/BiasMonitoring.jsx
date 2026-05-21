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

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend

} from "recharts"

export default function BiasMonitoring() {

  // =====================================
  // STATE
  // =====================================

  const [

    biasData,

    setBiasData

  ] = useState(null)

  const [

    loading,

    setLoading

  ] = useState(true)

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {

    fetchBiasData()

  }, [])

  const fetchBiasData = async () => {

    try {

      const token =
        localStorage.getItem("access")

      console.log(
        "TOKEN:",
        token
      )

      const response =
        await axios.get(

          "http://127.0.0.1:8000/api/bias-monitoring/",

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(
        "BIAS DATA:",
        response.data
      )

      setBiasData(
        response.data
      )

    } catch (error) {

      console.log(
        "BIAS ERROR:",
        error
      )

      console.log(
        error.response?.data
      )

      toast.error(
        "Failed To Load Bias Data"
      )

    } finally {

      setLoading(false)
    }
  }

  // =====================================
  // LOADING
  // =====================================

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

          Loading Bias Monitoring...

        </h2>

      </div>
    )
  }

  // =====================================
  // NO DATA
  // =====================================

  if (!biasData) {

    return (

      <div
        style={{
          background: "#F4F7FC",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container py-5">

          <button
            className="
              btn
              btn-dark
              mb-4
            "
            onClick={() =>
              window.location.href =
              "/admin-home"
            }
          >

            ← Back to Admin Home

          </button>

          <div
            className="
              alert
              alert-warning
            "
          >

            No Bias Data Available

          </div>

        </div>

      </div>
    )
  }

  // =====================================
  // CHART DATA
  // =====================================

  const chartData = [

    {
      name: "Salaried",

      approval_rate:
        biasData?.SALARIED
          ?.approval_rate || 0
    },

    {
      name: "Business",

      approval_rate:
        biasData?.BUSINESS
          ?.approval_rate || 0
    },

    {
      name: "Freelancer",

      approval_rate:
        biasData?.FREELANCER
          ?.approval_rate || 0
    }
  ]

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div
      style={{
        background: "#F4F7FC",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        {/* TITLE */}

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

              Bias Monitoring Dashboard

            </h1>

            <p
              style={{
                color: "#64748B"
              }}
            >

              AI fairness and approval analysis

            </p>

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

            ← Back

          </button>

        </div>

        {/* SUMMARY CARDS */}

        <div className="row g-4 mb-5">

          {/* SALARIED */}

          <div className="col-md-4">

            <div
              className="
                card
                border-0
                p-4
                bg-primary
                text-white
              "
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>

                Salaried Approval

              </h5>

              <h1>

                {
                  biasData?.SALARIED
                    ?.approval_rate || 0
                }%

              </h1>

            </div>

          </div>

          {/* BUSINESS */}

          <div className="col-md-4">

            <div
              className="
                card
                border-0
                p-4
                bg-success
                text-white
              "
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>

                Business Approval

              </h5>

              <h1>

                {
                  biasData?.BUSINESS
                    ?.approval_rate || 0
                }%

              </h1>

            </div>

          </div>

          {/* FREELANCER */}

          <div className="col-md-4">

            <div
              className="
                card
                border-0
                p-4
                bg-danger
                text-white
              "
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>

                Freelancer Approval

              </h5>

              <h1>

                {
                  biasData?.FREELANCER
                    ?.approval_rate || 0
                }%

              </h1>

            </div>

          </div>

        </div>

        {/* CHART */}

        <div
          className="
            card
            border-0
            p-4
          "
          style={{
            borderRadius: "24px"
          }}
        >

          <h4 className="mb-4">

            Approval Rate Comparison

          </h4>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <BarChart
              data={chartData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="approval_rate"
                fill="#2563EB"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}