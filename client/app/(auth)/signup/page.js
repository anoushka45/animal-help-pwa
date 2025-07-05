'use client'

import { useState, useEffect } from 'react'
import API from '@/utils/axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      errors.email = 'Enter a valid email'
    if (form.password.length < 6)
      errors.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = 'Passwords do not match'
    return errors
  }

  const checkPasswordStrength = (password) => {
    if (!password) return ''
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    const medium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\d))).{6,}$/
    if (strong.test(password)) return 'strong'
    if (medium.test(password)) return 'medium'
    return 'weak'
  }

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(form.password))
  }, [form.password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    try {
      setIsSubmitting(true)
      await API.post('/auth/register', form)
      toast.success('🎉 Registered successfully! Redirecting...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const strengthColor = {
    weak: 'text-red-500',
    medium: 'text-yellow-500',
    strong: 'text-green-600',
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-200 px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-purple-100 backdrop-blur-md">
        
        {/* Image Section - hidden on small screens */}
        <div className="hidden md:block relative h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1661673926942-b40c84c8ef38?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Adopt a pet"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

          {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
              />
              {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
              />
              {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white pr-10 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formErrors.password && <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>}
              {passwordStrength && (
                <p className={`text-xs mt-1 ${strengthColor[passwordStrength]}`}>
                  Password Strength: {passwordStrength}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white pr-10 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-b from-indigo-500 to-blue-500 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-[1.01] ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
