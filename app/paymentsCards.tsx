import AnalyticsCard from "@/components/analyticsCard";
import { FailIcon } from "@/components/icons/fail-icon";
import { SuccessIcon } from "@/components/icons/success-icon";
import { AnalyticsResponse } from "@/src/api/types";

export interface PaymentsCardsProps {
	children?: React.ReactNode;
	shop_analytics: AnalyticsResponse;
}

export default function PaymentsCards({ shop_analytics } : PaymentsCardsProps) {    
    return (
        <>
            <AnalyticsCard card_color="bg-primary" card_title="Promedio de pagos exitosos" card_content={shop_analytics.avgPaymentSucceeded} />
            <AnalyticsCard card_color="bg-success" card_title="Pagos exitosos" card_content={shop_analytics.paymentsSucceeded} icon={<SuccessIcon />} />
            <AnalyticsCard card_color="bg-danger" card_title="Pagos fallidos" card_content={shop_analytics.paymentsFailed} icon={<FailIcon/>} />
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
        </>
    );

}