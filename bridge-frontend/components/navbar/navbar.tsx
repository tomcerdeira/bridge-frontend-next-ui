import { useAuth } from "@/src/hooks/useAuth";
import { Chip, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { shop } = useAuth();

  // TODO: ver este true
  return ( 
    <> 
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Navbar
            isBordered
            className="w-full"
            classNames={{
              wrapper: "w-full max-w-full justify-end",
            }}
          >
            <NavbarContent className="md:hidden">
              <BurguerButton />
            </NavbarContent>

            <NavbarContent
              justify="start"
              >
              {!shop ? (
                <div className="flex">
                    <Chip
                      variant="faded"
                      size="md"
                    >
                      Cargando...
                    </Chip>
                </div>
                ) : (
                <div className="flex">
                  <Chip
                    size="md"
                    >
                      {shop!.name}
                  </Chip>
                </div>
                )
              }
            </NavbarContent>
    
            <NavbarContent
              justify="end"
              className="w-fit data-[justify=end]:flex-grow-0"
            >
              {/* <NotificationsDropdown /> */}
              <NavbarContent>
                <UserDropdown />
              </NavbarContent>
    
            </NavbarContent>
    
          </Navbar>
          {children}
        </div>
    </>
  );
};
