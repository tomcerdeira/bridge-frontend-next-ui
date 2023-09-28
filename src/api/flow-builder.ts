import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";

export function useFlowBuilder() {
  async function buildFlow(url, { arg }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetcher<any>(url, { body: arg, method: "POST" });
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    "/payment/flows",
    buildFlow,
    { throwOnError: false }
  );

  return {
    buildFlow: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useFlowRetrieve(flowId: string) {
  async function getFlow(url: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetcher<any>(url, { method: "GET" });
  }

  const { data, error, isMutating, trigger } = useSWRMutation(
    `/payment/flows/${flowId}`,
    getFlow,
    {
      throwOnError: false,
    }
  );

  return {
    getFlow: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}
