import { Navigate } from "react-router-dom"

export default function ProtectedRoute({

  children,

  adminOnly = false

}) {

  // =========================================
  // ADMIN ACCESS
  // =========================================

  if (adminOnly) {

    const isAdmin =
      localStorage.getItem(
        "is_staff"
      ) === "true"

    if (!isAdmin) {

      return <Navigate to="/" />
    }

    return children
  }

  // =========================================
  // USER ACCESS
  // =========================================

  const token =
    localStorage.getItem("access")

  const isAdmin =
    localStorage.getItem(
      "is_staff"
    ) === "true"

  // ADMIN CAN ALSO ACCESS

  if (isAdmin) {

    return children
  }

  // USER TOKEN REQUIRED

  if (!token) {

    return <Navigate to="/" />
  }

  return children
}