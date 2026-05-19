import { useState } from "react"
import axios from "axios"
import {toast} from "react-toastify"
export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  // Handle Input Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle Register

  const handleSubmit = async (e) => {

    e.preventDefault()

    // Password Validation

    if (formData.password.length < 4) {

      toast.error(
  "Password must be at least 4 characters"
)

      return
    }

    setLoading(true)

    try {

      console.log("Sending Data:", formData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register/`,
        formData
      )

      console.log("Backend Response:", response.data)

      // Success Message

      if (response.data.message) {

        toast.success(
  response.data.message
)

      } else {

        toast.success(
  "Registration Successful"
)
      }

      // Reset Form

      setFormData({
        username: "",
        email: "",
        password: ""
      })

      // Delay Redirect

      setTimeout(() => {

        window.location.href = "/"

      }, 1000)

    } catch (error) {

      console.log("Full Error:", error)

      // Backend Validation Error

      if (error.response?.data?.error) {

        toast.error(
  error.response.data.error
)

      }

      // Other Backend Errors

      else if (error.response?.data?.message) {

toast.error(
  error.response.data.message
)

      }

      // Server Not Running

      else if (error.code === "ERR_NETWORK") {

        toast.error(
  "Cannot connect to backend server"
)

      }

      // Generic Error

      else {

        toast.error(
  "Registration Failed"
)
      }

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="container-fluid vh-100">

      <div className="row h-100">

        {/* Left Side */}

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

            {/* Heading */}

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
                Register to apply for loans
              </p>

            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>

              {/* Username */}

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
                />

              </div>

              {/* Email */}

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
                />

              </div>

              {/* Password */}

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
                />

              </div>

              {/* Button */}

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
                    ? "Registering..."
                    : "Register"
                }

              </button>

            </form>

            {/* Login Link */}

            <div className="text-center mt-4">

              <small>

                Already have account?

                <button
                  className="
                    btn btn-link
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

        {/* Right Side */}

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
              AI-Powered Lending Platform
            </h1>

            <p className="mt-3 fs-5">

              Fast, transparent,
              and explainable
              loan approvals.

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}