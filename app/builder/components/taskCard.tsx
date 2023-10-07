import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { PiKeyFill } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";

export interface TaskProps {
  data: any;
  parameters?: any;
  setParameters?: any;
  isNotification?: boolean;
}

const TaskCard = ({
  data,
  parameters,
  setParameters,
  isNotification,
}: TaskProps) => {
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
                  isNotification ? (
                    <BiWorld className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  ) : (
                    <PiKeyFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  )
                }
                className="mb-2 font-fira"
                autoComplete="new-password"
                label={parameter.field}
                key={parameterIndex}
                type={`${isNotification ? "email" : "password"}`}
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
