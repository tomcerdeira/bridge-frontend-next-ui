import { FlowIcon } from "@/components/icons/sidebar/flow-icon";
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import toast from "@/components/toast";
import { useDeleteFlow } from "@/src/api/flows";
import { FlowDetails } from "@/src/api/types";
import {
  Avatar,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Fecha de creación", uid: "created_at" },
  { name: "Estado", uid: "status" },
  { name: "Fecha de actualización", uid: "updated_at" },
  { name: "Acciones", uid: "actions" },
];

export const FlowsTable = ({
  flows,
  onFlowUpdate,
}: {
  flows: FlowDetails[];
  onFlowUpdate: () => void;
}) => {
  const { doDeleteFlow, error } = useDeleteFlow();
  const handleSubmit = async (flowId: string) => {
    const isSure = confirm("¿Estas seguro que deseas borrar este flujo?");
    if (!isSure) {
      return;
    }

    try{
      await doDeleteFlow({ flowId });
      onFlowUpdate();
      toast({ type: "success", message: "Flujo eliminado correctamente!" });
    }catch(e){
      toast({ type: "error", message: "Ocurrió un error borrando el flujo, intentelo nuevamente mas tarde..." });
    }

  };

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={flows}>
          {(item) => (
            <TableRow>
              <TableCell>
                <div className="flex content-center items-center">
                  <Avatar isBordered icon={<FlowIcon />} />
                  <p className="ml-4">{item.name}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <span>{item.createdAt}</span>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={item.active ? "success" : "warning"}
                >
                  <span className="capitalize text-xs">
                    {item.active ? "ACTIVO" : "INACTIVO"}
                  </span>
                </Chip>
              </TableCell>
              <TableCell>
                <div>
                  <span>{item.updatedAt}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-fit flex mr-4 gap-2 justify-end">
                  <div>
                    <Tooltip content="Más información">
                      <Link
                        href={`/flows/${item.id}`}
                        size="lg"
                      >
                        <ReportsIcon size={20} fill="#979797" />
                      </Link>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip content="Editar">
                      <Link
                        href={`/builder/edit/${item.id}`}
                        size="lg"
                      >
                        <EditIcon size={20} fill="#979797" />
                      </Link>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip content="Borrar" color="danger">
                      <button onClick={() => handleSubmit(item.id)}>
                        <DeleteIcon size={20} fill="#FF0080" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
