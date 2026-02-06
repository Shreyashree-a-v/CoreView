const stats = [
  { label: "Users", value: "12,480" },
  { label: "Revenue", value: "$98,200" },
  { label: "Active Sessions", value: "1,284" },
]

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
