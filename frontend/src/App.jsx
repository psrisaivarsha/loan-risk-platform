import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import "react-toastify/dist/ReactToastify.css"

import {
  ToastContainer
} from "react-toastify"

// =====================================
// PAGES
// =====================================

import Login from "./pages/Login"
import Register from "./pages/Register"

import LoanForm from "./pages/LoanForm"
import MyApplications from "./pages/MyApplications"
import ApplicationDetail from "./pages/ApplicationDetail"
import AdminLogin from "./pages/AdminLogin"
import Dashboard from "./pages/Dashboard"
import BiasMonitoring from "./pages/BiasMonitoring"
import AuditLogs from "./pages/AuditLogs"
import AdminHome from "./pages/AdminHome"

import UserHome from "./pages/UserHome"

import PortfolioDashboard from "./pages/PortfolioDashboard"
import PerformanceDashboard from "./pages/PerformanceDashboard"

// =====================================
// COMPONENTS
// =====================================

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ===================================== */}
        {/* PUBLIC ROUTES */}
        {/* ===================================== */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ===================================== */}
        {/* USER ROUTES */}
        {/* ===================================== */}

        <Route
          path="/user-home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-form"
          element={
            <ProtectedRoute>
              <LoanForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* ===================================== */}
        {/* APPLICATION DETAIL */}
        {/* USER + ADMIN BOTH CAN VIEW */}
        {/* ===================================== */}

        <Route
          path="/application/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetail />
            </ProtectedRoute>
          }
        />

        {/* ===================================== */}
        {/* ADMIN ROUTES */}
        {/* ===================================== */}
        <Route
              path="/admin-login"
              element={<AdminLogin />}
              />
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute adminOnly>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/portfolio-dashboard"
          element={
            <ProtectedRoute adminOnly>
              <PortfolioDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/performance-dashboard"
          element={
            <ProtectedRoute adminOnly>
              <PerformanceDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bias-monitoring"
          element={
            <ProtectedRoute adminOnly>
              <BiasMonitoring />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute adminOnly>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        {/* ===================================== */}
        {/* INVALID ROUTES */}
        {/* ===================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* ===================================== */}
      {/* TOAST */}
      {/* ===================================== */}

      <ToastContainer

        position="top-right"

        autoClose={3000}

        hideProgressBar={false}

        newestOnTop={true}

        closeOnClick

        pauseOnFocusLoss

        draggable

        pauseOnHover

        theme="dark"
      />

    </BrowserRouter>
  )
}

export default App