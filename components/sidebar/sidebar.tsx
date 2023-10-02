import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { BridgeLogo } from "../bridgeLogo";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { FlowIcon } from "../icons/sidebar/flow-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { useSidebarContext } from "../layout/layout-context";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-full z-[202] sticky top-0">
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
                isActive={pathname === "/flows"}
                title="Flujos"
                icon={<FlowIcon />}
                href="flows"
              />
              <SidebarItem
                isActive={pathname === "/builder"}
                title="Constructor"
                icon={<AccountsIcon />}
                href="builder"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Pagos"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Clientes"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Productos"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reportes"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Desarrolladores"
                icon={<DevIcon />}
              />
              {/* <SidebarItem
                  isActive={pathname === "/view"}
                  title="View Test Data"
                  icon={<ViewIcon />}
                /> */}
                <SidebarItem
                  isActive={pathname === "/settings"}
                  title="Configuraciones"
                  icon={<SettingsIcon />}
                  href="settings"
                />
              </SidebarMenu>
            </div>
          </div>
        </div>
      </aside>
  );
};
