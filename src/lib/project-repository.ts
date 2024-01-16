"use client";

import { immerable } from "immer";
import { v4 as uuidv4 } from "uuid";

export class Chat {
  prompt = "";
  result = "";

  static [immerable] = true;
}

export class BasicInfo {
  id = uuidv4();
  name = "";
  desc = "";

  static [immerable] = true;
}

export class Project extends BasicInfo {
  desc = "";
  pages = Array<Page>();

  chat = new Chat();

  static [immerable] = true;
}

export class Page extends BasicInfo {
  components = Array<Component>();

  static [immerable] = true;
}

export function findComponent<T extends Component>(page: Page, ce: PrimaryComponent): T | undefined {
  return page.components.find((it) => it.class === ce) as T;
}

export abstract class Component extends BasicInfo {
  abstract class: string;
}

export class Search extends Component {
  class = PrimaryComponent.Search;
  params = Array<BasicInfo>();
}

export class Table extends Component {
  class = PrimaryComponent.Table;
  headers = Array<BasicInfo>();
}

export class Form extends Component {
  class = PrimaryComponent.Form;
  fields = Array<BasicInfo>();
}

export enum PrimaryComponent {
  Search = "Search",
  Table = "Table",
  Form = "Form",
}

const STORAGE_KEY = "projects";

export function save(project: Project) {
  let projects = findAll();

  const exists = projects.find((it) => it.id === project.id);
  if (exists) {
    projects = projects.map((it) => {
      if (it.id === project.id) {
        return project;
      }
      return it;
    });
  } else {
    projects.push(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function find(id: string): Project {
  const project = findAll().find((it) => it.id === id);
  if (project) {
    return project;
  } else {
    throw new Error(`Project {id: ${id}} not found`);
  }
}

export function remove(id: string): void {
  const projects = findAll().filter((it) => it.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function findAll(): Project[] {
  if (typeof window !== "undefined") {
    let projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  } else {
    return [];
  }
}
