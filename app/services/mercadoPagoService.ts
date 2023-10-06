import {initMercadoPago} from "@mercadopago/sdk-react";
import {createCardToken} from '@mercadopago/sdk-react/coreMethods';
import {CardToken} from "@mercadopago/sdk-react/coreMethods/util/types";

//doc: https://github.com/mercadopago/sdk-js/blob/main/API/core-methods.md#mp-instancecreatecardtokencardtokenparams
export class MercadoPagoService{
    publicKey:string;

    constructor(publicKey:string) {
        this.publicKey = publicKey;
        initMercadoPago(publicKey);
    }

    public async MercadoPagoCardToken(
        cardNumber:string,
        cardName:string,
        cvv:string
    ) : Promise<CardToken | undefined> {
        // Tarjeta de prueba de MP
        //OBS: CardNumber llega con espacios y a MP no le gusta, hay que hacer un trim
        return await createCardToken({
            cardNumber: "4509953566233704",
            cardholderName: "APRO",
            cardExpirationMonth: '11',
            cardExpirationYear: '25', //TODO
            securityCode: "123",
            identificationType: 'DNI',
            identificationNumber: '12345678',
        });
    }
}
