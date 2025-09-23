import { useState } from 'react'
import { api } from '../services/apiWrapper'

interface User {
  id: string
  username: string
  accountname: string
  // 기타 사용자 정보...
}

interface UseSearchUserReturn {
  users: User[]
  isLoading: boolean
  error: string | null
  searchUsers: (keyword: string) => Promise<void>
  clearResults: () => void
}

function useSearchUser(): UseSearchUserReturn {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchUsers = async (keyword: string): Promise<void> => {
    if (!keyword.trim()) {
      setUsers([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.get(`/user/searchuser/?keyword=${keyword}`)
      setUsers(response.users || [])
    } catch (err: any) {
      setError(err.message || '사용자 검색 중 오류가 발생했습니다.')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const clearResults = () => {
    setUsers([])
    setError(null)
  }

  return {
    users,
    isLoading,
    error,
    searchUsers,
    clearResults,
  }
}

export default useSearchUser
