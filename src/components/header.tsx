"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Project, save } from "@/lib/project-repository";

import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@/components/ui/button";
import SocialIcon from "@/components/ui/social-icons";
import { HomeIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export default function Header() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [themeColor, setThemeColor] = useImmer("#fff");

  useEffect(() => {
    if (resolvedTheme === "light") {
      setThemeColor("#fff");
    } else if (resolvedTheme === "dark") {
      setThemeColor("#000");
    }
  }, [resolvedTheme, setThemeColor]);

  return (
    <div className="flex justify-between mb-9">
      <Link href={"/"}>
        <Button>
          <HomeIcon className="mr-1 w-5 h-5" />
          Home
        </Button>
      </Link>

      <div>
        <Button
          className="mr-4"
          onClick={() => {
            const p = new Project();
            save(p);
            router.push(`/projects/${p.id}`);
          }}
        >
          <PlusCircledIcon className="mr-1 w-5 h-5" />
          New
        </Button>

        <Link href={"/settings"}>
          <Button className="mr-4 align-top h-10 w-10">
            <SocialIcon kind={"setting"} size={5} color={themeColor} />
          </Button>
        </Link>

        <Button className="mr-4 align-top h-10 w-10">
          <SocialIcon kind={"github"} href={"https://github.com/minijoylabs/ai-dd-helper"} color={themeColor} size={5} />
        </Button>

        <div className="inline-flex align-top">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
