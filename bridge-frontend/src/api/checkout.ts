import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "../lib/fetcher/clientFetcher";
import { FlowExecutionResponse, IPaymentRequiredDataResponse, IPaymentStatusResponse } from "./types";

export const RUN_PAYMENT_PATH = (paymentReqId: string) => `/payment/public/payments/run/${paymentReqId}`;
export const RETRIEVE_PAYMENT_REQ_PATH = (paymentReqId: string) => `/payment/public/payments/${paymentReqId}`;
export const RETRIEVE_PAYMENT_REQ_STATUS_PATH = (paymentReqId: string) => `/payment/public/flows-exec-status/paymentReq/${paymentReqId}`;

export function useRunPayment(paymentReqId: string) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    RUN_PAYMENT_PATH(paymentReqId),
    (url, { arg }) => fetcher<FlowExecutionResponse>(url, { body: arg, method: "POST" }),
    { throwOnError: true }
  );

  return {
    doRunPayment: trigger,
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

