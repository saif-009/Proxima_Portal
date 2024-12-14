// components/auth/ProtectedRoute.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/Seller/login')
    }
  }, [router])

  return <>{children}</>
}