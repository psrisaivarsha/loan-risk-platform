import {
  useState,
  useEffect
} from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import {
  ArrowLeft,
  BrainCircuit
} from "lucide-react"

import Navbar from "../components/Navbar"

export default function LoanForm() {

  // =========================================
  // FORM STATE
  // =========================================

  const [formData, setFormData] = useState({

    full_name: "",

    email: "",

    age: "",

    monthly_income: "",

    employment_type: "SALARIED",

    loan_amount: "",

    existing_debt: "",

    credit_score: "",

    utility_payment_score: "",

    mobile_usage_score: ""
  })

  // =========================================
  // RESPONSE DATA
  // =========================================

  const [
    responseData,
    setResponseData
  ] = useState(null)

  // =========================================
  // LOADING
  // =========================================

  const [
    loading,
    setLoading
  ] = useState(false)

  // =========================================
  // CONSENT
  // =========================================

  const [
    consent,
    setConsent
  ] = useState(false)

  // =========================================
  // SESSION CHECK
  // =========================================

  useEffect(() => {

    const token =
      localStorage.getItem("access")

    if (!token) {

      toast.error(
        "Session Expired"
      )

      window.location.href = "/"
    }

  }, [])

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    })
  }

  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    // =========================================
    // VALIDATION
    // =========================================

    if (
      Number(formData.age) < 18
    ) {

      toast.error(
        "Applicant must be 18+"
      )

      setLoading(false)

      return
    }

    if (

      !formData.credit_score ||

      Number(formData.credit_score) < 300 ||

      Number(formData.credit_score) > 900

    ) {

      toast.error(
        "Credit score must be between 300 and 900"
      )

      setLoading(false)

      return
    }

    if (!consent) {

      toast.error(
        "Please accept consent policy"
      )

      setLoading(false)

      return
    }

    if (
      Number(formData.monthly_income) <= 0
    ) {

      toast.error(
        "Monthly income required"
      )

      setLoading(false)

      return
    }

    if (
      Number(formData.loan_amount) <= 0
    ) {

      toast.error(
        "Invalid loan amount"
      )

      setLoading(false)

      return
    }

    try {

      const token =
        localStorage.getItem("access")

      // =========================================
      // CLEAN PAYLOAD
      // =========================================

      const payload = {

        ...formData,

        age:
          Number(formData.age),

        monthly_income:
          Number(formData.monthly_income),

        loan_amount:
          Number(formData.loan_amount),

        existing_debt:
          Number(formData.existing_debt),

        credit_score:
          Number(formData.credit_score),

        utility_payment_score:
          Number(formData.utility_payment_score),

        mobile_usage_score:
          Number(formData.mobile_usage_score)
      }

      // =========================================
      // API CALL
      // =========================================

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/loan-applications/`,

          payload,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      console.log(response.data)

      // =========================================
      // SAVE RESPONSE
      // =========================================

      setResponseData(
        response.data
      )

      // =========================================
      // SUCCESS
      // =========================================

      toast.success(
        "Loan Application Submitted Successfully!"
      )

      // =========================================
      // RESET FORM
      // =========================================

      setFormData({

        full_name: "",

        email: "",

        age: "",

        monthly_income: "",

        employment_type: "SALARIED",

        loan_amount: "",

        existing_debt: "",

        credit_score: "",

        utility_payment_score: "",

        mobile_usage_score: ""
      })

      setConsent(false)

    } catch (error) {

      console.log(error)

      // =========================================
      // TOKEN EXPIRED
      // =========================================

      if (

        error.response?.data?.code ===
        "token_not_valid"

      ) {

        toast.error(
          "Session Expired. Login Again."
        )

        localStorage.clear()

        setTimeout(() => {

          window.location.href = "/"

        }, 1500)

        return
      }

      // =========================================
      // UNAUTHORIZED
      // =========================================

      if (
        error.response?.status === 401
      ) {

        toast.error(
          "Unauthorized Access"
        )
      }

      // =========================================
      // VALIDATION ERROR
      // =========================================

      else if (
        error.response?.data
      ) {

        console.log(
          error.response.data
        )

        toast.error(
          "Validation Failed"
        )
      }

      // =========================================
      // NETWORK ERROR
      // =========================================

      else if (
        error.code === "ERR_NETWORK"
      ) {

        toast.error(
          "Backend Server Not Running"
        )
      }

      // =========================================
      // GENERIC ERROR
      // =========================================

      else {

        toast.error(
          "Application Submission Failed"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // INPUT STYLE
  // =========================================

  const inputStyle = {

    borderRadius: "14px",

    height: "55px",

    border: "1px solid #CBD5E1",

    fontSize: "15px"
  }

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

        {/* HERO */}

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

              AI Loan Application

            </h1>

          </div>

          <button

            className="
              btn
              btn-dark
              d-flex
              align-items-center
              gap-2
            "

            style={{

              borderRadius: "14px",

              padding: "12px 20px"
            }}

            onClick={() =>
              window.location.href =
              "/user-home"
            }
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        {/* FORM CARD */}

        <div
          className="card border-0"
          style={{

            borderRadius: "30px",

            overflow: "hidden",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)"
          }}
        >

          <div className="row g-0">

            {/* LEFT */}

            <div
              className="col-lg-4"
              style={{

                background:
                  "linear-gradient(135deg, #2563EB, #1D4ED8)",

                color: "white",

                padding: "50px"
              }}
            >

              <BrainCircuit size={70} />

              <h2
                className="mt-4"
                style={{
                  fontWeight: "800"
                }}
              >

                Smart Risk Assessment

              </h2>

              <p className="mt-4">

                AI-powered underwriting
                with explainable decisions,
                portfolio intelligence,
                and real-time analytics.

              </p>

            </div>

            {/* RIGHT */}

            <div
              className="col-lg-8"
              style={{
                padding: "50px"
              }}
            >

              <form onSubmit={handleSubmit}>

                <div className="row">

                  {[
                    ["full_name", "Full Name"],
                    ["email", "Email"],
                    ["age", "Age"],
                    ["monthly_income", "Monthly Income"],
                    ["loan_amount", "Loan Amount"],
                    ["existing_debt", "Existing Debt"],
                    ["credit_score", "Credit Score"],
                    ["utility_payment_score", "Utility Payment Score"],
                    ["mobile_usage_score", "Mobile Usage Score"]
                  ].map(([name, label]) => (

                    <div
                      key={name}
                      className="col-md-6 mb-4"
                    >

                      <label className="form-label fw-semibold">

                        {label}

                      </label>

                      <input
                        type={
                          name === "email"
                            ? "email"
                            : name === "full_name"
                            ? "text"
                            : "number"
                        }

                        name={name}

                        className="form-control"

                        style={inputStyle}

                        value={formData[name]}

                        onChange={handleChange}

                        min={
                          name === "credit_score"
                            ? 300
                            : undefined
                        }

                        max={
                          name === "credit_score"
                            ? 900
                            : undefined
                        }

                        required
                      />

                    </div>
                  ))}

                  {/* EMPLOYMENT */}

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      Employment Type

                    </label>

                    <select
                      name="employment_type"
                      className="form-select"
                      style={inputStyle}
                      value={formData.employment_type}
                      onChange={handleChange}
                    >

                      <option value="SALARIED">
                        Salaried
                      </option>

                      <option value="BUSINESS">
                        Business
                      </option>

                      <option value="FREELANCER">
                        Freelancer
                      </option>

                    </select>

                  </div>

                </div>

                {/* CONSENT */}

                <div className="form-check mt-3">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) =>
                      setConsent(e.target.checked)
                    }
                  />

                  <label className="form-check-label">

                    I agree to share alternative
                    financial behavior data
                    for AI risk analysis

                  </label>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    btn
                    btn-primary
                    w-100
                    border-0
                    mt-4
                  "
                  style={{

                    height: "60px",

                    borderRadius: "16px",

                    fontWeight: "700",

                    fontSize: "18px"
                  }}
                >

                  {
                    loading
                      ? "AI Risk Analysis Running..."
                      : "Submit Loan Application"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

        {/* RESULT */}

        {
          responseData && (

            <div
              className="
                card
                border-0
                mt-5
              "
              style={{

                borderRadius: "28px",

                padding: "40px"
              }}
            >

              <h2>
                AI Decision Result
              </h2>

              <div className="row text-center mt-4">

                <div className="col-md-3">

                  <h6>Risk Score</h6>

                  <h2>
                    {responseData?.risk_score}
                  </h2>

                </div>

                <div className="col-md-3">

                  <h6>Risk Tier</h6>

                  <h2>
                    {responseData?.risk_tier}
                  </h2>

                </div>

                <div className="col-md-3">

                  <h6>Decision</h6>

                  <h2>
                    {responseData?.decision}
                  </h2>

                </div>

                <div className="col-md-3">

                  <h6>Status</h6>

                  <h2>
                    {responseData?.status}
                  </h2>

                </div>

              </div>

              {/* EXPLANATIONS */}

              <div className="mt-5">

                <h4>
                  AI Explainability Factors
                </h4>

                {
                  responseData?.explanations?.map(

                    (item, index) => (

                      <div
                        key={index}
                        className="
                          alert
                          alert-primary
                          mt-3
                        "
                      >

                        {item}

                      </div>
                    )
                  )
                }

              </div>

            </div>
          )
        }

      </div>

    </div>
  )
}