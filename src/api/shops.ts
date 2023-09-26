import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { ShopResponse } from "./types";

export const CREATE_SHOP = `/app/private/shop`;
export const MY_SHOP = `/app/private/shop/users/me`;
export const SHOP_BY_USER_ID = (user_id: string) =>
  `/app/private/shop/users/${user_id}`;

export function useCreateShop() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    CREATE_SHOP,
    (url, { arg }) => fetcher<any>(url, { body: arg, method: "POST" }),
    { throwOnError: false }
  );

  return {
    doCreateShop: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useObtainMyShop() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    MY_SHOP,
    (url, { arg }) => fetcher<ShopResponse>(url, { body: arg, method: "GET" }),
    { throwOnError: false }
  );

  return {
    doCObtainMyShop: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}
