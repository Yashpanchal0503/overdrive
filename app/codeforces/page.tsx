"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PulseLoader } from "react-spinners"
import { Award, Clock, Code, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type CodeforcesUser = {
  handle: string
  rating: number
  rank: string
  maxRating: number
  contribution: number
  friendOfCount: number
  avatar: string
  titlePhoto: string
  registrationTimeSeconds: number
  lastOnlineTimeSeconds: number
}

type CodeforcesSubmission = {
  id: number
  contestId: number
  problem: {
    name: string
    index: string
    tags: string[]
  }
  verdict: string
  programmingLanguage: string
  timeConsumedMillis: number
  creationTimeSeconds: number
}

export default function CodeforcesPage() {
  const [handle, setHandle] = useState("")
  const [user, setUser] = useState<CodeforcesUser | null>(null)
  const [submissions, setSubmissions] = useState<CodeforcesSubmission[]>([])
  const [loading, setLoading] = useState(false)

  const searchUser = async () => {
    if (!handle.trim()) {
      toast.error("Please enter a Codeforces handle")
      return
    }

    setLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're simulating the data

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      setUser({
        handle,
        rating: 1850,
        rank: "candidate master",
        maxRating: 1920,
        contribution: 42,
        friendOfCount: 150,
        avatar: "/placeholder.svg?height=200&width=200",
        titlePhoto: "/placeholder.svg?height=400&width=400",
        registrationTimeSeconds: Date.now() / 1000 - 31536000, // 1 year ago
        lastOnlineTimeSeconds: Date.now() / 1000 - 3600, // 1 hour ago
      })

      // Mock submissions data
      setSubmissions([
        {
          id: 101,
          contestId: 1,
          problem: {
            name: "Binary Search",
            index: "A",
            tags: ["binary search", "implementation"],
          },
          verdict: "OK",
          programmingLanguage: "C++",
          timeConsumedMillis: 15,
          creationTimeSeconds: Date.now() / 1000 - 3600,
        },
        {
          id: 102,
          contestId: 1,
          problem: {
            name: "Dynamic Programming",
            index: "B",
            tags: ["dp", "math"],
          },
          verdict: "WRONG_ANSWER",
          programmingLanguage: "Python",
          timeConsumedMillis: 100,
          creationTimeSeconds: Date.now() / 1000 - 7200,
        },
        {
          id: 103,
          contestId: 2,
          problem: {
            name: "Graph Theory",
            index: "C",
            tags: ["graphs", "dfs and similar"],
          },
          verdict: "OK",
          programmingLanguage: "Java",
          timeConsumedMillis: 250,
          creationTimeSeconds: Date.now() / 1000 - 10800,
        },
        {
          id: 104,
          contestId: 3,
          problem: {
            name: "String Algorithms",
            index: "D",
            tags: ["strings", "hashing"],
          },
          verdict: "TIME_LIMIT_EXCEEDED",
          programmingLanguage: "JavaScript",
          timeConsumedMillis: 2000,
          creationTimeSeconds: Date.now() / 1000 - 14400,
        },
        {
          id: 105,
          contestId: 3,
          problem: {
            name: "Greedy Algorithm",
            index: "E",
            tags: ["greedy", "sortings"],
          },
          verdict: "OK",
          programmingLanguage: "C++",
          timeConsumedMillis: 50,
          creationTimeSeconds: Date.now() / 1000 - 18000,
        },
      ])

      toast.success(`Found user: ${handle}`)
    } catch (error) {
      toast.error("Error fetching Codeforces user data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "legendary grandmaster":
        return "text-red-500 font-bold"
      case "international grandmaster":
        return "text-red-400"
      case "grandmaster":
        return "text-red-300"
      case "master":
        return "text-orange-400"
      case "candidate master":
        return "text-purple-500"
      case "expert":
        return "text-blue-500"
      case "specialist":
        return "text-cyan-500"
      case "pupil":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "OK":
        return "bg-green-500"
      case "WRONG_ANSWER":
        return "bg-red-500"
      case "TIME_LIMIT_EXCEEDED":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Codeforces Stats</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search Codeforces User</CardTitle>
          <CardDescription>Enter a Codeforces handle to view their profile and submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Codeforces handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchUser()}
            />
            <Button onClick={searchUser} disabled={loading}>
              {loading ? <PulseLoader size={8} color="white" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>User information and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={user.avatar} alt={user.handle} />
                  <AvatarFallback>{user.handle[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.handle}</h2>
                <p className={`${getRankColor(user.rank)} capitalize`}>{user.rank}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Rating:</span>
                  <span className="font-medium">{user.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Rating:</span>
                  <span className="font-medium">{user.maxRating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contribution:</span>
                  <span className="font-medium">{user.contribution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friend of:</span>
                  <span className="font-medium">{user.friendOfCount} users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered:</span>
                  <span className="font-medium">{formatDate(user.registrationTimeSeconds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last online:</span>
                  <span className="font-medium">{formatDate(user.lastOnlineTimeSeconds)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Submissions</CardTitle>
              <CardDescription>Recent problem submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="table">
                <TabsList className="mb-4">
                  <TabsTrigger value="table">
                    <Code className="h-4 w-4 mr-2" />
                    Table View
                  </TabsTrigger>
                  <TabsTrigger value="cards">
                    <Award className="h-4 w-4 mr-2" />
                    Card View
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Problem</TableHead>
                        <TableHead>Verdict</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div className="font-medium">
                              {submission.problem.index}. {submission.problem.name}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {submission.problem.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {submission.problem.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{submission.problem.tags.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getVerdictColor(submission.verdict)}>{submission.verdict}</Badge>
                          </TableCell>
                          <TableCell>{submission.programmingLanguage}</TableCell>
                          <TableCell>{submission.timeConsumedMillis} ms</TableCell>
                          <TableCell>{formatDate(submission.creationTimeSeconds)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="cards" className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="p-3 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {submission.problem.index}. {submission.problem.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">Language: {submission.programmingLanguage}</p>
                        </div>
                        <Badge className={getVerdictColor(submission.verdict)}>{submission.verdict}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {submission.problem.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{submission.timeConsumedMillis} ms</span>
                        <span>•</span>
                        <span>{formatDate(submission.creationTimeSeconds)}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
