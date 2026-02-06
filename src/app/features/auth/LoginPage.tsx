import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { Role } from "./auth.types"

type LocationState = {
  from?: {
    pathname: string
  }
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state: LocationState }

  const from = location.state?.from?.pathname

  function handleLogin(role: Role) {
    login(role)

    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate(role === "admin" ? "/dashboard" : "/profile", {
        replace: true,
      })
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <button
        onClick={() => handleLogin("admin")}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login as Admin
      </button>

      <button
        onClick={() => handleLogin("user")}
        className="w-full bg-gray-800 text-white py-2 rounded"
      >
        Login as User
      </button>
    </div>
  )
}

