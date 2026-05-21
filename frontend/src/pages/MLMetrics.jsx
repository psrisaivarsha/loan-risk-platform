import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

export default function MLMetrics() {

  // =========================================
  // STATE
  // =========================================

  const [

    metrics,

    setMetrics

  ] = useState(null)

  const [

    loading,

    setLoading

  ] = useState(true)

  // =========================================
  // SESSION CHECK
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("token")

    const isStaff =
      localStorage.getItem("is_staff")

    // SESSION EXPIRED

    if (!token) {

      toast.error(
        "Session Expired"
      )

      window.location.href = "/"

      return
    }

    // ADMIN CHECK

    if (isStaff !== "true") {

      toast.error(
        "Unauthorized Access"
      )

      window.location.href =
        "/user-home"

      return
    }

    fetchMetrics()

  }, [])

  // =========================================
  // FETCH METRICS
  // =========================================

  const fetchMetrics = async () => {

    try {

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("token")

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/ml-metrics/`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      setMetrics(
        response.data
      )

    } catch (error) {

      console.log(error)

      // TOKEN EXPIRED

      if (
        error.response?.status === 401
      ) {

        toast.error(
          "Session Expired"
        )

        localStorage.clear()

        setTimeout(() => {

          window.location.href = "/"

        }, 1200)

      } else {

        toast.error(
          "Failed to load ML metrics"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // CARD STYLE
  // =========================================

  const cardStyle = {

    borderRadius: "20px",

    border: "none",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",

    transition: "0.3s"
  }

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

          Loading ML Metrics...

        </h4>

      </div>
    )
  }

  // =========================================
  // NO DATA
  // =========================================

  if (!metrics) {

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

        <div
          className="
            alert
            alert-warning
          "
        >

          No ML metrics available

        </div>

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

        {/* ========================================= */}
        {/* HEADER */}
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

                fontWeight: "800",

                color: "#0F172A",

                fontSize: "48px"
              }}
            >

              ML Model Metrics

            </h1>

            <p
              style={{
                color: "#64748B",
                fontSize: "18px"
              }}
            >

              Real-time AI underwriting
              model evaluation metrics
              and performance monitoring.

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

            ← Back

          </button>

        </div>

        {/* ========================================= */}
        {/* METRICS CARDS */}
        {/* ========================================= */}

        <div className="row g-4">

          {/* ACCURACY */}

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
                  "linear-gradient(135deg, #2563EB, #1D4ED8)"
              }}
            >

              <h5>

                Accuracy

              </h5>

              <h1>

                {
                  metrics?.accuracy || 0
                }%

              </h1>

            </div>

          </div>

          {/* PRECISION */}

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
                  "linear-gradient(135deg, #16A34A, #15803D)"
              }}
            >

              <h5>

                Precision

              </h5>

              <h1>

                {
                  metrics?.precision || 0
                }%

              </h1>

            </div>

          </div>

          {/* RECALL */}

          <div className="col-md-4">

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

                Recall

              </h5>

              <h1>

                {
                  metrics?.recall || 0
                }%

              </h1>

            </div>

          </div>

          {/* F1 SCORE */}

          <div className="col-md-6">

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

                F1 Score

              </h5>

              <h1>

                {
                  metrics?.f1_score || 0
                }%

              </h1>

            </div>

          </div>

          {/* ROC AUC */}

          <div className="col-md-6">

            <div
              className="
                card
                p-4
                text-white
              "
              style={{

                ...cardStyle,

                background:
                  "linear-gradient(135deg, #111827, #1F2937)"
              }}
            >

              <h5>

                ROC-AUC

              </h5>

              <h1>

                {
                  metrics?.roc_auc || 0
                }%

              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}