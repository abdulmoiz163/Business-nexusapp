"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, UserPlus, Loader2 } from "lucide-react"
import ProfileService, { type EntrepreneurListItem } from "@/services/profile.service"
import RequestService from "@/services/request.service"
import { useToast } from "@/hooks/use-toast"

export default function InvestorDashboard() {
  const [entrepreneurs, setEntrepreneurs] = useState<EntrepreneurListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendingRequests, setPendingRequests] = useState(0)
  const [activeConnections, setActiveConnections] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [sendingRequest, setSendingRequest] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch entrepreneurs
        const entrepreneursData = await ProfileService.getAllEntrepreneurs()
        setEntrepreneurs(entrepreneursData)

        // Fetch requests
        const requests = await RequestService.getMyRequests()

        // Count pending requests
        const pending = requests.filter((req) => req.status === "pending").length
        setPendingRequests(pending)

        // Count active connections
        const active = requests.filter((req) => req.status === "accepted").length
        setActiveConnections(active)

        // For demo purposes, set a random number of unread messages
        setUnreadMessages(Math.floor(Math.random() * 20))
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleSendRequest = async (entrepreneurId: string) => {
    setSendingRequest(entrepreneurId)
    try {
      await RequestService.sendRequest(entrepreneurId)
      toast({
        title: "Success",
        description: "Collaboration request sent successfully!",
      })

      // Update pending requests count
      setPendingRequests((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingRequest(null)
    }
  }

  return (
    <DashboardLayout userRole="investor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
          <p className="text-muted-foreground">Discover promising entrepreneurs and startups to invest in.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Collaboration requests awaiting response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingRequests}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View all requests
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Connections</CardTitle>
              <CardDescription>Entrepreneurs you're currently working with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : activeConnections}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View connections
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Unread Messages</CardTitle>
              <CardDescription>New messages from your connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : unreadMessages}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Open messages
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Recommended Entrepreneurs</h2>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : entrepreneurs.length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center p-6">
                <p className="text-center text-muted-foreground">No entrepreneurs found. Check back later!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {entrepreneurs.map((entrepreneur) => (
                <Card key={entrepreneur.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt={entrepreneur.name} />
                        <AvatarFallback>{entrepreneur.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{entrepreneur.name}</CardTitle>
                        <CardDescription>{entrepreneur.profile.startup.name}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{entrepreneur.profile.startup.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entrepreneur.profile.industry.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleSendRequest(entrepreneur.id)}
                      disabled={sendingRequest === entrepreneur.id}
                    >
                      {sendingRequest === entrepreneur.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <UserPlus className="mr-2 h-4 w-4" />
                      )}
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
