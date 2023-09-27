import { memo, useState, useMemo } from "react";
import { Position, Handle, NodeProps, useReactFlow } from "reactflow";
import { conditions } from "../../data/conditions";
import { Card, CardBody, Selection } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import ConditionDropdown from "../conditionDropdown";

const ConditionNode = ({ id, data }: NodeProps) => {
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

  const { setNodes } = useReactFlow();

  const updateFieldNodeParameterData = (
    currentField: string,
    currentCondition: any
  ) =>
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              condition: {
                field: currentField,
                operator: currentCondition.operators[0],
                value: currentCondition.values[0],
              },
            },
          };
        }
        return node;
      })
    );

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
    updateFieldNodeParameterData(currentField, currentCondition);
  };

  const onOperatorSelectionChange = (keys: Selection) => {
    setOperatorKeys(keys);
    const currentOperator = keys.currentKey;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              condition: {
                ...node.data.condition,
                operator: currentOperator,
              },
            },
          };
        }
        return node;
      })
    );
  };

  const onValueSelectionChange = (keys: Selection) => {
    setValueKeys(keys);
    const currentValue = keys.currentKey;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              condition: {
                ...node.data.condition,
                value: currentValue,
              },
            },
          };
        }
        return node;
      })
    );
  };

  const onValueAmountChange = (value: string) => {
    setAmountValue(value);
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              condition: {
                ...node.data.condition,
                value: value,
              },
            },
          };
        }
        return node;
      })
    );
  };

  const currentCondition = conditions.find(
    (condition) => condition.field === selectedField
  );

  return (
    <>
      <Card className="rounded-2xl bg-content1">
        <CardBody className="flex flex-row gap-1">
          <span className="font-fira uppercase self-center pr-1">if</span>
          <ConditionDropdown
            currentCondition={currentCondition}
            fieldKeys={fieldKeys}
            operatorKeys={operatorKeys}
            selectedField={selectedField}
            selectedOperator={selectedOperator}
            selectedValue={selectedValue}
            setFieldKeys={onFieldSelectionChange}
            setOperatorKeys={onOperatorSelectionChange}
            setValueKeys={onValueSelectionChange}
            valueKeys={valueKeys}
          />
          {currentCondition !== undefined &&
            currentCondition === conditions[1] && (
              <Input
                type="number"
                placeholder="0.00"
                variant="underlined"
                value={amountValue}
                onValueChange={onValueAmountChange}
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
