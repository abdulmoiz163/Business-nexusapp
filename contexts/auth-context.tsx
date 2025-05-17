"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import AuthService, { type UserData } from "@/services/auth.service"

interface AuthContextType {
  user: UserData | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "investor" | "entrepreneur") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const userData = await AuthService.getCurrentUser()
        setUser(userData)
      } catch (error) {
        // Clear invalid token
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await AuthService.login({ email, password })
      localStorage.setItem("token", response.token)
      localStorage.setItem("userRole", response.user.role)

      const userData = await AuthService.getCurrentUser()
      setUser(userData)

      router.push(`/dashboard/${response.user.role}`)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "investor" | "entrepreneur") => {
    setIsLoading(true)
    try {
      await AuthService.register({ name, email, password, role })
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
