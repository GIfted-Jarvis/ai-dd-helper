"use client";

import { Updater } from "use-immer";

import { design } from "@/lib/design";
import { Project } from "@/lib/project-repository";

import { Markdown } from "@/components/markdown";

import { Button } from "@/components/ui/button";
import { MixIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

export function DesignArea({ project, setProject }: { project: Project; setProject: Updater<Project> }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          onClick={(_e) => {
            if (!project.chat.result) {
              design(project, setProject);
            }
          }}
        >
          <MixIcon className="mr-1 h-4 w-4" />
          Design
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-[600px]">
          <DrawerHeader>
            <DrawerDescription>
              <Markdown content={project.chat.result} />
            </DrawerDescription>
          </DrawerHeader>
        </ScrollArea>
        <DrawerFooter>
          <Button onClick={(_e) => design(project, setProject)}>Re design</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
