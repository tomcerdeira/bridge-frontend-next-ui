'use client'

import { EyeFilledIcon } from "@/components/eyeFieldIcon";
import { EyeSlashFilledIcon } from "@/components/eyeSlashFieldIcon";
import { MailIcon } from "@/components/mailIcon";
import { useSignIn } from "@/src/api/users";
import { Link } from "@nextui-org/link";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface FormErrors {
	email: string[];
	password: string[];
  }
  
  const initialErrors: FormErrors = {
	email: [],
	password: [],
  };

export default function SignInForm({ searchParams }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [loadingRequest, setLoadingRequest] = useState(false);

    const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
        clearError("email");
	};

    const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
        clearError("password");
	};

    const { doSignIn, error, isLoading } = useSignIn();
    const router = useRouter();

	const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newErrors: FormErrors = {
			email: [],
			password: [],
		  };

        if (!email) {
			newErrors.email.push('Se requiere un correo electrónico.');
		}else if(!/\S+@\S+\.\S+/.test(email)){
			newErrors.email.push('Por favor, ingresa un correo electrónico válido.');
		}

		if (!password) {
			newErrors.password.push('Se requiere una contraseña.');
		}

		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                const user = await doSignIn({ email, password });
                setLoadingRequest(false);
                if (!!user) router.push("/");
            } catch (err) {} finally {
                // setLoadingRequest(false);
            }
        }

	};

    useEffect(() => {
        const isNotAuthenticated = searchParams.isAuthenticated === "false";
        if (isNotAuthenticated) {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        }
    }, []);
    
    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3 justify-center">
                        <div className="flex flex-col">
                            <p className="font-bold text-large">Iniciar sesión en Bridge.</p>
                        </div>
                    </CardHeader>
                    <p className="text-center mb-2">¿Eres nuevo aquí?{' '}
                        <span>
                            <Link className="font-bold" size="sm" as={NextLink} href="/signup">
                                Regístrate
                            </Link>
                        </span>
                    </p>
                    <Divider/>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="tu@email.com"
                            labelPlacement="outside"
                            onChange={handleEmailChange}
                            errorMessage={errors.email.join(' ')}
                            isRequired
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                        <Input
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña."
                            labelPlacement="outside"
                            onChange={handlePasswordChange}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            errorMessage={errors.password.join(' ')}
                            isRequired
                            className="max-w-xs"
                        />
                        <Link as={NextLink} href="/forgot-password" size="sm" className="">¿Olvidaste tu contraseña?</Link>
                        <div className="gap-2 flex flex-col md:flex-row justify-center ">
                            <Button className="mt-4 w-full" onClick={handleSubmit} isLoading={loadingRequest} color={error? "danger" : "success"} variant="shadow">
                                Iniciar sesión
                            </Button> 
                        </div>
                        {error && <p className="text-right text-red-400 text-xs">{error.message}</p>}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}