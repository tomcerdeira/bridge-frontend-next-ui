import { memo } from "react";
import { NodeProps } from "reactflow";
import BaseNode from "./baseNode";

const RootNode = ({ data }: NodeProps) => {
  return (
    <>
      <BaseNode data={data.icon} hasSource={false} hasTarget={true} />
    </>
  );
};

export default memo(RootNode);
