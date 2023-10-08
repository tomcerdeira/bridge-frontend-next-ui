import { fetcher } from "../lib/fetcher/clientFetcher";
import { IPaymentRunRequest } from "./types";
export const RUN_PAYMENT_PATH = `/payment/public/payments/run/`;

export async function runPayment(
  paymentReqId: string,
  paymentRunRequest: IPaymentRunRequest
) {
  console.log(JSON.stringify(paymentRunRequest));
  const url = RUN_PAYMENT_PATH + paymentReqId;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetcher<any>(url, {
    method: "POST",
    body: JSON.stringify(paymentRunRequest),
  });
}
