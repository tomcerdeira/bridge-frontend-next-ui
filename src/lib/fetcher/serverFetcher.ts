import { MockResponse_IPaymentRequest } from '@/src/api/types'
import { cookies } from 'next/headers'

export async function serverFetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const accessToken = cookies().get('Authorization')?.value
  const refreshToken = cookies().get('Refresh-Token')?.value
  const env = cookies().get('Environment')?.value
  const opts = {
    ...options,
    cache: 'no-store' as RequestCache,
  }

  //TODO: return baseFetcher<T>(path, accessToken, refreshToken, env, opts)
  return new Promise(resolve => 
    setTimeout(() => resolve(MockResponse_IPaymentRequest as T), 2000)
  );
}
