'use client'

import { useAuth } from "@/src/hooks/useAuth";
import { Chip } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ShopFlowExecutionsList from "./shopFlowsExecutionsList";

const Chart = dynamic(
    () => import("@/components/charts/steam").then((mod) => mod.Steam),
    {
      ssr: false,
    }
  );
  
export default function ActivityPage({searchParams: initialSearchParams}: {searchParams: { [key: string]: string | string[] | undefined } }) {
	const { shop } = useAuth();
    const [searchParams, setSearchParams] = useState(initialSearchParams);

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
        {!shop? (
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
                        <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                            <Chart />
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
