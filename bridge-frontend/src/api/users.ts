import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { ParsedUser, UserResponse } from "./types";

// TODO: agregar el /app/... cuando usemos el gateway
export const ME_PATH = `/app/private/users/me`
export const SIGN_UP = `/app/public/users/`
export const FORGOT_PASSWORD = `/app/public/users/forgot-password`
export const RESET_PASSWORD = (token: string) => `/app/public/users/reset-password/${token}`
export const VERIFY = (token: string) => `/app/public/users/verify/${token}`
export const RESEND_VERIFY_EMAIL = `/app/private/users/resend-verify`
export const CHANGE_PASSWORD = `/app/private/users/change-password`

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

export function mapUserResponseToUser(user?: UserResponse): ParsedUser | null {
  if (!user) {
    return null;
  }
  return {
    email: user.email,
    id: user.id,
    role_name: user.role.name,
  };
}

export function useSignIn() {
  // async function mockDoSignIn(url, { arg }) {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     return mockUser;
  //     }

  async function doSignIn(url, { arg }) {
    const headers: any = {};

    // credentials are optional since we can get the user with the token
    if (arg?.email && arg?.password) {
      const credentials = `${arg.email}:${arg.password}`;
      const token = Buffer.from(credentials).toString("base64");

      headers["Authorization"] = `Basic ${token}`;
    }

    return fetcher<UserResponse>(url, { headers });
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    ME_PATH,
    doSignIn,
    {
      throwOnError: false,
    }
  );
  const user = mapUserResponseToUser(data);

  return {
    doSignIn: trigger,
    isLoading: isMutating,
    user,
    error,
  };
}

export function useSignUp() {
  // async function mockDoRegister(url, { arg }) {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     return mockUser;
  //     }

  const { trigger, data, isMutating, error } = useSWRMutation(
    SIGN_UP,
    (url, { arg }) => fetcher<UserResponse>(url, { body: arg, method: "POST" }),
    { throwOnError: false }
  );

  return {
    doSignUp: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useForgotPassword() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    FORGOT_PASSWORD,
    (url, { arg }) => fetcher<UserResponse>(url, { body: arg, method: "POST" }),
    { throwOnError: false }
  );

  return {
    doForgotPassword: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useResetPassword({ token }: { token: string }) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    RESET_PASSWORD(token),
    (url, { arg }) => fetcher<any>(url, { body: arg, method: "PATCH" }),
    { throwOnError: false }
  );

  return {
    doResetPassword: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useVerify({ token }: { token: string }) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    VERIFY(token),
    (url) => fetcher<any>(url, { method: "POST" }),
    { throwOnError: false }
  );

  return {
    doVerify: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useResendVerifyEmail() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    RESEND_VERIFY_EMAIL,
    (url) => fetcher<UserResponse>(url, { method: "POST" }),
    { throwOnError: false }
  );

  return {
    doResendVerifyEmail: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useChangePassword() {

  const { trigger, data, isMutating, error } = useSWRMutation(
    CHANGE_PASSWORD,
      (url, { arg }) => fetcher<any>(url, { body: arg, method: 'PATCH' }),
      {throwOnError: false}
  );

  return {
      doChangePassword: trigger,
      isLoading: isMutating,
      data,
      error,
  };
}
  