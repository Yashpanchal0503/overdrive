"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PulseLoader } from "react-spinners"
import { ExternalLink, Github, Mail } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Developer = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  username: string
}

export function SuggestedDevelopers() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch("/api/mock/developers")
        if (!response.ok) {
          throw new Error("Failed to fetch developers")
        }
        const data = await response.json()
        setDevelopers(data.users.slice(0, 3))
      } catch (error) {
        toast.error("Error fetching suggested developers")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <PulseLoader color="#6366F1" size={10} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {developers.map((dev) => (
        <div key={dev.id} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={dev.image} alt={`${dev.firstName} ${dev.lastName}`} />
            <AvatarFallback>
              {dev.firstName[0]}
              {dev.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">
              {dev.firstName} {dev.lastName}
            </p>
            <p className="text-sm text-muted-foreground truncate">{dev.username}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" title="GitHub Profile">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Send Email">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        <ExternalLink className="h-4 w-4 mr-2" />
        View All Developers
      </Button>
    </div>
  )
}
