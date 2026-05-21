import { useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

export default function AdminLogin() {

  const [formData, setFormData] = useState({

    username: "",

    password: ""
  })

  const [loading, setLoading] =
    useState(false)

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    })
  }

  // =====================================
  // HANDLE LOGIN
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/login/`,

          formData
        )

      console.log(response.data)

      // =====================================
      // CHECK ADMIN
      // =====================================

      if (
        !response.data.is_staff
      ) {

        toast.error(
          "Not an Admin Account"
        )

        setLoading(false)

        return
      }

      // =====================================
      // SAVE DATA
      // =====================================

      localStorage.setItem(
        "access",
        response.data.access
      )

      localStorage.setItem(
        "refresh",
        response.data.refresh
      )

      localStorage.setItem(
        "username",
        response.data.username
      )

      localStorage.setItem(
        "is_staff",
        "true"
      )

      toast.success(
        "Admin Login Successful"
      )

      setTimeout(() => {

        window.location.href =
          "/dashboard"

      }, 1200)

    } catch (error) {

      console.log(error)

      toast.error(
        "Invalid Admin Credentials"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div
      className="
        d-flex
        justify-content-center
        align-items-center
      "
      style={{

        minHeight: "100vh",

        background:
          "linear-gradient(to right, #0F172A, #1E293B)"
      }}
    >

      <div
        className="
          card
          border-0
          shadow-lg
          p-5
        "
        style={{

          width: "100%",

          maxWidth: "450px",

          borderRadius: "24px"
        }}
      >

        <h1
          className="
            text-center
            mb-4
          "
          style={{

            fontWeight: "800",

            color: "#0F172A"
          }}
        >

          Admin Login

        </h1>

        <form onSubmit={handleSubmit}>

          {/* USERNAME */}

          <div className="mb-4">

            <label className="form-label">

              Username

            </label>

            <input
              type="text"
              name="username"
              className="
                form-control
                form-control-lg
              "
              onChange={handleChange}
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="mb-4">

            <label className="form-label">

              Password

            </label>

            <input
              type="password"
              name="password"
              className="
                form-control
                form-control-lg
              "
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="
              btn
              btn-dark
              btn-lg
              w-100
            "
            disabled={loading}
          >

            {
              loading
                ? "Logging In..."
                : "Admin Login"
            }

          </button>

        </form>

      </div>

    </div>
  )
}