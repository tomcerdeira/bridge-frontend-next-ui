import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { BridgeLogo } from "../bridgeLogo";
import { ActivityIcon } from "../icons/sidebar/activity-icon";
import { BuilderIcon } from "../icons/sidebar/builder-icon";
import { FlowIcon } from "../icons/sidebar/flow-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { useSidebarContext } from "../layout/layout-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-full z-[42] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <BridgeLogo />
            <p className="ml-2 font-bold text-inherit">Bridge</p>
          </NextLink>
          {/* <CompaniesDropdown /> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Inicio"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Menú">
              <SidebarItem
                isActive={pathname.includes("/activity")}
                title="Actividad"
                icon={<ActivityIcon />}
                href="/activity"
              />
              <SidebarItem
                isActive={pathname.includes("/flows")}
                title="Lista de flujos"
                icon={<FlowIcon />}
                href="/flows"
              />
              <SidebarItem
                isActive={pathname.includes("/builder")}
                title="Constructor"
                icon={<BuilderIcon />}
                href="/builder"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
                <SidebarItem
                  isActive={pathname.includes("/settings")}
                  title="Configuraciones"
                  icon={<SettingsIcon />}
                  href="/settings"
                />
              </SidebarMenu>
            </div>
          </div>
        </div>
      </aside>
  );
};
