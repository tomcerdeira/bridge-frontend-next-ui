import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { FlowSummary } from "./types";

export const GET_SHOP_FLOWS = (shopId: string) => `/payment/private/flows/shop/${shopId}`
export const GET_FLOW_BY_ID = (flowId: string) => `/payment/private/flows/${flowId}`
export const DELETE_FLOW = (flowId: string) => `/payment/private/flows/${flowId}`
export const DELETE_FLOW_BASE = `/payment/private/flows`

export function useGetFlows(shopId: string) {
    const { data, error, isLoading, mutate } = useSWR<FlowSummary[]>(GET_SHOP_FLOWS(shopId), fetcher, {revalidateOnFocus: true});
    return { flows: data, error, isLoading, getFlows: mutate }
}

export function useGetFlowById(flowId: string) {
  const { data, error, isLoading, mutate } = useSWR<FlowSummary>(GET_FLOW_BY_ID(flowId), fetcher, {revalidateOnFocus: true});
  return { flow_details: data, error, isLoading, getFlows: mutate }
}

export function useDeleteFlow() {
    const { trigger, isMutating, error } = useSWRMutation(
        DELETE_FLOW_BASE,
      (url, { arg }: { arg: any }) => {
        const PATH = `${url}/${arg.flowId}`
        return fetcher<{}>(PATH, { method: 'DELETE' })
      },
      { throwOnError: false }
    )
  
    return {
        doDeleteFlow: trigger,
      isLoading: isMutating,
      error,
    }
  }