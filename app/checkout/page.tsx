'use client'

import { Button, Card, CardBody, CardHeader, Divider, Image, Input, Radio, RadioGroup } from "@nextui-org/react";

export default function CheckoutPage() {
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
							isBlurred
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

			<div className="w-80 shrink-0">
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
