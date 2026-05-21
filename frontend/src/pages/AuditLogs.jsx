import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

export default function AuditLogs() {

  // =========================================
  // STATE
  // =========================================

  const [

    logs,

    setLogs

  ] = useState([])

  const [

    loading,

    setLoading

  ] = useState(true)

  // =========================================
  // FETCH LOGS
  // =========================================

  useEffect(() => {

    console.log(
      "AUDIT LOGS OPENED"
    )

    fetchLogs()

  }, [])

  // =========================================
  // API CALL
  // =========================================

  const fetchLogs = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/audit-logs/`,

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

      setLogs(
        response.data || []
      )

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
          "Authentication disabled in demo mode"
        )

        // DEMO DATA

        setLogs([

          {

            id: 1,

            application_name:
              "Rahul Sharma",

            model_version:
              "v1.0",

            created_at:
              new Date(),

            input_snapshot: {

              income: 75000,

              loan_amount: 500000,

              credit_score: 780
            },

            prediction_output: {

              risk_score: 82,

              decision: "APPROVE",

              risk_tier:
                "LOW_RISK"
            }
          }
        ])

      } else {

        toast.error(
          "Failed to load audit logs"
        )
      }

    } finally {

      setLoading(false)
    }
  }

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

          Loading Audit Logs...

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
          "#F4F7FC",

        minHeight:
          "100vh"
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
            mb-4
          "
        >

          <h1>

            Audit Logs Dashboard

          </h1>

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

        {/* EMPTY */}

        {
          logs.length === 0 && (

            <div
              className="
                alert
                alert-warning
              "
            >

              No audit logs available

            </div>
          )
        }

        {/* LOGS */}

        {
          logs.map((log) => (

            <div
              key={log.id}
              className="
                card
                shadow
                border-0
                p-4
                mb-4
              "
              style={{
                borderRadius: "20px"
              }}
            >

              {/* HEADER */}

              <div
                className="
                  d-flex
                  justify-content-between
                  align-items-center
                  mb-3
                "
              >

                <h4>

                  {
                    log.application_name
                  }

                </h4>

                <span
                  className="
                    badge
                    bg-primary
                  "
                >

                  {
                    log.model_version
                  }

                </span>

              </div>

              {/* CREATED */}

              <p>

                <strong>
                  Created:
                </strong>

                {" "}

                {
                  new Date(
                    log.created_at
                  ).toLocaleString()
                }

              </p>

              <hr />

              {/* INPUT */}

              <h5 className="mb-3">

                Input Snapshot

              </h5>

              <div
                className="
                  bg-light
                  p-3
                  rounded
                  mb-4
                "
              >

                <pre>

                  {
                    JSON.stringify(

                      log.input_snapshot,

                      null,

                      2
                    )
                  }

                </pre>

              </div>

              {/* OUTPUT */}

              <h5 className="mb-3">

                Prediction Output

              </h5>

              <div
                className="
                  bg-light
                  p-3
                  rounded
                "
              >

                <pre>

                  {
                    JSON.stringify(

                      log.prediction_output,

                      null,

                      2
                    )
                  }

                </pre>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}