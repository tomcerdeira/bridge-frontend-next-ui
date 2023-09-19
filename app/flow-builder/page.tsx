"use client";
import { useCallback } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Viewport,
} from "reactflow";

import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./data/initial-nodes";
import Sidebar from "./components/sidebar";

const BasicFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const defaultViewport: Viewport = { x: 250, y: 250, zoom: 1 };
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <div className="w-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
        />
      </div>
    </div>
  );
};

export default BasicFlow;
