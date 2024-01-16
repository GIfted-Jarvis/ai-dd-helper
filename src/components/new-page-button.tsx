"use client";

import { Updater } from "use-immer";
import { Page, Project } from "@/lib/project-repository";

import { Button } from "@/components/ui/button";

export function NewPageButton({ setProject }: { setProject: Updater<Project> }) {
  return (
    <Button
      onClick={() => {
        setProject((draft) => {
          draft.pages.push(new Page());
        });
      }}
    >
      New page
    </Button>
  );
}
