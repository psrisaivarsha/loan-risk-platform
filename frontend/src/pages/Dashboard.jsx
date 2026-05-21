import { useEffect, useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

import Navbar from "../components/Navbar"

export default function Dashboard() {

  const [applications, setApplications] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // =========================================
  // FETCH APPLICATIONS
  // =========================================

  useEffect(() => {

    fetchApplications()

  }, [])

  const fetchApplications = async () => {

    try {

      const token =
        localStorage.getItem("access")

      // =========================================
      // DUMMY DATA
      // =========================================

      const dummyApplications = [

        {
          id: 1,
          full_name: "Sathwik",
          loan_amount: 500000,
          risk_score: 780,
          risk_tier: "LOW_RISK",
          decision: "APPROVE",
          status: "APPROVED"
        },

        {
          id: 2,
          full_name: "Rahul",
          loan_amount: 300000,
          risk_score: 620,
          risk_tier: "MEDIUM_RISK",
          decision: "CONDITIONAL",
          status: "CONDITIONAL"
        },

        {
          id: 3,
          full_name: "Anjali",
          loan_amount: 700000,
          risk_score: 480,
          risk_tier: "HIGH_RISK",
          decision: "DECLINE",
          status: "REJECTED"
        }

      ]

      // =========================================
      // API
      // =========================================

      try {

        const response =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/admin-applications/`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        setApplications(
          response.data
        )

      } catch {

        setApplications(
          dummyApplications
        )
      }

    } catch (error) {

      console.log(error)

      toast.error(
        "Failed To Load Applications"
      )

    } finally {

      setLoading(false)
    }
  }

  // =========================================
  // LOADING
  // =========================================

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

        <div
          className="
            spinner-border
            text-primary
          "
        ></div>

      </div>
    )
  }

  // =========================================
  // MAIN UI
  // =========================================

  return (

    <div
      style={{
        background: "#F1F5F9",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        {/* BACK BUTTON */}

        <button

          className="
            btn
            btn-dark
            mb-4
          "

          style={{
            borderRadius: "14px",
            padding: "10px 20px"
          }}

          onClick={() => {

            window.location.href =
              "/admin-home"
          }}
        >

          ← Back To Admin Home

        </button>

        {/* TITLE */}

        <h1
          style={{
            fontWeight: "800",
            fontSize: "52px",
            color: "#0F172A"
          }}
        >

          Admin Loan Dashboard

        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "18px"
          }}
        >

          Manage AI loan applications and underwriter decisions

        </p>

        {/* TABLE */}

        <div
          className="
            card
            border-0
            mt-5
          "
          style={{
            borderRadius: "24px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.06)"
          }}
        >

          <table className="table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Applicant</th>

                <th>Loan Amount</th>

                <th>Risk Score</th>

                <th>Risk Tier</th>

                <th>Decision</th>

                <th>Status</th>

                

              </tr>

            </thead>

            <tbody>

              {
                applications.map((app) => (

                  <tr key={app.id}>

                    <td>{app.id}</td>

                    <td>{app.full_name}</td>

                    <td>
                      ₹{app.loan_amount}
                    </td>

                    <td>
                      {app.risk_score}
                    </td>

                    <td>
                      {app.risk_tier}
                    </td>

                    <td>
                      {app.decision}
                    </td>

                    <td>
                      {app.status}
                    </td>


                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}