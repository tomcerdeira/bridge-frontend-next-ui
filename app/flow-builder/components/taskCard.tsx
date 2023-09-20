import { useDisclosure } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { PiKeyFill } from "react-icons/pi";
import * as util from "../utils/util";

export interface TaskProps {
  data: any;
  parameters?: any;
  setParameters?: any;
}

const TaskCard = ({ data, parameters, setParameters }: TaskProps) => {
  return (
    <Card className="max-w-[260px]">
      <CardHeader className="flex gap-3 justify-center">
        <data.icon size={24} />
        <div className="flex flex-col ">
          <p className="text-md font-fira capitalize">{data.name}</p>
        </div>
      </CardHeader>

      {parameters && Object.entries(parameters).length !== 0 && (
        <>
          <Divider />
          <CardBody>
            {Object.entries(parameters).map(([key, value]) => (
              <Input
                endContent={
                  <PiKeyFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="mb-2 font-fira"
                label={util.fieldIntoReadable(key)}
                key={key}
                type="password"
                placeholder={"Ingresar " + util.fieldIntoReadable(key)}
                value={value as string}
                onChange={(e) => {
                  setParameters({ ...parameters, [key]: e.target.value });
                }}
              />
            ))}
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default TaskCard;
