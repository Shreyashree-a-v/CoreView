import { createBrowserRouter, Navigate } from "react-router-dom"

import AppLayout from "./layout/AppLayout"
import PublicLayout from "./layout/PublicLayout"

import LoginPage from "./features/auth/LoginPage"
import DashboardPage from "./features/dashboard/DashboardPage"
import UsersPage from "./features/users/UsersPage"
import SettingsPage from "./features/settings/SettingsPage"
import ProfilePage from "./features/profile/ProfilePage"

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      // 👇 THIS FIXES THE 404
      { index: true, element: <Navigate to="/dashboard" replace /> },

      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
])
