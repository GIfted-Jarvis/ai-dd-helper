"use client";

import { Updater } from "use-immer";

import { Page, Project } from "@/lib/project-repository";

import AddFormComponent from "@/components/add-form-component";
import AddTableComponent from "@/components/add-table-component";
import AddSearchComponent from "@/components/add-search-component";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function AddComponentButton({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  return (
    <div className="my-4">
      <Popover>
        <PopoverTrigger>
          <Button variant="secondary">
            <PlusIcon className="mr-1 h-4 w-4" />
            Add component
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36">
          <ul>
            <li>
              <AddSearchComponent page={page} setProject={setProject} />
            </li>
            <li>
              <AddFormComponent page={page} setProject={setProject} />
            </li>
            <li>
              <AddTableComponent page={page} setProject={setProject} />
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
