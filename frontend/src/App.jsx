import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css'

import {
  ToastContainer
} from 'react-toastify'

import Login from "./pages/Login"
import Register from "./pages/Register"
import LoanForm from "./pages/LoanForm"
import MyApplications from "./pages/MyApplications"
import Dashboard from "./pages/Dashboard"
import BiasMonitoring from "./pages/BiasMonitoring"
import AuditLogs from "./pages/AuditLogs"
import ApplicationDetail from "./pages/ApplicationDetail"
import AdminHome from "./pages/AdminHome"
import UserHome from "./pages/UserHome"
import PortfolioDashboard from "./pages/PortfolioDashboard"
import PerformanceDashboard from "./pages/PerformanceDashboard"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/loan-form"
          element={<LoanForm />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/bias-monitoring"
          element={<BiasMonitoring />}
        />

        <Route
          path="/audit-logs"
          element={<AuditLogs />}
        />

        <Route
          path="/application/:id"
          element={<ApplicationDetail />}
        />

        <Route
          path="/admin-home"
          element={<AdminHome />}
        />

        <Route
          path="/user-home"
          element={<UserHome />}
        />

        <Route
          path="/portfolio-dashboard"
          element={<PortfolioDashboard />}
        />

        <Route
          path="/performance-dashboard"
          element={<PerformanceDashboard />}
        />

      </Routes>

      {/* ===================================== */}
      {/* TOAST CONTAINER */}
      {/* ===================================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

    </BrowserRouter>
  )
}

export default App