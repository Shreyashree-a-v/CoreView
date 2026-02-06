import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { Role } from "./auth.types"

type Props = {
  allowedRoles?: Role[]
}

export default function RequireAuth({ allowedRoles }: Props) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
