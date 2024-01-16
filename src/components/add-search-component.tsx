"use client";

import React from "react";
import { Updater } from "use-immer";

import { Page, PrimaryComponent, Project } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Button } from "@/components/ui/button";
import { intoSearch } from "@/lib/converter";

export default function AddSearchComponent({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  return (
    <DynamicForm
      component={PrimaryComponent.Search}
      itemName="Param"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages.find((it) => it.id === page.id)?.components.push(intoSearch(values));
        });
      }}
      dialogTriggerButton={<Button variant="ghost">{PrimaryComponent.Search}</Button>}
    />
  );
}
