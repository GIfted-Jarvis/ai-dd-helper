"use client";

import { useEffect } from "react";
import { useImmer } from "use-immer";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [iconStyle, setIconStyle] = useImmer({ color: "bg-black hover:bg-gray-900" });

  useEffect(() => {
    if (resolvedTheme === "light") {
      setIconStyle((data) => {
        data.color = "bg-black hover:bg-gray-900";
      });
    } else if (resolvedTheme === "dark") {
      setIconStyle((data) => {
        data.color = "bg-white hover:bg-gray-300";
      });
    }
  }, [resolvedTheme, setIconStyle]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={iconStyle.color}>
          <SunIcon className="text-white h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute text-black h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
