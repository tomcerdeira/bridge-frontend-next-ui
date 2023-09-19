import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const NotificationNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      start
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(NotificationNode);
