import { createBrowserRouter, Navigate } from "react-router-dom"

import AppLayout from "./layout/AppLayout"
import PublicLayout from "./layout/PublicLayout"
import RequireAuth from "./features/auth/RequireAuth"

import LoginPage from "./features/auth/LoginPage"
import DashboardPage from "./features/dashboard/DashboardPage"
import UsersPage from "./features/users/UsersPage"
import SettingsPage from "./features/settings/SettingsPage"
import ProfilePage from "./features/profile/ProfilePage"

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    element: <RequireAuth allowedRoles={["admin"]} />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: "/users", element: <UsersPage /> }],
      },
    ],
  },
])
