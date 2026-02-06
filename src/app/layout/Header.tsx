import { useAuth } from "../features/auth/useAuth"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold">
        {user?.name} ({user?.role})
      </span>

      <button onClick={handleLogout} className="text-red-600 text-sm">
        Logout
      </button>
    </header>
  )
}
