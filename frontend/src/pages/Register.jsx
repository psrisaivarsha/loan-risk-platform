import { useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

export default function Register() {

  // =========================================
  // STATE
  // =========================================

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: ""
  })

  const [loading, setLoading] = useState(false)

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
  // HANDLE REGISTER
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    // =========================================
    // VALIDATIONS
    // =========================================

    if (

      formData.username.trim().length < 3

    ) {

      toast.error(
        "Username must be at least 3 characters"
      )

      return
    }

    if (

      formData.password.length < 4

    ) {

      toast.error(
        "Password must be at least 4 characters"
      )

      return
    }

    setLoading(true)

    try {

      console.log(
        "Sending Data:",
        formData
      )

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/register/`,

          formData
        )

      console.log(
        "Backend Response:",
        response.data
      )

      // =========================================
      // SUCCESS MESSAGE
      // =========================================

      if (
        response.data?.message
      ) {

        toast.success(
          response.data.message
        )

      } else {

        toast.success(
          "Registration Successful"
        )
      }

      // =========================================
      // RESET FORM
      // =========================================

      setFormData({

        username: "",

        email: "",

        password: ""
      })

      // =========================================
      // REDIRECT
      // =========================================

      setTimeout(() => {

        window.location.href = "/"

      }, 1500)

    } catch (error) {

      console.log(
        "Full Error:",
        error
      )

      // =========================================
      // BACKEND VALIDATION ERROR
      // =========================================

      if (

        error.response?.data?.username?.[0]

      ) {

        toast.error(

          error.response.data.username[0]
        )
      }

      else if (

        error.response?.data?.email?.[0]

      ) {

        toast.error(

          error.response.data.email[0]
        )
      }

      else if (

        error.response?.data?.password?.[0]

      ) {

        toast.error(

          error.response.data.password[0]
        )
      }

      else if (

        error.response?.data?.error

      ) {

        toast.error(
          error.response.data.error
        )
      }

      else if (

        error.response?.data?.message

      ) {

        toast.error(
          error.response.data.message
        )
      }

      // =========================================
      // NETWORK ERROR
      // =========================================

      else if (

        error.code === "ERR_NETWORK"

      ) {

        toast.error(
          "Cannot connect to backend server"
        )
      }

      // =========================================
      // GENERIC ERROR
      // =========================================

      else {

        toast.error(
          "Registration Failed"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // MAIN UI
  // =========================================

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh"
      }}
    >

      <div className="row min-vh-100">

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
            p-4
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

              maxWidth: "460px",

              borderRadius: "28px"
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

                Create Account

              </h1>

              <p className="text-muted">

                Register to apply for
                AI-powered loans

              </p>

            </div>

            {/* FORM */}

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
                  value={formData.username}
                  className="
                    form-control
                    form-control-lg
                  "
                  placeholder="Enter username"
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />

              </div>

              {/* EMAIL */}

              <div className="mb-4">

                <label
                  className="
                    form-label
                    fw-semibold
                  "
                >

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="
                    form-control
                    form-control-lg
                  "
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                  autoComplete="email"
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
                  value={formData.password}
                  className="
                    form-control
                    form-control-lg
                  "
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="
                  btn
                  btn-primary
                  btn-lg
                  w-100
                "
                disabled={loading}
                style={{
                  borderRadius: "14px"
                }}
              >

                {
                  loading

                    ? "Registering..."

                    : "Register"
                }

              </button>

            </form>

            {/* LOGIN LINK */}

            <div className="text-center mt-4">

              <small>

                Already have an account?

                <button
                  type="button"
                  className="
                    btn
                    btn-link
                    text-decoration-none
                  "
                  onClick={() =>
                    window.location.href = "/"
                  }
                >

                  Login

                </button>

              </small>

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
                "rgba(0,0,0,0.50)"
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
                display-4
              "
            >

              AI-Powered Lending Platform

            </h1>

            <p className="mt-3 fs-5">

              Fast, transparent,
              secure, and explainable
              loan approvals powered
              by Artificial Intelligence.

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}