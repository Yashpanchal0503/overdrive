"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Cloud, CloudRain, Search, Sun, Thermometer } from "lucide-react"
import { PulseLoader } from "react-spinners"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type WeatherData = {
  name: string
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  weather: Array<{
    main: string
    description: string
  }>
}

export function WeatherWidget() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      toast.error("Error fetching weather data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "rain":
      case "drizzle":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      default:
        return <Cloud className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <Button onClick={fetchWeather} disabled={loading}>
          {loading ? <PulseLoader size={8} color="white" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {weather && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{weather.name}</h3>
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  <span>{Math.round(weather.main.temp - 273.15)}°C</span>
                </div>
                <p className="text-sm text-muted-foreground">Humidity: {weather.main.humidity}%</p>
                <p className="text-sm text-muted-foreground">
                  Feels like: {Math.round(weather.main.feels_like - 273.15)}°C
                </p>
              </div>
              <div className="flex flex-col items-center">
                {getWeatherIcon(weather.weather[0]?.main)}
                <span className="text-sm capitalize">{weather.weather[0]?.description}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
