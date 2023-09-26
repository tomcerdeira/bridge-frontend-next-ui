import Cookies from 'js-cookie'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { createContext } from 'react'
import useSWR from 'swr'
import { useGetShop } from '../api/shops'
import { ParsedUser, UserResponse } from '../api/types'
import { ME_PATH, mapUserResponseToUser, useSignIn } from '../api/users'
import { fetcher } from '../lib/fetcher/clientFetcher'

type AuthContext = {
  user: ParsedUser | null
  shop_id: number | null
  isAuthenticating: boolean
  isAuthenticated: boolean
  authenticationError: string | null
  doSignIn: (values: { email: string; password: string }) => Promise<UserResponse | undefined>
  doSignOut: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }) {
  const router = useRouter()

  const { data, mutate, isLoading, error } = useSWR<UserResponse | null>(
    ME_PATH,
    (url) => fetcher<UserResponse>(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      refreshInterval: 0,
    }
  )
  const { doSignIn, isLoading: signInLoading, error: signInError } = useSignIn()
  const { shop, error: shopError, getShop, isLoading: shopLoading } = useGetShop();

  const isAuthenticating = isLoading || signInLoading
  const authenticationError = error || signInError || null
  const user = data ? mapUserResponseToUser(data) : null
  const shop_id = shop ? shop.id : null

  const doSignOut = () => {
    Cookies.remove('Authorization')
    Cookies.remove('Refresh-Token')

    mutate(null)
    router.replace('/signin' as Route)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        shop_id,
        isAuthenticated: !!user,
        isAuthenticating,
        authenticationError,
        doSignIn,
        doSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
