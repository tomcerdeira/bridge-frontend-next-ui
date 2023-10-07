'use client'

import CardSectionByFlow from "@/components/analytics-card-section/cardSectionByFlow";
import { useGetFlowExecutionStatus } from "@/src/api/analytics";
import { Accordion, AccordionItem } from "@nextui-org/react";


export default function IndividualFlowPage({ params: { flowId } }: { params: { flowId: string } }) {
    const { flow_analytics, error, isLoading } = useGetFlowExecutionStatus(flowId);
    
    return (
		<>
        {!flow_analytics? (
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
                    <CardSectionByFlow flowId={flowId}/>
                </div>

                <div className="mt-4 mb-4 ml-4 flex-row gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Lista de ejecuciones</h3>
                    </div>
                    <div>
                        <Accordion>
                        {flow_analytics.map((fa) => {
                            return <AccordionItem key={fa.id} aria-label={fa.id} title={fa.id}>
                                            <p>flowSucceed: {fa.flowSucceed.toString()}</p>
                                            <p>paymentSucceed: {fa.paymentSucceed.toString()}</p>
                                            {/* Add more attributes here */}
                                            <p>paymentSummary.card.nameOnCard: {fa.paymentSummary.card.nameOnCard}</p>
                                            <p>paymentSummary.card.last4Numbers: {fa.paymentSummary.card.last4Numbers}</p>
                                            <p>paymentSummary.card.cardType: {fa.paymentSummary.card.cardType}</p>
                                            <p>paymentSummary.paymentReq.amount: {fa.paymentSummary.paymentReq.amount}</p>
                                            <p>paymentSummary.paymentReq.currency: {fa.paymentSummary.paymentReq.currency}</p>
                                            {/* Add more nested attributes as needed */}
                                </AccordionItem>
                        })}
                        </Accordion>
                    </div>
                </div>
            </>
        )
        }
        </>
    )
  }