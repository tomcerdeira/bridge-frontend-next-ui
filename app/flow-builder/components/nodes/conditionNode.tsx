import { memo } from "react";
import { Position, NodeProps, Handle } from "reactflow";

const ConditionNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className="bg-neutral-800 rounded-xl p-4 shadow-md gap-1 flex">
        Probando
      </div>
      <Handle type="source" position={Position.Left} className="!bg-white" />
      <Handle type="target" position={Position.Right} className="!bg-white" />
    </>
  );
};

export default memo(ConditionNode);
