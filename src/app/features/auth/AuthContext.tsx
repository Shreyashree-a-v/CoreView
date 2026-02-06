import { createContext } from "react"
import type { AuthUser, Role } from "./auth.types"

export type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (role: Role) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
