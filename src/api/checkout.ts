import useSWRMutation from 'swr/mutation';

export const PAY_PATH = `/pay`

const mockPay = {
    amount: 10,
    card: {
      nameOnCard: 'Santi',
      number: 1111222233334444,
      cvv: 123,
      expDate: '12/23',
      cardType: 'AMEX'
    },
    customer: {
      fullName: 'Santiago',
      email: 'san@sna.com',
      address: 'adress',
      city: 'junin',
    },
    shopId: 1,
    paymentMethod: 'CREDIT_CARD',
    paymentCurrency: 'ARS'
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