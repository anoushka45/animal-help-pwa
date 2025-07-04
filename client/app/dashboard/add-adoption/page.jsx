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

export default function AddAdoptionPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const decoded = decodeJWT(token)

    if (!decoded) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      setUserName(decoded.name || decoded.email?.split('@')[0] || 'user')
      setIsAuth(true)
    }
  }, [router])

  if (!isAuth) return null // Or a loading spinner

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Adoption Details</h1>
      <p className="mt-2 text-gray-600">Hello, {userName}! 🐾</p>
      {/* your add adoption form */}
    </div>
  )
}
