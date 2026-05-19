import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

export default function AuditLogs() {

  // =========================
  // STATE
  // =========================

  const [

    logs,

    setLogs

  ] = useState([])

  const [

    loading,

    setLoading

  ] = useState(true)

  // =========================
  // FETCH LOGS
  // =========================

  useEffect(() => {

    fetchLogs()

  }, [])

  const fetchLogs = async () => {

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/audit-logs/`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setLogs(
        response.data
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // LOADING
  // =========================

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

          Audit Logs Dashboard

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

        {/* LOG CARDS */}

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

              {/* INPUT SNAPSHOT */}

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

                <pre
                  className="mb-0"
                >

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

                <pre
                  className="mb-0"
                >

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