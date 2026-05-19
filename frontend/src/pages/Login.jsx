import { useState } from "react"

import axios from "axios"
import {toast} from "react-toastify"

export default function Login() {

  const [formData, setFormData] = useState({

    username: "",

    password: ""
  })

  const [loading, setLoading] =
    useState(false)

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    })
  }

  // =========================================
  // HANDLE LOGIN
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/login/`,

        formData
      )

      console.log(
        "LOGIN RESPONSE:",
        response.data
      )

      // =========================================
      // SAVE TOKENS
      // =========================================

      localStorage.setItem(

        "access",

        response.data.access
      )

      localStorage.setItem(

        "refresh",

        response.data.refresh
      )

      // =========================================
      // SAVE USER ROLE
      // =========================================

      localStorage.setItem(

        "is_admin",

        response.data.is_admin
      )

      // =========================================
      // SAVE USERNAME
      // =========================================

      localStorage.setItem(

        "username",

        response.data.username
      )

      // =========================================
      // SUCCESS MESSAGE
      // =========================================

      toast.success(
  "Login Successful"
)

      // =========================================
      // ROLE-BASED REDIRECT
      // =========================================

      setTimeout(() => {

  if (

    response.data.is_admin
  ) {

    window.location.href =
      "/admin-home"

  } else {

    window.location.href =
      "/user-home"
  }

}, 1200)

    } catch (error) {

      console.log(error)

      console.log(
        error.response?.data
      )

toast.error(
  "Invalid Username or Password"
)

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="container-fluid vh-100">

      <div className="row h-100">

        {/* ========================================= */}
        {/* LEFT SIDE */}
        {/* ========================================= */}

        <div
          className="
            col-lg-5
            d-flex
            justify-content-center
            align-items-center
            bg-light
          "
        >

          <div
            className="
              card
              shadow-lg
              border-0
              p-5
            "
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "24px"
            }}
          >

            {/* HEADING */}

            <div className="text-center mb-4">

              <h1
                className="
                  text-primary
                  fw-bold
                "
              >

                LoanRisk AI

              </h1>

              <p className="text-muted">

                Institutional Risk Intelligence Platform

              </p>

            </div>

            {/* ========================================= */}
            {/* LOGIN FORM */}
            {/* ========================================= */}

            <form onSubmit={handleSubmit}>

              {/* USERNAME */}

              <div className="mb-4">

                <label
                  className="
                    form-label
                    fw-semibold
                  "
                >

                  Username

                </label>

                <input
                  type="text"
                  name="username"
                  className="
                    form-control
                    form-control-lg
                  "
                  placeholder="Enter username"
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="mb-4">

                <label
                  className="
                    form-label
                    fw-semibold
                  "
                >

                  Password

                </label>

                <input
                  type="password"
                  name="password"
                  className="
                    form-control
                    form-control-lg
                  "
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="
                  btn
                  btn-primary
                  btn-lg
                  w-100
                "
                disabled={loading}
              >

                {
                  loading
                    ? (
                        <>
                          <span
                            className="
                              spinner-border
                              spinner-border-sm
                              me-2
                            "
                          ></span>

                          Logging In...
                        </>
                      )
                    : "Login"
                }

              </button>

            </form>

            {/* ========================================= */}
            {/* BOTTOM SECTION */}
            {/* ========================================= */}

            <div className="text-center mt-4">

              <small className="text-muted">

                AI Powered Loan Decision Platform

              </small>

              <br />

              <button

                className="
                  btn btn-link
                  text-decoration-none
                  mt-2
                "

                onClick={() =>
                  window.location.href =
                  "/register"
                }
              >

                Create New Account

              </button>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <div
          className="
            col-lg-7
            d-none
            d-lg-flex
            align-items-end
            text-white
            p-5
          "
          style={{

            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f')",

            backgroundSize: "cover",

            backgroundPosition: "center",

            minHeight: "100vh",

            position: "relative"
          }}
        >

          {/* OVERLAY */}

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.45)"
            }}
          ></div>

          {/* CONTENT */}

          <div
            className="position-relative"
            style={{
              zIndex: 2
            }}
          >

            <h1
              className="
                fw-bold
                display-5
              "
            >

              Precision Intelligence
              for Secured Lending

            </h1>

            <p className="mt-3 fs-5">

              Deploy AI-powered credit
              risk assessment with
              explainable underwriting
              decisions.

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}