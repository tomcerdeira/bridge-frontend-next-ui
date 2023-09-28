"use client";
import { useFlowRetrieve } from "@/src/api/flow-builder";
import FlowBuilderPage from "../../page";
import { useEffect, useState } from "react";

export default function FlowBuilderEditPage({
  params: { flowId },
}: {
  params: { flowId: string };
}) {
  const { getFlow } = useFlowRetrieve(flowId);
  const [isRequestLoading, setRequestLoading] = useState(true);
  const [flow, setFlow] = useState();

  const retrieveFlow = async () => {
    setRequestLoading(true);
    const flow = await getFlow();
    setFlow(flow);
    setRequestLoading(false);
  };

  useEffect(() => {
    retrieveFlow();
  }, []);

  if (isRequestLoading) return <>Loading...</>; // Cambiar por skeleton

  return <>{flow.shopId}</>;
}
