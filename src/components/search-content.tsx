"use client";

import { Updater } from "use-immer";

import { Page, PrimaryComponent, Project, Search, findComponent } from "@/lib/project-repository";

import EditSearchComponent from "@/components/edit-search-component";
import { RemoveComponentButton } from "@/components/remove-component-button";

import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SearchContent = ({ page, setProject }: { page: Page; setProject: Updater<Project> }) => {
  const component = findComponent(page, PrimaryComponent.Search) as Search;
  return (
    <div className="flex flex-wrap my-4">
      {component.params.map((param) => {
        return (
          <div key={param.id} className="flex items-center mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-32">
                  <Label htmlFor={param.id} className="text-center">
                    {param.name}:
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{param.desc ? param.desc : "No description"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Input id={param.id} className="w-64 mr-4" />
          </div>
        );
      })}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="mt-2 ml-4 w-auto">
              {component.name}
              <HelpCircle className="h-4 w-4 ml-1" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{component.desc}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <EditSearchComponent page={page} setProject={setProject} />
      <RemoveComponentButton setProject={setProject} componentId={component.id} />
    </div>
  );
};
