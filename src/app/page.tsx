"use client";

import Link from "next/link";
import { useState } from "react";
import { findAll, remove } from "@/lib/project-repository";

import DeleteProjectButton from "@/components/delete-project-button";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Home() {
  const [projects, setProjects] = useState(findAll());

  function handleDelete(id: string) {
    remove(id);
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Desc</TableHead>
          <TableHead className="text-center">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="text-center">{p.id}</TableCell>
            <TableCell className="text-center">{p.name}</TableCell>
            <TableCell>{p.desc.length >= 64 ? `${p.desc.slice(0, 64)}...` : p.desc}</TableCell>
            <TableCell className="text-center">
              <Button className="mr-1 w-16">
                <Link href={`/projects/${p.id}`}>Open</Link>
              </Button>
              <DeleteProjectButton handleDelete={handleDelete} pid={p.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
