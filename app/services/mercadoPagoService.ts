import { initMercadoPago } from "@mercadopago/sdk-react";
import { createCardToken } from "@mercadopago/sdk-react/coreMethods";
import { CardToken } from "@mercadopago/sdk-react/coreMethods/util/types";

//doc: https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancecreatecardtokencardtokenparams
export class MercadoPagoService {
  publicKey: string;

  constructor(publicKey: string) {
    this.publicKey = publicKey;
    initMercadoPago(publicKey);
  }

  public async MercadoPagoCardToken(
    cardNumber: string,
    cardName: string,
    cvv: string,
    cardExpirationMonth: string,
    cardExpirationYear: string
  ): Promise<CardToken | undefined> {
    return await createCardToken({
      cardNumber: cardNumber,
      cardholderName: cardName,
      cardExpirationMonth: cardExpirationMonth,
      cardExpirationYear: cardExpirationYear,
      securityCode: cvv,
      identificationType: "DNI",
      identificationNumber: "12345678",
    });
  }
}
