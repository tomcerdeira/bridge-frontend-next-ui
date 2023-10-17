'use client'

import { useGetAnalyticsByShopId, useGetAnalyticsByShopIdAndByProcessor } from "@/src/api/analytics";
import { useAuth } from "@/src/hooks/useAuth";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ShopFlowExecutionsList from "./shopFlowsExecutionsList";

const DateCurrencyChart = dynamic(
    () => import("@/components/charts/chart-date-currency").then((mod) => mod.SteamDateCurrency),
    {
      ssr: false,
    }
  );

const ProcessorPaymentsChart = dynamic(
() => import("@/components/charts/chart-processor-payments").then((mod) => mod.SteamProcessorPayment),
{
    ssr: false,
}
);
  
export default function ActivityPage({searchParams: initialSearchParams}: {searchParams: { [key: string]: string | string[] | undefined } }) {
	const { shop } = useAuth();
    const [searchParams, setSearchParams] = useState(initialSearchParams);
    const { shop_analytics, error, isLoading } = useGetAnalyticsByShopId(shop? shop.id.toString() : "0");
    const { processors_analytics, error: processorsError, isLoading: processorsLoading } = useGetAnalyticsByShopIdAndByProcessor(shop? shop.id.toString() : "0");

    const removeParamFromSearchParams = (paramKeyToRemove) => {
      const updatedSearchParams = { ...searchParams };
      delete updatedSearchParams[paramKeyToRemove];
      setSearchParams(updatedSearchParams);
    };
  
    useEffect(() => {
      const queryParts = [];
      for (const key in searchParams) {
        if (searchParams[key]) {
          queryParts.push(`${key}=${searchParams[key]}`);
        }
      }
      const queryString = queryParts.join("&");
      history.replaceState(null, "", `?${queryString}`);
    }, [searchParams]);

	return (
		<>
        {!shop || !shop_analytics || !processors_analytics? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        :
        (
            <>
                <div className="mt-4 mx-4 mb-4 ml-4 mr-4  flex flex-col gap-4">
                    <div className="h-full flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">Estadísticas</h3>
                        <div className="flex w-full flex-col">
                            <Tabs aria-label="Options" className="flex justify-center ">
                                <Tab key="by_currency" title="Monedas">
                                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                                        <DateCurrencyChart temporalAmounts={shop_analytics.temporalAmounts} />
                                    </div>
                                </Tab>
                                <Tab key="by_processor" title="Procesadores">
                                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                                        <ProcessorPaymentsChart processorAnalytics={processors_analytics} />
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>

                    <div className="mt-4 mb-4 flex-row gap-4 items-center">
                        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-4 justify-between">
                            <div>
                                <h3 className="text-xl font-bold">Flujos ejecutados en {shop.name}</h3>
                            </div>
                            <div className="flex gap-2">
                                {searchParams && (
                                    <>
                                        {Object.keys(searchParams).map((paramKey) => (
                                        <Chip
                                            key={paramKey}
                                            onClose={() => removeParamFromSearchParams(paramKey)}
                                            variant="bordered"
                                        >
                                            {paramKey + " = " + searchParams[paramKey]}
                                        </Chip>
                                        ))}
                                    </>
                                )
                                }
                            </div>
                        </div>
                        <ShopFlowExecutionsList shopId={shop!.id.toString()} query={searchParams} />
                    </div>
                </div>
            </>
        )
        }
        </>
	);
}
