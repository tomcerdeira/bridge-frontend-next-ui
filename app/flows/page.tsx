'use client'

import { Button } from "@nextui-org/button"
import { FlowsTable } from "./flows-table"

export default function FlowsPage() {
    
    return (
        <>
        {false? (
            <div className="mt-4 mx-4 flex flex-col gap-4">
                <div className="flex justify-between flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                        <h3 className="text-xl font-bold">Flujos creados</h3>
                    </div>
                    <div className="flex flex-row gap-3.5 flex-wrap">
                        <Button color="primary">
                            + Crear flujo
                        </Button>
                    </div>
                </div>
                <div className="mr-4 w-full">
                    <FlowsTable />
                </div>  
            </div>
        )
        :
        (
            <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>¿No definiste ningún flujo aún?</p>
                </div>
                <div className="flex justify-center">
                    <Button color="primary">+ Crear flujo</Button>
                </div>
            </div>
        )}
        </>

    )
}