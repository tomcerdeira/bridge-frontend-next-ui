import Cookies from 'js-cookie'
import { baseFetcher } from './fetcherUtils'

export const envs = ['DEV', 'PROD', 'MOCK'] as const
export type Env = (typeof envs)[number]

export async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
    const accessToken = Cookies.get('Authorization')
    const refreshToken = Cookies.get('Refresh-Token')
    const env = Cookies.get('Environment') as Env
  
    return baseFetcher<T>(path, accessToken, refreshToken, env, options)
  }