# What
AI DD Helper: AI-Driven Design Helper

Using AI to Generate Class Diagrams and Sequence Diagrams.

***利用 AI 来生成类图和时序图***

# Why?
Although there are already many tools or products using AI to generate code, the results are often unsatisfactory. Therefore, we want to apply AI to a higher level of application: we describe product requirements, and AI assists us in completing the design (class diagrams and sequence diagrams).

***虽然已经有很多用 AI 来生成代码的工具或产品 , 但效果总是不尽人意, 所以我们想把 AI 用到更高层次的应用中: 我们来描述产品需求, AI 帮助我们完成设计(类图和时序图)***

# How to get started
## 1. How to use
- Describe the UI and requirements
- ***描述 UI 和需求***
- Design by AI
- ***使用 AI 进行设计***

<video controls width="720">
  <source src="https://raw.githubusercontent.com/GIfted-Jarvis/ai-dd-helper/refs/heads/main/docs/demo-vedio.mp4" type="video/mp4">
</video>

## 2. Deployment
### 2.1. Local
```shell
git clone git@github.com:minijoylabs/ai-dd-helper.git && cd ai-dd-helper
# install dependencies
npm i
# Copy and edit .env
cp .env.template .env
# run
npm run dev
```

### 2.2. Vercel
**This project doesn't have integrated authentication. If deploying with Vercel, avoid filling in the API key in the environment variables to prevent misuse of the API key!**

***本项目没有集成 Auth, 如果使用 Vercel 部署, 不要在 env 中填写 api key, 避免 api key 被滥用!***

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fminijoylabs%2Fai-dd-helper&project-name=ai-dd-helper&repository-name=ai-dd-helper)