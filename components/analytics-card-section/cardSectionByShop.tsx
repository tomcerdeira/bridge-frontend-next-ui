import { useGetAnalyticsByShopId } from "@/src/api/analytics";
import Link from "next/link";
import AnalyticsCard from "../analyticsCard";
import { FailIcon } from "../icons/fail-icon";
import { SuccessIcon } from "../icons/success-icon";

interface CardSectionProps {
	children?: React.ReactNode;
	shopId: number;
}

export default function CardSectionByShop({ shopId } : CardSectionProps) {
    const { shop_analytics, error, isLoading } = useGetAnalyticsByShopId(shopId.toString());
    return (
		<>
        {!shop_analytics? (
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
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de sus pagos:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <AnalyticsCard card_color="bg-primary" card_title="Promedio de pagos exitosos" card_content={shop_analytics.avgPaymentSucceeded+"%"} />
                    <Link href={`/activity?paymentSucceed=true`}>
                        <AnalyticsCard card_color="bg-success" card_title="Pagos exitosos" card_content={shop_analytics.paymentsSucceeded} icon={<SuccessIcon />} />
                    </Link>
                    <Link href={`/activity?paymentSucceed=false`}>
                        <AnalyticsCard card_color="bg-danger" card_title="Pagos fallidos" card_content={shop_analytics.paymentsFailed} icon={<FailIcon/>} />
                    </Link>
                    <AnalyticsCard card_color="bg-primary" card_title="Pagos totales" card_content={shop_analytics.overAllPayments} />
                    {shop_analytics && shop_analytics.totalAmountsProcessed && shop_analytics.totalAmountsProcessed.length > 0 ? (
                        <>
                            {shop_analytics.totalAmountsProcessed.map((ap) => (
                                <AnalyticsCard key={ap.currency} card_color="bg-primary" card_title={"Total dinero procesado en " + ap.currency} card_content={"$" + ap.value.toString()} />
                            ))}
                        </>
                    ) : (
                        <AnalyticsCard card_color="bg-primary" card_title="Total dinero procesado" card_content="0" />
                    )}
                </div>
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de sus flujos:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href={`/activity?flowSucceed=true`}>
                        <AnalyticsCard
                            card_color="bg-success"
                            card_title="Flujos exitosos"
                            card_content={shop_analytics.flowsSucceeded}
                            icon={<SuccessIcon />}
                        />
                    </Link>
                    <Link href={`/activity?flowSucceed=false`}>
                        <AnalyticsCard
                            card_color="bg-danger"
                            card_title="Flujos fallidos"
                            card_content={shop_analytics.flowsFailed}
                            icon={<FailIcon />}
                        />
                    </Link>
                </div> 
            </>
        )
        }
        </>
    );

}