import AnalyticsCard from "@/components/analyticsCard";
import { useGetAnalyticsByShopId } from "@/src/api/analytics";
import { AnalyticsResponse } from "@/src/api/types";

export interface CardSectionProps {
	children?: React.ReactNode;
	shopId: number;
}

function parseAnalyticsToString(shop_analytics: AnalyticsResponse){
	return {
		avgPaymentSucceeded: shop_analytics.avgPaymentSucceeded.toString(),
		overAllPayments: shop_analytics.overAllPayments.toString(),
		paymentsSucceeded: shop_analytics.paymentsSucceeded.toString(),
		paymentsFailed: shop_analytics.paymentsFailed.toString(),
		flowsSucceeded: shop_analytics.flowsSucceeded.toString(),
		flowsFailed: shop_analytics.flowsFailed.toString(),
		totalAmountProcessed: shop_analytics.totalAmountProcessed? shop_analytics.totalAmountProcessed.map((ap) => { 
				return { value: ap.value.toString(), currency: ap.currency };
			}
		) : "No se procesaron pagos aún",
		avgPaymentAmounts: shop_analytics.avgPaymentAmounts? shop_analytics.avgPaymentAmounts.map((ap) => { 
				return { value: ap.value.toString(), currency: ap.currency };
			}
		) : "No se procesaron pagos aún"
	}
}

export default function CardSection({ shopId } : CardSectionProps) {
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
                    <AnalyticsCard card_color="bg-primary" card_title="Promedio de pagos exitosos" card_content={parseAnalyticsToString(shop_analytics).avgPaymentSucceeded} />
                    <AnalyticsCard card_color="bg-success" card_title="Pagos exitosos" card_content={parseAnalyticsToString(shop_analytics).paymentsSucceeded} />
                    <AnalyticsCard card_color="bg-warning" card_title="Pagos fallidos" card_content={parseAnalyticsToString(shop_analytics).paymentsFailed} />
                    <AnalyticsCard card_color="bg-primary" card_title="Pagos totales" card_content={parseAnalyticsToString(shop_analytics).overAllPayments} />
                    {/* TODO: revisar esta logica */}
                    { !Array.isArray(parseAnalyticsToString(shop_analytics).totalAmountProcessed)?
                        <AnalyticsCard card_color="bg-primary" card_title="Total dinero procesado" card_content="0" />
                        :
                        <>
                            { shop_analytics.totalAmountProcessed.map((ap) => {
                                <AnalyticsCard card_color="bg-primary" card_title={"Total dinero prosesado en " + ap.currency} card_content={ap.value.toString()} />
                            })}
                        </>
                    }
                </div>
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de sus flujos:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <AnalyticsCard card_color="bg-success" card_title="Flujos exitosos" card_content={parseAnalyticsToString(shop_analytics).flowsSucceeded} />
                    <AnalyticsCard card_color="bg-warning" card_title="Flujos fallidos" card_content={parseAnalyticsToString(shop_analytics).flowsFailed} />
                </div> 
            </>
        )
        }
        </>
    );

}