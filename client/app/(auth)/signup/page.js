'use client'

import { useState } from 'react'
import API from '@/utils/axios'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await API.post('/auth/register', form)
      router.push('/login') // go to login page
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full border px-3 py-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border px-3 py-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border px-3 py-2" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  )
}
