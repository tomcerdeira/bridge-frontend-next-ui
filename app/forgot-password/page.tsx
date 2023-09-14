'use client'

import { MailIcon } from "@/components/mailIcon";
import { useSignUp } from "@/src/api/users";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface FormErrors {
	email: string[];
	password: string[];
  }
  
  const initialErrors: FormErrors = {
	email: [],
	password: [],
  };

export default function ForgotPasswordForm() {

    const [isVisible, setIsVisible] = useState(false);
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

    //TODO: cambiar a useForgotPassword cuando este implementado
    const { doSignUp, error, isLoading } = useSignUp();
    const router = useRouter();

	const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newErrors: FormErrors = {
			email: [],
			password: [],
		  };

        if (!email) {
			newErrors.email.push('Email is required.');
		}else if(!/\S+@\S+\.\S+/.test(email)){
			newErrors.email.push('Please enter a valid email.');
		}
		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                // const user = await doSignUp({ email });
                await new Promise((resolve) => setTimeout(resolve, 1000)); //TODO: BORRAR
                // if (!!user) router.push("/verify");
                setEmail("")
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
                            <p className="text-small text-left opacity-50">Enter the email address associated with your account, and we`ll send you a link to reset your password.</p>
                            <p className="text-xl font-bold text-left mt-4">Forgot Password</p>
                        </div>
                    </CardHeader>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            isRequired
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            labelPlacement="outside"
                            onChange={handleEmailChange}
                            errorMessage={errors.email.join(' ')}
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        {error && <p className="mt-4 text-right text-red-400 text-xs">{error.message}</p>}
                        <div className="gap-2 flex flex-col md:flex-row justify-center ">
                            <Button className="mt-4 w-full" onClick={handleSubmit} isLoading={loadingRequest} color="success" variant="shadow">
                                Send
                            </Button> 
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}