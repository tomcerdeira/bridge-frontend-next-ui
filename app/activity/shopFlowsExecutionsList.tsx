'use client'

import { CardInformationTable } from "@/components/cardInformationTable";
import { PaymentRequestInformationSection } from "@/components/paymentInformationSection";
import { useGetFlowExecutionStatusByShop } from "@/src/api/analytics";
import { Accordion, AccordionItem, Button, Chip, Divider, Link } from "@nextui-org/react";


export default function ShopFlowExecutionsList({ shopId, query } : { shopId: string, query: { [key: string]: string | string[] | undefined } }) {
    const { flow_analytics, error, isLoading } = useGetFlowExecutionStatusByShop(shopId, query);
    
	return (
		<>
        {isLoading? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        :
        (
            <>
                <div>
                    {error? (
                        <div className="gap-2 flex flex-col md:flex-row justify-center">
                            <p className="mt-16" style={{ fontSize: "18px" }}>...No existen aún 🔍</p>
                        </div>
                    )
                    :
                    (
                        <Accordion variant="splitted" selectionMode="multiple">
                        {flow_analytics!.map((fa) => {
                            return <AccordionItem 
                                        className="mt-2"
                                        key={fa.id} 
                                        aria-label={fa.id}
                                        title={
                                            <div className="flex mr-4 justify-between items-center">
                                                <div className="flex flex-row gap-4 items-center">
                                                    <div className="text-center">
                                                        <p>PaymentReqId</p>
                                                        <Button
                                                            href={'/flows/' + fa.flowId + '?paymentReqId=' + fa.paymentSummary.paymentReq.id}
                                                            as={Link}
                                                            color="default"
                                                            showAnchorIcon
                                                            variant="flat"
                                                            >
                                                            {fa.paymentSummary.paymentReq.id}
                                                        </Button>
                                                    </div>
                                                    <div className="text-center">
                                                        <p>FlowId</p>
                                                        <Button
                                                            href={'/flows/' + fa.flowId}
                                                            as={Link}
                                                            color="default"
                                                            showAnchorIcon
                                                            variant="flat"
                                                            >
                                                            {fa.flowId }
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6 mr-2">
                                                    <div className="flex flex-col items-center">
                                                        <p>Flujo</p>
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            color={fa.flowSucceed ? "success" : "danger"}
                                                        >
                                                            <span className="capitalize text-xs">
                                                            {fa.flowSucceed ? "OK" : "ERROR"}
                                                            </span>
                                                        </Chip>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <p>Pago</p>
                                                        <Chip
                                                            size="sm"
                                                            variant="flat"
                                                            color={fa.paymentSucceed ? "success" : "danger"}
                                                        >
                                                            <span className="capitalize text-xs">
                                                            {fa.paymentSucceed ? "OK" : "ERROR"}
                                                            </span>
                                                        </Chip>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <Divider/>
                                        <div className="mt-4 flex flex-col justify-center items-center">
                                            <p>Resumen del pago</p>
                                            <PaymentRequestInformationSection paymentRequest={fa.paymentSummary.paymentReq} paymentMethod={fa.paymentSummary.paymentMethod} />
                                            <p>Datos de la tarjeta</p>
                                            <CardInformationTable card={fa.paymentSummary.card}/>
                                            {/* Mostramos info del customer ?? */}
                                        </div>
                                        {/* Add more nested attributes as needed */}
                                </AccordionItem>
                        })}
                        </Accordion>
                    )
                }
                </div>
            </>
        )
        }
        </>
	);
}
