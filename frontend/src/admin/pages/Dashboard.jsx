export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Users", "Orders", "Products", "Revenue"].map((t) => (
          <div key={t} className="bg-white p-5 rounded-xl shadow">
            <div className="text-slate-500 text-sm">{t}</div>
            <div className="text-2xl font-bold mt-1">--</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-2">Recent Activity</div>
        <div className="text-slate-600 text-sm">Add charts/table later.</div>
      </div>
    </div>
  )
}
