"use client";
import {
  IPaymentRequiredDataResponse,
  IPaymentRunRequest,
} from "@/src/api/types";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useRunPayment } from "@/src/api/checkout";
import * as MP from "@/app/services/mercadoPagoService";

type Props = {
  paymentReqId: string;
  paymentInfo?: IPaymentRequiredDataResponse;
  children?: React.ReactNode;
};

interface FormErrors {
  cardNumber: string[];
  cvv: string[];
  cardHolderName: string[];
  expirationDate: string[];
}

const initialErrors: FormErrors = {
  cardNumber: [],
  cvv: [],
  cardHolderName: [],
  expirationDate: [],
};

export default function CheckoutForm({
  children,
  paymentInfo,
  paymentReqId,
}: Props) {
  const { runPayment } = useRunPayment(paymentReqId);
  const [errors, setErrors] = useState(initialErrors);
  const clearError = (fieldName: keyof FormErrors) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
  };

  const CARDS = {
    visa: "^4",
    amex: "^(34|37)",
    mastercard: "^5[1-5]",
    empty: "",
  };

  const [cardNumber, setCardNumber] = useState("");

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
    // Format input as a credit card number (#### #### #### ####)
    const formattedInput = input.replace(/\D/g, ""); // Remove non-numeric characters
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

  const [cvv, setCVV] = useState("");

  const handleCVVChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters

    if (numericValue.length <= 3) {
      setCVV(numericValue);
    }

    clearError("cvv");
  };

  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

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
    }

    setErrors(newErrors);
    clearError("expirationDate");
  };
  const [loadingRequest, setLoadingRequest] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      cardNumber: [],
      cvv: [],
      cardHolderName: [],
      expirationDate: [],
    };

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
    } else if (cvv.length < 3) {
      newErrors.cvv.push("El CVV no es válido.");
    }
    setErrors(newErrors);
    const splitDate = expirationDate.split("-");
    let mpToken = null;
    if (paymentInfo?.requiredData?.mercadoPagoToken) {
      const mercadoPagoService: MP.MercadoPagoService =
        new MP.MercadoPagoService(paymentInfo.requiredData.mercadoPagoToken);
      mpToken = await mercadoPagoService.MercadoPagoCardToken(
        cardNumber.replace(/\s/g, ""),
        cardHolderName,
        cvv,
        splitDate[1],
        splitDate[0]
      );
    }

    const hasErrors = Object.values(newErrors).some(
      (errorArray) => errorArray.length > 0
    );

    if (!hasErrors) {
      try {
        setLoadingRequest(true);
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
          customer: {
            address: "TODO",
            email: "TODO@TODO.com",
            city: "TODO",
            documentId: "TODO",
            fullName: cardHolderName,
          },
          paymentMethod: "CREDIT_CARD",
        };
        let payment = await runPayment(payload);
        console.log(payment);
        // TODO: redirect to success page
      } catch (err) {
        console.error("Payment error:", err);
      } finally {
        setLoadingRequest(false);
      }
    }
  };

  return (
    <div className="gap-6 flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-[70%] flex-shrink-0 overflow-hidden">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3 justify-center">
            <div className="flex flex-col">
              <p className="text-md">Lista de productos</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <div className="overflow-y-scroll max-h-[500px]">
              {paymentInfo?.products.map((item, index) => (
                <Card
                  key={index}
                  className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mb-4"
                  shadow="sm"
                >
                  {/* TODO: fix responsivenes when one on top of the other */}
                  <CardBody>
                    <div className="flex flex-row gap-6 md:gap-4 items-center justify-left">
                      <div className="col-span-6 md:col-span-4">
                        <Badge
                          content={`x${item.quantity}`}
                          size="lg"
                          color="danger"
                          shape="rectangle"
                          disableOutline
                        >
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.name}
                            className="w-full object-contain h-[140px] w-[90px] overflow-hidden"
                            src={item.imgUrl}
                          />
                        </Badge>
                      </div>

                      <div className="col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0">
                            <h1 className="font-semibold text-foreground/90">
                              {item.name}
                            </h1>
                            <p className="text-small text-foreground/80">
                              ${item.unitPrice}
                            </p>
                            <h3 className="text-small font-medium mt-2">
                              {item.description}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>MONEDA</TableColumn>
                <TableColumn>TOTAL</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>USD</TableCell>
                  <TableCell>${paymentInfo?.amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <div className="w-full md:w-80 shrink-0">
        <Card className="max-w-[400px]">
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
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-4 gap-4">
                <Input
                  type="date"
                  label="Fecha de expiración"
                  placeholder={new Date().toString()}
                  labelPlacement="outside"
                  value={expirationDate}
                  onInput={handleExpirationDateChange}
                  isRequired
                  errorMessage={errors.expirationDate.join(" ")}
                />
                <Input
                  type="text"
                  label="CVV"
                  placeholder="123"
                  maxLength={3}
                  labelPlacement="outside"
                  value={cvv}
                  onInput={handleCVVChange}
                  isRequired
                  errorMessage={errors.cvv.join(" ")}
                />
              </div>
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
  );
}
