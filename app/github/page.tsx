"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PulseLoader } from "react-spinners"
import { Book, ExternalLink, GitFork, Github, MapPin, Search, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type GitHubUser = {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string
  location: string
  company: string
  blog: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export default function GitHubPage() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)

  const searchUser = async () => {
    if (!username.trim()) {
      toast.error("Please enter a GitHub username")
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
        login: username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        avatar_url: "/placeholder.svg?height=200&width=200",
        html_url: `https://github.com/${username}`,
        bio: "Full-stack developer passionate about web technologies and open source.",
        location: "San Francisco, CA",
        company: "Tech Company Inc.",
        blog: "https://example.com",
        public_repos: 25,
        followers: 150,
        following: 75,
        created_at: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
      })

      // Mock repos data
      setRepos([
        {
          id: 1,
          name: "awesome-project",
          full_name: `${username}/awesome-project`,
          html_url: `https://github.com/${username}/awesome-project`,
          description: "A collection of awesome resources for developers",
          stargazers_count: 120,
          forks_count: 35,
          language: "JavaScript",
          updated_at: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        },
        {
          id: 2,
          name: "react-components",
          full_name: `${username}/react-components`,
          html_url: `https://github.com/${username}/react-components`,
          description: "A library of reusable React components",
          stargazers_count: 85,
          forks_count: 20,
          language: "TypeScript",
          updated_at: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
        },
        {
          id: 3,
          name: "api-toolkit",
          full_name: `${username}/api-toolkit`,
          html_url: `https://github.com/${username}/api-toolkit`,
          description: "Tools for building and consuming APIs",
          stargazers_count: 65,
          forks_count: 15,
          language: "Python",
          updated_at: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
        },
        {
          id: 4,
          name: "css-framework",
          full_name: `${username}/css-framework`,
          html_url: `https://github.com/${username}/css-framework`,
          description: "A lightweight CSS framework for modern web applications",
          stargazers_count: 45,
          forks_count: 10,
          language: "CSS",
          updated_at: new Date(Date.now() - 5184000000).toISOString(), // 2 months ago
        },
      ])

      toast.success(`Found GitHub user: ${username}`)
    } catch (error) {
      toast.error("Error fetching GitHub user data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      CSS: "bg-purple-500",
      HTML: "bg-orange-500",
      Java: "bg-red-500",
      "C++": "bg-pink-500",
      Ruby: "bg-red-600",
      Go: "bg-cyan-500",
    }

    return colors[language] || "bg-gray-500"
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">GitHub Explorer</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search GitHub User</CardTitle>
          <CardDescription>Enter a GitHub username to view their profile and repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={user.avatar_url} alt={user.login} />
                  <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.login}</p>

                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>

              {user.bio && <p className="text-sm text-center mb-4">{user.bio}</p>}

              <div className="flex justify-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-bold">{user.public_repos}</span>
                  <span className="text-xs text-muted-foreground">Repos</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">{user.followers}</span>
                  <span className="text-xs text-muted-foreground">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">{user.following}</span>
                  <span className="text-xs text-muted-foreground">Following</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                {user.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                )}

                {user.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}

                {user.blog && (
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {user.blog}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Book className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {formatDate(user.created_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Repositories</CardTitle>
              <CardDescription>Public repositories created by {user.login}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repos.map((repo) => (
                  <div key={repo.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {repo.name}
                          </a>
                        </h3>
                        {repo.description && <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>}
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                          <span>{repo.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{repo.stargazers_count}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4 text-muted-foreground" />
                        <span>{repo.forks_count}</span>
                      </div>

                      <div className="text-muted-foreground">Updated on {formatDate(repo.updated_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
