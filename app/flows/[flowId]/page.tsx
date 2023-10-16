'use client'

import CardSectionByFlow from "@/components/analytics-card-section/cardSectionByFlow";
import { CardInformationTable } from "@/components/cardInformationTable";
import { CodeIcon } from "@/components/icons/code-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { PaymentRequestInformationSection } from "@/components/paymentInformationSection";
import { useGetFlowExecutionStatus } from "@/src/api/analytics";
import { useGetFlowById } from "@/src/api/flows";
import { Accordion, AccordionItem, Chip, Divider, Link, Tooltip, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CodeSnippetModal from "../code-snippets-modal";

export default function IndividualFlowPage({ params: { flowId }, searchParams: initialSearchParams }: { params: { flowId: string } }) {
    const [searchParams, setSearchParams] = useState(initialSearchParams);
    
    const { flow_details, error: error_get_flow, isLoading: isLoading_flow_details } = useGetFlowById(flowId);
    const { flow_analytics, error, isLoading } = useGetFlowExecutionStatus(flowId, searchParams);

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

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [clickedFlowId, setClickedFlowId] = useState('');
    const handleGetSnippet = async (flowId: string) => {
      setClickedFlowId(flowId);
      onOpen();
    }

    return (
		<>
            {isLoading_flow_details || isLoading? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
                </div>
            )
            :
            (  
                <>
                    <CodeSnippetModal isOpen={isOpen} onClose={onClose} clickedFlowId={clickedFlowId} />
                    <div className="mt-4 mx-4 mb-4 flex flex-col gap-4 justify-center items-center">
                        <div className="flex justify-between flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                                <div className="flex flex-row items-center">
                                    <p>Nombre del flujo:</p>
                                    <Chip size="md" className="font-bold ml-4">
                                        <span className="capitalize text-xs">
                                            {flow_details?.name}
                                        </span>
                                    </Chip>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p>Estado:</p>
                                    <Chip
                                        size="lg"
                                        variant="flat"
                                        color={flow_details?.active ? "success" : "warning"}
                                        className="ml-4"
                                    >
                                        <span className="capitalize text-xs flex items-center">
                                            {flow_details?.active ? "ACTIVO" : "INACTIVO"}
                                        </span>
                                    </Chip>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="mr-4">Editar:</p>
                                    <Tooltip content="Editar">
                                        <Link
                                            href={`/builder/edit/${flowId}`}
                                            size="lg"
                                        >
                                            <EditIcon size={20} fill="#979797" />
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="mr-4">Integración:</p>
                                    <Tooltip content="Integración">
                                        <button onClick={() => handleGetSnippet(flowId)}>
                                            <CodeIcon size={20} fill="#979797" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider/>
                    {flow_analytics && !error? (
                    <>
                        <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                            <CardSectionByFlow flowId={flowId}/>
                        </div>
        
                        <div className="mt-4 mb-4 ml-4 mr-4 flex-row gap-4 items-center">
                            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-4 justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Lista de ejecuciones</h3>
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
                            <div>
                                <Accordion variant="splitted" selectionMode="multiple" defaultExpandedKeys={[searchParams && searchParams.paymentReqId ? searchParams.paymentReqId : ""]}>
                                {flow_analytics.map((fa) => {
                                    console.log(fa.paymentSummary.paymentReq.id);
                                    
                                    return <AccordionItem 
                                                className="mt-2"
                                                key={fa.paymentSummary.paymentReq.id} 
                                                aria-label={fa.id}
                                                title={
                                                    <div className="flex mr-4 justify-between items-center">
                                                        <div>
                                                            <p>{"ID: " + fa.id}</p>
                                                        </div>
                                                        <div className="flex gap-6 mr-2">
                                                            <div className="flex flex-col items-center">
                                                                <p>Flujo</p>
                                                                <Chip
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color={fa.flowSucceed ? "success" : "danger"}
                                                                >
                                                                    <span className="capitalize text-xs">
                                                                    {fa.flowSucceed ? "OK" : "ERROR"}
                                                                    </span>
                                                                </Chip>
                                                            </div>
                                                            <div className="flex flex-col items-center">
                                                                <p>Pago</p>
                                                                <Chip
                                                                    size="sm"
                                                                    variant="flat"
                                                                    color={fa.paymentSucceed ? "success" : "danger"}
                                                                >
                                                                    <span className="capitalize text-xs">
                                                                    {fa.paymentSucceed ? "OK" : "ERROR"}
                                                                    </span>
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            >
                                                <Divider/>
                                                <div className="mt-4 flex flex-col justify-center items-center">
                                                    <p>Resumen del pago</p>
                                                    <PaymentRequestInformationSection paymentRequest={fa.paymentSummary.paymentReq} paymentMethod={fa.paymentSummary.paymentMethod} />
                                                    <p>Datos de la tarjeta</p>
                                                    <CardInformationTable card={fa.paymentSummary.card}/>
                                                    {/* Mostramos info del customer ?? */}
                                                </div>
                                                {/* Add more nested attributes as needed */}
                                        </AccordionItem>
                                })}
                                </Accordion>
                            </div>
                        </div>
                    </>

                    )
                    :
                    (
                        <>
                            <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                                <CardSectionByFlow flowId={flowId}/>
                            </div>
                                <div className="mt-4 mb-4 ml-4 mr-4 flex-row gap-4 items-center">
                                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-4 justify-between">
                                        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap mb-2">
                                            <h3 className="text-xl font-bold">Lista de ejecuciones</h3>
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
                                <div className="gap-2 flex flex-col md:flex-row justify-center">
                                        <p className="mt-16" style={{ fontSize: "18px" }}>...No existen aún 🔍</p>
                                    </div>
                                </div>
                        </>
                    )}
                </>  
            )}
        </>
    )
  }