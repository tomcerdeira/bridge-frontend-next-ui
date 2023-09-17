'use client'

import { MailIcon } from "@/components/mailIcon";
import { useForgotPassword } from "@/src/api/users";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
// import { toast } from "react-toastify";
import toast from "@/components/toast";


interface FormErrors {
	email: string[];
	password: string[];
  }
  
  const initialErrors: FormErrors = {
	email: [],
	password: [],
  };

export default function ForgotPasswordForm() {
    const notify = useCallback((type, message) => {
        toast({ type, message });
      }, []);
    const [isVisible, setIsVisible] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const [email, setEmail] = useState('');

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
        clearError("email");
	};

    const { doForgotPassword, error, isLoading } = useForgotPassword();
    const router = useRouter();

	const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newErrors: FormErrors = {
			email: [],
			password: [],
		  };

          if (!email) {
            newErrors.email.push('Se requiere un correo electrónico.');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email.push('Por favor, ingresa un correo electrónico válido.');
        }        
		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                const user = await doForgotPassword({ email });
                if(user){
                    toast({ type: 'success', message: 'Email enviado correctamente...' });
                    setEmailSent(true);
                }else{
                    toast({ type: 'error', message: 'Ocurrió un error. Verifique el email introducido.' });
                }
                setLoadingRequest(false);
            } catch (err) {} finally {
                setLoadingRequest(false);
            }
        }

	};

    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3 justify-center">
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-left mb-4">Olvidé mi contraseña</p>
                        <p className="text-small text-left opacity-50">Ingresa la dirección de correo electrónico asociada con tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</p>
                    </div>

                    </CardHeader>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            isRequired
                            type="email"
                            label="Email"
                            placeholder="tu@email.com"
                            labelPlacement="outside"
                            onChange={handleEmailChange}
                            errorMessage={errors.email.join(' ')}
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <div className="gap-2 flex flex-col md:flex-row justify-center ">
                            <Button className="mt-4 w-full" onClick={handleSubmit} isLoading={loadingRequest} color="warning" variant="shadow" isDisabled={emailSent}>
                                Restablecer contraseña
                            </Button> 
                        </div>
                        {error && <p className="text-center text-red-400 text-xs">{error.message}</p>}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}