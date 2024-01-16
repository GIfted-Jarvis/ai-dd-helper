"use client";

import { useEffect } from "react";
import { useImmer } from "use-immer";

import { Project, save } from "@/lib/project-repository";

import { PageCard } from "@/components/page-card";
import { DesignArea } from "@/components/design-area";
import { ProjectCard } from "@/components/project-card";
import { NewPageButton } from "@/components/new-page-button";

export default function EditProject({ p }: { p: Project }) {
  const [project, setProject] = useImmer(p);

  useEffect(() => {
    console.log(JSON.stringify(project, null, 2));
    save(project);
  }, [project]);

  return (
    <>
      <ProjectCard project={project} setProject={setProject} />

      {project.pages.map((page) => (
        <PageCard key={page.id} page={page} setProject={setProject} />
      ))}

      <div className="flex justify-between mt-4">
        <NewPageButton setProject={setProject} />
        <DesignArea project={project} setProject={setProject} />
      </div>
    </>
  );
}
