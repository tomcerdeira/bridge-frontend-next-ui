'use client'

import toast from "@/components/toast";
import { useResendVerifyEmail } from "@/src/api/users";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function CheckEmail() {
    const router = useRouter();
    const [showResendButton, setShowResendButton] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowResendButton(true);
        }, 10000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);


      const { doResendVerifyEmail, error, isLoading } = useResendVerifyEmail();
      const handleSubmit = async (e: any) => {
        try {
            setLoadingRequest(true);
            const ok = await doResendVerifyEmail();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if(ok){
                toast({ type: 'success', message: 'Email enviado correctamente...' });
            }else{
                toast({ type: 'error', message: 'Ocurrió un error, vuelva a intentarlo en un momento.' });
            }
            setShowResendButton(false);
            setLoadingRequest(false);
        } catch (err) {} finally {
            setLoadingRequest(false);
        }
	};
    
    return (
        <div className="gap-6 justify-center">
        <div className="w-full flex-shrink-0 overflow-hidden">
            <div className="gap-2 flex flex-col md:flex-row justify-center ">
                <p style={{ fontSize: "24px" }}>Ve a tu email para validar la cuenta.</p>
            </div>
            {showResendButton && (
                    <div className="gap-2 flex flex-col md:flex-row justify-center ">
                        <Button size="sm" className="mt-4" onClick={handleSubmit} isLoading={loadingRequest} color="warning" variant="light">
                            Volver a enviar email
                        </Button> 
                    </div>
            )}
        </div>
    </div>
    )
  }