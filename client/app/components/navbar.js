'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu, X, Home, PawPrint, HeartHandshake, LogIn, UserPlus
} from 'lucide-react'

export default function Navbar() {
  const path = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    checkToken()

    // 🔁 Listen for storage changes (login/logout)
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.type === 'storage') {
        checkToken()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // ⛔ If logged in, don't show Navbar
  if (isLoggedIn) return null

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            🐾 AnimalAid
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-sm lg:text-base items-center">
              <li>
                <Link
                  href="/"
                  className={`flex items-center transition-all duration-300 hover:text-purple-200 ${
                    path === '/' ? 'underline underline-offset-4 font-semibold' : ''
                  }`}
                >
                  <Home size={18} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/find-services"
                  className={`flex items-center transition-all duration-300 hover:text-purple-200 ${
                    path === '/find-services' ? 'underline underline-offset-4 font-semibold' : ''
                  }`}
                >
                  <HeartHandshake size={18} className="mr-2" />
                  Find Services
                </Link>
              </li>
              <li>
                <Link
                  href="/adoption"
                  className={`flex items-center transition-all duration-300 hover:text-purple-200 ${
                    path === '/adoption' ? 'underline underline-offset-4 font-semibold' : ''
                  }`}
                >
                  <PawPrint size={18} className="mr-2" />
                  Adoption
                </Link>
              </li>
            </ul>

            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-purple-700 rounded-full font-semibold text-sm shadow hover:bg-purple-100 transition flex items-center gap-2"
              >
                <LogIn size={18} />
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-white text-purple-700 rounded-full font-semibold text-sm shadow hover:bg-purple-100 transition flex items-center gap-2"
              >
                <UserPlus size={18} />
                Signup
              </Link>
            </div>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden animate-fadeInDown pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-600"
                >
                  <Home size={18} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/find-services"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-600"
                >
                  <HeartHandshake size={18} />
                  Find Services
                </Link>
              </li>
              <li>
                <Link
                  href="/adoption"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-600"
                >
                  <PawPrint size={18} />
                  Adoption
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 bg-white text-purple-700 rounded-md font-semibold hover:bg-purple-100"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 bg-white text-purple-700 rounded-md font-semibold hover:bg-purple-100"
                >
                  <UserPlus size={18} />
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
