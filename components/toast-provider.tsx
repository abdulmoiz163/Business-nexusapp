"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"

export function ToastProvider() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          className={`${toast.visible ? "animate-enter" : "animate-leave"}`}
          onDismiss={() => dismiss(toast.id)}
        >
          <div>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
        </Toast>
      ))}
    </div>
  )
}
