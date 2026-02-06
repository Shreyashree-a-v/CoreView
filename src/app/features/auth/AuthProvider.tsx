import { useState } from "react"
import { AuthContext } from "./AuthContext"
import type { AuthUser, Role } from "./auth.types"

const STORAGE_KEY = "enterprise_auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })

  function login(role: Role) {
    const mockUser: AuthUser = {
      id: "1",
      name: role === "admin" ? "Admin User" : "Regular User",
      role,
    }

    setUser(mockUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
