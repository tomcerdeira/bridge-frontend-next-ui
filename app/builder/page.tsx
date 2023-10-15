"use client";
import toast from "@/components/toast";
import { useFlowBuilder } from "@/src/api/flow-builder";
import { useAuth } from "@/src/hooks/useAuth";
import { Button, Divider, Input, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import "reactflow/dist/style.css";
import * as bridge from "./index";
import * as util from "./utils/util";
import eventBus from "./utils/eventBus";

interface FormErrors {
  flowName: string[];
}

const initialErrors: FormErrors = {
  flowName: [],
};

export default function FlowBuilderPage({
  editNodes,
  editEdges,
  editName,
  flowId,
  active,
}: {
  editNodes?: bridge.Node[];
  editEdges?: bridge.Edge[];
  editName?: string;
  flowId?: string;
  active?: boolean;
}) {
  const router = useRouter();
  const { shop, user } = useAuth();
  const { buildFlow, error, isLoading } = useFlowBuilder(
    shop ? shop.id.toString() : "0",
    flowId
  );

  const [errors, setErrors] = useState(initialErrors);
  const clearError = (fieldName: keyof FormErrors) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: [] }));
  };

  const [isRequestLoading, setRequestLoading] = useState(false);
  const [isActive, setIsActive] = useState(active || false);
  const [flowName, setFlowName] = useState(editName);
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    editNodes || bridge.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState(
    editEdges || []
  );

  const handleFlowNameChange = (e: any) => {
    setFlowName(e.target.value);
    clearError("flowName");
  };

  const defaultViewport: bridge.Viewport = { x: 0, y: 0, zoom: 0.9 };
  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) => {
      if (params.sourceHandle === "fallback") {
        eventBus.dispatch("fallback", { id: params.target });
        setEdges((els) =>
          bridge.addEdge({ ...params, animated: true, type: "fallback" }, els)
        );
      } else {
        setEdges((els) => bridge.addEdge({ ...params, animated: true }, els));
      }
    },
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
          condition: data.condition,
        }),
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onSaveClick = async () => {
    const newErrors: FormErrors = {
      flowName: [],
    };

    const rootNode = nodes.find((node) => node.id === "bridge_0");

    if (typeof rootNode === "undefined") return;

    if (!flowName) {
      newErrors.flowName.push("Se requiere un título para el flujo.");
    }

    const connectedNodes = edges
      .filter((edge) => edge.source === rootNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.target));

    const json = util.buildJson(
      connectedNodes,
      flowName,
      edges,
      nodes,
      isActive
    );
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(
      (errorArray) => errorArray.length > 0
    );

    if (!hasErrors) {
      try {
        setRequestLoading(true);
        let flow = await buildFlow(json);
        toast({
          type: "success",
          message: "Flujo guardado satisfactoriamente!",
        });
        router.push("/flows");
      } catch (err) {
        toast({
          type: "error",
          message: "Ha ocurrido un error al intentar crear el flujo",
        });
      } finally {
        setRequestLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between gap-6 items-center">
        <Input
          isRequired
          label="Nombre del flujo"
          placeholder="Sin título"
          value={flowName}
          onInput={handleFlowNameChange}
          className="ml-4 mt-4"
          errorMessage={errors.flowName.join(" ")}
        />
        <Switch
          isSelected={isActive}
          onValueChange={(e: any) => setIsActive(e)}
          className="mt-4"
        >
          Activo
        </Switch>
        <Button
          color="primary"
          size="md"
          className="mt-4 mr-2 hover:bg-success hover:text-black"
          isLoading={isRequestLoading}
          onClick={onSaveClick}
        >
          Guardar
        </Button>
      </div>
      <Divider className="mt-4"></Divider>
      <div className="flex grow flex-row items-center align-middle">
        <bridge.ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          nodeTypes={bridge.nodeTypes}
          edgeTypes={bridge.edgeTypes}
        >
          <bridge.Background gap={24} />
        </bridge.ReactFlow>
        <bridge.Sidebar onSidebarClick={onSidebarClick} />
      </div>
    </div>
  );
}
