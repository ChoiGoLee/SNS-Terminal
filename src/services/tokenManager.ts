import { API_BASE_URL as BASE_URL } from '../utils/configs'

export const tokenManager = async (
  token: string
): Promise<{ isValid: boolean; data?: any }> => {
  try {
    const response = await fetch(BASE_URL + '/user/checktoken', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })

    if (response.status === 204) {
      return { isValid: true }
    }

    if (!response.ok) {
      return { isValid: false }
    }

    const data = await response.json()
    return { isValid: true, data }
  } catch (error) {
    return { isValid: false }
  }
}
