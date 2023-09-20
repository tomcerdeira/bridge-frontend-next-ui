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
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import { useAuth } from "@/src/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { BridgeLogo } from "./bridgeLogo";

export const Navbar = () => {
	const router = useRouter();
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
