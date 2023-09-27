import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { PiKeyFill } from "react-icons/pi";

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

      {parameters && parameters.length !== 0 && (
        <>
          <Divider />
          <CardBody>
            {parameters.map((parameter: any, parameterIndex: any) => (
              <Input
                endContent={
                  <PiKeyFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="mb-2 font-fira"
                label={parameter.field}
                key={parameterIndex}
                type="password"
                placeholder={"Enter " + parameter.field}
                value={parameter.value as string}
                onChange={(e) => {
                  setParameters((parameters: any) => {
                    parameters[parameterIndex].value = e.target.value;
                    return parameters;
                  });
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
