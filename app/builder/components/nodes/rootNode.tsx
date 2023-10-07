import { memo } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import BaseCardNode from "./baseCardNode";

const RootNode = ({ data }: NodeProps) => {
  return (
    <BaseCardNode
      data={data}
      hasSource={true}
      hasTarget={false}
      isNotification={false}
    />
  );
};

export default memo(RootNode);
