export type Role = "admin" | "user"

export type AuthUser = {
  id: string
  name: string
  role: Role
}
