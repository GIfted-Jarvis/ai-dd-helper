"use client";

import { Form, PrimaryComponent, Search, Table } from "@/lib/project-repository";

import { FormValuesType, ItemType } from "@/components/dynamic-form";

const convertItems = (items: ItemType[]) => {
  return items.map((it) => {
    return {
      id: it.id,
      name: it.name,
      desc: it.desc,
    };
  });
};

export const intoSearch = (values: FormValuesType): Search => {
  return {
    id: values.id,
    name: values.name,
    desc: values.desc,
    class: PrimaryComponent.Search,
    params: convertItems(values.items),
  };
};

export const intoForm = (values: FormValuesType): Form => {
  return {
    id: values.id,
    name: values.name,
    desc: values.desc,
    class: PrimaryComponent.Form,
    fields: convertItems(values.items),
  };
};

export const intoTable = (values: FormValuesType): Table => {
  return {
    id: values.id,
    name: values.name,
    desc: values.desc,
    class: PrimaryComponent.Table,
    headers: convertItems(values.items),
  };
};
