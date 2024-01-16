"use client";

import React from "react";
import { Updater } from "use-immer";

import { intoTable } from "@/lib/converter";
import { PrimaryComponent, Project, Page } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Button } from "@/components/ui/button";

export default function AddTableComponent({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  return (
    <DynamicForm
      component={PrimaryComponent.Table}
      itemName="Header"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages.find((it) => it.id === page.id)?.components.push(intoTable(values));
        });
      }}
      dialogTriggerButton={<Button variant="ghost">{PrimaryComponent.Table}</Button>}
    />
  );
}
