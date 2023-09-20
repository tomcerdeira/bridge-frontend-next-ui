import { memo, useState } from "react";
import { NodeProps } from "reactflow";
import BaseCardNode from "./baseCardNode";

const ConditionNode = ({ data }: NodeProps) => {
  const [parameters, setParameters] = useState(data.parameter);
  return (
    <BaseCardNode
      data={data}
      parameters={parameters}
      setParameters={setParameters}
      hasSource={true}
      hasTarget={true}
    />
  );
};

export default memo(ConditionNode);
