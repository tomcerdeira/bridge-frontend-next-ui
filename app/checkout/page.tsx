'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Radio, RadioGroup } from "@nextui-org/react";

export default function CheckoutPage() {
	const list = [
		{
		  title: "Orange",
		  img: "/images/fruit-1.jpeg",
		  price: "$5.50",
		},
		{
		  title: "Tangerine",
		  img: "/images/fruit-2.jpeg",
		  price: "$3.00",
		},
		{
		  title: "Raspberry",
		  img: "/images/fruit-3.jpeg",
		  price: "$10.00",
		},
		{
		  title: "Lemon",
		  img: "/images/fruit-4.jpeg",
		  price: "$5.30",
		},
		{
		  title: "Avocado",
		  img: "/images/fruit-5.jpeg",
		  price: "$15.70",
		},
		{
		  title: "Lemon 2",
		  img: "/images/fruit-6.jpeg",
		  price: "$8.00",
		},
		{
		  title: "Banana",
		  img: "/images/fruit-7.jpeg",
		  price: "$7.50",
		},
		{
		  title: "Watermelon",
		  img: "/images/fruit-8.jpeg",
		  price: "$12.20",
		},
	  ];
	
	return (
		<div className="flex gap-6">
			<div>
				<Card className="max-w-[400px]">
					<CardHeader className="flex gap-3 justify-center">
						<div className="flex flex-col">
							<p className="text-md">Item List</p>
						</div>
					</CardHeader>

					<Divider/>

					<CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
						
					<div>
						{list.map((item, index) => (
							<Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
							<CardBody className="overflow-visible p-0">
								<Image
								shadow="sm"
								radius="lg"
								width="100%"
								alt={item.title}
								className="w-full object-cover h-[140px]"
								src={item.img}
								/>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<b>{item.title}</b>
								<p className="text-default-500">{item.price}</p>
							</CardFooter>
							</Card>
						))}
					</div>

						<RadioGroup
						label="Choose Currency"
						defaultValue="arg"
						>
							<Radio value="usd">USD</Radio>
							<Radio value="arg">ARG</Radio>
						</RadioGroup>
					</CardBody>

				</Card>
			</div>

			<div>
			<Card className="max-w-[400px]">

<CardHeader className="flex gap-3 justify-center">
	<div className="flex flex-col">
		<p className="text-md">Payment Information</p>
	</div>
</CardHeader>

<Divider/>

<CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">

	<Input
		type="number"
		label="Card Number"
		placeholder="1234 5678 9101 1121"
		labelPlacement="outside"
		endContent={
			<Image
			src="/card-type-logos/amex.png" // Replace with the actual image path
			alt="Card Type"
			width={40}
			height={20} // Adjust the height as needed
			/>
		}
	/>
	<Input
		type="text"
		label="Card Holder Name"
		placeholder="Your Name"
		labelPlacement="outside"
	/>

	<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
		<Input
			type="date"
			label="Expiration Date"
			placeholder="01/01/2023"
			labelPlacement="outside"
		/>
		<Input
			type="number"
			label="CVV"
			placeholder="123"
			labelPlacement="outside"
		/>
	</div>

	<Button color="success" variant="shadow">
		Pay
	</Button> 

</CardBody>

</Card>

			</div>

		</div>
	);
}
