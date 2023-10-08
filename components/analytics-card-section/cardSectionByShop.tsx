import { useGetAnalyticsByShopId } from "@/src/api/analytics";
import FlowsCards from "./flowsCards";
import PaymentsCards from "./paymentsCards";

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
                    <PaymentsCards shop_analytics={shop_analytics} />
                </div>
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Aquí tiene un resumen de sus flujos:</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <FlowsCards shop_analytics={shop_analytics} />
                </div> 
            </>
        )
        }
        </>
    );

}