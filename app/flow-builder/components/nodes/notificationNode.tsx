import { memo } from "react";
import BaseNode from "./baseNode";
import { NodeProps } from "reactflow";

const NotificationNode = ({ data }: NodeProps) => {
  return (
    <>
      <BaseNode data={data} hasSource={true} hasTarget={false} />
    </>
  );
};

export default memo(NotificationNode);
