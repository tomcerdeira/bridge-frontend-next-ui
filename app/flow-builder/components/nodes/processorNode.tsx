import { memo, useState } from "react";
import BaseNode from "./baseNode";
import { NodeProps } from "reactflow";
import { useDisclosure } from "@nextui-org/react";
import TaskModal from "../taskModal";

const ProcessorNode = ({ data }: NodeProps) => {
  const [parameters, setParameters] = useState(data.parameter);
  const processorModalState = useDisclosure();
  return (
    <>
      <div
        onClick={() =>
          Object.keys(data.parameter).length !== 0 &&
          processorModalState.onOpen()
        }
      >
        <BaseNode data={data.icon} hasSource={true} hasTarget={true} />
      </div>
      <TaskModal
        processorModalState={processorModalState}
        data={data}
        parameters={parameters}
        setParameters={setParameters}
      />
    </>
  );
};

export default memo(ProcessorNode);
