'use client'

import { EyeFilledIcon } from "@/components/eyeFieldIcon";
import { EyeSlashFilledIcon } from "@/components/eyeSlashFieldIcon";
import toast from "@/components/toast";
import { useResetPassword } from "@/src/api/users";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

type Props = {
	token: string
	children?: React.ReactNode
  }

interface FormErrors {
	password: string[];
	password_repeat: string[];
  }
  
  const initialErrors: FormErrors = {
	password: [],
	password_repeat: [],
  };

export default function ResetPasswordForm({ children, token }: Props) {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const [password, setPassword] = useState('');
	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
        clearError("password");
	};

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const handlePasswordRepeatChange = (e: any) => {
		setPasswordRepeat(e.target.value);
        clearError("password_repeat");
	};

    const { doResetPassword, error, isLoading } = useResetPassword({token});
    const router = useRouter();

	const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newErrors: FormErrors = {
			password: [],
			password_repeat: [],
		  };

        if (!password) {
            newErrors.password.push('Se requiere de una contraseña nueva.');
        } else if (password.length < 8) {
            newErrors.password.push('La contraseña debe tener al menos 8 caracteres.');
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
            newErrors.password.push('La contraseña no es lo suficientemente segura.');
        }
        
        if(password !== passwordRepeat){
            newErrors.password_repeat.push('La contraseña debe ser igual a la introducida anteriormente.');
        }

		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                const user = await doResetPassword({ new_password: password });
                setLoadingRequest(false);
                if (!!user){
                    toast({ type: 'success', message: 'Contraseña cambiada correctamente.' });
                    router.push("/signin");
                }
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
                        <p className="text-xl font-bold text-left mb-4">Restablecer contraseña</p>
                        <p className="text-small text-left opacity-50">Has recibido este enlace porque solicitaste restablecer tu contraseña. Elige una contraseña segura que puedas recordar.</p>
                    </div>

                    </CardHeader>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            label="Contraseña"
                            placeholder="Igresá tu contraseña"
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
                        />
                        <Input
                            label="Confirmá la contraseña"
                            placeholder="Igresá nuevamente la contraseña"
                            labelPlacement="outside"
                            onChange={handlePasswordRepeatChange}
                            type="password"
                            errorMessage={errors.password_repeat.join(' ')}
                            isRequired
                        />
                        {error && <p className="mt-4 text-right text-red-400 text-xs">{error.message}</p>}
                        <div className="gap-2 flex flex-col md:flex-row justify-center ">
                            <Button className="mt-4 w-full" onClick={handleSubmit} isLoading={loadingRequest} color="success" variant="shadow">
                                Cambiar contraseña
                            </Button> 
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}