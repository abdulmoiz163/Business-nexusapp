import api from "./api"

// Entrepreneur profile types
export interface EntrepreneurProfileData {
  startup: {
    name: string
    description: string
    foundedDate?: string
    website?: string
    logo?: string
  }
  bio: string
  location?: string
  industry: string[]
  pitchDeck?: string
  funding?: {
    stage?: string
    raised?: number
    seeking?: number
    equity?: number
  }
  team?: Array<{
    name: string
    role: string
    linkedin?: string
  }>
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

// Investor profile types
export interface InvestorProfileData {
  company?: {
    name?: string
    website?: string
    logo?: string
  }
  bio: string
  location?: string
  investmentInterests: string[]
  investmentStages?: string[]
  investmentRange?: {
    min?: number
    max?: number
  }
  portfolio?: Array<{
    companyName: string
    industry: string
    website?: string
  }>
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

// Entrepreneur list item
export interface EntrepreneurListItem {
  id: string
  name: string
  profile: {
    id: string
    startup: {
      name: string
      description: string
    }
    bio: string
    location?: string
    industry: string[]
  }
}

// Investor list item
export interface InvestorListItem {
  id: string
  name: string
  profile: {
    id: string
    company?: {
      name?: string
    }
    bio: string
    location?: string
    investmentInterests: string[]
  }
}

const ProfileService = {
  // Create or update entrepreneur profile
  createEntrepreneurProfile: async (data: EntrepreneurProfileData) => {
    const response = await api.post("/profiles/entrepreneur", data)
    return response.data
  },

  // Create or update investor profile
  createInvestorProfile: async (data: InvestorProfileData) => {
    const response = await api.post("/profiles/investor", data)
    return response.data
  },

  // Get current user's profile
  getMyProfile: async () => {
    const response = await api.get("/profiles/me")
    return response.data
  },

  // Get profile by user ID
  getProfileByUserId: async (userId: string) => {
    const response = await api.get(`/profiles/user/${userId}`)
    return response.data
  },

  // Get all entrepreneurs (for investors)
  getAllEntrepreneurs: async () => {
    const response = await api.get<{ success: boolean; entrepreneurs: EntrepreneurListItem[] }>(
      "/profiles/entrepreneurs",
    )
    return response.data.entrepreneurs
  },

  // Get all investors (for entrepreneurs)
  getAllInvestors: async () => {
    const response = await api.get<{ success: boolean; investors: InvestorListItem[] }>("/profiles/investors")
    return response.data.investors
  },
}

export default ProfileService
