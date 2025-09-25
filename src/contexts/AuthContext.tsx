import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from 'react'
import type { Common, UserAPI } from '../types/api'
import { api } from '../services/apiWrapper'

interface AuthContextType {
  // 상태
  user: Common.User | null
  isAuthenticated: boolean
  isLoading: boolean

  // 액션
  login: (token: string, userData: Common.User) => void
  logout: () => void
  checkAuth: () => Promise<boolean>
}

// Context생성
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}
// Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Common.User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!sessionStorage.getItem('token')

  // 로그인
  const login = (token: string, userData: Common.User) => {
    sessionStorage.setItem('token', token)
    setUser(userData)
  }

  // 로그아웃
  const logout = () => {
    sessionStorage.removeItem('token')
    setUser(null)
  }

  const checkAuth = async (): Promise<boolean> => {
    const token = sessionStorage.getItem('token')

    if (!token) {
      setIsLoading(false)
      return false
    }

    try {
      // 토큰 유효성 검사
      await api.get('/user/checktoken')

      // 사용자 정보
      const response = await api.get<UserAPI.MyInfo.Res>('/user/myinfo')
      setUser(response.user)
      return true
    } catch (error) {
      console.error('토큰 에러:', error)
      logout() // 유효하지 않은 토큰 로그아웃 처리
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider내에서 사용해야함')
  }
  return context
}
