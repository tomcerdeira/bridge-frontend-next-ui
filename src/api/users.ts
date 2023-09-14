import useSWRMutation from 'swr/mutation';
import { fetcher } from '../lib/fetcher/clientFetcher';
import { ParsedUser, UserResponse } from './types';

export const ME_PATH = `/private/users/me`
export const SIGN_UP = `/public/users/`

const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

export function mapUserResponseToUser(user?: UserResponse): ParsedUser | null {
    if (!user) {
      return null
    }
    return {
      email: user.email,
      id: user.id,
      role_name: user.role.name
    }
}

export function useSignIn() {

    // async function mockDoSignIn(url, { arg }) {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     return mockUser;
    //     }

    async function doSignIn(url, { arg }) {
      const headers: any = {}
  
      // credentials are optional since we can get the user with the token
      if (arg?.email && arg?.password) {
        const credentials = `${arg.email}:${arg.password}`
        const token = Buffer.from(credentials).toString('base64')
  
        headers['Authorization'] = `Basic ${token}`
      }
  
      return fetcher<UserResponse>(url, { headers })
    }
  
    const { trigger, data, isMutating, error } = useSWRMutation(ME_PATH, doSignIn, {
      throwOnError: false,
    })
    const user = mapUserResponseToUser(data)
  
    return {
      doSignIn: trigger,
      isLoading: isMutating,
      user,
      error,
    }
  }

export function useSignUp() {

    // async function mockDoRegister(url, { arg }) {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     return mockUser;
    //     }

    const { trigger, data, isMutating, error } = useSWRMutation(
        SIGN_UP,
        (url, { arg }) => fetcher<UserResponse>(url, { body: arg, method: 'POST' }),
        {throwOnError: false}
    );

    return {
        doSignUp: trigger,
        isLoading: isMutating,
        data,
        error,
    };
}
  