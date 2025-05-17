import api from "./api"

export interface RegisterData {
  name: string
  email: string
  password: string
  role: "investor" | "entrepreneur"
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: {
    id: string
    name: string
    email: string
    role: "investor" | "entrepreneur"
  }
}

export interface UserData {
  id: string
  name: string
  email: string
  role: "investor" | "entrepreneur"
  profileCompleted: boolean
}

const AuthService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data)
    return response.data
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data)
    return response.data
  },

  getCurrentUser: async (): Promise<UserData> => {
    const response = await api.get<{ success: boolean; user: UserData }>("/auth/me")
    return response.data.user
  },

  logout: (): void => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
  },
}

export default AuthService
