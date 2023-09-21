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
import { Input } from "@nextui-org/input";

const ConditionNode = ({ data }: NodeProps) => {
  const [fieldKeys, setFieldKeys] = useState<Selection>(
    new Set([conditions[0].field])
  );

  const selectedField = useMemo(
    () => Array.from(fieldKeys).join(", ").replaceAll("_", " "),
    [fieldKeys]
  );

  const [operatorKeys, setOperatorKeys] = useState<Selection>(
    new Set([conditions[0].operators[0]])
  );

  const selectedOperator = useMemo(
    () => Array.from(operatorKeys).join(", ").replaceAll("_", " "),
    [operatorKeys]
  );

  const [valueKeys, setValueKeys] = useState<Selection>(
    new Set([conditions[0].values[0]])
  );

  const selectedValue = useMemo(
    () => Array.from(valueKeys).join(", ").replaceAll("_", " "),
    [valueKeys]
  );

  const [amountValue, setAmountValue] = useState<string>("");

  const onFieldSelectionChange = (keys: Selection) => {
    setFieldKeys(keys);
    const currentField = keys.currentKey;
    const currentCondition = conditions.find(
      (condition) => condition.field === currentField
    );
    if (currentCondition !== undefined) {
      setOperatorKeys(new Set([currentCondition.operators[0]]));
      setValueKeys(new Set([currentCondition.values[0]]));
    }
  };

  const currentCondition = conditions.find(
    (condition) => condition.field === selectedField
  );

  return (
    <>
      <Card className="w-[350px] rounded-2xl bg-content1">
        {/* <CardHeader className="flex gap-3 justify-center">
          <data.icon size={24} />
          <div className="flex flex-col">
            <p className="text-md font-fira capitalize">{data.name}</p>
          </div>
        </CardHeader>
        <Divider /> */}
        <CardBody className="flex flex-row">
          <span className="font-fira uppercase self-center pr-1">if</span>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="uppercase font-fira text-md text-[#ff9900]"
                variant="light"
              >
                {selectedField}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Field selection"
              variant="light"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={fieldKeys}
              onSelectionChange={onFieldSelectionChange}
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

          {currentCondition !== undefined && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="uppercase font-fira text-md w-14"
                  variant="light"
                >
                  {selectedOperator}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Operator selection"
                variant="light"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={operatorKeys}
                onSelectionChange={setOperatorKeys}
              >
                {currentCondition.operators.map((operator) => (
                  <DropdownItem
                    key={operator}
                    className="uppercase font-fira text-md"
                  >
                    {operator}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          {currentCondition !== undefined &&
            currentCondition !== conditions[1] && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="uppercase font-fira text-md"
                    variant="light"
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Value selection"
                  variant="light"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={valueKeys}
                  onSelectionChange={setValueKeys}
                >
                  {currentCondition.values.map((value) => (
                    <DropdownItem
                      key={value}
                      className="uppercase font-fira text-md "
                    >
                      {value}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          {currentCondition !== undefined &&
            currentCondition === conditions[1] && (
              <Input
                type="number"
                placeholder="0.00"
                variant="underlined"
                value={amountValue}
                onValueChange={setAmountValue}
                className="w-24"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            )}
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} className="!bg-white" />
      <Handle type="target" position={Position.Left} className="!bg-white" />
    </>
  );
};

export default memo(ConditionNode);
