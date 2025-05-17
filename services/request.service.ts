import api from "./api"

export interface CollaborationRequest {
  _id: string
  investor: {
    _id: string
    name: string
    email: string
  }
  entrepreneur: {
    _id: string
    name: string
    email: string
  }
  status: "pending" | "accepted" | "rejected"
  message?: string
  createdAt: string
  updatedAt: string
}

const RequestService = {
  // Send collaboration request (investor to entrepreneur)
  sendRequest: async (entrepreneurId: string, message?: string) => {
    const response = await api.post("/requests", { entrepreneurId, message })
    return response.data
  },

  // Get all requests for current user
  getMyRequests: async () => {
    const response = await api.get<{ success: boolean; requests: CollaborationRequest[] }>("/requests")
    return response.data.requests
  },

  // Update request status (entrepreneur only)
  updateRequestStatus: async (requestId: string, status: "accepted" | "rejected") => {
    const response = await api.patch(`/requests/${requestId}`, { status })
    return response.data
  },
}

export default RequestService
