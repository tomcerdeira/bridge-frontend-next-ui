import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Snippet,
    Tab,
    Tabs,
} from '@nextui-org/react';

const CodeSnippetModal = ({ isOpen, onClose, clickedFlowId }) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Snippets de código</ModalHeader>
            <ModalBody>
              <p>Implementa la integración copiándolo/pegándolo en el código de tu aplicación.</p>
              <Tabs aria-label="Options" color="primary" className="flex justify-center mt-4">
                <Tab key="curl" title="CURL">
                    <Snippet symbol="" className="w-full">
                    <pre>
    { 
      `curl -X POST '${process.env.NEXT_PUBLIC_BASE_URL}/payment/private/payments/${clickedFlowId}' \\
       -H 'Authorization: Bearer <TU_TOKEN_DE_ACCESO>' \\
       -H 'Content-Type: application/json' \\
       -d '{
         "amount": 100,
         "currency": "ARS",
         "redirectURL": "<TU_LINK_DE_REDIRECCION>",
         "products": [
           {
             "name": "Socks",
             "unitPrice": 100,
             "description": "Red socks",
             "imgUrl": "https://media.mysockfactory.ch/1354-thickbox_default/maos-red-plain-socks.jpg",
             "quantity": 1
           }
         ]
       }'`
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
  );
};

export default CodeSnippetModal;
