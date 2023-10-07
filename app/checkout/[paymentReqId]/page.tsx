import { IPaymentRequest, MockResponse_IPaymentRequest } from "@/src/api/types";
import { serverFetcher } from "@/src/lib/fetcher/serverFetcher";
import CheckoutForm from "./checkoutForm";

function getPaymentInformation(paymentReqId: string) {
    const PATH = `payment/private/payments/${paymentReqId}`
    return serverFetcher<IPaymentRequest>(PATH)
  }

export default async function CheckoutPage({ params: { paymentReqId } }: { params: { paymentReqId: string } }) {
    // const payment_info = await getPaymentInformation(paymentReqId)
    const payment_info = MockResponse_IPaymentRequest;
    return (
      <div>
        <CheckoutForm payment_information={payment_info}></CheckoutForm>
      </div>
    )
  }