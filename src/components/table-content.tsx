"use client";

import { Updater } from "use-immer";

import { Project, Page, Table as TableComponent, PrimaryComponent, findComponent } from "@/lib/project-repository";

import EditTableComponent from "@/components/edit-table-component";
import { RemoveComponentButton } from "@/components/remove-component-button";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TableContent = ({ page, setProject }: { page: Page; setProject: Updater<Project> }) => {
  const component = findComponent(page, PrimaryComponent.Table) as TableComponent;
  return (
    <div className="flex">
      <Table className="my-4">
        <TableCaption>
          <strong>{component.name}</strong> {component.desc ? `: ${component.desc}` : ""}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {component.headers.map((header) => {
              return (
                <TableHead key={header.id} className="font-bold">
                  {header.name}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {component.headers.map((header) => {
              return <TableCell key={header.id}>{header.desc}</TableCell>;
            })}
          </TableRow>
        </TableBody>
      </Table>

      <EditTableComponent page={page} setProject={setProject} />
      <RemoveComponentButton componentId={component.id} setProject={setProject} />
    </div>
  );
};
