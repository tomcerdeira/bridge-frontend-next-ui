import { getAccessToken, saveTokensFromResponse } from "../auth"

export type ErrorResponse = {
    error: {
      internal_status: string
      message: string
      status_code: number
      payload?: any
    }
  }

export function getHeaders(headerParams, accessToken: string | null) {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization',
        ...headerParams,
    }
    // we only add the access token if it's not already in the headers
    if (accessToken && !headerParams?.Authorization) {
        headers['Authorization'] = accessToken
    }

    return headers
}

export function handleRequestFailed(response: Response, path: string, data: ErrorResponse) {
    let message
    switch (true) {
      case response.status === 403 && path === '/app/private/users/me': {
        message = 'Invalid email and password combination'
        break
      }
      default: {
        message = data?.error?.message || response.statusText
        break
      }
    }
    const error = new Error(message)
    error.name = response.status.toString()
    throw error
}

export async function baseFetcher<T>(
    path: string,
    accessToken,
    refreshToken,
    env,
    options?: RequestInit
  ): Promise<T> {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    const domain = baseURL?.split('://')[1]
    const url = `http://${domain}${path}`
    const { headers: headerParams, body: bodyParams, ...opts } = options || {}
  
    const token = await getAccessToken(accessToken, refreshToken)
    const headers = getHeaders(headerParams, token)
    const body = bodyParams ? JSON.stringify(bodyParams) : undefined
  
    const response = await fetch(url, {
      headers,
      body,
      ...opts,
    })
    saveTokensFromResponse(response)

    const text = await response.text()
    const data: T | ErrorResponse = text ? JSON.parse(text) : undefined
  
    if (!response.ok) {
      handleRequestFailed(response, path, data as ErrorResponse)   
    } else if(response.ok && response.status === 204){
        return { status: 204 } as T;
    }
  
    return data as T
  }