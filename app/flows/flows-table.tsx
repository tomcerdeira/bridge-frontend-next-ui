import { CodeIcon } from "@/components/icons/code-icon";
import { FlowIcon } from "@/components/icons/sidebar/flow-icon";
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import toast from "@/components/toast";
import { useDeleteFlow } from "@/src/api/flows";
import { FlowDetails } from "@/src/api/types";
import {
  Avatar,
  Button,
  Chip,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

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

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [clickedFlowId, setClickedFlowId] = useState('');
  const handleGetSnippet = async (flowId: string) => {
    setClickedFlowId(flowId);
    onOpen();
  }

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1">Snippets de código</ModalHeader>
              <ModalBody>
                <p>Implementa la integración copiándolo/pegándolo en el código de tu aplicación.</p>
                <Tabs aria-label="Options" className="flex justify-center mt-4">
                  <Tab key="curl" title="CURL">
                    <Snippet symbol="" className="w-full">
                      <pre>
                        { 
                        `curl -X POST '${process.env.NEXT_PUBLIC_BASE_URL}/payment/private/payments/${clickedFlowId}' \n -H 'authorization: Bearer <TU_TOKEN_DE_ACCESO>' \n -H 'Content-Type: application/json' \n -d '{\n  "amount": 100,\n  "currency": "ARS",\n  "redirectURL": "<TU_URL_DE_REDIRECCION>",\n  "products": [\n     {\n       "name": "Socks",\n       "unitPrice": 100,\n       "description": "Red socks",\n       "imgUrl": "https://media.mysockfactory.ch/1354-thickbox_default/maos-red-plain-socks.jpg",\n       "quantity": 1\n     }\n   ]\n }' `
                        }
                      </pre>
                    </Snippet>
                  </Tab>
                  <Tab key="node" title="Node.js">
                    <Snippet symbol="" className="w-full">
                      <pre>
                        {`const fetch = require('node-fetch');\nconst apiUrl = \`${process.env.NEXT_PUBLIC_BASE_URL}/payment/private/payments/${clickedFlowId}\`;\nconst accessToken = <TU_TOKEN_DE_ACCESO>;\n\nconst requestData = {\n  amount: 100,\n  currency: 'ARS',\n  redirectURL: <TU_URL_DE_REDIRECCION>,\n  products: [\n   {\n     name: 'Socks',\n     unitPrice: 100,\n     description: 'Red socks',\n     imgUrl: 'https://media.mysockfactory.ch/1354-thickbox_default/maos-red-plain-socks.jpg',\n     quantity: 1,\n  },\n]};\n\nfetch(apiUrl, {\n method: 'POST',\n headers:{\n    'Content-Type': 'application/json',\n    'Authorization':\n    'Bearer \${accessToken}\'\n },\n  body: JSON.stringify(requestData)\n})\n.then((response) => response.json())\n.then((data) => { console.log(data); /* TODO */ })\n.catch((error) => { console.error('Error:', error); /* TODO */ });

                        `}
                      </pre>
                    </Snippet>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                      Ok
                  </Button>
              </ModalFooter>
              </>
          )}
          </ModalContent>
      </Modal>
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
                      <Tooltip content="Integración">
                          <button onClick={() => handleGetSnippet(item.id)}>
                            <CodeIcon size={20} fill="#979797" />
                          </button>
                      </Tooltip>
                    </div>
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
    </>
  );
};