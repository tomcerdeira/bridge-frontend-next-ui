'use client'

import { useGetPayment, useGetPaymentStatus } from "@/src/api/checkout";
import { Card, Image } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const REDIRECT_TIMEOUT_IN_SECONDS: number = 30;

export default function ChackoutError() {
    const pathname = usePathname();
    const paymentReqId = pathname.split('/')[2]
    const { paymentInfo } = useGetPayment(paymentReqId);
    const { paymentStatus } = useGetPaymentStatus(paymentReqId);

    const [countDown, setCountDown] = useState(REDIRECT_TIMEOUT_IN_SECONDS);
    const router = useRouter();
    useEffect(() => {

        if (paymentStatus && !paymentStatus.paymentReqExecuted) {
            router.push("/checkout/" + paymentReqId);
        }else if(paymentStatus && paymentStatus.paymentSucceed){
            router.push("/checkout/" + paymentReqId + "/success");
        }

        const timer = setTimeout(() => {
            if (countDown > 1) {
                setCountDown((prevCount) => prevCount - 1);
              } else {
                 
                if(paymentStatus?.redirectURL){
                    router.push(paymentStatus!.redirectURL); 
                }else{
                    router.push("/"); 
                } 

                clearInterval(timer);
              }
            
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
      }, [countDown, paymentReqId, paymentStatus, router]);

      const loadingContent = (
        <div className="flex flex-col h-full justify-center items-center gap-10">
          <div className="gap-2 flex flex-col md:flex-row justify-center">
            <p style={{ fontSize: "24px" }}>Cargando...</p>
          </div>
        </div>
      );

      const errorContent = (
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
                        <div>
                            <p>El ID de ejecución es: </p>
                            <p className="italic font-bold mt-4">{paymentStatus?.flowExecId}</p>
                        </div>
                        <div className="text-sm mt-6">
                            Redirigiendote al sitio del comerciante en <span className="text-green-500">{countDown} s</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      )
    
      return (
        <>
            {paymentStatus && paymentStatus.paymentReqExecuted && !paymentStatus.paymentSucceed ? errorContent : loadingContent}
        </>
    ); 
}
