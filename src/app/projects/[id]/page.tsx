"use client";

import { find } from "@/lib/project-repository";
import EditProject from "@/components/edit-project";

export default function Details({ params }: { params: { id: string } }) {
  return <EditProject p={find(params.id)} />;
}
