import useSWR from "swr";
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

export function useGetShop() {
  const { data, error, isLoading, mutate } = useSWR<ShopResponse>(
    MY_SHOP,
    fetcher
  );
  return { shop: data, error, isLoading, getShop: mutate };
}
