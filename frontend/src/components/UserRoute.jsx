import { Navigate } from "react-router-dom"

export default function UserRoute({

  children

}) {

  const isStaff =
    localStorage.getItem(
      "is_staff"
    ) === "true"

  if (isStaff) {

    return <Navigate to="/dashboard" />
  }

  return children
}