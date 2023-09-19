import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const RootNode = ({ data }: NodeProps) => {
  const Icon = data.icon;
  return (
    <>
      <div className="bg-neutral-800 rounded-full p-4 shadow-md">
        <div className="flex">
          <div className=" px-1 flex justify-center items-center ">
            <Icon className="text-3xl" />
            <Handle
              type="source"
              position={Position.Right}
              className="!bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RootNode);
