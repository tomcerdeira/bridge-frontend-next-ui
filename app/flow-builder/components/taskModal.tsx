import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { PiKeyFill } from "react-icons/pi";
import * as util from "../utils/util";

interface ModalProps {
  processorModalState: ReturnType<typeof useDisclosure>;
  data: any;
  parameters: any;
  setParameters: any;
}

const TaskModal = ({
  processorModalState,
  data,
  parameters,
  setParameters,
}: ModalProps) => {
  return (
    <Modal
      isOpen={processorModalState.isOpen}
      placement="center"
      onOpenChange={processorModalState.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </ModalHeader>
            <ModalBody>
              {Object.entries(parameters).map(([key, value]) => (
                <Input
                  endContent={
                    <PiKeyFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label={util.fieldIntoReadable(key)}
                  key={key}
                  type="password"
                  placeholder={"Enter your " + util.fieldIntoReadable(key)}
                  value={value as string}
                  onChange={(e) => {
                    setParameters({ ...parameters, [key]: e.target.value });
                  }}
                />
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
