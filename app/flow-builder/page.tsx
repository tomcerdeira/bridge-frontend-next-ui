"use client";
import { useCallback, useRef, useState } from "react";
import * as bridge from "./index";
import * as util from "./utils/util";
import "reactflow/dist/style.css";

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    bridge.initialNodes
  );
  const [reactFlowInstance, setReactFlowInstance] =
    useState<bridge.ReactFlowInstance>();
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const defaultViewport: bridge.Viewport = { x: 250, y: 250, zoom: 1 };

  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge(params, els)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = (
        reactFlowWrapper.current as Element
      ).getBoundingClientRect();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (typeof data === "undefined" || !data) {
        return;
      }

      const position = (reactFlowInstance as bridge.ReactFlowInstance).project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: util.getId(),
        type: data.node_type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="flex flex-row h-full">
      <bridge.Sidebar />
      <div className="w-screen" ref={reactFlowWrapper}>
        <bridge.ReactFlow
          nodes={nodes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
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
