"use client";

import React from "react";
import { Updater } from "use-immer";

import { intoForm } from "@/lib/converter";
import { Project, Form, PrimaryComponent } from "@/lib/project-repository";

import { DynamicForm, FormValuesType } from "@/components/dynamic-form";

import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditFormComponent({
  component,
  setProject,
}: {
  component: Form;
  setProject: Updater<Project>;
}) {
  return (
    <DynamicForm
      component={PrimaryComponent.Form}
      itemName="Field"
      setter={(values: FormValuesType) => {
        setProject((draft) => {
          draft.pages = draft.pages.map((p) => {
            p.components = p.components.map((c) => {
              if (c.id === values.id) {
                return intoForm(values);
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
      initialValues={initialValues(component)}
    />
  );
}

const initialValues = (form: Form): FormValuesType | undefined => {
  if (form) {
    return {
      id: form.id,
      name: form.name,
      desc: form.desc,
      items: form.fields.map((it) => {
        return { id: it.id, name: it.name, desc: it.desc };
      }),
    };
  }
};
