"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Array<"investor" | "entrepreneur">
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      // If role restriction is provided and user's role is not allowed
      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.push(`/dashboard/${user.role}`)
        return
      }
    }
  }, [isAuthenticated, isLoading, user, router, pathname, allowedRoles, isClient])

  // Show loading state
  if (isLoading || !isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If authenticated and authorized, render children
  return <>{children}</>
}
