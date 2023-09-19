import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const RootNode = ({ data }: NodeProps) => {
  return (
    <>
      root
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(RootNode);
