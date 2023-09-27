import TaskCard, { TaskProps } from "../taskCard";
import { Position, Handle } from "reactflow";

interface BaseCardNodeProps extends TaskProps {
  hasSource: boolean;
  hasTarget: boolean;
}

const BaseCardNode = (props: BaseCardNodeProps) => {
  return (
    <>
      <TaskCard {...props} />
      {props.hasSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-white"
        />
      )}
      {props.hasTarget && (
        <Handle type="target" position={Position.Top} className="!bg-white" />
      )}
    </>
  );
};

export default BaseCardNode;
