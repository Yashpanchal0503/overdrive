import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real app, you would use the Dummy JSON API
    // For demo purposes, we're returning mock data

    // Mock developers data
    const developers = {
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          image: "/placeholder.svg?height=100&width=100",
          username: "johndoe",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          image: "/placeholder.svg?height=100&width=100",
          username: "janesmith",
        },
        {
          id: 3,
          firstName: "Alex",
          lastName: "Johnson",
          email: "alex.johnson@example.com",
          image: "/placeholder.svg?height=100&width=100",
          username: "alexj",
        },
        {
          id: 4,
          firstName: "Sarah",
          lastName: "Williams",
          email: "sarah.williams@example.com",
          image: "/placeholder.svg?height=100&width=100",
          username: "sarahw",
        },
        {
          id: 5,
          firstName: "Michael",
          lastName: "Brown",
          email: "michael.brown@example.com",
          image: "/placeholder.svg?height=100&width=100",
          username: "mikebrown",
        },
      ],
      total: 5,
      skip: 0,
      limit: 5,
    }

    return NextResponse.json(developers)
  } catch (error) {
    console.error("Error fetching developers data:", error)
    return NextResponse.json({ error: "Failed to fetch developers data" }, { status: 500 })
  }
}
