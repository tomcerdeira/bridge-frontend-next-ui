import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { conditions } from "../data/conditions";

interface ConditionDropdownProps {
  selectedField: any;
  fieldKeys: any;
  setFieldKeys: any;
  currentCondition: any;
  selectedOperator: any;
  operatorKeys: any;
  setOperatorKeys: any;
  selectedValue: any;
  valueKeys: any;
  setValueKeys: any;
}
const ConditionDropdown = ({
  selectedField,
  fieldKeys,
  setFieldKeys,
  currentCondition,
  selectedOperator,
  operatorKeys,
  setOperatorKeys,
  selectedValue,
  valueKeys,
  setValueKeys,
}: ConditionDropdownProps) => {
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className="uppercase font-fira text-md text-blue-400"
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

      {currentCondition !== undefined && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              className={`uppercase font-fira text-md ${
                selectedOperator.includes("OR")
                  ? "w-48"
                  : selectedField.includes("AMOUNT")
                  ? "w-36"
                  : "w-24"
              }`}
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
            {currentCondition.operators.map((operator: any) => (
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
      {currentCondition !== undefined && currentCondition !== conditions[1] && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="uppercase font-fira text-md ">
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
            {currentCondition.values.map((value: any) => (
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
    </>
  );
};

export default ConditionDropdown;
