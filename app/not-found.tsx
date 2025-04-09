"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PulseLoader } from "react-spinners"
import { Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <div className="max-w-md mb-8">
        <p className="text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <PulseLoader color="#6366F1" size={10} />
        <p className="text-sm text-muted-foreground">Redirecting to homepage in {countdown} seconds...</p>
        <Button onClick={() => router.push("/")} className="mt-2">
          <Home className="h-4 w-4 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  )
}
