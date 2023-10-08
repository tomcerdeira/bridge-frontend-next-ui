import { serverFetcher } from "../../lib/fetcher/serverFetcher";
import { IPaymentRequiredDataResponse } from "../types";

export const RETRIEVE_PAYMENT_REQ_PATH = `/payment/public/payments/`;
export async function getPaymentReq(paymentReqId: string) {
  const url = RETRIEVE_PAYMENT_REQ_PATH + paymentReqId;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return serverFetcher<IPaymentRequiredDataResponse>(url, { method: "GET" });
}
