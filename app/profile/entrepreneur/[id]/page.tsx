"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, UserPlus, MapPin, Building, FileText, DollarSign } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function EntrepreneurProfilePage({ params }: { params: { id: string } }) {
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

  // Mock entrepreneur data - in a real app, you would fetch this from your API
  const entrepreneur = {
    id: params.id,
    name: "Sarah Johnson",
    startup: "EcoTech Solutions",
    avatar: "",
    location: "Boston, MA",
    foundedDate: "2022",
    bio: "Passionate entrepreneur with a background in environmental engineering. Founded EcoTech Solutions to develop sustainable technology for reducing carbon footprints in urban areas.",
    tags: ["CleanTech", "Sustainability", "IoT", "Smart Cities"],
    pitch:
      "EcoTech Solutions is developing IoT-enabled sensors and software that help cities and businesses monitor and reduce their carbon emissions in real-time. Our technology has been piloted in 3 cities with a 15% average reduction in emissions.",
    funding: {
      stage: "Seed",
      raised: "$750K",
      seeking: "$2M",
      valuation: "$5M",
      progress: 35,
    },
    team: [
      { name: "Sarah Johnson", role: "CEO & Founder" },
      { name: "Alex Rivera", role: "CTO" },
      { name: "Priya Patel", role: "Head of Product" },
    ],
  }

  return (
    <DashboardLayout userRole="investor">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarImage src={entrepreneur.avatar || "/placeholder.svg"} alt={entrepreneur.name} />
                <AvatarFallback className="text-2xl">{entrepreneur.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h1 className="text-2xl font-bold">{entrepreneur.name}</h1>
                    <p className="text-muted-foreground">{entrepreneur.startup}</p>
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
                    {entrepreneur.location}
                  </div>
                  <div className="flex items-center">
                    <Building className="mr-1 h-4 w-4" />
                    Founded {entrepreneur.foundedDate}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {entrepreneur.funding.stage} Stage
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entrepreneur.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pitch">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pitch">Pitch</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="pitch" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Startup Pitch</CardTitle>
                <CardDescription>Business overview and value proposition</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{entrepreneur.pitch}</p>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Pitch Deck
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="funding" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Funding Information</CardTitle>
                <CardDescription>Current funding status and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Funding Stage</h3>
                      <p className="mt-1 text-lg font-semibold">{entrepreneur.funding.stage}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total Raised</h3>
                      <p className="mt-1 text-lg font-semibold">{entrepreneur.funding.raised}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Seeking</h3>
                      <p className="mt-1 text-lg font-semibold">{entrepreneur.funding.seeking}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Valuation</h3>
                      <p className="mt-1 text-lg font-semibold">{entrepreneur.funding.valuation}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-2 text-center text-sm font-medium text-muted-foreground">Funding Progress</h3>
                    <div className="flex items-center justify-center text-center text-2xl font-bold">
                      {entrepreneur.funding.progress}%
                    </div>
                    <Progress value={entrepreneur.funding.progress} className="mt-2" />
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      {entrepreneur.funding.raised} of {entrepreneur.funding.seeking} raised
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>The people behind the startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {entrepreneur.team.map((member) => (
                    <div key={member.name} className="flex flex-col items-center rounded-lg border p-4 text-center">
                      <Avatar className="mb-2 h-16 w-16">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About the Founder</CardTitle>
                <CardDescription>Background and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{entrepreneur.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
