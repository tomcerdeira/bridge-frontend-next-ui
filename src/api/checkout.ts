import useSWRMutation from 'swr/mutation';

export const PAY_PATH = `/pay`


// TODO: todo esto no se si va ir aca
const mockPaymentInfo = {
    amount: 100,
    customer: {
      fullName: "John Smith",
      email: "john@example.com",
      address: "123 Main St",
      city: "Anytown"
    },
    shopId: 0,
    associatedFlowId: "ObjectId(\"64de37518d54aa9678f72b04\")",
    products: [
      {
        name: "Socks",
        unitPrice: 100,
        description: "Red socks",
        imgUrl: "https://nicharry.com/cdn/shop/products/Red_Product_be8df392-ae5e-4447-9835-f4d01fd9db73.jpg",
        quantity: 1
      }
    ]
  };

  export function useGetPaymentInfo() {

    async function mockDoGetPaymentInfo(url, { arg }) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockPaymentInfo;
        }

    const { trigger, data, isMutating, error } = useSWRMutation(PAY_PATH, mockDoGetPaymentInfo, {
        throwOnError: false,
    });

    return {
        doGetPaymentInfo: trigger,
        isLoading: isMutating,
        paymentInfo: mockDoGetPaymentInfo,
        error,
    };
}
// TODO: hasta aca

const mockPay = {
    amount: 100,
    customer: {
      fullName: "John Smith",
      email: "john@example.com",
      address: "123 Main St",
      city: "Anytown"
    },
    shopId: 0,
    associatedFlowId: "ObjectId(\"64de37518d54aa9678f72b04\")",
    products: [
      {
        name: "Socks",
        unitPrice: 100,
        description: "Red socks",
        imgUrl: "https://nicharry.com/cdn/shop/products/Red_Product_be8df392-ae5e-4447-9835-f4d01fd9db73.jpg",
        quantity: 1
      }
    ]
  };
  
export function usePay() {

    async function mockDoPay(url, { arg }) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockPay;
        }

    const { trigger, data, isMutating, error } = useSWRMutation(PAY_PATH, mockDoPay, {
        throwOnError: false,
    });

    return {
        doPay: trigger,
        isLoading: isMutating,
        pay: mockDoPay,
        error,
    };
}