'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/utils/axios'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    // Load Google Identity Services
    const loadGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // ✅ Correct
          callback: handleGoogleResponse,
        })

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large' }
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
      window.dispatchEvent(new Event('storage')) // ✅ updates navbar

      router.push('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border px-3 py-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border px-3 py-2" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Login</button>
      </form>

      <div className="mt-6 text-center text-gray-500">OR</div>

      <div id="googleSignInDiv" className="mt-4 flex justify-center" />
    </div>
  )
}
