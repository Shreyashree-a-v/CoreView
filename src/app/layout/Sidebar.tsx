import { NavLink } from "react-router-dom"

const link =
  "block px-4 py-2 rounded hover:bg-gray-200"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold">Enterprise</div>

      <nav className="space-y-1 px-2">
        <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
        <NavLink to="/users" className={link}>Users</NavLink>
        <NavLink to="/settings" className={link}>Settings</NavLink>
        <NavLink to="/profile" className={link}>Profile</NavLink>
      </nav>
    </aside>
  )
}
