'use client'

import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function SettingsPage() {
    const pathname = usePathname();
    
  return (
    <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
        <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                <h3 className="text-xl font-bold">Configuraciones personales</h3>
            </div>
        </div>
        <div>
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Ajustes de perfil" title="Ajustes de perfil">
                Vea, personalice y administre su perfil personal y preferencias.
                <div className="mt-2 mb-2">
                    <Link href={`${pathname}/personal`}>  
                        <Button color="primary">
                            Ver
                        </Button> 
                    </Link>
                </div>
            </AccordionItem>
            </Accordion>
        </div>
        <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                <h3 className="text-xl font-bold">Configuraciones del comercio</h3>
            </div>
        </div>
        <div>
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Ajustes del comercio" title="Ajustes del comercio">
                Vea, personalice y administre el perfil del comercio y preferencias.
                <div className="mt-2 mb-2">
                    <Link href={`${pathname}/shop`}>  
                        <Button color="primary">
                            Ver
                        </Button> 
                    </Link>
                </div>
            </AccordionItem>
            </Accordion>
        </div>
    </div>
  );
}