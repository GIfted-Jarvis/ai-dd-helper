"use client";

import { Updater } from "use-immer";

import { Project } from "@/lib/project-repository";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RemoveComponentButton = ({
  setProject,
  componentId,
}: {
  setProject: Updater<Project>;
  componentId: string;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-4 w-4 ml-4"
    onClick={() => {
      setProject((draft) => {
        draft.pages = draft.pages.map((p) => {
          return {
            ...p,
            components: p.components.filter((c) => c.id !== componentId),
          };
        });
      });
    }}
  >
    <XCircle />
  </Button>
);
