"use client";

import { Updater } from "use-immer";

import { Form, Project } from "@/lib/project-repository";

import EditFormComponent from "@/components/edit-form-component";
import { RemoveComponentButton } from "@/components/remove-component-button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const FormContent = ({ component, setProject }: { component: Form; setProject: Updater<Project> }) => (
  <div className="my-4 mr-4">
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">{component.name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>{component?.desc}</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center">
            {component.fields.map((item) => {
              return (
                <div key={item.id} className="flex my-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-32">
                        <Label htmlFor={item.id} className="text-center">
                          {item.name}:
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.desc ? item.desc : "No description"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Input id={item.id} className="w-64 mr-4" />
                </div>
              );
            })}
            <Button variant="secondary" className="w-32">
              Submit
            </Button>

            <EditFormComponent component={component} setProject={setProject} />
            <RemoveComponentButton setProject={setProject} componentId={component.id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
);
