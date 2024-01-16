"use client";

import { Updater } from "use-immer";
import { Project } from "@/lib/project-repository";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectCard({ project, setProject }: { project: Project; setProject: Updater<Project> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Basic Info</CardTitle>
        <CardDescription>{project.id}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-12 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Project name:
        </Label>
        <Input
          id="name"
          className="col-span-11 border-none hover:border-solid"
          value={project.name ? project.name : ""}
          placeholder="Type project name here."
          onChange={(e) => {
            setProject((draft) => {
              draft.name = e.target.value;
            });
          }}
        />

        <Label htmlFor="desc" className="text-left">
          Project desc:
        </Label>
        <Textarea
          id="desc"
          className="col-span-11 border-none hover:border-solid"
          value={project.desc ? project.desc : ""}
          placeholder="Type project desc here."
          onChange={(e) => {
            setProject((draft) => {
              draft.desc = e.target.value;
            });
          }}
        />
      </CardContent>
    </Card>
  );
}
