import { Navigate } from "react-router-dom"

export default function ProtectedRoute({

  children,

  adminOnly = false

}) {

  const token = localStorage.getItem(
    "token"
  )

  const isStaff = localStorage.getItem(
    "is_staff"
  )

  // User not logged in

  if (!token) {

    return <Navigate to="/" />
  }

  // Admin-only route protection

  if (
    adminOnly &&
    isStaff !== "true"
  ) {

    return <Navigate to="/loan-form" />
  }

  return children
}