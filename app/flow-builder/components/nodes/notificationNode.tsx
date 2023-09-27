import { memo, useState } from "react";
import { NodeProps, useReactFlow } from "reactflow";
import BaseCardNode from "./baseCardNode";

const NotificationNode = ({ id, data }: NodeProps) => {
  const [parameters, setParameters] = useState(data.parameter);
  const { setNodes } = useReactFlow();
  const onParameterChange = (e: any) => {
    setParameters(e);
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              parameter: parameters,
            },
          };
        }
        return node;
      })
    );
  };
  return (
    <BaseCardNode
      data={data}
      parameters={parameters}
      setParameters={onParameterChange}
      hasSource={false}
      hasTarget={true}
    />
  );
};

export default memo(NotificationNode);
