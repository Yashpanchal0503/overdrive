"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PulseLoader } from "react-spinners"
import { Calendar, Code, Trophy, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CodeforcesUser = {
  handle: string
  rating: number
  rank: string
  maxRating: number
  avatar: string
}

type CodeforcesContest = {
  id: number
  name: string
  startTimeSeconds: number
  durationSeconds: number
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

export function RecentCodeforcesActivity() {
  const [users, setUsers] = useState<CodeforcesUser[]>([])
  const [contests, setContests] = useState<CodeforcesContest[]>([])
  const [submissions, setSubmissions] = useState<CodeforcesSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCodeforcesData = async () => {
      try {
        // In a real app, these would be separate API calls
        // For demo purposes, we're simulating the data

        // Mock users data
        setUsers([
          {
            handle: "tourist",
            rating: 3779,
            rank: "legendary grandmaster",
            maxRating: 3825,
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            handle: "Petr",
            rating: 3602,
            rank: "international grandmaster",
            maxRating: 3743,
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            handle: "Um_nik",
            rating: 3559,
            rank: "international grandmaster",
            maxRating: 3670,
            avatar: "/placeholder.svg?height=100&width=100",
          },
        ])

        // Mock contests data
        setContests([
          {
            id: 1,
            name: "Codeforces Round #835 (Div. 1)",
            startTimeSeconds: Date.now() / 1000 - 86400,
            durationSeconds: 7200,
          },
          {
            id: 2,
            name: "Codeforces Round #834 (Div. 2)",
            startTimeSeconds: Date.now() / 1000 - 172800,
            durationSeconds: 7200,
          },
          {
            id: 3,
            name: "Educational Codeforces Round 148",
            startTimeSeconds: Date.now() / 1000 - 259200,
            durationSeconds: 7200,
          },
        ])

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
        ])
      } catch (error) {
        toast.error("Error fetching Codeforces data")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCodeforcesData()
  }, [])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
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
      default:
        return "text-blue-500"
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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <PulseLoader color="#6366F1" size={12} />
      </div>
    )
  }

  return (
    <Tabs defaultValue="users">
      <TabsList className="mb-4">
        <TabsTrigger value="users">
          <User className="h-4 w-4 mr-2" />
          Top Users
        </TabsTrigger>
        <TabsTrigger value="contests">
          <Trophy className="h-4 w-4 mr-2" />
          Recent Contests
        </TabsTrigger>
        <TabsTrigger value="submissions">
          <Code className="h-4 w-4 mr-2" />
          Latest Submissions
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="space-y-4">
        {users.map((user) => (
          <div key={user.handle} className="flex items-center gap-4 p-3 rounded-lg border">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.handle} />
              <AvatarFallback>{user.handle[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{user.handle}</h3>
                <span className={getRankColor(user.rank)}>({user.rating})</span>
              </div>
              <p className="text-sm text-muted-foreground capitalize">{user.rank}</p>
              <p className="text-xs text-muted-foreground">Max Rating: {user.maxRating}</p>
            </div>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="contests" className="space-y-4">
        {contests.map((contest) => (
          <div key={contest.id} className="p-3 rounded-lg border">
            <h3 className="font-medium">{contest.name}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(contest.startTimeSeconds)}</span>
              </div>
              <div>Duration: {contest.durationSeconds / 3600} hours</div>
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="submissions" className="space-y-4">
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
            <p className="text-xs text-muted-foreground mt-2">
              Submitted: {new Date(submission.creationTimeSeconds * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}
