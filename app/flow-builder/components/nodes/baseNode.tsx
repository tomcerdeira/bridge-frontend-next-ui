import { Handle, Position } from "reactflow";
import { ExtendedNodeProps } from "./index";

const Node = ({ data, hasSource, hasTarget }: ExtendedNodeProps) => {
  const Icon = data;
  return (
    <>
      <div className="bg-neutral-800 rounded-full p-4 shadow-md">
        <div className="flex">
          <div className=" px-1 flex justify-center items-center ">
            <Icon className="text-3xl" />
            {hasSource && (
              <Handle
                type="target"
                position={Position.Left}
                className="!bg-white"
              />
            )}
            {hasTarget && (
              <Handle
                type="source"
                position={Position.Right}
                className="!bg-white"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Node;
