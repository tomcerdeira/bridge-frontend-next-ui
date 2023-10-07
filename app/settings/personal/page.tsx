'use client'

import toast from "@/components/toast";
import { useChangePassword } from "@/src/api/users";
import { useAuth } from "@/src/hooks/useAuth";
import { Button, Card, CardBody, CardHeader, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";


interface FormErrors {
	current_password: string[];
	new_password: string[];
    repeat_new_password: string[];
};
  
const initialErrors: FormErrors = {
	current_password: [],
	new_password: [],
    repeat_new_password: []
};

export default function PersonalSettingsPage() {
    const { shop, user } = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const handleCurrentPasswordChange = (e: any) => {
		setCurrentPassword(e.target.value);
        clearError("current_password");
	};

    const handleNewPasswordChange = (e: any) => {
		setNewPassword(e.target.value);
        clearError("new_password");
	};

    const handleRepeatNewPasswordChange = (e: any) => {
		setRepeatNewPassword(e.target.value);
        clearError("repeat_new_password");
	};

    const { doChangePassword, error, isLoading } = useChangePassword();
    const [loadingRequest, setLoadingRequest] = useState(false);

    const handleSubmit = async () => {
        const newErrors: FormErrors = {
            current_password: [],
            new_password: [],
            repeat_new_password: []
        };

        if (!currentPassword) {
            newErrors.current_password.push('Se requiere introducir la contraseña actual.');
        }

        if (!newPassword) {
            newErrors.new_password.push('Se requiere introducir una contraseña nueva.');
        } else if (newPassword.length < 8) {
            newErrors.new_password.push('La contraseña debe tener al menos 8 caracteres.');
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
            newErrors.new_password.push('La contraseña no es lo suficientemente segura.');
        } 

        if(newPassword !== repeatNewPassword){
            newErrors.repeat_new_password.push('La contraseña debe ser igual a la introducida anteriormente.');
        }

		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                const no_content = await doChangePassword({ current_password: currentPassword, new_password: newPassword });
                if(no_content){
                    toast({ type: 'success', message: 'Contraseña actualizada correctamente...' });
                    onClose();
                    setErrors(initialErrors);
                }else{
                    toast({ type: 'error', message: 'Ocurrió un error al cambiar la contraseña.' });
                }
                setLoadingRequest(false);
            } catch (err) {} finally {
                setLoadingRequest(false);
            }
        }

	};

    const handleClose = async () => {
        setErrors(initialErrors);
        onClose();
    };
    
  return (
    <>
        {user? (
            <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Perfil</h3>
                    </div>
                </div>
                <Divider/>
                <div>
                    <h3 className="text-l">Vea, personalice, gestione su perfil y preferencias.</h3>
                </div>
                <div>
                    <Card className="rounded-xl shadow-md w-full">
                        <CardHeader className="pb-4 pt-4 px-4 flex items-center">
                            <h4 className="font-bold text-large mr-1">Informacion del usuario</h4>
                        </CardHeader>
                        <CardBody className="py-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <h4 className="font text-medium">Email</h4>
                                </div>
                                <div>
                                    <Textarea
                                        isDisabled
                                        minRows={1}
                                        defaultValue={user?.email}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <h4 className="font text-medium">Contraseña</h4>
                                </div>
                                <div className="flex flex-col">
                                    <Textarea
                                        isDisabled
                                        minRows={1}
                                        defaultValue="********"
                                    />
                                    <Button color="primary" variant="faded" className="mt-1" onPress={onOpen}>
                                        Cambiar contraseña
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                {/* TODO: ver como hacer para que ponga el sidebar opaco tmbn */}
                <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Cambiar contraseña</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Contraseña actual"
                                placeholder="Igresá tu contraseña actual"
                                labelPlacement="outside"
                                onChange={handleCurrentPasswordChange}
                                type="password"
                                errorMessage={errors.current_password.join(' ')}
                                isRequired
                            />
                            <Input
                                label="Contraseña nueva"
                                placeholder="Igresá tu contraseña nueva"
                                labelPlacement="outside"
                                onChange={handleNewPasswordChange}
                                type="password"
                                errorMessage={errors.new_password.join(' ')}
                                isRequired
                            />
                            <Input
                                label="Confirmá la contraseña"
                                placeholder="Igresá nuevamente la contraseña nueva"
                                labelPlacement="outside"
                                onChange={handleRepeatNewPasswordChange}
                                type="password"
                                errorMessage={errors.repeat_new_password.join(' ')}
                                isRequired
                            />
                            {error && <p className="mt-4 text-right text-red-400">{error.message}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Cambiar
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
        )
        :
        (
            <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        }
    </>
  );
}