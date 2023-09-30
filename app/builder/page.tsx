"use client";
import { useCallback, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useFlowBuilder } from "@/src/api/flow-builder";
import { QueryClient, QueryClientProvider } from "react-query";
import { conditions } from "./data/conditions";
import toast from "@/components/toast";
import * as bridge from "./index";
import * as util from "./utils/util";
import "reactflow/dist/style.css";

export default function FlowBuilderPage({
  editNodes,
  editEdges,
}: {
  editNodes?: Node[];
  editEdges?: bridge.Edge[];
}) {
  const queryClient = new QueryClient();
  const { buildFlow, error, isLoading } = useFlowBuilder();
  const [isRequestLoading, setRequestLoading] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    bridge.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState([]);
  const defaultViewport: bridge.Viewport = { x: 0, y: 0, zoom: 0.9 };
  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge({ ...params, animated: true }, els)),
    [setEdges]
  );

  const onSidebarClick = (data: any) => {
    const position = { x: 250, y: 250 };
    const newNode = {
      id: util.getId(),
      type: data.node_type,
      position,
      data: {
        icon: util.getIconComponent(data.name),
        parameter: data.parameter,
        name: data.name,
        isAsync: data.isAsync,
        description: data.description,
        type: data.type,
        ...(data.node_type === "condition" && {
          condition: {
            field: conditions[0].field,
            operator: conditions[0].operators[0],
            value: conditions[0].values[0],
          },
        }),
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onSaveClick = async () => {
    const rootNode = nodes.find((node) => node.id === "bridge_0");
    if (typeof rootNode === "undefined") return;
    const connectedNodes = edges
      .filter((edge) => edge.source === rootNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.target));
    const json = util.buildJson(connectedNodes, flowName, edges, nodes);
    try {
      setRequestLoading(true);
      let flow = await buildFlow(json);
      toast({ type: "success", message: "Flujo creado satisfactoriamente!" });
    } catch (err) {
      toast({
        type: "error",
        message: "Ha ocurrido un error al intentar crear el flujo",
      });
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between gap-3">
        <Input
          type="email"
          variant="underlined"
          placeholder="Sin título"
          autoComplete="new-password"
          value={flowName}
          onChange={(e: any) => setFlowName(e.target.value)}
          className="ml-2 my-2 font-fira"
        />
        <Button
          color="white"
          variant="bordered"
          className="font-fira my-2 mr-2 hover:bg-gray-200 hover:text-black"
          isLoading={isRequestLoading}
          onClick={onSaveClick}
        >
          Guardar
        </Button>
      </div>
      <div className="flex grow flex-row items-center align-middle">
        <bridge.ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          nodeTypes={bridge.nodeTypes}
        >
          <bridge.Background gap={24} />
        </bridge.ReactFlow>
        <QueryClientProvider client={queryClient}>
          <bridge.Sidebar onSidebarClick={onSidebarClick} />
        </QueryClientProvider>
      </div>
    </div>
  );
}