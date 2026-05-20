import Navbar from "../components/Navbar"
import { CSVLink } from "react-csv"
import {
  useEffect,
  useState
} from "react"
import {toast} from "react-toastify"

import axios from "axios"

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid

} from "recharts"

export default function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [

    search,

    setSearch

  ] = useState("")

  const [

    sortOrder,

    setSortOrder

  ] = useState("high")
  const [
  riskFilter,
  setRiskFilter
] = useState("all")

const [
  statusFilter,
  setStatusFilter
] = useState("all")

const [
  employmentFilter,
  setEmploymentFilter
] = useState("all")

  const [

    dashboardData,

    setDashboardData

  ] = useState([])

  const [

    loading,

    setLoading

  ] = useState(true)

  const [

    error,

    setError

  ] = useState("")
  const [
  currentPage,
  setCurrentPage
] = useState(1)

const [
  nextPage,
  setNextPage
] = useState(null)

const [
  previousPage,
  setPreviousPage
] = useState(null)

  // =====================================
  // CARD STYLE
  // =====================================

  const cardStyle = {

  borderRadius: "24px",

  border: "none",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",

  transition: "0.3s",

  overflow: "hidden",

  cursor: "pointer"
}

  // =====================================
  // FETCH DASHBOARD DATA
  // =====================================

 const fetchDashboardData = (

  page = 1

) => {

  setLoading(true)

  axios.get(

    `${import.meta.env.VITE_API_URL}/api/admin-loans/?page=${page}`,

    {

      headers: {

        Authorization:

          `Bearer ${
            localStorage.getItem(
              "access"
            )
          }`
      }
    }
  )

  .then((response) => {

    // =====================================
    // RESULTS
    // =====================================

    setDashboardData(

      response.data.results
    )

    // =====================================
    // PAGINATION
    // =====================================

    setNextPage(

      response.data.next
    )

    setPreviousPage(

      response.data.previous
    )

    setCurrentPage(page)

    setError("")

    setLoading(false)

  })

  .catch((error) => {

    console.log(error)

    setError(
      "Failed to load dashboard"
    )

    setLoading(false)

  })
}
  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {

    fetchDashboardData()

  }, [])

  // =====================================
  // COUNTS
  // =====================================

  const approvedLoans =

    dashboardData?.filter(

      (loan) =>

        loan.status ===
        "APPROVED"

    ).length || 0

  const declinedLoans =

    dashboardData?.filter(

      (loan) =>

        loan.status ===
        "REJECTED"

    ).length || 0

  const conditionalLoans =

    dashboardData?.filter(

      (loan) =>

        loan.status ===
        "CONDITIONAL"

    ).length || 0

  const highRiskLoans =

    dashboardData?.filter(

      (loan) =>

        loan.risk_tier ===
        "HIGH_RISK"

    ).length || 0

  const lowRiskLoans =

    dashboardData?.filter(

      (loan) =>

        loan.risk_tier ===
        "LOW_RISK"

    ).length || 0

  const mediumRiskLoans =

    dashboardData?.filter(

      (loan) =>

        loan.risk_tier ===
        "MEDIUM_RISK"

    ).length || 0

  // =========================================
  // PIE CHART DATA
  // =========================================

  const pieData = [

    {

      name: "Approved",

      value: approvedLoans
    },

    {

      name: "Rejected",

      value: declinedLoans
    },

    {

      name: "Conditional",

      value: conditionalLoans
    }
  ]

  // =========================================
  // BAR CHART DATA
  // =========================================

  const barData = [

    {

      risk: "Low",

      value: lowRiskLoans
    },

    {

      risk: "Medium",

      value: mediumRiskLoans
    },

    {

      risk: "High",

      value: highRiskLoans
    }
  ]

  // =====================================
  // FILTERED + SORTED DATA
  // =====================================

const filteredLoans =

  dashboardData

    ?.filter((loan) => {

      // =====================================
      // SEARCH
      // =====================================

      const matchesSearch =

        loan.full_name
          ?.toLowerCase()

          .includes(

            search.toLowerCase()
          )

      // =====================================
      // RISK FILTER
      // =====================================

      const matchesRisk =

        riskFilter === "all"

        ||

        loan.risk_tier ===
        riskFilter

      // =====================================
      // STATUS FILTER
      // =====================================

      const matchesStatus =

        statusFilter === "all"

        ||

        loan.status ===
        statusFilter

      // =====================================
      // EMPLOYMENT FILTER
      // =====================================

      const matchesEmployment =

        employmentFilter === "all"

        ||

        loan.employment_type ===
        employmentFilter

      // =====================================
      // FINAL FILTER
      // =====================================

      return (

        matchesSearch

        &&

        matchesRisk

        &&

        matchesStatus

        &&

        matchesEmployment
      )
    })

    ?.sort((a, b) => {

      // =====================================
      // HIGH TO LOW
      // =====================================

      if (
        sortOrder === "high"
      ) {

        return (

          b.loan_amount -

          a.loan_amount
        )
      }

      // =====================================
      // LOW TO HIGH
      // =====================================

      if (
        sortOrder === "low"
      ) {

        return (

          a.loan_amount -

          b.loan_amount
        )
      }

      return 0
    })
  // =====================================
  // LOADING UI
  // =====================================

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

    Loading AI Dashboard...

  </h4>

