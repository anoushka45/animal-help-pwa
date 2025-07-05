'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu, X, Home, HeartHandshake, PawPrint, LogIn, UserPlus,
  LayoutDashboard, MapPin, LogOut
} from 'lucide-react'

export default function NavbarSidebarLayout({ children }) {
  const path = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)


 const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 20) // small delay to trigger transition
    return () => clearTimeout(timeout)
  }, [])

function decodeJWT(token) {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(base64)
    return JSON.parse(json)
  } catch (err) {
    return null
  }
}
const [userName, setUserName] = useState('')



 useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    if (token) {
      const decoded = decodeJWT(token)
      if (decoded) {
        setUserName(decoded.name || decoded.email?.split('@')[0] || 'user')
      }
    }
  }

  checkAuth()
  window.addEventListener('storage', checkAuth)
  return () => window.removeEventListener('storage', checkAuth)
}, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('storage'))
    router.push('/')
  }

  const publicLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Find Services', href: '/find-services', icon: <HeartHandshake size={18} /> },
    { name: 'Adoption', href: '/adoption', icon: <PawPrint size={18} /> },
    { name: 'Legal Aid', href: '/legal-aid', icon: <PawPrint size={18} /> },
  ]

  const privateLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} /> },
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Add Adoption', href: '/dashboard/add-adoption', icon: <PawPrint size={18} /> },
    { name: 'Hotspots', href: '/dashboard/hotspots', icon: <MapPin size={18} /> },
  ]

  const navLinks = isLoggedIn ? privateLinks : publicLinks

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-indigo-50 to-blue-50 shadow-2xl text-black transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-5 py-6 flex flex-col justify-between mt-8">
          <div>
            <div className="text-2xl font-bold mb-8">🐾 AnimalAid</div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => {
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
                      onClick={() => setSidebarOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}

              {isLoggedIn ? (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="w-full flex items-center gap-3 px-3 py-2 bg-white text-purple-700 rounded-md font-semibold text-sm hover:bg-purple-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full flex items-center gap-3 px-3 py-2 bg-white text-purple-700 rounded-md font-semibold text-sm hover:bg-purple-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <UserPlus size={18} />
                    Signup
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-indigo-500 to-blue-500 text-white shadow-sm flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="font-bold text-lg">🐾 AnimalAid</div>
     {isLoggedIn ? (
  <div className="flex items-center gap-2 text-sm font-semibold text-white px-3 py-1 rounded-full shadow">
    <span>Welcome , {userName} !</span>
  </div>
) : (
  <Link
    href="/login"
    className="text-sm font-semibold text-white flex gap-1 items-center"
    onClick={() => setSidebarOpen(false)}
  >
    <LogIn size={16} />
    Login
  </Link>
)}

      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-[10%] z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-sm">
            <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleLogout()
                  setShowLogoutConfirm(false)
                  setSidebarOpen(false)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
     <main
      className={`flex-1 pt-[39px] transition-all duration-300 ${
        sidebarOpen && path.startsWith('/dashboard') ? 'md:pl-64' : 'pl-0'
      } ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
    >
      {children}
    </main>
    </div>
  )
}
