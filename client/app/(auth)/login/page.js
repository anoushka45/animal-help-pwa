'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 shadow-md rounded">
        <h2 className="text-center text-2xl font-bold">Login to AnimalAid</h2>

        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mb-4"
        >
          Sign in with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