</div>
    )
  }

  // =====================================
  // ERROR UI
  // =====================================

  if (error) {

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
            alert-danger
          "
        >

          {error}

        </div>

      </div>
    )
  }
  // =====================================
// CSV EXPORT DATA
// =====================================

const csvData =

  filteredLoans?.map((loan) => ({

    Name:
      loan.full_name,

    Email:
      loan.email,

    Loan_Amount:
      loan.loan_amount,

    Status:
      loan.status,

    Risk_Tier:
      loan.risk_tier,

    Confidence:
      loan.confidence_score
  }))

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div
      style={{
        background:"linear-gradient(to bottom, #F1F5FF, #EEF2FF)",
        minHeight: "100vh"
      }}
    >

      <Navbar />

      <div className="container py-5">

        {/* ===================================== */}
        {/* HEADING */}
        {/* ===================================== */}

        <div className="mb-5">

  <h1
    style={{

      fontWeight: "800",

      fontSize: "52px",

      color: "#0F172A"
    }}
  >

    AI Loan Dashboard

  </h1>

  <p
    style={{

      color: "#64748B",

      fontSize: "18px"
    }}
  >

    Enterprise AI underwriting,
    portfolio analytics,
    and explainable lending insights.

  </p>

</div>
        {/* ===================================== */}
        {/* BUTTONS */}
        {/* ===================================== */}

        <div className="mb-4">

          {/* BACK */}

          <button
            className="
              btn
              btn-dark
            "
            onClick={() =>
              window.location.href =
              "/admin-home"
            }
          >

            ← Back to Admin Home

          </button>
          {/* EXPORT CSV */}

<CSVLink

  data={csvData}

  filename="loan_applications.csv"

  className="
    btn
    btn-success
    ms-3
  "

  onClick={() => {

    toast.success(
      "CSV Export Started"
    )
    
  }}
>  Export CSV
</CSVLink>

          {/* REFRESH */}

          <button
            className="
              btn
              btn-primary
              ms-3
            "
            onClick={() => {

  toast.success(
    "Dashboard Refreshed"
  )

  fetchDashboardData()
}}
          >

            Refresh Dashboard

          </button>

        </div>

        {/* ===================================== */}
        {/* STATS */}
        {/* ===================================== */}

        <div className="row g-4 mb-5">

          {/* TOTAL */}

     <div className="col-md-3">

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

    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "translateY(-6px)"
    }}

    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "translateY(0px)"
    }}
  >

    <h5>

      Total Loans

    </h5>

    <h1>

      {
        dashboardData?.length || 0
      }

    </h1>

  </div>

</div>

          {/* APPROVED */}

<div className="col-md-3">

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

    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "translateY(-6px)"
    }}

    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "translateY(0px)"
    }}
  >

    <h5>

      Approved

    </h5>

    <h1>

      {approvedLoans}

    </h1>

  </div>

</div>

          {/* REJECTED */}

          <div className="col-md-3">

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

    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "translateY(-6px)"
    }}

    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "translateY(0px)"
    }}
  >

    <h5>

      Rejected

    </h5>

    <h1>

      {declinedLoans}

    </h1>

  </div>

</div>
          {/* HIGH RISK */}

          <div className="col-md-3">

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

                High Risk

              </h5>

              <h1>

                {highRiskLoans}

              </h1>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* SEARCH + FILTER */}
        {/* ===================================== */}

        <div className="row g-3 mb-4">

          {/* SEARCH */}

          <div className="col-lg-4">

            <input style= {{

  height: "55px",

  borderRadius: "14px",

  border:
    "1px solid #CBD5E1"
}}

              type="text"

              className="form-control"

              placeholder="Search by applicant name"

              value={search}

              onChange={(e) =>

                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* FILTER */}

         {/* SORT */}

<div className="col-lg-2">

  <select

    className="form-select"

    value={sortOrder}

    onChange={(e) =>

      setSortOrder(
        e.target.value
      )
    }
  >

    <option value="high">

      Highest Loan

    </option>

    <option value="low">

      Lowest Loan

    </option>

  </select>

</div>

{/* RISK FILTER */}

