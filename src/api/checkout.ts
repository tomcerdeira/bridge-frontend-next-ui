import { fetcher } from "../lib/fetcher/clientFetcher";
import useSWRMutation from "swr/mutation";
export const RUN_PAYMENT_PATH = `/payment/public/payments/run/`;

export function useRunPayment(paymentReqId: string) {
  async function runPayment(url, { arg }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetcher<any>(url, {
      method: "POST",
      body: arg,
    });
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    RUN_PAYMENT_PATH + paymentReqId,
    runPayment,
    {
      throwOnError: true,
    }
  );

  return {
    runPayment: trigger,
    isLoading: isMutating,
    data,
    error,
  };
}
