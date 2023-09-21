import { memo, useState, useMemo } from "react";
import { Position, Handle, NodeProps } from "reactflow";
import { conditions } from "../../data/conditions";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Selection,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const ConditionNode = ({ data }: NodeProps) => {
  const [fieldKeys, setFieldKeys] = useState<Selection>(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(fieldKeys).join(", ").replaceAll("_", " "),
    [fieldKeys]
  );

  return (
    <>
      <Card className="w-[250px]">
        <CardHeader className="flex gap-3 justify-center">
          <data.icon size={24} />
          <div className="flex flex-col">
            <p className="text-md font-fira capitalize">{data.name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row align-middle">
          <span className="font-fira uppercase self-center pr-1">if</span>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="uppercase font-fira text-md w-20"
                variant="light"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Field selection"
              variant="light"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={fieldKeys}
              onSelectionChange={setFieldKeys}
            >
              {conditions.map((condition) => (
                <DropdownItem
                  key={condition.field}
                  className="uppercase font-fira text-md"
                >
                  {condition.field}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} className="!bg-white" />
      <Handle type="target" position={Position.Left} className="!bg-white" />
    </>
  );
};

export default memo(ConditionNode);
