import { getPaymentReq } from "@/src/api/server/checkout";
import { IPaymentRequiredDataResponse } from "@/src/api/types";
import CheckoutForm from "./checkoutForm";

export default async function CheckoutPage({
  params: { paymentReqId },
}: {
  params: { paymentReqId: string };
}) {
  try {
    const paymentInfo: IPaymentRequiredDataResponse = await getPaymentReq(
      paymentReqId
    );
    return (
      <div>
        <CheckoutForm
          paymentReqId={paymentReqId}
          paymentInfo={paymentInfo}
        ></CheckoutForm>
      </div>
    );
  } catch (error) {
    return <div>404 - Página no encontrada</div>;
  }
}