<div className="col-lg-2">

  <select

    className="form-select"

    value={riskFilter}

    onChange={(e) =>

      setRiskFilter(
        e.target.value
      )
    }
  >

    <option value="all">

      All Risks

    </option>

    <option value="LOW_RISK">

      Low Risk

    </option>

    <option value="MEDIUM_RISK">

      Medium Risk

    </option>

    <option value="HIGH_RISK">

      High Risk

    </option>

  </select>

</div>

{/* STATUS FILTER */}

<div className="col-lg-2">

  <select

    className="form-select"

    value={statusFilter}

    onChange={(e) =>

      setStatusFilter(
        e.target.value
      )
    }
  >

    <option value="all">

      All Status

    </option>

    <option value="APPROVED">

      Approved

    </option>

    <option value="REJECTED">

      Rejected

    </option>

    <option value="CONDITIONAL">

      Conditional

    </option>

  </select>

</div>

{/* EMPLOYMENT FILTER */}

<div className="col-lg-2">

  <select

    className="form-select"

    value={employmentFilter}

    onChange={(e) =>

      setEmploymentFilter(
        e.target.value
      )
    }
  >

    <option value="all">

      All Employment

    </option>

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

        {/* ===================================== */}
        {/* TABLE */}
        {/* ===================================== */}

        <div
          className="
            card
            p-4
            mb-5
          "
          style={cardStyle}
        >

          <h3 className="mb-4">

             Recent Loan Applications

          </h3>

          <table
  className="
    table
    table-hover
    align-middle
  "
>

            <thead
  style={{
    background: "#F8FAFC"
  }}
>

              <tr>

                <th>Name</th>

                <th>Loan</th>

                <th>Status</th>

                <th>Risk</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredLoans?.map((loan) => (

                  <tr key={loan.id}>

                    {/* CLICKABLE NAME */}

                    <td>

                      <button

                        className="
                          btn
                          btn-link
                          text-decoration-none
                          fw-bold
                          p-0
                        "

                        onClick={() =>

                          window.location.href =

                          `/application/${loan.id}`
                        }
                      >

                        {loan.full_name}

                      </button>

                    </td>

                    {/* LOAN */}

                    <td>

                      ₹{loan.loan_amount}

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`
                          badge
                          ${
                            loan.status ===
                            "APPROVED"

                            ? "bg-success"

                            : loan.status ===
                              "REJECTED"

                            ? "bg-danger"

                            : loan.status ===
                              "CONDITIONAL"

                            ? "bg-warning text-dark"

                            : "bg-secondary"
                          }
                        `}
                      >

                        {loan.status}

                      </span>

                    </td>

                    {/* RISK */}

                    <td>

                      <span
                        className={`
                          badge
                          ${
                            loan.risk_tier ===
                            "LOW_RISK"

                            ? "bg-primary"

                            : loan.risk_tier ===
                              "MEDIUM_RISK"

                            ? "bg-warning text-dark"

                            : "bg-danger"
                          }
                        `}
                      >

                        {loan.risk_tier}

                      </span>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>
          {/* ===================================== */}
{/* PAGINATION */}
{/* ===================================== */}

<div
  className="
    d-flex
    justify-content-center
    gap-3
    mt-4
  "
>

  {/* PREVIOUS */}

  <button

    className="
      btn
      btn-secondary
    "

    disabled={!previousPage}

    onClick={() =>

      fetchDashboardData(

        currentPage - 1
      )
    }
  >

    Previous

  </button>

  {/* PAGE NUMBER */}

  <button
    className="
      btn
      btn-dark
    "
  >

    Page {currentPage}

  </button>

  {/* NEXT */}

  <button

    className="
      btn
      btn-primary
    "

    disabled={!nextPage}

    onClick={() =>

      fetchDashboardData(

        currentPage + 1
      )
    }
  >

    Next

  </button>

</div>

        </div>
        

        {/* ========================================= */}
        {/* CHARTS */}
        {/* ========================================= */}

        <div className="row mt-5">

          {/* PIE CHART */}

          <div className="col-md-6 mb-4">

            <div
              className="
                card
                p-4
              "
              style={cardStyle}
            >

              <h3 className="mb-4">

                Loan Decisions

              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie

                    data={pieData}

                    dataKey="value"

                    outerRadius={100}

                    label
                  >

                    <Cell fill="#198754" />

                    <Cell fill="#dc3545" />

                    <Cell fill="#ffc107" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}

          <div className="col-md-6 mb-4">

            <div
              className="
                card
                p-4
              "
              style={cardStyle}
            >

              <h3 className="mb-4">

                Risk Distribution

              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={barData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="risk" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#0d6efd"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>
      <div
  className="
    text-center
    mt-5
  "
>

  <p
    style={{
      color: "#64748B"
    }}
  >

    © 2026 LoanRisk AI —
    Enterprise Lending Intelligence

  </p>

</div>

    </div>
  )
}