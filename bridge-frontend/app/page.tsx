'use client'

import { useAuth } from "@/src/hooks/useAuth";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import CardSection from "../components/analytics-card-section/cardSectionByShop";

export default function Home() {
	const { shop } = useAuth();
    
	return (
		<>
        {!shop? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        :
        (
            <>
                <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                    <CardSection shopId={shop.id}/>
					<div className="mt-8">
						<Link
							as={NextLink}
							className={buttonStyles({ variant: "bordered", radius: "full" })}
							href='/checkout/1'
						>
							Demo Checkout
						</Link>
					</div>
                </div>
            </>
        )
        }
        </>
	);
}
