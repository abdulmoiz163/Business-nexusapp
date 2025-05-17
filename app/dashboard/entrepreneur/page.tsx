"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, X, MessageSquare, Loader2 } from "lucide-react"
import RequestService, { type CollaborationRequest } from "@/services/request.service"
import { useToast } from "@/hooks/use-toast"

export default function EntrepreneurDashboard() {
  const [requests, setRequests] = useState<CollaborationRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [profileCompletion, setProfileCompletion] = useState(75) // Mock value
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collaboration requests
        const requestsData = await RequestService.getMyRequests()
        setRequests(requestsData)
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

  const handleUpdateRequestStatus = async (requestId: string, status: "accepted" | "rejected") => {
    setProcessingRequestId(requestId)
    try {
      await RequestService.updateRequestStatus(requestId, status)

      // Update the request in the state
      setRequests((prevRequests) => prevRequests.map((req) => (req._id === requestId ? { ...req, status } : req)))

      toast({
        title: "Success",
        description: `Request ${status === "accepted" ? "accepted" : "rejected"} successfully!`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || `Failed to ${status} request. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setProcessingRequestId(null)
    }
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const activeConnections = requests.filter((req) => req.status === "accepted")

  return (
    <DashboardLayout userRole="entrepreneur">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entrepreneur Dashboard</h1>
          <p className="text-muted-foreground">Manage your startup profile and investor connections.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to attract investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profileCompletion}%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[75%] rounded-full bg-primary" style={{ width: `${profileCompletion}%` }}></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Complete profile
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Investor Requests</CardTitle>
              <CardDescription>Collaboration requests from investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingRequests.length}
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
              <CardDescription>Investors you're currently working with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : activeConnections.length}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View connections
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Collaboration Requests</h2>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : requests.length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center p-6">
                <p className="text-center text-muted-foreground">
                  No collaboration requests yet. Keep improving your profile to attract investors!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" alt={request.investor.name} />
                          <AvatarFallback>{request.investor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.investor.name}</CardTitle>
                          <CardDescription>{request.investor.email}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={request.status === "pending" ? "outline" : "default"}>
                        {request.status === "pending"
                          ? "Pending"
                          : request.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {request.message && <p className="mb-2 text-sm">{request.message}</p>}
                    <p className="text-sm text-muted-foreground">
                      Request received on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                  {request.status === "pending" ? (
                    <CardFooter className="flex justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleUpdateRequestStatus(request._id, "rejected")}
                        disabled={processingRequestId === request._id}
                      >
                        {processingRequestId === request._id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <X className="mr-2 h-4 w-4" />
                        )}
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleUpdateRequestStatus(request._id, "accepted")}
                        disabled={processingRequestId === request._id}
                      >
                        {processingRequestId === request._id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Accept
                      </Button>
                    </CardFooter>
                  ) : (
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
