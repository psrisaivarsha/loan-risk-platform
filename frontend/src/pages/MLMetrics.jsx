import Navbar from "../components/Navbar"

import {
  useEffect,
  useState
} from "react"

import axios from "axios"

export default function MLMetrics() {

  const [

    metrics,

    setMetrics

  ] = useState(null)

  useEffect(() => {

    fetchMetrics()

  }, [])

  const fetchMetrics = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:8000/api/ml-metrics/"
        )

      setMetrics(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const cardStyle = {

    borderRadius: "20px",

    border: "none",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  }

  if (!metrics) {

    return (

      <div className="p-5">

        Loading Metrics...

      </div>
    )
  }

  return (

    <div
      style={{
        background: "#F4F7FC",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        <h1 className="mb-5">

          ML Model Metrics

        </h1>

        <div className="row g-4">

          {/* ACCURACY */}

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

                Accuracy

              </h5>

              <h1>

                {
                  metrics.accuracy
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
                bg-success
                text-white
              "
              style={cardStyle}
            >

              <h5>

                Precision

              </h5>

              <h1>

                {
                  metrics.precision
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
                bg-warning
                text-dark
              "
              style={cardStyle}
            >

              <h5>

                Recall

              </h5>

              <h1>

                {
                  metrics.recall
                }%

              </h1>

            </div>

          </div>

          {/* F1 */}

          <div className="col-md-6">

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

                F1 Score

              </h5>

              <h1>

                {
                  metrics.f1_score
                }%

              </h1>

            </div>

          </div>

          {/* ROC */}

          <div className="col-md-6">

            <div
              className="
                card
                p-4
                bg-dark
                text-white
              "
              style={cardStyle}
            >

              <h5>

                ROC-AUC

              </h5>

              <h1>

                {
                  metrics.roc_auc
                }%

              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}