"use client";
import * as MP from "@/app/services/mercadoPagoService";
import toast from "@/components/toast";
import { useGetPaymentStatus, useRunPayment } from "@/src/api/checkout";
import {
  IPaymentMethod,
  IPaymentRequiredDataResponse,
  IPaymentRunRequest,
} from "@/src/api/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PaymentInformationCard from "./payment-info";

type Props = {
  paymentReqId: string;
  paymentInfo: IPaymentRequiredDataResponse;
};

interface FormErrors {
  cardNumber: string[];
  cvv: string[];
  cardHolderName: string[];
  expirationDate: string[];
  typeOfCard: string[];
}

const initialErrors: FormErrors = {
  cardNumber: [],
  cvv: [],
  cardHolderName: [],
  expirationDate: [],
  typeOfCard: [],
};

const CARDS = {
  //TODO revisar regex
  visa: "^4",
  amex: "^(34|37)",
  mastercard: "^5[0-5]",
  empty: "",
};

export default function CheckoutForm({ paymentInfo, paymentReqId }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState(initialErrors);
  const clearError = (fieldName: keyof FormErrors) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
  };

  const { paymentStatus } = useGetPaymentStatus(paymentReqId);
  const { doRunPayment, error: paymentError } = useRunPayment(paymentReqId);

  useEffect(() => {
    if (paymentStatus?.paymentReqExecuted) {
      if (paymentStatus?.paymentSucceed) {
        return redirect("/checkout/" + paymentReqId + "/success");
      } else {
        return redirect("/checkout/" + paymentReqId + "/error");
      }
    }
  }, [paymentReqId, paymentStatus]);

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [typeOfCard, setTypeOfCard] = useState<IPaymentMethod>("CREDIT_CARD");
  const [loadingRequest, setLoadingRequest] = useState(false);

  const cardType = (cardNumber: string) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return "empty"; // default type
  };

  const useCardType = useMemo(() => {
    return cardType(cardNumber);
  }, [cardNumber]);

  const formatCardNumber = (input: string) => {
    const formattedInput = input.replace(/\D/g, "");
    const chunks = [];

    for (let i = 0; i < formattedInput.length; i += 4) {
      chunks.push(formattedInput.substr(i, 4));
    }

    return chunks.join(" ");
  };

  const handleCardNumberChange = (e: any) => {
    const input = e.target.value;
    clearError("cardNumber");
    const formattedInput = formatCardNumber(input);
    if (formattedInput.length <= 32) {
      setCardNumber(formattedInput);
    }
  };

  const handleCVVChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    if (useCardType.toUpperCase() !== "AMEX") {
      if (numericValue.length <= 3) {
        setCVV(numericValue);
      }
    } else {
      if (numericValue.length <= 4) {
        setCVV(numericValue);
      }
    }
    clearError("cvv");
  };

  const handleCardHolderNameChange = (e: any) => {
    setCardHolderName(e.target.value);
    clearError("cardHolderName");
  };

  const handleExpirationDateChange = (e: any) => {
    const value = e.target.value;
    setExpirationDate(value);
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const newErrors: FormErrors = { ...errors, expirationDate: [] };
    if (selectedDate <= currentDate) {
      newErrors.expirationDate.push(
        "La fecha de vencimiento debe ser posterior a la fecha actual."
      );
    } else {
      clearError("expirationDate");
    }
    setErrors(newErrors);
  };

  const handleTypeOfCardChange = (e: any) => {
    setTypeOfCard(e as IPaymentMethod);
    clearError("typeOfCard");
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      cardNumber: [],
      cvv: [],
      cardHolderName: [],
      expirationDate: [],
      typeOfCard: [],
    };

    if (!typeOfCard) {
      newErrors.typeOfCard.push("Se requiere definir el tipo de tarjeta.");
    }

    if (!cardNumber) {
      newErrors.cardNumber.push("Se requiere el número de tarjeta.");
    } else if (cardNumber.length < 19) {
      newErrors.cardNumber.push("El número de tarjeta no es válido.");
    }

    if (!cardHolderName) {
      newErrors.cardHolderName.push(
        "Se requiere el nombre del titular de la tarjeta."
      );
    }

    if (!expirationDate) {
      newErrors.expirationDate.push("Se requiere la fecha de vencimiento.");
    }

    if (!cvv) {
      newErrors.cvv.push("Se requiere el CVV.");
    } else if (
      (cvv.length < 3 && useCardType.toUpperCase() !== "AMEX") ||
      (useCardType.toUpperCase() === "AMEX" && cvv.length < 4)
    ) {
      newErrors.cvv.push("El CVV no es válido.");
    }

    setErrors(newErrors);

    return newErrors;
  };

  const getMpToken = async () => {
    const splitDate = expirationDate.split("-");
    let mpToken = null;

    if (paymentInfo?.requiredData?.mercadoPagoToken) {
      try {
        const mercadoPagoService: MP.MercadoPagoService =
          new MP.MercadoPagoService(paymentInfo.requiredData.mercadoPagoToken);
        mpToken = await mercadoPagoService.MercadoPagoCardToken(
          cardNumber.replace(/\s/g, ""),
          cardHolderName,
          cvv,
          splitDate[1],
          splitDate[0]
        );
      } catch (err) {
        toast({
          type: "error",
          message:
            "Ocurrió un error validando sus credenciales, compruebe que las mismas sean correctas...",
        });
      }
    }

    return mpToken;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validateForm();
    const hasErrors = Object.values(newErrors).some(
      (errorArray) => errorArray.length > 0
    );

    const splitDate = expirationDate.split("-");

    if (!hasErrors) {
      try {
        setLoadingRequest(true);
        const mpToken = await getMpToken();
        if (!mpToken) return;

        const formattedDate = `${splitDate[1]}/${splitDate[0].slice(-2)}`;
        let payload: IPaymentRunRequest = {
          card: {
            cvv: parseInt(cvv),
            expDate: formattedDate,
            nameOnCard: cardHolderName,
            number: parseInt(cardNumber.replace(/\s/g, "")),
            cardMPToken: mpToken?.id,
            cardType: useCardType.toUpperCase(),
          },
          paymentMethod: typeOfCard,
        };

        try {
          let payment = await doRunPayment(payload);
          if (payment) {
            push(`${pathname}/success`);
          }
        } catch (err: any) {
          switch (err.message) {
            case "INVALID_USER_PARAMETERS":
              toast({
                type: "error",
                message:
                  "Ocurrió un error validando sus credenciales, compruebe que las mismas sean correctas...",
              });
              return;
            case "INVALID_CARD_NUMBER":
              newErrors.cardNumber.push("Número de tarjeta incorrecto.");
              return;
            case "INVALID_CVV":
              newErrors.cvv.push("CVV incorrecto.");
              return;
            default:
              push(`${pathname}/error`);
              return;
          }
        }
      } catch (err: any) {
        console.error("Payment error:", err);
        push(`${pathname}/error`);
      } finally {
        setLoadingRequest(false);
      }
    }
  };

  return (
    <>
      {!paymentStatus ? (
        <div className="flex flex-col h-full justify-center items-center gap-10">
          <div className="gap-2 flex flex-col md:flex-row justify-center">
            <p style={{ fontSize: "24px" }}>Cargando...</p>
          </div>
        </div>
      ) : (
        <div className="gap-6 flex flex-col md:flex-row justify-center">
          <PaymentInformationCard paymentInfo={paymentInfo} />

          <div className="w-full md:w-80 shrink-0">
            <Card className="max-w-[500px]">
              <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col">
                  <p className="text-md">Información del pago</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <div>
                  <Input
                    className="mb-4"
                    type="text" // Use "text" instead of "number"
                    label="Número de la tarjeta"
                    placeholder="#### #### #### ####"
                    labelPlacement="outside"
                    value={cardNumber ?? ""}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    isRequired
                    errorMessage={errors.cardNumber.join(" ")}
                    endContent={
                      <Image
                        src={`/card-type-logos/${useCardType}.png`}
                        alt={useCardType}
                        width={35}
                        height={15}
                      />
                    }
                  />
                  <Input
                    className="mb-4"
                    type="text"
                    label="Nombre que figura en la tarjeta"
                    placeholder="Tú nombre"
                    labelPlacement="outside"
                    maxLength={20}
                    value={cardHolderName}
                    onInput={handleCardHolderNameChange}
                    isRequired
                    errorMessage={errors.cardHolderName.join(" ")}
                  />
                  <div className="flex mb-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-4 gap-4">
                    <Input
                      type="month"
                      label="Fecha de expiración"
                      placeholder={new Date().toString()}
                      labelPlacement="outside"
                      value={expirationDate}
                      onInput={handleExpirationDateChange}
                      isRequired
                      errorMessage={errors.expirationDate.join(" ")}
                    />
                    <Input
                      type="password"
                      label="CVV"
                      placeholder={
                        useCardType.toUpperCase() === "AMEX" ? "1234" : "123"
                      }
                      maxLength={useCardType.toUpperCase() === "AMEX" ? 4 : 3}
                      labelPlacement="outside"
                      value={cvv}
                      onInput={handleCVVChange}
                      isRequired
                      errorMessage={errors.cvv.join(" ")}
                    />
                  </div>
                  <RadioGroup
                    orientation="horizontal"
                    className="items-center mt-10"
                    errorMessage={errors.typeOfCard.join(" ")}
                    onValueChange={handleTypeOfCardChange}
                    defaultValue="CREDIT_CARD"
                  >
                    <Radio value="CREDIT_CARD">Crédito</Radio>
                    <Radio value="DEBIT_CARD">Débito</Radio>
                  </RadioGroup>
                  <Button
                    className="mt-6 w-full"
                    onClick={handleSubmit}
                    isLoading={loadingRequest}
                    color="success"
                    variant="shadow"
                  >
                    Pagar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
