"use client";

import { User } from "@/payload-types";
import { Dropdown, DropdownItem } from "../ui/dropdown";

import { useAuth } from "@/hooks/useAuth";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <Dropdown triggerVariant="ghost" triggerText="My account">
      <DropdownItem onClick={(e) => e.stopPropagation()} asDiv className="font-bold hover:bg-background">
        {user.email}
      </DropdownItem>
      <div className="w-full h-[1px] bg-border" />
      <DropdownItem href="/sell">Seller dashboard</DropdownItem>
      <DropdownItem onClick={signOut}>Log out</DropdownItem>
    </Dropdown>
  );
};

export default UserAccountNav;
