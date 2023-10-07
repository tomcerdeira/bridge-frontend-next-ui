'use client'

import { useGetAnalyticsByFlowId } from "@/src/api/analytics";
import FlowsCards from "./flowsCards";
import PaymentsCards from "./paymentsCards";

interface CardSectionProps {
	children?: React.ReactNode;
	flowId: string;
}

export default function CardSectionByFlow({ flowId } : CardSectionProps) {
    const { flow_analytics, error, isLoading } = useGetAnalyticsByFlowId(flowId);
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
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen del flujo:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <FlowsCards shop_analytics={flow_analytics} />
                </div> 
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de los pagos del flujo:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <PaymentsCards shop_analytics={flow_analytics} />
                </div>
            </>
        )
        }
        </>
    );

}