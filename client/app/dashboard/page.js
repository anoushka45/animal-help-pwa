'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Helper to decode JWT
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

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      // ❌ No token → redirect to login
      router.push('/login')
      return
    }

    const decoded = decodeJWT(token)
    if (!decoded) {
      // ❌ Invalid token → redirect to login
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      // ✅ Set user info
      setUserName(decoded.name || decoded.email?.split('@')[0] || 'user')
    }
  }, [router])

 


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hello, {userName} 👋</h1>
      <p className="mt-2 text-gray-600">Welcome to your dashboard</p>
    </div>

    
  )
}
