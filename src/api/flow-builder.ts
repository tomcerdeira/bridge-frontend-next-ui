import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";

export function useFlowBuilder(flowId?: string) {
  async function buildFlow(url, { arg }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const method = flowId ? "PUT" : "POST";
    return fetcher<any>(url, { body: arg, method: method });
  }

  const url = flowId ? `/payment/private/flows/${flowId}` : "/payment/private/flows";
  const { trigger, data, isMutating, error } = useSWRMutation(url, buildFlow, {
    throwOnError: false,
  });

  return {
    buildFlow: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}

export function useFlowTasks() {
  async function getTasks(url: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetcher<any>(url, { method: "GET" });
  }

  const { data, error, isMutating, trigger } = useSWRMutation(
    "/payment/private/tasks",
    getTasks,
    {
      throwOnError: false,
    }
  );

  return {
    getTasks: trigger,
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
    `/payment/private/flows/${flowId}`,
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
