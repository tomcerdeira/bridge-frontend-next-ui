import { Navbar, NavbarContent } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  
  const showNavbar = 
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') || 
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/verify') ||
    pathname.startsWith('/init-shop')
    ? false : true;

  return (
    <>
      {showNavbar? (
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
        ) 
        :
        (
          <section className="m-auto">
            {children}
          </section>
        )
      }
    </>
  );
};
