'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  PawPrint,
  MapPin,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Add Adoption', href: '/dashboard/add-adoption', icon: <PawPrint size={20} /> },
  { name: 'Hotspots', href: '/dashboard/hotspots', icon: <MapPin size={20} /> },
]

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('storage'))

    router.push('/')
  }

  return (
    <div className="flex">
      {/* 🌐 Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-purple-800 to-indigo-900 text-white transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-5 py-6 flex flex-col justify-between">
          <div>
            <div className="text-2xl font-bold mb-8">🐾 AnimalAid</div>
            <ul className="space-y-2 text-sm">
              {sidebarLinks.map((link) => {
                const isActive = path === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive
                          ? 'bg-white text-purple-800 font-semibold'
                          : 'hover:bg-purple-700'
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* 🔼 Topbar (mobile only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="font-bold text-lg">🐾 AnimalAid</div>
        <button
          onClick={handleLogout}
          className="text-red-600 text-sm font-semibold"
        >
          Logout
        </button>
      </div>

      {/* 💬 Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 md:pt-0 ${open ? 'overflow-hidden' : ''} md:ml-64`}>
        <div className="p-4">{children}</div>
      </main>
    </div>
  )
}
