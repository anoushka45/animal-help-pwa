'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Menu,
  X,
  Home,
  PawPrint,
  HeartHandshake,
  LogIn,
  UserPlus,
} from 'lucide-react'

export default function Navbar() {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // 👇 Replace with real auth logic later
  const isLoggedIn = false // 🔄 Change to false to test public view

  // ✅ If logged in, hide entire navbar
  if (isLoggedIn) return null

  const publicLinks = [
    { name: 'Home', href: '/', icon: <Home size={18} className="mr-2" /> },
    { name: 'Find Services', href: '/find-services', icon: <HeartHandshake size={18} className="mr-2" /> },
    { name: 'Adoption', href: '/adoption', icon: <PawPrint size={18} className="mr-2" /> },
  ]

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            🐾 AnimalAid
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-sm lg:text-base items-center">
              {publicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center transition-all duration-300 hover:text-purple-200 ${
                      path === link.href ? 'underline underline-offset-4 font-semibold' : ''
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
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

          {/* Mobile Menu Toggle */}
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
              {publicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                      path === link.href ? 'bg-purple-800 font-semibold' : 'hover:bg-purple-600'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
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
