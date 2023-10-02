'use client'

import AnalyticsCard from "@/components/analyticsCard";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function Home() {
	return (
		<>
        {false? (
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
                    <div className="flex justify-between flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                            <h3 className="text-xl font-bold">Aquí tiene un resumen de sus pagos:</h3>
                        </div>
                    </div>
					<div className="flex flex-wrap gap-3">
						<AnalyticsCard card_color="bg-success" card_title="Pagos exitosos" card_content="0" />
						<AnalyticsCard card_color="bg-warning" card_title="Pagos fallidos" card_content="0" />
						<AnalyticsCard card_color="bg-primary" card_title="Pagos totales" card_content="0" />
						<AnalyticsCard card_color="bg-primary" card_title="Total dinero procesado" card_content="$0" />
						<AnalyticsCard card_color="bg-primary" card_title="Promedio de dinero procesado" card_content="$0" />
					</div>
					<div className="flex justify-between flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                            <h3 className="text-xl font-bold">Aquí tiene un resumen de sus flujos:</h3>
                        </div>
                    </div>
					<div className="flex flex-wrap gap-3">
						<AnalyticsCard card_color="bg-success" card_title="Flujos exitosos" card_content="0" />
						<AnalyticsCard card_color="bg-warning" card_title="Flujos fallidos" card_content="0" />
					</div>
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
