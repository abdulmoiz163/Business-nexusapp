"use client"

import { useState, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    const newToast: Toast = {
      id,
      title,
      description,
      variant,
      visible: true,
      duration,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss
    setTimeout(() => {
      dismiss(id)
    }, duration)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)))

    // Remove from state after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 300)
  }, [])

  return { toast, dismiss, toasts }
}
