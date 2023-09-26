import useSWR from "swr";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { FlowDetails } from "./types";

// TODO: agregar el /payment/... cuando usemos el gateway
export const GET_SHOP_FLOWS = (shopId: string) => `/payment/flows/shop/${shopId}`

export function useGetFlows(shopId: string) {
    const { data, error, isLoading, mutate } = useSWR<FlowDetails[]>(GET_SHOP_FLOWS(shopId), fetcher);
    return { flows: data, error, isLoading, getFlows: mutate }
}