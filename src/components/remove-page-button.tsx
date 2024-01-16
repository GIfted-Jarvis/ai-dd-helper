"use client";

import { X } from "lucide-react";
import { Updater } from "use-immer";

import { Project } from "@/lib/project-repository";

import { Button } from "@/components/ui/button";

export const RemovePageButton = ({ setProject, id }: { setProject: Updater<Project>; id: string }) => (
  <div className="text-right">
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5"
      onClick={(_e) => {
        setProject((draft) => {
          draft.pages = draft.pages.filter((p) => p.id !== id);
        });
      }}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);
