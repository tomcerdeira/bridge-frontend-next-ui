import { memo, useState } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import BaseCardNode from "./baseCardNode";

const ProcessorNode = ({ data }: NodeProps) => {
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

export default memo(ProcessorNode);
