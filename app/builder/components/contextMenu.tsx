import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { FaTrash } from "react-icons/fa";
import { Button } from "@nextui-org/react";
export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 rounded-lg flex items-center pl-2 bg-gray-700 hover:bg-red-700"
      {...props}
    >
      <FaTrash />
      <button className="rounded-lg p-2 text-xs font-fira" onClick={deleteNode}>
        Delete
      </button>
    </div>
  );
}
