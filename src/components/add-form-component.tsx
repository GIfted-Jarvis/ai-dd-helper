"use client";

import React from "react";
import { Updater } from "use-immer";

import { intoForm } from "@/lib/converter";
import { PrimaryComponent, Project, Page } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Button } from "@/components/ui/button";

export default function AddFormComponent({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  return (
    <DynamicForm
      component={PrimaryComponent.Form}
      itemName="Field"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages.find((it) => it.id === page.id)?.components.push(intoForm(values));
        });
      }}
      dialogTriggerButton={<Button variant="ghost">{PrimaryComponent.Form}</Button>}
    />
  );
}
