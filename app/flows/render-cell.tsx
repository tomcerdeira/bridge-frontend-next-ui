import { FlowIcon } from "@/components/icons/sidebar/flow-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { FlowDetails } from "@/src/api/types";
import { Avatar, Chip, Tooltip } from "@nextui-org/react";
import React from "react";

interface Props {
  flow: FlowDetails;
  columnKey: string | React.Key;
}

export const RenderCell = ({ flow, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = flow[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <div className="flex content-center items-center">
            <Avatar
                isBordered
                icon={<FlowIcon/>}
            />
            <p className="ml-4">{flow.name}</p>
        </div>
      );
    case "created_at":
      return (
        <div>
        <span>{flow.createdAt}</span>
        </div>
      );
    case "updated_at":
    return (
        <div>
        <span>{flow.updatedAt}</span>
        </div>
    );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            flow.active
              ? "success"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{flow.active? "ACTIVO" : "INACTIVO"}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="w-fit flex mr-4 gap-2 justify-end">
          <div>
            <Tooltip content="Editar flujo">
              <button onClick={() => console.log("Editar flujo", flow.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Borrar flujo"
              color="danger"
              onClick={() => console.log("Borrar flujo", flow.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
