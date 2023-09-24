'use client'

import toast from "@/components/toast";
import { useCreateShop } from "@/src/api/shops";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormErrors {
	shopName: string[];
  }
  
  const initialErrors: FormErrors = {
	shopName: [],
  };

export default function CreateShopForm() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const [loadingRequest, setLoadingRequest] = useState(false);
	const [shopName, setShopName] = useState('');
	const [errors, setErrors] = useState(initialErrors);
    const [displayError, setDisplayError] = useState(false);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

    const { doCreateShop, error, isLoading } = useCreateShop();

    const handleShopName = (e: any) => {
		setShopName(e.target.value);
        clearError("shopName");
        setDisplayError(false)
	};

	const handleCreateShop = async (e: any) => {
        const newErrors: FormErrors = {
			shopName: [],
		  };

        if (!shopName) {
			newErrors.shopName.push('Se requiere un nombre para el comercio.');
		}else if(!/^[a-zA-Z\s-]+$/.test(shopName)){
			newErrors.shopName.push('Por favor, ingresa un nombre de comercio que SOLO cuente con letras.');
		}

		setErrors(newErrors);
		const hasErrors = Object.values(newErrors).some((errorArray) => errorArray.length > 0);
        if (!hasErrors) {
            try {
                setLoadingRequest(true);
                const shop = await doCreateShop({ shop_name: shopName });
                setLoadingRequest(false);
				//TODO: ver que hacemos cuando se cree el shop
                if (!!shop){
					toast({ type: 'success', message: 'Comercio creado correctamente.' });
					router.push("/");
				}else{
                    setDisplayError(true);
                }
            } catch (err) {}
        }

	};
    
    return (
        <div className="gap-6 justify-center">
            <div className="w-full flex-shrink-0 overflow-hidden">
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3 justify-center">
                        <div className="flex flex-col">
                            <p className="font-bold text-large">Crea tu comercio en Bridge.</p>
                        </div>
                    </CardHeader>
                    <p className="text-center mb-2 ml-2 mr-2">Para comenzar a definir flujos de pagos, debes primero crear tu comercio dentro de Bridge.</p>
                    <Divider/>
                    <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            onChange={handleShopName}
                            errorMessage={displayError ? error.message : errors.shopName.join(' ')}
                            isRequired
                            placeholder="Nombre del comercio"
                            />
                            <Button className="mt-4" color="success" variant="shadow" onPress={handleCreateShop} isLoading={loadingRequest}>
                                Crear 🚀
                            </Button>
                        {/* </div> */}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}