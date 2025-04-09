import { WeatherWidget } from "@/components/weather-widget"
import { SuggestedDevelopers } from "@/components/suggested-developers"
import { RecentCodeforcesActivity } from "@/components/recent-codeforces-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Developer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Codeforces Activity</CardTitle>
            <CardDescription>Latest contests and submissions from top users</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCodeforcesActivity />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weather</CardTitle>
              <CardDescription>Check the current weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherWidget />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Developers</CardTitle>
              <CardDescription>Connect with these developers</CardDescription>
            </CardHeader>
            <CardContent>
              <SuggestedDevelopers />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
