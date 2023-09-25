import Cookies from 'js-cookie'

export type Token = {
  id: string
  email: string
  role: string
  status: string
  exp: number
  iat: number
}

export function setAccessToken(accessToken: string | null) {
  if (accessToken) {
    Cookies.set('Authorization', accessToken, { secure: process.env.NODE_ENV === 'production' })
  }
}

export function setRefreshToken(refreshToken: string | null) {
  if (refreshToken) {
    Cookies.set('Refresh-Token', refreshToken, { secure: process.env.NODE_ENV === 'production' })
  }
}

export function decodeJWT(token: string) {
  const payload = token.split('.')[1]

  try {
    const decodedToken = JSON.parse(atob(payload)) as unknown as Token
    return decodedToken
  } catch (error) {
    console.log('Failed to decode token')
    return null
  }
}

export function isTokenExpired(token: string | null) {
  if (!token) return true

  const decodedToken = decodeJWT(token)

  if (!decodedToken || !decodedToken.exp) return true

  const now = Date.now().valueOf() / 1000
  return decodedToken.exp < now
}

export function saveTokensFromResponse(response: Response) {
  const accessToken = response.headers.get('Authorization')
  const refreshToken = response.headers.get('Refresh-Token')

  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

export async function getNewAccessToken() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/public/auth/refresh-token'
  const accessToken = Cookies.get('Authorization')
  const refreshToken = Cookies.get('Refresh-Token')
  const token = accessToken?.split('Bearer ')[1]

  const body = JSON.stringify({ expired_access_token: token, refresh_token: refreshToken })

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })
    saveTokensFromResponse(response)
    return response.headers.get('Authorization')
  } catch (error) {
    console.log('failed to get new access token')
    return null
  }
}

export async function getAccessToken(accessToken, refreshToken) {
  const isAccessExpired = isTokenExpired(accessToken)
  const isRefreshExpired = isTokenExpired(refreshToken)

  if (!accessToken || (isAccessExpired && isRefreshExpired)) {
    return null
  }

  if (isAccessExpired && !isRefreshExpired) {
    const newAccessToken = await getNewAccessToken()
    return newAccessToken
  }

  return accessToken
}