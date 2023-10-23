import { memo, useState, useMemo, useEffect } from "react";
import { Position, Handle, NodeProps, useReactFlow } from "reactflow";
import { conditions } from "../../data/conditions";
import { Card, CardBody, Selection } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import ConditionDropdown from "../conditionDropdown";
import eventBus from "../../utils/eventBus";

const ConditionNode = ({ id, data }: NodeProps) => {
  const [isAmountInvalid, setIsAmountInvalid] = useState<boolean>(false);

  const [fieldKeys, setFieldKeys] = useState<Selection>(
    new Set([data.condition.field])
  );

  const selectedField = useMemo(
    () => Array.from(fieldKeys).join(", ").replaceAll("_", " "),
    [fieldKeys]
  );

  const [operatorKeys, setOperatorKeys] = useState<Selection>(
    new Set([data.condition.operator])
  );

  const selectedOperator = useMemo(
    () => Array.from(operatorKeys).join(", ").replaceAll("_", " "),
    [operatorKeys]
  );

  const [valueKeys, setValueKeys] = useState<Selection>(
    new Set([data.condition.value])
  );

  const selectedValue = useMemo(
    () => Array.from(valueKeys).join(", ").replaceAll("_", " "),
    [valueKeys]
  );

  const [amountValue, setAmountValue] = useState<string>(data.condition.value);

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
                ...node.data.condition,
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
                value: parseInt(value, 10),
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

  useEffect(() => {
    eventBus.on("taskError", (payload: any) => {
      setIsAmountInvalid(false);
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].node_id !== data.node_id) continue;
        setIsAmountInvalid(true);
      }
    });
  }, []);

  return (
    <>
      <Card
        className={`rounded-2xl bg-content1 ${
          isAmountInvalid ? `border-2 border-solid border-red-500` : ``
        }`}
      >
        <CardBody className="flex flex-row gap-2">
          {/* <span className="font-fira uppercase self-center pr-1">if</span> */}
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
                isInvalid={isAmountInvalid}
                errorMessage={isAmountInvalid ? "Invalid input" : ""}
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
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !w-2 !h-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white !w-2 !h-2"
      />
    </>
  );
};

export default memo(ConditionNode);
