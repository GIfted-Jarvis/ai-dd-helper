"use client";

import React from "react";
import { Updater } from "use-immer";

import { Page, PrimaryComponent, Project, Search } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { intoSearch } from "@/lib/converter";

export default function EditSearchComponent({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  const search = page.components.find((it) => it.class === PrimaryComponent.Search) as Search;
  return (
    <DynamicForm
      component={PrimaryComponent.Search}
      itemName="Param"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages = draft.pages.map((p) => {
            p.components = p.components.map((c) => {
              if (c.id === values.id) {
                return intoSearch(values);
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
      initialValues={initialValues(search)}
    />
  );
}

const initialValues = (search: Search): FormValuesType | undefined => {
  if (search) {
    return {
      id: search.id,
      name: search.name,
      desc: search.desc,
      items: search.params.map((it) => {
        return { id: it.id, name: it.name, desc: it.desc };
      }),
    };
  }
};
