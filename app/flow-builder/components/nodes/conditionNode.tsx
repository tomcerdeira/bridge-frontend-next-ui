import { memo } from "react";
import { Position, NodeProps, Handle } from "reactflow";

const ConditionNode = ({ data }: NodeProps) => {
  return (
    <>
      <div className="bg-neutral-800 rounded-xl p-4 shadow-md gap-3 flex w-52 flex-col">
        <span className="font-fira">CURRENCY IS USD</span>
      </div>
      <Handle type="target" position={Position.Left} className="!bg-white" />
      <Handle type="source" position={Position.Right} className="!bg-white" />
    </>
  );
};

export default memo(ConditionNode);
