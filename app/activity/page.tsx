'use client'

import { useAuth } from "@/src/hooks/useAuth";
import dynamic from "next/dynamic";
import ShopFlowExecutionsSection from "./shopFlowsExecutionsSection";

const Chart = dynamic(
    () => import("@/components/charts/steam").then((mod) => mod.Steam),
    {
      ssr: false,
    }
  );
  
export default function ActivityPage({searchParams}) {
	const { shop } = useAuth();

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
                        <ShopFlowExecutionsSection shopId={shop!.id.toString()} shopName={shop!.name} query={searchParams} />
                    </div>
                </div>
            </>
        )
        }
        </>
	);
}
