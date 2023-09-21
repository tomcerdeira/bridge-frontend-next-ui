import { memo, useState } from "react";
import { NodeProps } from "reactflow";
import BaseCardNode from "./baseCardNode";

const NotificationNode = ({ data }: NodeProps) => {
  const [parameters, setParameters] = useState(data.parameter);

  return (
    <BaseCardNode
      data={data}
      parameters={parameters}
      setParameters={setParameters}
      hasSource={false}
      hasTarget={true}
    />
  );
};

export default memo(NotificationNode);
