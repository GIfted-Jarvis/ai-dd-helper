"use client";

import React from "react";
import { Updater } from "use-immer";

import { intoTable } from "@/lib/converter";
import { Page, PrimaryComponent, Project, Table } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditTableComponent({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  const table = page.components.find((it) => it.class === PrimaryComponent.Table) as Table;
  return (
    <DynamicForm
      component={PrimaryComponent.Table}
      itemName="Header"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages = draft.pages.map((p) => {
            p.components = p.components.map((c) => {
              if (c.id === values.id) {
                return intoTable(values);
              } else {
                return c;
              }
            });
            return p;
          });
        });
      }}
      dialogTriggerButton={
        <Button variant="ghost" size="icon" className="h-4 w-4 ml-4">
          <Wrench />
        </Button>
      }
      initialValues={initialValues(table)}
    />
  );
}

const initialValues = (table: Table) => {
  if (table) {
    return {
      id: table.id,
      name: table.name,
      desc: table.desc,
      items: table.headers.map((it) => {
        return { id: it.id, name: it.name, desc: it.desc };
      }),
    };
  }
};
