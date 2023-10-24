import { memo } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import BaseCardNode from "./baseCardNode";

const RootNode = ({ id, data }: NodeProps) => {
  return (
    <BaseCardNode
      id={id}
      data={data}
      hasSource={true}
      hasTarget={false}
      hasFallback={false}
      isNotification={false}
    />
  );
};

export default memo(RootNode);
