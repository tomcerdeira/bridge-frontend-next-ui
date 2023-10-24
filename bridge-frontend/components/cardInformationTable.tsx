import { Card } from "@/src/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";

export const columns = [
  { name: "Nombre que figura en la tarjeta", uid: "name_in_card" },
  { name: "4 últimos dígitos", uid: "last_4_numbers" },
  { name: "Tipo", uid: "card_type" },
];

export const CardInformationTable = ({
  card,
}: {
  card: Card;
}) => {

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
        <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex content-center items-center">
                  <p className="ml-4">{card.nameOnCard}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex content-center items-center">
                  <p className="ml-4">{card.last4Numbers}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex content-center items-center">
                  <p className="ml-4">{card.cardBrand}</p>
                </div>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
