import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

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

  // =========================
  // STATE
  // =========================

  const [

    biasData,

    setBiasData

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
  // FETCH DATA
  // =========================

  useEffect(() => {

    fetchBiasData()

  }, [])

  const fetchBiasData = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/bias-monitoring/`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setBiasData(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // LOADING
  // =========================

  if (!biasData) {

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

          Loading Bias Analytics...

        </h2>

      </div>
    )
  }

  // =========================
  // CHART DATA
  // =========================

  const chartData = [

    {
      name: "Salaried",

      approval_rate:
        biasData.SALARIED
          .approval_rate
    },

    {
      name: "Business",

      approval_rate:
        biasData.BUSINESS
          .approval_rate
    },

    {
      name: "Freelancer",

      approval_rate:
        biasData.FREELANCER
          .approval_rate
    }
  ]

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

          Bias Monitoring Dashboard

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

        {/* SUMMARY CARDS */}

        <div className="row g-4">

          {/* SALARIED */}

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
                Salaried Approval
              </h5>

              <h1>

                {
                  biasData
                    .SALARIED
                    .approval_rate
                }%

              </h1>

            </div>

          </div>

          {/* BUSINESS */}

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
                Business Approval
              </h5>

              <h1>

                {
                  biasData
                    .BUSINESS
                    .approval_rate
                }%

              </h1>

            </div>

          </div>

          {/* FREELANCER */}

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
                Freelancer Approval
              </h5>

              <h1>

                {
                  biasData
                    .FREELANCER
                    .approval_rate
                }%

              </h1>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div
          className="
            card
            p-4
            mt-5
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

            Fairness Summary

          </h3>

          <table className="table">

            <thead>

              <tr>

                <th>Employment Type</th>

                <th>Total Applications</th>

                <th>Approved</th>

                <th>Approval Rate</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>Salaried</td>

                <td>

                  {
                    biasData
                      .SALARIED
                      .total
                  }

                </td>

                <td>

                  {
                    biasData
                      .SALARIED
                      .approved
                  }

                </td>

                <td>

                  {
                    biasData
                      .SALARIED
                      .approval_rate
                  }%

                </td>

              </tr>

              <tr>

                <td>Business</td>

                <td>

                  {
                    biasData
                      .BUSINESS
                      .total
                  }

                </td>

                <td>

                  {
                    biasData
                      .BUSINESS
                      .approved
                  }

                </td>

                <td>

                  {
                    biasData
                      .BUSINESS
                      .approval_rate
                  }%

                </td>

              </tr>

              <tr>

                <td>Freelancer</td>

                <td>

                  {
                    biasData
                      .FREELANCER
                      .total
                  }

                </td>

                <td>

                  {
                    biasData
                      .FREELANCER
                      .approved
                  }

                </td>

                <td>

                  {
                    biasData
                      .FREELANCER
                      .approval_rate
                  }%

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* CHART */}

        <div
          className="
            card
            p-4
            mt-5
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

            Approval Rate Comparison

          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
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
                fill="#0d6efd"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}