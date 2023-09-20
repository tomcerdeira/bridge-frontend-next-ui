import { memo } from "react";
import BaseNode from "./baseNode";
import { NodeProps, Handle, Position } from "reactflow";

const LogicalNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className="bg-neutral-800 rounded-xl p-4 shadow-md">
        <span className="text-lg font-fira">{data.name.toUpperCase()}</span>
      </div>
      <Handle type="target" position={Position.Left} className="!bg-white" />
      <Handle type="source" position={Position.Right} className="!bg-white" />
    </>
  );
};

export default memo(LogicalNode);
