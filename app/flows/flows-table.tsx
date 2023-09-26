import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";

  export const columns = [
    {name: 'Nombre', uid: 'name'},
    {name: 'Fecha de creación', uid: 'created_at'},
    {name: 'Estado', uid: 'status'},
    {name: 'Fecha de actualización', uid: 'updated_at'},
    {name: 'Acciones', uid: 'actions'},
 ];

 export const flows = [
    {
      "id": "flow1",
      "name": "Flow Example 1",
      "shopId": 9999,
      "active": true,
      "updatedAt": "2023-09-26T19:59:34.692Z",
      "createdAt": "2023-09-26T19:59:34.692Z"
    },
    {
      "id": "flow2",
      "name": "Flow Example 2",
      "shopId": 9999,
      "active": true,
      "updatedAt": "2023-09-26T19:59:34.692Z",
      "createdAt": "2023-09-26T19:59:34.692Z"
    },
    {
      "id": "flow3",
      "name": "Flow Example 3",
      "shopId": 9999,
      "active": false,
      "updatedAt": "2023-09-26T19:59:34.692Z",
      "createdAt": "2023-09-26T19:59:34.692Z"
    }
  ];
  
 
  
  export const FlowsTable = () => {
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
                {(columnKey) => (
                  <TableCell>
                    {RenderCell({ flow: item, columnKey: columnKey })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  