'use client'

import { useGetAnalyticsByFlowId } from "@/src/api/analytics";
import Link from "next/link";
import AnalyticsCard from "../analyticsCard";
import { FailIcon } from "../icons/fail-icon";
import { SuccessIcon } from "../icons/success-icon";

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
                    <Link href={`/flows/${flowId}?flowSucceed=true`}>
                        <AnalyticsCard
                            card_color="bg-success"
                            card_title="Flujos exitosos"
                            card_content={flow_analytics.flowsSucceeded}
                            icon={<SuccessIcon />}
                        />
                    </Link>
                    <Link href={`/flows/${flowId}?flowSucceed=false`}>
                        <AnalyticsCard
                            card_color="bg-danger"
                            card_title="Flujos fallidos"
                            card_content={flow_analytics.flowsFailed}
                            icon={<FailIcon />}
                        />
                    </Link>
                </div> 
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de los pagos del flujo:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <AnalyticsCard card_color="bg-primary" card_title="Promedio de pagos exitosos" card_content={flow_analytics.avgPaymentSucceeded+"%"} />
                    <Link href={`/flows/${flowId}?paymentSucceed=true`}>
                        <AnalyticsCard card_color="bg-success" card_title="Pagos exitosos" card_content={flow_analytics.paymentsSucceeded} icon={<SuccessIcon />} />
                    </Link>
                    <Link href={`/flows/${flowId}?paymentSucceed=false`}>
                        <AnalyticsCard card_color="bg-danger" card_title="Pagos fallidos" card_content={flow_analytics.paymentsFailed} icon={<FailIcon/>} />
                    </Link>
                    <AnalyticsCard card_color="bg-primary" card_title="Pagos totales" card_content={flow_analytics.overAllPayments} />
                    {flow_analytics && flow_analytics.totalAmountsProcessed && flow_analytics.totalAmountsProcessed.length > 0 ? (
                        <>
                            {flow_analytics.totalAmountsProcessed.map((ap) => (
                                <AnalyticsCard key={ap.currency} card_color="bg-primary" card_title={"Total dinero procesado en " + ap.currency} card_content={"$" + ap.value.toString()} />
                            ))}
                        </>
                    ) : (
                        <AnalyticsCard card_color="bg-primary" card_title="Total dinero procesado" card_content="0" />
                    )}
                </div>
            </>
        )
        }
        </>
    );

}