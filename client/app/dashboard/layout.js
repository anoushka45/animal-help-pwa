// app/dashboard/layout.tsx
import DashboardSidebar from "../components/DashboardSidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  )
}
