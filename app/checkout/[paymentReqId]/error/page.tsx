'use client'

import { useGetPayment } from "@/src/api/checkout";
import { Card, Image } from "@nextui-org/react";
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
                                            radius="lg"
                                            width="100%"
                                            alt="cross-icon"
                                            className="w-full object-contain h-[140px] w-[90px] overflow-hidden"
                                            src="/cross-icon.png"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-2xl">Ocurrió un error procesando tu pago...</p>
                                    </div>
                                </div>
                                <div className="justify-center mb-4 mt-10">
                                    <div className="font-semibold">
                                        El ID de ejecución es: PONER ID
                                    </div>
                                    <div className="text-sm mt-6">
                                        Redirigiendote al sitio del comerciante en <span className="text-green-500">{countDown} s</span>
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
