"use client";
import { useCallback } from "react";
import * as bridge from "./index";
import "reactflow/dist/style.css";

const FlowBuilder = () => {
  const [nodes, , onNodesChange] = bridge.useNodesState(bridge.initialNodes);
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState(
    bridge.initialEdges
  );
  const defaultViewport: bridge.Viewport = { x: 250, y: 250, zoom: 1 };
  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge(params, els)),
    [setEdges]
  );

  return (
    <div className="flex flex-row h-full">
      <bridge.Sidebar />
      <div className="w-screen">
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
