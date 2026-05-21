import { useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

export default function Login() {

  // =========================================
  // STATE
  // =========================================

  const [formData, setFormData] = useState({

    username: "",

    password: ""
  })

  const [loading, setLoading] =
    useState(false)

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
  // USER LOGIN
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    localStorage.clear()

    try {

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/login/`,

          formData
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
      // SAVE USER
      // =========================================

      localStorage.setItem(
        "username",
        response.data.username
      )

      localStorage.setItem(
        "is_staff",
        "false"
      )

      localStorage.setItem(
        "is_admin",
        "false"
      )

      toast.success(
        "User Login Successful"
      )

      // =========================================
      // USER HOME
      // =========================================

      setTimeout(() => {

        window.location.href =
          "/user-home"

      }, 1000)

    } catch (error) {

      console.log(error)

      toast.error(
        "Invalid Username or Password"
      )

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // ADMIN DIRECT LOGIN
  // =========================================

  const handleAdminLogin = () => {

    localStorage.setItem(
      "is_staff",
      "true"
    )

    localStorage.setItem(
      "is_admin",
      "true"
    )

    localStorage.setItem(
      "username",
      "Admin"
    )

    toast.success(
      "Admin Access Granted"
    )

    setTimeout(() => {

      window.location.href =
        "/dashboard"

    }, 1000)
  }

  // =========================================
  // UI
  // =========================================

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

            {/* ========================================= */}
            {/* HEADING */}
            {/* ========================================= */}

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
            {/* USER LOGIN FORM */}
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
                  placeholder="Enter Username"
                  value={formData.username}
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
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* USER LOGIN BUTTON */}

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
                  loading ? (

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

                  ) : (

                    "User Login"
                  )
                }

              </button>

            </form>

            {/* ========================================= */}
            {/* ADMIN BUTTON */}
            {/* ========================================= */}

           <button

  className="
    btn
    btn-dark
    btn-lg
    w-100
    mt-3
  "

  onClick={() => {

    // DUMMY TOKEN

    localStorage.setItem(
      "access",
      "admin-token"
    )

    localStorage.setItem(
      "token",
      "admin-token"
    )

    // ADMIN ROLE

    localStorage.setItem(
      "is_staff",
      "true"
    )

    localStorage.setItem(
      "is_admin",
      "true"
    )

    localStorage.setItem(
      "username",
      "Admin"
    )

    toast.success(
      "Admin Access Granted"
    )

    setTimeout(() => {

      window.location.href =
        "/admin-home"

    }, 1000)
  }}
>

  Admin Login

</button>

            {/* ========================================= */}
            {/* REGISTER */}
            {/* ========================================= */}

            <div className="text-center mt-4">

              <small className="text-muted">

                AI Powered Loan Decision Platform

              </small>

              <br />

              <button

                className="
                  btn
                  btn-link
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
              decisions, portfolio analytics,
              bias monitoring, and audit logs.

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}