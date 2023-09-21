'use client'

import { Link } from "@nextui-org/link";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import { useCreateShop } from "@/src/api/shops";
import { useAuth } from "@/src/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BridgeLogo } from "./bridgeLogo";
import toast from "./toast";

interface FormErrors {
	shopName: string[];
  }
  
  const initialErrors: FormErrors = {
	shopName: [],
  };


export const Navbar = () => {
	const router = useRouter();

	const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
	const [visible, setVisible] = useState(false);
	const [loadingRequest, setLoadingRequest] = useState(false);
	const [shopName, setShopName] = useState('');
	const [errors, setErrors] = useState(initialErrors);
	const clearError = (fieldName: keyof FormErrors) => {
		setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
	};

	const handleShopName = (e: any) => {
		setShopName(e.target.value);
        clearError("shopName"); //TODO: ver por que no se borran estos errores
	};

	const { doCreateShop, error, isLoading } = useCreateShop();

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
					onClose();
					// router.push("/");
				}
            } catch (err) {}
        }

	};

	const { user, doSignOut } = useAuth();
	
	const pathname = usePathname();
	const showHeader = 
		pathname.startsWith('/signin') ||
		pathname.startsWith('/signup') || 
		pathname.startsWith('/checkout') ||
		pathname.startsWith('/forgot-password') ||
		pathname.startsWith('/reset-password') ||
		pathname.startsWith('/verify')
		? false : true;

	return (
		<>
		{showHeader && (
		<NextUINavbar maxWidth="xl" position="sticky" classNames={{
			item: [
			  "flex",
			  "relative",
			  "h-full",
			  "items-center",
			  "data-[active=true]:after:content-['']",
			  "data-[active=true]:after:absolute",
			  "data-[active=true]:after:bottom-0",
			  "data-[active=true]:after:left-0",
			  "data-[active=true]:after:right-0",
			  "data-[active=true]:after:h-[2px]",
			  "data-[active=true]:after:rounded-[2px]",
			  "data-[active=true]:after:bg-primary",
			],
		  }}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<BridgeLogo />
						<p className="font-bold text-inherit">Bridge</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href} isActive={item.href === pathname}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					{/* TODO: check si ya tiene company */}
					<>
						<Button onPress={onOpen} color="primary" variant="shadow">Crear comercio 🚀</Button>
						<Modal 
							backdrop="blur"
							isOpen={isOpen} 
							onOpenChange={onOpenChange}
							placement="top-center"
						>
							<ModalContent>
							{(onClose) => (
								<>
								<ModalHeader className="flex flex-col gap-1">Crea tu comercio</ModalHeader>
								<ModalBody>
									<p>Para comenzar a definir flujos de pagos, debes primero crear tu comercio dentro de Bridge.</p>
									<Input
									onChange={handleShopName}
									errorMessage={errors.shopName.join(' ')}
                            		isRequired
									autoFocus
									placeholder="Nombre del comercio"
									/>
									{error && <p className="text-right text-red-400 text-xs justify-start">{error.message}</p>}
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cerrar
									</Button>
									<Button color="primary" onPress={handleCreateShop} isLoading={loadingRequest}>
										Crear
									</Button>
								</ModalFooter>
								</>
							)}
							</ModalContent>
						</Modal>
						</>
					<Dropdown>
						<DropdownTrigger>
							<Button 
							color="default"
							variant="shadow"
							>
							{user?.email}
							</Button>
						</DropdownTrigger>
						<DropdownMenu 
							aria-label="Dropdown Variants"
							color="default" 
							variant="shadow">
							<DropdownItem key="delete" className="text-danger" color="danger" onClick={doSignOut}>
								Cerrar sesión
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={item.href === pathname? "primary" : "foreground"}
								href={item.href}
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
						<Link
							color="danger"
							size="lg"
							onClick={doSignOut}
							style={{ cursor: 'pointer' }}
						>
							Cerrar sesión
						</Link>
				</div>
			</NavbarMenu>
		</NextUINavbar>)}
		</>
	);
};
