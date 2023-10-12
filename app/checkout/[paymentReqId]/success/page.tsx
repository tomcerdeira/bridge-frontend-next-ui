'use client'

import { useGetPayment } from "@/src/api/checkout";
import { Badge, Card, CardBody, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const REDIRECT_TIMEOUT_IN_SECONDS: number = 30;

export default function ChackoutError() {
    const pathname = usePathname();
    const { paymentInfo } = useGetPayment(pathname.split('/')[2]);

    const [countDown, setCountDown] = useState(REDIRECT_TIMEOUT_IN_SECONDS);
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (countDown > 1) {
                setCountDown((prevCount) => prevCount - 1);
              } else {
                //TODO: do the redirect to e-commerce  
                // router.push("/"); 
                clearInterval(timer);
              }
            
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [countDown, router]);
    
	return (
        <>
            {!paymentInfo? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                    <div className="gap-2 flex flex-col md:flex-row justify-center">
                        <p style={{ fontSize: "24px" }}>Cargando...</p>
                    </div>
                </div>
            )
            :
            (
                <>
                    <div className="flex justify-center">
                        <div>
                            <Card className="w-[400px]">
                                <div className="flex justify-center flex-col">
                                    <div className="flex justify-center">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt="check-icon"
                                            className="w-full object-contain h-[140px] w-[90px] overflow-hidden"
                                            src="/check-icon.png"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-2xl">¡Tu pago fué exitoso!</p>
                                    </div>
                                </div>
                                <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-4">
                                    <div className="flex justify-center">
                                        <p>Listado de productos comprados</p>
                                    </div>
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
                                        <TableCell>{paymentInfo?.currency}</TableCell>
                                        <TableCell>${paymentInfo?.amount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    </Table>
                                </CardBody>
                                <div className="justify-center mb-4">
                                    <div className="font-semibold">
                                        El ID de tu pago es: PONER ID
                                    </div>
                                    <div className="text-sm mt-6">
                                        Redirigiendote al sitio del comerciante en {countDown} s
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            )

            }
        </>
	);
}
