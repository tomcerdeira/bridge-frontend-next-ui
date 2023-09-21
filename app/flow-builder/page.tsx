"use client";
import { useCallback, useRef } from "react";
import * as bridge from "./index";
import { conditions } from "./data/conditions";
import * as util from "./utils/util";
import "reactflow/dist/style.css";
import { Button } from "@nextui-org/react";

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    bridge.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const defaultViewport: bridge.Viewport = { x: 200, y: 250, zoom: 0.8 };

  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge({ ...params, animated: true }, els)),
    [setEdges]
  );

  const onSidebarClick = (data: any) => {
    const position = { x: 0, y: 0 };
    const newNode = {
      id: util.getId(),
      type: data.node_type.toLowerCase(),
      position,
      data: {
        icon: util.getIconComponent(data.name),
        parameter: data.parameter,
        name: data.name,
        ...(data.node_type.toLowerCase() === "condition" && {
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

  return (
    <div className="flex flex-row h-full">
      <bridge.Sidebar onSidebarClick={onSidebarClick} />
      <Button variant="ghost" onClick={() => console.log(nodes)}>
        Debug
      </Button>
      <div className="w-screen" ref={reactFlowWrapper}>
        <bridge.ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          nodeTypes={bridge.nodeTypes}
        />
      </div>
    </div>
  );
};

export default FlowBuilder;
