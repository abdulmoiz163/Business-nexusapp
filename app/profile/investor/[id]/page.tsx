"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, UserPlus, MapPin, Briefcase, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestorProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // In a real app, you would check if the user is authenticated
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [router])

  if (!isClient) {
    return null
  }

  // Mock investor data - in a real app, you would fetch this from your API
  const investor = {
    id: params.id,
    name: "Robert Smith",
    company: "Venture Capital Partners",
    avatar: "",
    location: "San Francisco, CA",
    joinedDate: "January 2022",
    bio: "Experienced investor with over 15 years in the tech industry. Focused on early-stage startups in fintech, healthtech, and sustainable energy solutions.",
    interests: ["Fintech", "Healthtech", "Clean Energy", "AI/ML", "SaaS"],
    portfolio: [
      { name: "TechStart Inc.", industry: "SaaS" },
      { name: "HealthAI Solutions", industry: "Healthtech" },
      { name: "GreenEnergy", industry: "Clean Energy" },
      { name: "FinanceApp", industry: "Fintech" },
    ],
    stats: {
      investments: 12,
      connections: 87,
      avgInvestment: "$250K - $1M",
    },
  }

  return (
    <DashboardLayout userRole="entrepreneur">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
                <AvatarFallback className="text-2xl">{investor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h1 className="text-2xl font-bold">{investor.name}</h1>
                    <p className="text-muted-foreground">{investor.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {investor.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {investor.stats.investments} investments
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Joined {investor.joinedDate}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {investor.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="stats">Investment Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Professional background and investment focus</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{investor.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="portfolio" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Companies</CardTitle>
                <CardDescription>Current and past investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {investor.portfolio.map((company) => (
                    <div key={company.name} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="font-medium">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Statistics</CardTitle>
                <CardDescription>Investment patterns and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Investments</h3>
                    <p className="mt-2 text-2xl font-bold">{investor.stats.investments}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Network Size</h3>
                    <p className="mt-2 text-2xl font-bold">{investor.stats.connections} connections</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Investment</h3>
                    <p className="mt-2 text-2xl font-bold">{investor.stats.avgInvestment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
