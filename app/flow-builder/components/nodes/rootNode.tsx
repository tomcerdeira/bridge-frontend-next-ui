import { memo } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./baseNode";

const RootNode = ({ data }: NodeProps) => {
  const Icon = data.icon;
  return (
    <>
      <BaseNode data={data} hasSource={false} hasTarget={true} />
    </>
  );
};

export default memo(RootNode);
