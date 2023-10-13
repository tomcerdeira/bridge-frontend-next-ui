import TaskCard, { TaskProps } from "../taskCard";
import { Position, Handle } from "reactflow";
import { useEffect, useState } from "react";
import eventBus from "../../utils/eventBus";

interface BaseCardNodeProps extends TaskProps {
  id: string;
  hasSource: boolean;
  hasTarget: boolean;
  hasFallback: boolean;
  isNotification?: boolean;
}

const BaseCardNode = (props: BaseCardNodeProps) => {
  const [isFallbackNode, setIsFallbackNode] = useState(false);

  useEffect(() => {
    eventBus.on("fallback", (data) => {
      if (data.id === props.id) {
        setIsFallbackNode(true);
      }
    });
  }, [props.id]);

  return (
    <>
      <TaskCard {...props} />
      {!isFallbackNode && props.hasSource && (
        <Handle type="source" position={Position.Right} className="!bg-white" />
      )}
      {props.hasTarget && (
        <Handle type="target" position={Position.Left} className="!bg-white" />
      )}
      {!isFallbackNode && props.hasFallback && (
        <Handle
          type="source"
          id="fallback"
          position={Position.Bottom}
          className="!bg-white"
        />
      )}
    </>
  );
};

export default BaseCardNode;
