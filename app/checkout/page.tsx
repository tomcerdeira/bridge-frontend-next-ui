'use client'

import { usePay } from "@/src/api/checkout";
import { Button, Card, CardBody, CardHeader, Divider, Image, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useMemo, useState } from "react";

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

  // hacer la integracion con el api (ver SWAGGER)
  // poner label de total

export default function CheckoutPage() {

	// --------------- (START OF) CARD STUFF ---------------

	const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

	const CARDS = {
		visa: '^4',
		amex: '^(34|37)',
		mastercard: '^5[1-5]',
		empty: ''
	};

	const [cardNumber, setCardNumber] = useState('');

	const cardType = (cardNumber: string) => {
        const number = cardNumber;
        let re;
        for (const [card, pattern] of Object.entries(CARDS)) {
            re = new RegExp(pattern);
            if (number.match(re) != null) {
                return card;
            }
        }

        return 'empty'; // default type
    };

	const useCardType = useMemo(() => {
        return cardType(cardNumber);
    }, [cardNumber]);

	const formatCardNumber = (input: string) => {
		// Format input as a credit card number (#### #### #### ####)
		const formattedInput = input.replace(/\D/g, ''); // Remove non-numeric characters
		const chunks = [];
		
		for (let i = 0; i < formattedInput.length; i += 4) {
		  chunks.push(formattedInput.substr(i, 4));
		}
		
		return chunks.join(' ');
	};

	const handleCardNumberChange = (e: any) => {
		const input = e.target.value;
		clearError('cardNumber');
		const formattedInput = formatCardNumber(input);
		if (formattedInput.length <= 32) {
			setCardNumber(formattedInput);
		  }
	};

	const [cvv, setCVV] = useState('');

	const handleCVVChange = (e: any) => {
		const inputValue = e.target.value;
		const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters

		if (numericValue.length <= 3) {
			setCVV(numericValue);
		}

		clearError('cvv');
	};

	const [cardHolderName, setCardHolderName] = useState('');
	const [expirationDate, setExpirationDate] = useState('');

	const handleCardHolderNameChange = (e: any) => {
		setCardHolderName(e.target.value);
		clearError('cardHolderName');
	};
	
	const handleExpirationDateChange = (e: any) => {
		const value = e.target.value;
		setExpirationDate(value);
	
		const currentDate = new Date();
		const selectedDate = new Date(value);
		const newErrors: FormErrors = { ...errors, expirationDate: [] };
	
		if (selectedDate <= currentDate) {
		  newErrors.expirationDate.push('Expiration date should be after the current date.');
		}
	
		setErrors(newErrors);
		clearError('expirationDate');
	  };

	const [loadingRequest, setLoadingRequest] = useState(false);
	const { doPay, error, isLoading } = usePay();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const newErrors: FormErrors = {
			cardNumber: [],
			cvv: [],
			cardHolderName: [],
			expirationDate: [],
		  };

		if (!cardNumber) {
			newErrors.cardNumber.push('Card number is required.');
		}else if(cardNumber.length < 19){
			newErrors.cardNumber.push('Card number is invalid.');
		}
		if (!cardHolderName) {
			newErrors.cardHolderName.push('Card holder name is required.');
		}
		if (!expirationDate) {
			newErrors.expirationDate.push('Expiration date is required.');
		}
		if (!cvv) {
			newErrors.cvv.push('CVV is required.');
		}else if(cvv.length < 3){
			newErrors.cvv.push('CVV is invalid.');
		}
		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

		if (!hasErrors) {
			try {
				setLoadingRequest(true);
				let payment = await doPay({ cardNumber, cardHolderName, expirationDate, cvv });
				console.log(payment);
			} catch (err) {
				console.error('Payment error:', err);
			} finally {
				setLoadingRequest(false);
			}
		}

	  };


	// --------------- (END OF) CARD STUFF ---------------

	// --------------- (START OF) ITEM LIST STUFF ---------------

	const list = [
		{
		  title: "Orange",
		  img: "/images/fruit-1.jpeg",
		  price: "$5.50",
		  description: "Juicy and vibrant citrus fruit with a sweet-tangy flavor."
		},
		{
		  title: "Tangerine",
		  img: "/images/fruit-2.jpeg",
		  price: "$3.00",
		  description: "Small, easy-to-peel citrus fruit known for its refreshing taste."
		},
		{
		  title: "Raspberry",
		  img: "/images/fruit-3.jpeg",
		  price: "$10.00",
		  description: "Delicate and flavorful berry, perfect for snacking or baking."
		},
		{
		  title: "Lemon",
		  img: "/images/fruit-4.jpeg",
		  price: "$5.30",
		  description: "Sour and zesty citrus fruit commonly used in cooking and beverages."
		},
		{
		  title: "Avocado",
		  img: "/images/fruit-5.jpeg",
		  price: "$15.70",
		  description: "Creamy and nutrient-rich fruit often used in salads and spreads."
		},
		{
		  title: "Lemon 2",
		  img: "/images/fruit-6.jpeg",
		  price: "$8.00",
		  description: "Another variety of the sour and aromatic citrus fruit."
		},
		{
		  title: "Banana",
		  img: "/images/fruit-7.jpeg",
		  price: "$7.50",
		  description: "Naturally sweet and convenient snack loved by people of all ages."
		},
		{
		  title: "Watermelon",
		  img: "/images/fruit-8.jpeg",
		  price: "$12.20",
		  description: "Large and hydrating melon with juicy, refreshing flesh."
		},
	  ];

	  // --------------- (END OF) ITEM LIST STUFF ---------------
	  
	
	return (
		<div className="gap-6 flex justify-center">
			<div className="w-[70%] flex-shrink-0 overflow-hidden">
				<Card className="max-w-[400px]">
					<CardHeader className="flex gap-3 justify-center">
						<div className="flex flex-col">
							<p className="text-md">Item List</p>
						</div>
					</CardHeader>
					<Divider/>
					<CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
						
					<div className="overflow-y-scroll max-h-[500px]">
						{list.map((item, index) => (
							<Card
							key={index}
							className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mb-4"
							shadow="sm"
						  >
								<CardBody>
									<div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
										<div className="relative col-span-6 md:col-span-4">
										<Image
											shadow="sm"
											radius="lg"
											width="100%"
											alt={item.title}
											className="w-full object-cover h-[140px]"
											src={item.img}
										/>
									</div>
							
									<div className="flex flex-col col-span-6 md:col-span-8">
										<div className="flex justify-between items-start">
											<div className="flex flex-col gap-0">
												<h1 className="font-semibold text-foreground/90">{item.title}</h1>
												<p className="text-small text-foreground/80">{item.price}</p>
												<h3 className="text-small font-medium mt-2">{item.description}</h3>
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
							<TableColumn>CURRENCY</TableColumn>
							<TableColumn>TOTAL</TableColumn>
						</TableHeader>
						<TableBody>
							<TableRow key="1">
							<TableCell>USD</TableCell>
							<TableCell>$10</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					</CardBody>
				</Card>
			</div>

			<div className="w-80 shrink-0">
				<Card className="max-w-[400px]">
					<CardHeader className="flex gap-3 justify-center">
						<div className="flex flex-col">
							<p className="text-md">Payment Information</p>
						</div>
					</CardHeader>
					<Divider/>
					<CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">

					<div>
						<Input
							className="mb-4"
							type="text" // Use "text" instead of "number"
							label="Card Number"
							placeholder="#### #### #### ####"
							labelPlacement="outside"
							value={cardNumber ?? ""}
							onChange={handleCardNumberChange}
							maxLength={19}
							isRequired
							validationState={errors.cardNumber.length > 0 ? "invalid" : "valid"}
							errorMessage={errors.cardNumber.join(' ')}
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
							label="Card Holder Name"
							placeholder="Your Name"
							labelPlacement="outside"
							maxLength={30}
							value={cardHolderName}
							onInput={handleCardHolderNameChange}
							isRequired
							validationState={errors.cardHolderName.length > 0 ? "invalid" : "valid"}
							errorMessage={errors.cardHolderName.join(' ')}
						/>
						<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-4 gap-4">
							<Input
								type="date"
								label="Expiration Date"
								placeholder={(new Date()).toString()}
								labelPlacement="outside"
								value={expirationDate}
								onInput={handleExpirationDateChange}
								isRequired
								validationState={errors.expirationDate.length > 0 ? "invalid" : "valid"}
								errorMessage={errors.expirationDate.join(' ')}
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
							validationState={errors.cvv.length > 0 ? "invalid" : "valid"}
							errorMessage={errors.cvv.join(' ')}
							/>
						</div>
						<Button className="mt-6 w-full" onClick={handleSubmit} isLoading={loadingRequest} color="success" variant="shadow">
							Pay
						</Button> 
					</div>
					</CardBody>
				</Card>
			</div>

		</div>
	);
}
