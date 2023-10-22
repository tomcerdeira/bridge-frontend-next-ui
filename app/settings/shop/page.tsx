'use client'

import { useChangePassword } from "@/src/api/users";
import { useAuth } from "@/src/hooks/useAuth";
import { Button, Card, CardBody, CardHeader, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

interface FormErrors {
	current_password: string[];
};
  
const initialErrors: FormErrors = {
	current_password: [],
};

export default function ShopSettingsPage() {
    const { shop, user } = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const [currentPassword, setCurrentPassword] = useState('');

    const handleCurrentPasswordChange = (e: any) => {
		setCurrentPassword(e.target.value);
        clearError("current_password");
	};

    // TODO: cambiar por nuevo endpoint de obtener API key
    const { doChangePassword, error, isLoading } = useChangePassword();
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [apiSecret, setApiSecret] = useState('');
    const handleSubmit = async () => {
        const newErrors: FormErrors = {
            current_password: [],
        };

        if (!currentPassword) {
            newErrors.current_password.push('Se requiere introducir la contraseña de la cuenta.');
        }

		setErrors(newErrors);
		  
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);

        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                // const no_content = await doChangePassword({ current_password: currentPassword });
                const no_content = {algo: "algo"};
                await new Promise((resolve) => setTimeout(resolve, 1000));
                
                if(no_content){
                    setApiSecret('PONER EL API KEY');
                    onClose();
                    setErrors(initialErrors);
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
                        <h3 className="text-xl font-bold">Comercio</h3>
                    </div>
                </div>
                <Divider/>
                <div>
                    <h3 className="text-l">Vea, personalice, gestione el perfil del comercio y preferencias.</h3>
                </div>
                <div>
                    <Card className="rounded-xl shadow-md w-full">
                        <CardHeader className="pb-4 pt-4 px-4 flex items-center">
                            <h4 className="font-bold text-large mr-1">Información de integración</h4>
                        </CardHeader>
                        <CardBody className="py-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <h4 className="font text-medium">Secreto del API</h4>
                                </div>
                                <div className="flex flex-col">
                                    <Snippet symbol="" disableCopy={!(apiSecret.length>0)}>{apiSecret.length>0? apiSecret: "****************************************************************"}</Snippet>
                                    <Button color="primary" variant="faded" className="mt-1" onPress={onOpen}>
                                        Ver secreto
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Ver secreto</ModalHeader>
                        <ModalBody>
                            <p>Para ver el secreto del API, primero debe introducir la contraseña de la cuenta.</p>
                            <Input
                                label="Contraseña"
                                placeholder="Igresá tu contraseña actual"
                                labelPlacement="outside"
                                onChange={handleCurrentPasswordChange}
                                type="password"
                                errorMessage={errors.current_password.join(' ')}
                                isRequired
                            />
                            {error && <p className="mt-4 text-right text-red-400">{error.message}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleSubmit} isLoading={loadingRequest}>
                                Ver
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