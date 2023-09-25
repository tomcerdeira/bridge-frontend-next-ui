'use client'

import { useLockedBody } from "@/src/hooks/useBodyLock";
import { Divider, Link } from "@nextui-org/react";
import React from "react";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <section className="flex flex-grow">
          <SidebarWrapper />
          <NavbarWrapper>{children}</NavbarWrapper>
          {/* TODO: FIX SCROLLABLE WHEN LOGGED IN */}
        </section>
        <Divider />
        <footer className="w-full flex items-center justify-center py-3 mb-2">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://www.itba.edu.ar/"
            title="itba.edu.ar homepage"
          >
            <span className="text-default-600">Desarrollado por</span>
            <p className="text-primary">Bridge</p>
          </Link>
        </footer>
      </div>
    </SidebarContext.Provider>
  );
};
