'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import API from '@/utils/axios'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const loadGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        })
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large', width: '300' }
        )
      }
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = loadGoogle
    document.body.appendChild(script)
  }, [])

  const handleGoogleResponse = async (response) => {
    try {
      const res = await API.post('/auth/google', {
        token: response.credential,
      })
      localStorage.setItem('token', res.data.token)
      window.dispatchEvent(new Event('storage'))
      router.push('/dashboard')
    } catch (err) {
      setError('Google login failed')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      window.dispatchEvent(new Event('storage'))
      router.push('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-200 px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-purple-100 backdrop-blur-md">

        {/* Image section */}
        <div className="hidden md:block relative h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1553770512-cdc60b8ec63e?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white pr-10 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-[1.01] mt-3"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 my-4">or</div>

          <div id="googleSignInDiv" className="flex justify-center mb-4" />

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-purple-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
