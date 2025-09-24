import { tokenManager } from './tokenManager'
import type { Common } from '../types/api'
import { useNavigate } from 'react-router-dom'

interface RequestOptions {
  headers?: Common.AuthHeaders
  requiresAuth?: boolean
  customConfig?: RequestInit
}

const getDefaultHeaders = async (
  requiresAuth = true
): Promise<Common.AuthHeaders> => {
  const headers: Common.AuthHeaders = {
    'Content-type': 'application/json',
  }

  if (requiresAuth) {
    const token = sessionStorage.getItem('token')
    if (token) {
      const result = await tokenManager(token)
      if (result.isValid) {
        headers['Authorization'] = `Bearer ${token}`
      } else {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
  }

  return headers
}

const request = async <T>(
  endpoint: string,
  method: string,
  data?: any,
  options: RequestOptions = {}
): Promise<T> => {
  const {
    headers: customHeaders = {},
    requiresAuth = true,
    customConfig = {},
  } = options

  const headers = {
    ...(await getDefaultHeaders(requiresAuth)),
    ...customHeaders,
  }

  // fetch 구문
  const config: RequestInit = {
    // credentials: 'include', // httpOnly 쿠키 사용 시
    method,
    headers,
    ...customConfig,
    ...(data && { body: JSON.stringify(data) }),
  }

  const response = await fetch(`/api${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || '서버 에러')
  }

  return await response.json()
}

// api wrapper 호출 부분
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    return request<T>(endpoint, 'GET', null, options)
  },

  post: <T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> => {
    return request<T>(endpoint, 'POST', data, options)
  },

  put: <T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> => {
    return request<T>(endpoint, 'PUT', data, options)
  },

  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    return request<T>(endpoint, 'DELETE', null, options)
  },
}
