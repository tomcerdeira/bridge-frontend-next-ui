import useSWR from "swr";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { AnalyticsResponse, FlowExecutionResponse } from "./types";


export const GET_ANALYTICS_BY_SHOP = (shop_id: string) => `/app/private/analytics/shops/${shop_id}`
export const GET_ANALYTICS_BY_FLOW = (flow_id: string) =>`/app/private/analytics/flows/${flow_id}`
export const GET_FLOW_EXECUTION_STATUS_BY_SHOP = (shop_id: string) => `/payment/private/flows-exec-status/shops/${shop_id}`
export const GET_FLOW_EXECUTION_STATUS_BY_FLOW = (flow_id: string) => `/payment/private/flows-exec-status/flows/${flow_id}`

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

function getQueryParamsAsString(searchQuery: { [key: string]: string | string[] | undefined }) {
    const params = new URLSearchParams();
    for (const key in searchQuery) {
        const value = searchQuery[key];
        if (value !== undefined) {
            if (typeof value === 'string') {
                params.append(key, value);
            } else if (Array.isArray(value)) {
                params.append(key, value.join(','));
            }
        }
    }
    return params.toString();
}

export function useGetFlowExecutionStatusByShop(shop_id: string, searchQuery: { [key: string]: string | string[] | undefined }) {
    const path = `${GET_FLOW_EXECUTION_STATUS_BY_SHOP(shop_id)}?${getQueryParamsAsString(searchQuery)}`;
    const { data, error, isLoading, mutate } = useSWR<FlowExecutionResponse[]>(
        path,
        fetcher
    );
    return { flow_analytics: data, error, isLoading, getFlowExecutionStatusByShop: mutate };
}

export function useGetFlowExecutionStatus(flow_id: string, searchQuery: { [key: string]: string | string[] | undefined }) {
    const path = `${GET_FLOW_EXECUTION_STATUS_BY_FLOW(flow_id)}?${getQueryParamsAsString(searchQuery)}`;
    const { data, error, isLoading, mutate } = useSWR<FlowExecutionResponse[]>(
        path,
        fetcher
    );
    return { flow_analytics: data, error, isLoading, getFlowExecutionStatus: mutate };
}