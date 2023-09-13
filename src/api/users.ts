import useSWRMutation from 'swr/mutation';

export const ME_PATH = `/users/me`
export const SIGN_UP = `/public/users/`

const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };
  
export function useSignIn() {

    async function mockDoSignIn(url, { arg }) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockUser;
        }

    const { trigger, data, isMutating, error } = useSWRMutation(ME_PATH, mockDoSignIn, {
        throwOnError: false,
    });

    return {
        doSignIn: trigger,
        isLoading: isMutating,
        user: mockUser,
        error,
    };
}

export function useSignUp() {

    async function mockDoRegister(url, { arg }) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockUser;
        }

    const { trigger, data, isMutating, error } = useSWRMutation(SIGN_UP, mockDoRegister, {
        throwOnError: false,
    });

    return {
        doSignUp: trigger,
        isLoading: isMutating,
        user: mockUser,
        error,
    };
}
  