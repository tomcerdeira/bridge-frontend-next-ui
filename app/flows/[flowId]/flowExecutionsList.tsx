'use client'

import { CardInformationTable } from "@/components/cardInformationTable";
import { SearchIcon } from "@/components/icons";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { FlowExecutionResponse } from "@/src/api/types";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Pagination, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, useDisclosure } from "@nextui-org/react";
import React from "react";

const columns = [
    {name: "ID del pedido de pago", uid: "payment-req-id"},
    {name: "ID de la ejecución", uid: "flow-exec-id"},
    {name: "Fecha", uid: "date"},
    {name: "Hora", uid: "hour"},
    {name: "Estado del flujo", uid: "flow-status"},
    {name: "Estado del pago", uid: "pay-status"},
  ];

export default function FlowExecutionsList({ flow_analytics, query } : { flow_analytics: FlowExecutionResponse[], query: { [key: string]: string | string[] | undefined } }) {    
    const renderCell = React.useCallback((flow_analytic: FlowExecutionResponse, columnKey: React.Key) => {

        switch (columnKey) {
            case "flow-exec-id":
                return (
                    <div>
                        {flow_analytic.id}
                    </div>
                );
            case "payment-req-id":
                return (
                    <div>
                        {flow_analytic.paymentSummary.paymentReq.id}
                    </div>
                );
            case "date":
                return (
                    <div>
                        {new Date(flow_analytic.createdAt).toISOString().split("T")[0] }
                    </div>
                );
            case "hour":
                return (
                    <div>
                        {new Date(flow_analytic.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
                    </div>
                );
            case "flow-status":
                return (
                    <div className="flex flex-col items-center">
                        <Chip
                            size="sm"
                            variant="flat"
                            color={flow_analytic.flowSucceed ? "success" : "danger"}
                        >
                            <span className="capitalize text-xs">
                            {flow_analytic.flowSucceed ? "OK" : "ERROR"}
                            </span>
                        </Chip>
                    </div>
                );
          case "pay-status":
            return (
                <div className="flex flex-col items-center">
                    <Chip
                        size="sm"
                        variant="flat"
                        color={flow_analytic.paymentSucceed ? "success" : "danger"}
                    >
                        <span className="capitalize text-xs">
                        {flow_analytic.paymentSucceed ? "OK" : "ERROR"}
                        </span>
                    </Chip>
                </div>
            );
        }
      }, []);

      const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);
    
      const [filterValue, setFilterValue] = React.useState("");
      const hasSearchFilter = Boolean(filterValue);

      const [flowStatusFilter, setFlowStatusFilter] = React.useState<string>("all");
      const [paymentStatusFilter, setPaymentStatusFilter] = React.useState<string>("all");

      const filteredItems = React.useMemo(() => {
        let filteredFlows = [...(flow_analytics? flow_analytics.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)) : [])];
                                                    // ver si hacemos el sort mejor
    
        if (hasSearchFilter) {
            filteredFlows = filteredFlows.filter((analytic) =>
            analytic.id.includes(filterValue.toLowerCase()),
          );
        }
        if (flowStatusFilter !== "all") {
            filteredFlows = filteredFlows.filter((analytic) => {
                if (flowStatusFilter === "ok") {
                    return analytic.flowSucceed === true;
                } else if (flowStatusFilter === "error") {
                    return analytic.flowSucceed === false;
                }
            });
        }
        if (paymentStatusFilter !== "all") {
            filteredFlows = filteredFlows.filter((analytic) => {
                if (paymentStatusFilter === "ok") {
                    return analytic.paymentSucceed === true;
                } else if (paymentStatusFilter === "error") {
                    return analytic.paymentSucceed === false;
                }
            });
        }

        if(query){
            if(query.paymentReqId){
                filteredFlows = filteredFlows.filter((analytic) => {
                    return analytic.paymentSummary.paymentReq.id === query.paymentReqId;
                });
            }
        }
    
        return filteredFlows;
      }, [flow_analytics, hasSearchFilter, flowStatusFilter, paymentStatusFilter, query, filterValue]);

      const [page, setPage] = React.useState(1);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const pages = Math.ceil(filteredItems.length / rowsPerPage);
      const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);

      const [selectedKeysFlowStatus, setSelectedKeysFlowStatus] = React.useState(new Set(["all"]));
      const [selectedKeysPaymentStatus, setSelectedKeysPaymentStatus] = React.useState(new Set(["all"]));

      const handleFlowStatusFilterChange = (state: string) => {
        setSelectedKeysFlowStatus(new Set([state]));
        setFlowStatusFilter(state);
      };

      const handlePaymentStatusFilterChange = (state: string) => {
        setSelectedKeysPaymentStatus(new Set([state]));
        setPaymentStatusFilter(state);
      };

      const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
    
      const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Buscar por ID de la ejecución..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
                <div className="flex gap-2">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button variant="flat" endContent={<ChevronDownIcon className="text-small" />}>
                                Estado del flujo
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={true}
                            selectionMode="single"
                            selectedKeys={selectedKeysFlowStatus}
                            onAction={(key) => handleFlowStatusFilterChange(key.toString())}
                        >
                            <DropdownItem key="all" className="capitalize">
                                --
                            </DropdownItem>
                            <DropdownItem key="ok" className="capitalize">
                                OK
                            </DropdownItem>
                            <DropdownItem key="error" className="capitalize">
                                ERROR
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button variant="flat" endContent={<ChevronDownIcon className="text-small" />}>
                                Estado del pago
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={true}
                            selectionMode="single"
                            selectedKeys={selectedKeysPaymentStatus}
                            onAction={(key) => handlePaymentStatusFilterChange(key.toString())}
                        >
                            <DropdownItem key="all" className="capitalize">
                                --
                            </DropdownItem>
                            <DropdownItem key="ok" className="capitalize">
                                OK
                            </DropdownItem>
                            <DropdownItem key="error" className="capitalize">
                                ERROR
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total de {flow_analytics?.length} ejecuciones</span>
              <label className="flex items-center text-default-400 text-small">
                Filas por página:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [filterValue, onSearchChange, selectedKeysFlowStatus, selectedKeysPaymentStatus, flow_analytics?.length, onRowsPerPageChange, onClear]);

      const {isOpen, onOpen, onClose} = useDisclosure();
      const [selectedItem, setSelectedItem] = React.useState<FlowExecutionResponse>();
    
	return (
		<>
        {!flow_analytics? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        :
        (
            <>
                <div>
                    <>
                        <Modal className="h-[450px]" backdrop="blur" size="3xl" isOpen={isOpen} onClose={onClose}>
                            <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Información del pago</ModalHeader>
                                    {/* TODO: ver si podemos hacer que la tabla sea scrollable */}
                                    <ModalBody className="mb-4 overflow-scroll">
                                        <div className="mt-4 flex flex-col justify-center items-center">
                                            <Tabs aria-label="Options">
                                                <Tab key="products" title="Productos comprados">
                                                    <div className="mt-4">
                                                        <Table aria-label="products-table" isHeaderSticky>
                                                            <TableHeader>
                                                                <TableColumn>Imagen</TableColumn>
                                                                <TableColumn>Nombre del producto</TableColumn>
                                                                <TableColumn>Cantidad</TableColumn>
                                                                <TableColumn>Precio por unidad</TableColumn>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {selectedItem!.paymentSummary.paymentReq.products.map((item, index) => (
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
                                                                    <TableCell>${item.unitPrice}</TableCell>
                                                                    </TableRow>
                                                                    
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </Tab>
                                                <Tab key="card-information" title="Información del pago">
                                                    <div className="mt-4">
                                                        <Table aria-label="Example static collection table">
                                                        <TableHeader className="text-center">
                                                            <TableColumn>Moneda</TableColumn>
                                                            <TableColumn>Forma de pago</TableColumn>
                                                            <TableColumn>Total</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                            <TableCell>{selectedItem!.paymentSummary.paymentReq.currency}</TableCell>
                                                            <TableCell>{selectedItem!.paymentSummary.paymentMethod}</TableCell>
                                                            <TableCell>${selectedItem!.paymentSummary.paymentReq.amount}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        </Table>
                                                    </div>
                                                    <CardInformationTable card={selectedItem!.paymentSummary.card}/>
                                                </Tab>
                                                <Tab key="customer" title="Comprador">
                                                    <div className="mt-4">
                                                        <Table aria-label="Example static collection table">
                                                            <TableHeader>
                                                                <TableColumn>Documento</TableColumn>
                                                                <TableColumn>Nombre completo</TableColumn>
                                                                <TableColumn>Email</TableColumn>
                                                            </TableHeader>
                                                            <TableBody>
                                                                <TableRow key="1">
                                                                    <TableCell>{selectedItem?.paymentSummary?.paymentReq?.customer?.documentId || "N/A"}</TableCell>
                                                                    <TableCell>{selectedItem?.paymentSummary?.paymentReq?.customer?.fullName || "N/A"}</TableCell>
                                                                    <TableCell>{selectedItem?.paymentSummary?.paymentReq?.customer?.email || "N/A"}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </Tab>
                                                {selectedItem!.tasksErrors.length > 0 && (
                                                    <Tab key="errors" title={<p className="text-red-500">Errores</p>}>
                                                        <div className="mt-4">
                                                            <Table aria-label="products-table" isHeaderSticky>
                                                                <TableHeader>
                                                                    <TableColumn>Nombre de la tarea</TableColumn>
                                                                    <TableColumn>Codigo de estado</TableColumn>
                                                                    <TableColumn>Error canónico</TableColumn>
                                                                    <TableColumn>Mensaje de la tarea</TableColumn>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {selectedItem!.tasksErrors.map((item, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{item.task.name}</TableCell>
                                                                            <TableCell>{item.statusCode}</TableCell>
                                                                            <TableCell>{item.canonicalError}</TableCell>
                                                                            {/* TODO: rev */}
                                                                            <TableCell>{item.taskMessage && item.taskMessage.length > 0 ? item.taskMessage.join(' | ') : "N/A"}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </Tab>
                                                )}
                                            </Tabs>
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                            </ModalContent>
                        </Modal>
                        <Table
                            aria-label="Example table with custom cells"
                            topContent={topContent}
                            bottomContent={
                                <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                                </div>
                            }
                            classNames={{
                                wrapper: "min-h-[222px]",
                            }}
                        >
                            <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align="center">
                                {column.name}
                                </TableColumn>
                            )}
                            </TableHeader>
                            {items.length > 0? (
                                <TableBody items={items}>
                                    {(item) => (
                                    <TableRow
                                        key={item.id}
                                        className="cursor-pointer hover:bg-white hover:bg-opacity-10 transition-background"
                                        onClick={() => {
                                                setSelectedItem(item);
                                                onOpen();
                                            }
                                        }
                                    >
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                    )}
                                </TableBody>
                            )
                            :
                            (<TableBody emptyContent={"No hay filas para mostrar."}>{[]}</TableBody>)
                            }
                        </Table>
                    </>
                </div>
            </>
        )
        }
        </>
	);
}
