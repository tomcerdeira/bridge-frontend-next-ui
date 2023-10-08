import { IPaymentMethod, PaymentRequest } from "@/src/api/types";
import {
  Image,
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

export const PaymentRequestInformationSection = ({
  paymentRequest,
  paymentMethod
}: {
    paymentRequest: PaymentRequest, paymentMethod: IPaymentMethod
}) => {

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-fit">
        <Table aria-label="Example static collection table">
          <TableHeader className="text-center">
              <TableColumn>Moneda</TableColumn>
              <TableColumn>Forma de pago</TableColumn>
              <TableColumn>Total</TableColumn>
          </TableHeader>
          <TableBody>
              <TableRow key="1">
              <TableCell>{paymentRequest.currency}</TableCell>
              <TableCell>{paymentMethod}</TableCell>
              <TableCell>${paymentRequest.amount}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </div>
        <div className="mt-4">
          <Table aria-label="Example static collection table">
              <TableHeader>
                  <TableColumn>Imagen</TableColumn>
                  <TableColumn>Nombre del producto</TableColumn>
                  <TableColumn>Cantidad</TableColumn>
                  <TableColumn>Precio por unidad</TableColumn>
              </TableHeader>
              <TableBody>
              {paymentRequest.products.map((item, index) => (
                <TableRow key="1">
                  <TableCell>
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.name}
                      className="w-full object-contain h-[70px] w-[45px] overflow-hidden"
                      src={item.imgUrl}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                </TableRow>
						))}

              </TableBody>
          </Table>
				</div>
    </div>
  );
};
