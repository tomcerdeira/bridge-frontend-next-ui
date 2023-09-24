import { useAuth } from "@/src/hooks/useAuth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem
} from "@nextui-org/react";

export const UserDropdown = () => {
  const { user, doSignOut } = useAuth();
  
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            size="md"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        disabledKeys={["user-email"]}
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="user-email" >
          {user?.email}
        </DropdownItem>
        <DropdownItem key="sign-out" className="text-danger" color="danger" onClick={doSignOut}>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
