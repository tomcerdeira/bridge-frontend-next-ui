import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { IPaymentRequiredDataResponse, IPaymentStatusResponse } from "./types";

export const RUN_PAYMENT_PATH = `/payment/public/payments/run/`;
export const RETRIEVE_PAYMENT_REQ_PATH = (paymentReqId: string) => `/payment/public/payments/${paymentReqId}`;
export const RETRIEVE_PAYMENT_REQ_STATUS_PATH = (paymentReqId: string) => `/payment/public/flows-exec-status/paymentReq/${paymentReqId}`;

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

export function useGetPayment(paymentReqId: string) {
  const { data, error, isLoading, mutate } = useSWR<IPaymentRequiredDataResponse>(RETRIEVE_PAYMENT_REQ_PATH(paymentReqId), fetcher);
  return { paymentInfo: data, error, isLoading, getPayment: mutate }
}

export function useGetPaymentStatus(paymentReqId: string) {
  const { data, error, isLoading, mutate } = useSWR<IPaymentStatusResponse>(RETRIEVE_PAYMENT_REQ_STATUS_PATH(paymentReqId), fetcher);
  return { paymentStatus: data, error, isLoading, getPaymentStatus: mutate }
}

