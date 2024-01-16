"use client";

import { Updater } from "use-immer";
import { Project, Page, PrimaryComponent, Form, findComponent } from "@/lib/project-repository";

import { FormContent } from "@/components/form-content";
import { TableContent } from "@/components/table-content";
import { SearchContent } from "@/components/search-content";
import { RemovePageButton } from "@/components/remove-page-button";
import { AddComponentButton } from "@/components/add-component-button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PageCard({ page, setProject }: { page: Page; setProject: Updater<Project> }) {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle className="grid grid-cols-12 items-center gap-4 mb-2">
          <Label htmlFor="pageName" className="text-left">
            Page name:
          </Label>
          <Input
            id="pageName"
            className="col-span-10 border-none hover:border-solid"
            placeholder="Type page name here."
            value={page.name ? page.name : ""}
            onChange={(e) => {
              setProject((draft) => {
                draft.pages.find((it) => it.id === page.id)!.name = e.target.value;
              });
            }}
          />
          <RemovePageButton setProject={setProject} id={page.id} />
        </CardTitle>
        <CardDescription className="grid grid-cols-12 items-center gap-4">
          <Label htmlFor="pageDesc" className="text-left">
            Page desc:
          </Label>
          <Input
            id="pageDesc"
            className="col-span-10 border-none hover:border-solid"
            placeholder="Type page desc here."
            value={page.desc ? page.desc : ""}
            onChange={(e) => {
              setProject((draft) => {
                draft.pages.find((it) => it.id === page.id)!.desc = e.target.value;
              });
            }}
          />
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <div>
          {findComponent(page, PrimaryComponent.Search) && <SearchContent page={page} setProject={setProject} />}
        </div>
        <div className="flex">
          {page.components
            .filter((it) => it.class === PrimaryComponent.Form)
            .map((it) => (
              <FormContent key={it.id} component={it as Form} setProject={setProject} />
            ))}
        </div>
        <div>{findComponent(page, PrimaryComponent.Table) && <TableContent page={page} setProject={setProject} />}</div>
        <AddComponentButton page={page} setProject={setProject} />
      </CardContent>
    </Card>
  );
}
