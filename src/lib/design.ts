"use client";

import OpenAI from "openai";
import { Updater } from "use-immer";

import { getModel } from "@/lib/settings-repository";
import { Project, Page, Component, PrimaryComponent, Search, Form, Table } from "@/lib/project-repository";

const openai = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export function design(project: Project, setProject: Updater<Project>) {
  const prompt = projectPrompt(project);
  console.log(prompt);
  setProject((draft) => {
    draft.chat.prompt = prompt;
  });
  completion(prompt, setProject);
}

function projectPrompt(project: Project): string {
  return `你是一位专业的软件工程师, 需要帮助我完成项目的设计与开发.
我会向你描述具体的需求, 你需要为我提供类图(Class diagrams)和时序图(Sequence diagrams).

# 要求
- 回复使用 markdown 格式;
- 类图和时序图使用 mermaid 语法;
- 设计方向要偏向于后端, 不要包含任何有关前端组件的内容;
- 设计方法可以参考 MVC 或 DDD.
- 对类图和时序图进行一些补充说明, 帮助我理解为什么要这样设计;
- 你的专业知识严格限于软件开发主题, 避免侵犯版权的内容, 对于与软件开发无关的问题, 只需提醒你是一个 AI 编程助手;

# 需求
项目名称: ${project.name}
项目描述: ${project.desc}

${project.pages
  .map((it) => {
    return pagePrompt(it);
  })
  .join("\n")}
`;
}

function pagePrompt(page: Page) {
  return `## 页面: ${page.name}
描述: ${page.desc ? page.desc : "无"}

### 功能
${page.components
  .map((it) => {
    return componentPrompt(it);
  })
  .join("\n")}
`;
}

function componentPrompt(component: Component) {
  let prompt = "";
  if (component.class === PrimaryComponent.Search) {
    const s = component as Search;
    prompt += `#### ${s.name}
- 类型: 搜索
- 描述: ${s.desc ? s.desc : "无"}
- 搜索参数: ${s.params
      .map((it) => {
        const desc = it.desc ? "(" + it.desc + ")" : "";
        return it.name + desc;
      })
      .join(",")}
`;
  } else if (component.class === PrimaryComponent.Form) {
    const f = component as Form;
    prompt += `#### ${f.name}
- 类型: 表单
- 描述: ${f.desc ? f.desc : "无"}
- 表单字段: ${f.fields
      .map((it) => {
        const desc = it.desc ? "(" + it.desc + ")" : "";
        return it.name + desc;
      })
      .join(",")}
`;
  } else if (component.class === PrimaryComponent.Table) {
    const t = component as Table;
    prompt += `#### ${t.name}
- 类型: 表格
- 描述: ${t.desc ? t.desc : "无"}
- 表头: ${t.headers
      .map((it) => {
        const desc = it.desc ? "(" + it.desc + ")" : "";
        return it.name + desc;
      })
      .join(",")}
`;
  } else {
    throw Error(`Not support component: ${component.class}`);
  }
  return prompt;
}

async function completion(content: string, setProject: Updater<Project>) {
  const stream = await openai.chat.completions.create({
    model: getModel(),
    messages: [{ role: "assistant", content: content }],
    stream: true,
  });

  let result = "";
  for await (const chunk of stream) {
    result += chunk.choices[0]?.delta?.content || "";
    setProject((draft) => {
      draft.chat.result = result;
    });
  }
}
