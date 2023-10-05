import useSWR from "swr";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { AnalyticsResponse } from "./types";


export const GET_ANALYTICS_BY_SHOP = (shop_id: string) => `/app/private/analytics/shops/${shop_id}`
export const GET_ANALYTICS_BY_FLOW = (flow_id: string) =>`/app/private/analytics/flows/${flow_id}`

export function useGetAnalyticsByShopId(shop_id: string) {
    const { data, error, isLoading, mutate } = useSWR<AnalyticsResponse>(
        GET_ANALYTICS_BY_SHOP(shop_id),
        fetcher
    );
    return { shop_analytics: data, error, isLoading, getAnalyticsByShopId: mutate };
  }

  export function useGetAnalyticsByFlowId(flow_id: string) {
    const { data, error, isLoading, mutate } = useSWR<AnalyticsResponse>(
        GET_ANALYTICS_BY_FLOW(flow_id),
        fetcher
    );
    return { flow_analytics: data, error, isLoading, getAnalyticsByFlowId: mutate };
  }