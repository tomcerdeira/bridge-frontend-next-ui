import CheckoutForm from "./checkoutForm";

//TODO: hacer lo del serverFetcher con un mock en principio
function getPaymentInformation(id: string) {
    const PATH = `/payments/${id}`
    // return serverFetcher<Memory>(PATH)
    return { test: PATH};
  }

export default async function CheckoutPage({ params: { paymentReqId } }) {
    const payment_info = await getPaymentInformation(paymentReqId)
    return (
      <div>
        <CheckoutForm payment_information={payment_info}></CheckoutForm>
      </div>
    )
  }