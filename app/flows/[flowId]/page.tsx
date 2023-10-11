'use client'

import CardSectionByFlow from "@/components/analytics-card-section/cardSectionByFlow";
import { CardInformationTable } from "@/components/cardInformationTable";
import { PaymentRequestInformationSection } from "@/components/paymentInformationSection";
import { useGetFlowExecutionStatus } from "@/src/api/analytics";
import { Accordion, AccordionItem, Chip, Divider } from "@nextui-org/react";

export default function IndividualFlowPage({ params: { flowId }, searchParams }: { params: { flowId: string } }) {
    const { flow_analytics, error, isLoading } = useGetFlowExecutionStatus(flowId, searchParams);
    
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
                {flow_analytics && !error? (
                    <>
                        <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                            <CardSectionByFlow flowId={flowId}/>
                        </div>
        
                        <div className="mt-4 mb-4 ml-4 mr-4 flex-row gap-4 items-center">
                            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-2">
                                <h3 className="text-xl font-bold">Lista de ejecuciones</h3>
                            </div>
                            <div>
                                <Accordion variant="splitted" selectionMode="multiple" defaultExpandedKeys={[searchParams && searchParams.paymentReqId ? searchParams.paymentReqId : ""]}>
                                {flow_analytics.map((fa) => {
                                    return <AccordionItem 
                                                className="mt-2"
                                                key={fa.paymentSummary.paymentReq.id} 
                                                aria-label={fa.id}
                                                title={
                                                    <div className="flex mr-4 justify-between items-center">
                                                        {/* TODO: make it be in the start of the div and with its contents vertically alligned */}
                                                        <div>
                                                            <p>{"ID: " + fa.id}</p>
                                                        </div>
                                                        {/* TODO: make it be at the end of the div */}
                                                        <div className="flex gap-6 mr-2">
                                                            <div>
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
                                                            <div>
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
                            </div>
                        </div>
                    </>

                    )
                    :
                    (
                        <>
                            <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                                <CardSectionByFlow flowId={flowId}/>
                            </div>
                                <div className="mt-4 mb-4 ml-4 mr-4 flex-row gap-4 items-center">
                                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-2">
                                        <h3 className="text-xl font-bold">Lista de ejecuciones</h3>
                                    </div>
                                    <div className="gap-2 flex flex-col md:flex-row justify-center">
                                        <p className="mt-16" style={{ fontSize: "18px" }}>...No existen aún 🔍</p>
                                    </div>
                                </div>
                        </>
                    )}
                </>  
            )}
        </>
    )
  }