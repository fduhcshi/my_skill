# My Skills

**科研与开发的个人 AI Skills。** 把反复使用的工作方式整理成可下载、可阅读、可交给 AI 使用的 Markdown 文件。

从读懂论文、规划复现，到发展研究想法、组织 Python 代码，再到展示成果，这里收录的是我自己使用和持续调整的工作流。

[浏览本地网站](./index.html) · [查看 Skills](#skills) · [安装与使用](#安装与使用)

## Skills

每个 skill 对应一个 Markdown 文件，按需要选择即可。

| Skill | 适用场景 | 提供什么 | 得到什么 |
| --- | --- | --- | --- |
| [Paper Reading · 深度读论文](./paper-reading.md) | 想系统理解一篇论文的问题、数学与论证 | 论文 PDF、链接、LaTeX 源码或正文 | 包含符号、方法推导、理论和实验分析的深度笔记 |
| [Paper Experiment Detail · 算法与实验复现](./paper-exp-detail.md) | 重点关注算法怎么实现、实验怎么跑 | 论文、可用算力与时间预算 | 核心算法、实验配置、复现难点和不同资源下的实验方案 |
| [Idea Insight · 研究想法成稿](./idea-insight.md) | 把零散 insight 推进为可以继续研究的草稿 | 初步想法、相关论文、观察或讨论记录 | 问题定义、方法框架、证明路线、实验设计与风险判断 |
| [Python Project Standards · Python 项目规范](./python-project-standards.md) | 搭建或扩展研究代码与工程项目 | 需求、已有代码和项目约定 | 适度模块化的架构、清晰接口、配置与可复现运行方式 |
| [Research to Markdown · 整理研究记录](./research-to-markdown.md) | 将项目证据与实验结果整理为研究文档 | 代码、配置、运行记录、结果和数据 | 可追溯的 Markdown 报告、复现说明与数据资产索引 |
| [Markdown to Interactive HTML · 交互展示研究](./markdown-to-interactive-html.md) | 将研究文档与关联数据做成离线展示网页 | Markdown 报告及真实数据文件 | 本地可打开的 HTML、交互图表与筛选控件 |
| [Sticker Neo-Brutalism · 贴纸风网页设计](./sticker-neo-brutalism.md) | 制作奶油底色、彩色卡片、粗边框与硬阴影的网页 | 页面目标、内容与交互需求 | 有统一视觉语言的网页界面与实现指导 |

`paper-reading` 侧重读懂全文，`paper-exp-detail` 侧重执行复现；可以按当前目标单独使用，也可以接着把自己的研究想法交给 `idea-insight`。

`research-to-markdown` 整理研究证据、报告和数据资产索引，`markdown-to-interactive-html` 可接着读取报告与关联数据，制作离线可用的交互展示。两者也可独立使用；网页 skill 接受已有 Markdown，不要求先运行前者。

## 安装与使用

不需要下载整个仓库。打开需要的 `.md` 文件，在 GitHub 文件页下载原始文件，再把它交给你使用的 AI 工具。

可以直接发送：

> 请读取我附上的 `paper-reading.md`，把它安装为当前工具可调用的 skill，名称使用文件中的 `name`。请根据当前工具的实际安装规范处理所需的文件名和目录，保留原文，并告诉我安装位置与调用方式。

仓库使用便于浏览和下载的单文件形式。不同工具可能要求不同的安装目录或 `SKILL.md` 文件名，由 AI 按工具的实际规范转换即可。如果工具不支持安装 skill，也可以在对话中附上文件，让 AI 按其中的要求完成本次任务。

安装后的调用方式以工具实际支持的方式为准；以下例子也可以和对应文件一起直接发送。

### 深度理解论文

> 请使用 `paper-reading` 阅读这篇论文，写一份中文深度笔记。重点解释目标函数、符号维度和定理成立的条件，结合一个小例子讲清核心算法。

### 规划实验复现

> 请使用 `paper-exp-detail` 整理这篇论文。我有一张 24 GB 显卡和三天时间，希望先验证核心结论。请说明完整实验配置，并给出适合这个预算的最小复现方案。

### 发展研究想法

> 请使用 `idea-insight`，根据下面的观察和两篇相关论文，把这个想法整理成研究草稿。明确区分已有证据、工作假设、待证明命题和建议实验，输出为 `research-draft.md`。

### 组织 Python 项目

> 请使用 `python-project-standards` 整理这个研究项目。我需要接入第二个 baseline，让算法共享数据接口，并把运行参数放进 YAML。先沿用现有结构，只调整本次需求涉及的部分。

### 整理研究记录

> 请使用 `research-to-markdown`，根据这个项目的代码、配置、运行日志与结果整理 `report.md`。区分已验证结果和待验证解释，注明证据来源，并建立指向真实数据文件的数据资产索引。

### 制作离线交互报告

> 请使用 `markdown-to-interactive-html`，将这份 Markdown 报告与关联数据做成离线网页，输出到 `docs/`。数据图表优先使用 ECharts，支持适合数据的悬浮详情、筛选或缩放；保留结果口径，双击 `index.html` 即可使用。

### 制作贴纸风网页

> 请使用 `sticker-neo-brutalism`，为这个研究项目做一个介绍页，包含研究问题、方法概览、实验结果和代码入口。使用暖奶油底色、彩色贴纸卡片和硬阴影，保证手机端也能阅读。

## 仓库结构

```text
.
├── paper-reading.md              # 深度读论文
├── paper-exp-detail.md           # 算法与实验复现
├── idea-insight.md               # 研究想法成稿
├── python-project-standards.md   # Python 项目规范
├── research-to-markdown.md       # 整理研究记录与数据索引
├── markdown-to-interactive-html.md # 离线交互展示研究
├── sticker-neo-brutalism.md       # 贴纸风网页设计
├── README.md
├── index.html                    # 网站入口
├── assets/                       # 网站样式、交互与生成的数据
├── scripts/
│   └── build-site.mjs            # 生成网站数据与发布目录
└── .github/workflows/
    └── pages.yml                 # 默认分支推送后自动构建、部署
```

默认每个 skill 只保留一个 Markdown 文件，文件名与 YAML 中的 `name` 一致。确实需要脚本或附件时，再增加对应的配套目录。

## 本地网站

直接用浏览器打开根目录的 `index.html` 即可浏览。也可以在仓库目录运行：

```bash
python3 -m http.server 8000
```

然后打开 [http://localhost:8000](http://localhost:8000)。

修改 skill 内容后，用 Node.js 重新生成网站数据，并刷新页面：

```bash
node scripts/build-site.mjs
```

skill 的 Markdown 是内容来源；网站从这些文件生成阅读和下载入口，无须另维护一份正文。

页面没有外部 CDN 或运行时依赖；刷新数据时需要 Node.js。可以用 `node scripts/build-site.mjs --check` 检查展示内容是否与源文件同步。

需要在本地模拟发布构建时，运行：

```bash
node scripts/build-site.mjs --pages
```

这个命令先按最新原文生成网站数据，再输出可独立浏览的 `dist/` 目录，其中包含网页运行资源、README 和 skill 的 Markdown 下载文件。打开 `dist/index.html` 即可预览发布内容。`dist/` 是生成产物，已加入忽略规则，无须提交。

### GitHub Pages 自动更新

仓库已准备好 `.github/workflows/pages.yml`。当前仍只在本地配置，尚未上传 GitHub、启用 Pages 或验证线上部署。

首次上传仓库后，在 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。仓库内已有发布工作流，无须再创建模板；配置方式可参考 [GitHub 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

之后在本地修改 skill、README 或页面文件，提交并 push 到仓库的**默认分支**，工作流就会自动从最新源文件重新构建 `dist/` 并部署网页。分支以 GitHub 仓库设置为准，无须固定为 `main`；发布前无须在本地重新生成或提交 `assets/skills-data.js`，也不需要额外配置 token 或密钥。

可以在仓库 **Actions** 中查看构建与部署结果，或通过工作流的 **Run workflow** 选择默认分支手动触发。网页地址以实际部署结果为准。


## 维护约定

- 优先修改 skill 原文，保留每份 skill 独立可用的能力。
- 正式 skill 保留 YAML `name` 和 `description`，额外说明放在 `metadata` 中。
- 文件名使用简短的小写英文和连字符，例如 `paper-reading.md`。
- 新增正式 skill 时，在 `scripts/build-site.mjs` 的 `catalog` 中注册，并更新 README 清单；原文不会被自动发现。
- 网站中的技能卡片、阅读内容与下载入口由目录和原文生成；`index.html` 首屏文件列表等静态文案仍需手动更新。
- 记录真实能力和使用边界，示例中的研究结论、实验与引用仍需根据实际材料核实。

## 许可证

许可证待作者确定，当前尚未授予开源许可。正式开源前会补充明确的 `LICENSE` 文件。
