'use client'

import { useAuth } from "@/src/hooks/useAuth";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import CardSection from "./cardSection";

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
                    <div className="mr-4 w-full">
                        {/* <FlowsTable flows={flows} onFlowUpdate={handleFlowUpdate} /> */}
                    </div>  
                </div>
            </>
        )
        }
        </>

		// <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		// 	<div className="mt-8">
		// 		<p>Aquí tiene un resumen de sus pagos.</p>
		// 	</div>

		// </section>
	);
}
