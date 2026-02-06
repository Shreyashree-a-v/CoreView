import BarChart from "../../../charts/BarChart"
import PieChart from "../../../charts/PieChart";
import DashboardCards from "./DashboardCards"

const dashboardData = [
  { name: "Product A", value: 30 },
  { name: "Product B", value: 80 },
  { name: "Product C", value: 45 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <DashboardCards />
      <BarChart data={dashboardData} />
      <PieChart data={dashboardData} />
    </div>
  )
}
