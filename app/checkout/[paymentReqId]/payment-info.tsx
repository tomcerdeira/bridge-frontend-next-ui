import { IPaymentRequiredDataResponse } from "@/src/api/types";
import { Badge, Card, CardBody, CardHeader, Divider, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

type Props = {
  paymentInfo: IPaymentRequiredDataResponse;
};

export default function PaymentInformationCard({paymentInfo}: Props) {
  return (
    <div className="w-full md:w-[70%] flex-shrink-0 overflow-hidden">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 justify-center">
          <div className="flex flex-col">
            <p className="text-md">Lista de productos</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="overflow-y-scroll max-h-[500px]">
            {paymentInfo?.products.map((item, index) => (
              <Card
                key={index}
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mb-4"
                shadow="sm"
              >
                {/* TODO: fix responsivenes when one on top of the other */}
                <CardBody>
                  <div className="flex flex-row gap-6 md:gap-4 items-center justify-left">
                    <div className="col-span-6 md:col-span-4">
                      <Badge
                        content={`x${item.quantity}`}
                        size="lg"
                        color="danger"
                        shape="rectangle"
                        disableOutline
                      >
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.name}
                          className="w-full object-contain h-[140px] w-[90px] overflow-hidden"
                          src={item.imgUrl}
                        />
                      </Badge>
                    </div>

                    <div className="col-span-6 md:col-span-8">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                          <h1 className="font-semibold text-foreground/90">
                            {item.name}
                          </h1>
                          <p className="text-small text-foreground/80">
                            ${item.unitPrice}
                          </p>
                          <h3 className="text-small font-medium mt-2">
                            {item.description}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>MONEDA</TableColumn>
              <TableColumn>TOTAL</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>{paymentInfo?.currency}</TableCell>
                <TableCell>${paymentInfo?.amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}