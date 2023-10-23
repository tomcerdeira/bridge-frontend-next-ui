import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { PiKeyFill } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";
import { useEffect, useState } from "react";
import eventBus from "../utils/eventBus";

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
  const [invalidParameters, setInvalidParameters] = useState<any>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    parameters?.forEach((parameter: any) => {
      setInvalidParameters((invalidParameters: any) => {
        invalidParameters[parameter.field] = false;
        return invalidParameters;
      });
    });
    eventBus.on("taskError", (payload: any) => {
      parameters?.forEach((parameter: any) => {
        setInvalidParameters((invalidParameters: any) => {
          invalidParameters[parameter.field] = false;
          return invalidParameters;
        });
      });
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].node_id !== data.node_id) continue;
        if (payload[i].error === "MISSING_VALUE") {
          const parameterField = parameters?.find((parameter: any) => {
            return payload[i].message.includes(parameter.field);
          })?.field;

          setInvalidParameters((invalidParameters: any) => {
            invalidParameters[parameterField] = true;
            return invalidParameters;
          });
        }
      }
      setForceUpdate((forceUpdate) => forceUpdate + 1);
    });
  }, []);

  const someInvalidParameter = Object.values(invalidParameters).some(
    (invalidParameter) => invalidParameter
  );

  return (
    <Card
      className={`max-w-[260px] ${
        someInvalidParameter ? `border-2 border-solid border-red-500` : ``
      }`}
    >
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
                isInvalid={invalidParameters[parameter.field]}
                errorMessage={
                  invalidParameters[parameter.field]
                    ? parameter.field + " is required"
                    : ""
                }
                isRequired
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
