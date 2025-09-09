"use client";

import * as React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuCheckboxes() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="rounded-none">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-4 m-2 p-8 bg-ring text-secondary">
          <Avatar className="rounded-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Ali Ahmed</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-2 py-2 hover:outline-0 hover:bg-secondary cursor-pointer">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTheme((theme) => (theme === "light" ? "dark" : "light"))
          }
          className="px-2 py-2 hover:outline-0 bg-foreground text-background dark:text-background dark:bg-foreground cursor-pointer"
        >
          {theme === "dark" ? (
            <div className="flex items-center gap-2">
              <Sun size={16} />
              Light
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Moon size={16} />
              Dark
            </div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="px-2 py-2 hover:outline-0 hover:bg-secondary cursor-pointer">
          Team
        </DropdownMenuItem>
        <DropdownMenuItem className="px-2 py-2 hover:outline-0 hover:bg-secondary cursor-pointer">
          Subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
