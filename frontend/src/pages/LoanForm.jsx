import { useState } from "react"

import axios from "axios"

import {
  toast
} from "react-toastify"

import {
  User,
  Mail,
  Wallet,
  BadgeDollarSign,
  CreditCard,
  Briefcase,
  Smartphone,
  BarChart3,
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
  // RESPONSE STATE
  // =========================================

  const [

    responseData,

    setResponseData

  ] = useState(null)

  // =========================================
  // LOADING STATE
  // =========================================

  const [

    loading,

    setLoading

  ] = useState(false)

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

    try {

      const token =
        localStorage.getItem(
          "access"
        )

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/loan-applications/`,

          formData,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setResponseData(
        response.data
      )

      toast.success(

        "Loan Application Submitted Successfully!"

      )

    } catch (error) {

      console.log(error)

      if (

        error.response?.data?.code ===
        "token_not_valid"

      ) {

        toast.error(

          "Session Expired. Please Login Again."

        )

        localStorage.clear()

        setTimeout(() => {

          window.location.href = "/"

        }, 2000)

        return
      }

      toast.error(

        "Application Submission Failed"

      )

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

    paddingLeft: "45px",

    fontSize: "15px"
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
        {/* HERO SECTION */}
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

              AI Loan Application

            </h1>

            <p
              style={{

                color: "#64748B",

                fontSize: "18px",

                maxWidth: "700px"
              }}
            >

              Submit your financial details
              and receive intelligent
              AI-powered underwriting
              decisions with explainable
              risk analysis.

            </p>

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

        {/* ========================================= */}
        {/* MAIN CARD */}
        {/* ========================================= */}

        <div
          className="
            card
            border-0
          "
          style={{

            borderRadius: "30px",

            overflow: "hidden",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)"
          }}
        >

          <div className="row g-0">

            {/* ========================================= */}
            {/* LEFT PANEL */}
            {/* ========================================= */}

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

              <p
                className="mt-4"
                style={{

                  color:
                    "rgba(255,255,255,0.85)",

                  lineHeight: "1.9",

                  fontSize: "17px"
                }}
              >

                Our AI underwriting engine
                analyzes credit behavior,
                income stability, utility
                scores, and financial
                indicators to generate
                intelligent lending decisions.

              </p>

              {/* FEATURES */}

              <div className="mt-5">

                <div className="mb-4">

                  ✅ AI Risk Prediction

                </div>

                <div className="mb-4">

                  ✅ SHAP Explainability

                </div>

                <div className="mb-4">

                  ✅ Portfolio Analytics

                </div>

                <div className="mb-4">

                  ✅ Secure Financial Processing

                </div>

              </div>

            </div>

            {/* ========================================= */}
            {/* RIGHT PANEL */}
            {/* ========================================= */}

            <div
              className="col-lg-8"
              style={{
                padding: "50px"
              }}
            >

              <h2
                style={{

                  fontWeight: "800",

                  color: "#0F172A"
                }}
              >

                Applicant Information

              </h2>

              <p
                style={{
                  color: "#64748B"
                }}
              >

                Complete all fields carefully
                for accurate AI risk analysis.

              </p>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-5"
              >

                <div className="row">

                  {/* FULL NAME */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Full Name

                    </label>

                    <div className="position-relative">

                      <User
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        style={inputStyle}
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* EMAIL */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Email

                    </label>

                    <div className="position-relative">

                      <Mail
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        style={inputStyle}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* AGE */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Age

                    </label>

                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      style={inputStyle}
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* EMPLOYMENT */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Employment Type

                    </label>

                    <div className="position-relative">

                      <Briefcase
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px",

                          zIndex: 10
                        }}
                      />

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

                  {/* MONTHLY INCOME */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Monthly Income

                    </label>

                    <div className="position-relative">

                      <Wallet
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="number"
                        name="monthly_income"
                        className="form-control"
                        style={inputStyle}
                        value={formData.monthly_income}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* LOAN AMOUNT */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Loan Amount

                    </label>

                    <div className="position-relative">

                      <BadgeDollarSign
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="number"
                        name="loan_amount"
                        className="form-control"
                        style={inputStyle}
                        value={formData.loan_amount}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* EXISTING DEBT */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Existing Debt

                    </label>

                    <input
                      type="number"
                      name="existing_debt"
                      className="form-control"
                      style={inputStyle}
                      value={formData.existing_debt}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* CREDIT SCORE */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Credit Score

                    </label>

                    <div className="position-relative">

                      <CreditCard
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="number"
                        name="credit_score"
                        className="form-control"
                        style={inputStyle}
                        value={formData.credit_score}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* UTILITY SCORE */}

                  <div className="col-md-6 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Utility Payment Score

                    </label>

                    <input
                      type="number"
                      name="utility_payment_score"
                      className="form-control"
                      style={inputStyle}
                      value={formData.utility_payment_score}
                      onChange={handleChange}
                    />

                  </div>

                  {/* MOBILE SCORE */}

                  <div className="col-md-12 mb-4">

                    <label
                      className="form-label fw-semibold"
                    >

                      Mobile Usage Score

                    </label>

                    <div className="position-relative">

                      <Smartphone
                        size={18}
                        color="#64748B"
                        style={{

                          position: "absolute",

                          top: "18px",

                          left: "15px"
                        }}
                      />

                      <input
                        type="number"
                        name="mobile_usage_score"
                        className="form-control"
                        style={inputStyle}
                        value={formData.mobile_usage_score}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>

                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    btn
                    btn-primary
                    w-100
                    border-0
                    mt-3
                  "
                  style={{

                    height: "60px",

                    borderRadius: "16px",

                    fontWeight: "700",

                    fontSize: "18px",

                    background:
                      "linear-gradient(135deg, #2563EB, #1D4ED8)",

                    boxShadow:
                      "0 10px 25px rgba(37,99,235,0.25)"
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

        {/* ========================================= */}
        {/* RESULT CARD */}
        {/* ========================================= */}

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

                padding: "40px",

                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.08)"
              }}
            >

              <div
                className="
                  d-flex
                  align-items-center
                  gap-3
                  mb-4
                "
              >

                <BarChart3
                  size={40}
                  color="#16A34A"
                />

                <div>

                  <h2
                    style={{
                      fontWeight: "800"
                    }}
                  >

                    AI Decision Result

                  </h2>

                  <p
                    style={{
                      color: "#64748B"
                    }}
                  >

                    Explainable AI-based
                    underwriting output

                  </p>

                </div>

              </div>

              <div className="row text-center">

                <div className="col-md-3 mb-4">

                  <div
                    className="p-4"
                    style={{

                      borderRadius: "18px",

                      background: "#EFF6FF"
                    }}
                  >

                    <h6>Risk Score</h6>

                    <h2
                      style={{
                        color: "#2563EB"
                      }}
                    >

                      {
                        responseData.risk_score
                      }

                    </h2>

                  </div>

                </div>

                <div className="col-md-3 mb-4">

                  <div
                    className="p-4"
                    style={{

                      borderRadius: "18px",

                      background: "#FEF2F2"
                    }}
                  >

                    <h6>Risk Tier</h6>

                    <h2
                      style={{
                        color: "#DC2626"
                      }}
                    >

                      {
                        responseData.risk_tier
                      }

                    </h2>

                  </div>

                </div>

                <div className="col-md-3 mb-4">

                  <div
                    className="p-4"
                    style={{

                      borderRadius: "18px",

                      background: "#ECFDF5"
                    }}
                  >

                    <h6>Decision</h6>

                    <h2
                      style={{
                        color: "#16A34A"
                      }}
                    >

                      {
                        responseData.decision
                      }

                    </h2>

                  </div>

                </div>

                <div className="col-md-3 mb-4">

                  <div
                    className="p-4"
                    style={{

                      borderRadius: "18px",

                      background: "#F5F3FF"
                    }}
                  >

                    <h6>Status</h6>

                    <h2
                      style={{
                        color: "#7C3AED"
                      }}
                    >

                      {
                        responseData.status
                      }

                    </h2>

                  </div>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  )
}