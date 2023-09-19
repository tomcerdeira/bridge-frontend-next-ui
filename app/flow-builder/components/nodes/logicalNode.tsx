import { memo } from "react";
import BaseNode from "./baseNode";
import { NodeProps } from "reactflow";

const LogicalNode = ({ data }: NodeProps) => {
  return (
    <>
      <BaseNode data={data} hasSource={true} hasTarget={true} />
    </>
  );
};

export default memo(LogicalNode);
