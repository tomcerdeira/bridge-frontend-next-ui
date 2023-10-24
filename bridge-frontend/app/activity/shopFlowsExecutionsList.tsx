'use client'

import { SearchIcon } from "@/components/icons";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { useGetFlowExecutionStatusByShop } from "@/src/api/analytics";
import { FlowExecutionResponse } from "@/src/api/types";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

const columns = [
    {name: "ID del pedido de pago", uid: "payment-req-id"},
    {name: "ID de la ejecución", uid: "flow-exec-id"},
    {name: "Fecha", uid: "date"},
    {name: "Hora", uid: "hour"},
    {name: "Flujo", uid: "flow"},
    {name: "Estado del flujo", uid: "flow-status"},
    {name: "Estado del pago", uid: "pay-status"},
  ];

export default function ShopFlowExecutionsList({ shopId, query } : { shopId: string, query: { [key: string]: string | string[] | undefined } }) {
    const { flow_analytics, error, isLoading } = useGetFlowExecutionStatusByShop(shopId, query);
    
    const renderCell = React.useCallback((flow_analytic: FlowExecutionResponse, columnKey: React.Key) => {

        switch (columnKey) {
            case "flow-exec-id":
                return (
                    <div>
                        {flow_analytic.id}
                    </div>
                );
            case "flow":
                return (
                    <Button
                        href={'/flows/' + flow_analytic.flowSummary.id}
                        as={Link}
                        color="default"
                        showAnchorIcon
                        variant="flat"
                        >
                        {flow_analytic.flowSummary.name }
                    </Button>
                );
            case "payment-req-id":
                return (
                    <Button
                        href={'/flows/' + flow_analytic.flowSummary.id + '?paymentReqId=' + flow_analytic.paymentSummary.paymentReq.id}
                        as={Link}
                        color="default"
                        showAnchorIcon
                        variant="flat"
                        >
                        {flow_analytic.paymentSummary.paymentReq.id}
                    </Button>
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
    
        return filteredFlows;
      }, [flow_analytics, hasSearchFilter, flowStatusFilter, paymentStatusFilter, filterValue]);

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
    
	return (
		<>
        {isLoading || !flow_analytics? (
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
                    {/* TODO: creo que se podria sacar y hacer el manejo directo con el <TableBody emptyContent={"No hay filas para mostrar."}>{[]}</TableBody> */}
                    {error? (
                        <div className="gap-2 flex flex-col md:flex-row justify-center">
                            <p className="mt-16" style={{ fontSize: "18px" }}>...No existen aún 🔍</p>
                        </div>
                    )
                    :
                    (

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
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        )
                        :
                        (<TableBody emptyContent={"No hay filas para mostrar."}>{[]}</TableBody>)
                        }
                      </Table>
                    )
                }
                </div>
            </>
        )
        }
        </>
	);
}
