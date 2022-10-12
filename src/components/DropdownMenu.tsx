import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent: React.FC<DropdownMenuPrimitive.DropdownMenuContentProps> = (
  props
) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      {...props}
      className="min-h-fit min-w-[220px] rounded bg-white p-1 text-black"
    >
      {props.children}

      <DropdownMenuPrimitive.Arrow className="fill-current text-white" />
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem: React.FC<DropdownMenuPrimitive.MenuItemProps> = (props) => (
  <DropdownMenuPrimitive.Item
    {...props}
    className="cursor-pointer rounded px-2 py-1 outline-none focus:bg-gray-300"
  />
);
