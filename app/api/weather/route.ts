import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    // In a real app, you would use the OpenWeather API
    // For demo purposes, we're returning mock data

    // Mock weather data
    const weatherData = {
      name: city,
      main: {
        temp: 293.15, // 20°C in Kelvin
        humidity: 65,
        feels_like: 292.15, // 19°C in Kelvin
      },
      weather: [
        {
          main: "Clear",
          description: "clear sky",
        },
      ],
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
