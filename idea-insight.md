---
name: idea-insight
metadata:
  source_skill: paper-reading
  version: "1.0"
  language: zh-CN
description: 将用户在读论文、做研究、和 AI 讨论后形成的零散想法、intuition、research question、方法设想或实验灵感，整理并扩展为一篇偏论文草稿的完整 Markdown 文档。当用户说“根据这个 idea 写论文草稿”“帮我把这个想法发展成 paper”“写一个 proposal/草稿/研究方案”“把这些 insight 整理成论文框架”“基于读完论文后的想法继续做研究”时，必须触发此 skill。输出不是头脑风暴列表，而是从问题定义、符号系统、创新点、理论与算法框架、实验设计、证明思路、可行性和风险判断出发，形成可继续推进为论文的深度草稿。
---

# Idea Insight Skill

## 读者与使用场景

这个 skill 面向已经读过一些论文、正在形成研究 idea、希望把想法推进成一篇 paper 草稿的用户。

用户通常不是要一个简单的 brainstorm，也不是要一页 proposal，而是希望 AI 帮他把以下材料整合成一个**可以继续写、继续证明、继续实验的研究草稿**：

- 读完论文后的想法、批注、疑问或改进方向；
- 和 AI 交流后生成的一些 research insight；
- 对已有方法的不足、理论 gap、实验现象或应用场景的观察；
- 一个尚未完全 formalized 的方法设想；
- 若干篇相关论文之间可能存在的连接；
- 一个想做成 workshop paper、conference paper、technical report 或 thesis chapter 的初步方向。

写作时默认读者有一定研究背景，不需要把基础概念讲成教材；但只要某个数学对象、符号、假设、算法模块、理论结论或实验设计对这个 idea 的成立很关键，就必须解释清楚它在这个草稿中的角色。

这个 skill 的目标不是替用户声称已经完成研究，而是把一个 idea **严肃地论文形态化**：哪些东西可以定义，哪些东西可以证明，哪些东西需要实验验证，哪些地方只是猜想，哪些地方风险很大，都要写清楚。

---

## 核心目标

最终输出应该是一篇**偏论文草稿的 Markdown 文档**，具有完整研究叙事，而不是 bullet list 的堆砌。

这篇草稿要尽量覆盖：

1. 研究问题是什么，能否被写成清晰的 mathematical formulation；
2. 为什么这个问题值得研究，现有方法具体卡在哪里；
3. 这个 idea 的核心 insight 是什么，创新点到底在哪里；
4. 符号系统、假设条件、目标函数、算法框架如何定义；
5. 理论上可能证明什么，证明路线是什么，关键 lemma 和技术难点在哪里；
6. 算法如何实现，输入输出、中间变量、复杂度和复现细节是什么；
7. 实验应该如何设计，baseline、dataset、metric、ablation 和 expected evidence 分别是什么；
8. 这个 idea 的可行性、风险、薄弱点和下一步推进路线是什么。

整篇文档要让读者感觉这是一个正在成型的 research paper draft，而不是“我有一个想法”的泛泛说明。

---

## 总体原则

### 1. 创造性要有边界

可以主动补全 formulation、提出可能的 theorem、设计实验和算法伪代码，但必须区分清楚：

- 用户已经明确提出的内容；
- 根据用户 idea 合理形式化得到的内容；
- AI 进一步提出的扩展设想；
- 仍然需要验证的 conjecture 或 speculation。

不要把没有证明的命题写成已经成立的 theorem；不要把没有跑过的实验写成实验结果；不要编造已有论文、引用、benchmark 数字或开源链接。

如果某个部分缺信息，可以基于合理假设继续写，但要显式标注“这里采用的工作假设是……”“这一节是建议性设计，不代表已有结果”。

### 2. 论文感优先于清单感

输出要像一篇论文草稿或深度研究备忘录，有连续的论证线：

- 从 problem gap 过渡到 idea；
- 从 idea 过渡到 formulation；
- 从 formulation 推出 objective / algorithm；
- 从 algorithm 过渡到 theory；
- 从 theory 和 claim 过渡到 experiment；
- 最后回到 feasibility 和 next steps。

可以使用表格或 bullet list，但不要让整篇变成 checklist。关键部分必须用连贯段落解释。

### 3. 数学透明

只要 idea 涉及数学建模、优化、概率、统计学习、因果、强化学习、生成模型、图模型、LLM、表示学习、理论 CS、信息论或数值算法，就必须尽量 formalize。

要求包括：

- 变量、样本、参数、超参数、隐变量、观测量、估计量要区分清楚；
- 每个核心符号第一次出现时要说明含义、空间、维度和索引范围；
- 目标函数、约束、loss、regularizer、estimator、transition、kernel、posterior、risk 等对象要解释每一项的作用；
- 如果给出 theorem candidate，要说明假设、结论、依赖量、证明路线和可能不成立的地方；
- 如果推导中使用 approximation、relaxation、surrogate objective 或 heuristic，要明确它牺牲了什么、换来了什么。

### 4. 不空喊创新

创新点必须具体，不允许只写“提出一种新框架”“提升效率和效果”“更鲁棒”。

每个 novelty claim 都要回答：

- 相比什么已有思路不同；
- 不同点发生在 problem setting、objective、algorithm、theory、data、evaluation 还是 application；
- 这个不同点为什么不是 trivial combination；
- 它预期解决哪个具体 failure mode；
- 需要什么证据才能支撑这个 claim。

### 5. 强调可推进性

最终草稿必须能指导下一步工作。读者看完后应该知道：

- 先证明哪个 lemma；
- 先实现哪个最小算法版本；
- 先跑哪个 toy experiment 或 sanity check；
- 哪些 baseline 必须比较；
- 哪些风险可能导致 idea 不成立；
- 如果想投稿，草稿还缺哪些实质材料。

---

## 工作流程

在正式写作前，先在内部完成以下判断，不要急着输出：

1. 用户的 idea 属于什么研究类型：新问题、新方法、新理论解释、新实验现象、新 benchmark、新系统、新应用，还是已有方向的改进；
2. 这个 idea 最自然的数学对象是什么：优化问题、估计问题、生成过程、学习目标、决策过程、图结构、因果图、信息瓶颈、泛化界、复杂度问题等；
3. 现有方法的失败点是否能被精确定义；
4. idea 的核心机制是否能写成公式或算法步骤；
5. 需要哪些假设才能让理论分析有可能成立；
6. 最小可行实验是什么，完整论文级实验又是什么；
7. 哪些 claim 已经有依据，哪些只是合理猜想；
8. 这个方向最大的不确定性在哪里。

如果用户给出的想法很零散，不要停留在“请补充更多信息”。应尽量基于已有信息整理出一个 plausible draft，并在文中用“待确认”“可选路线”“工作假设”标注不确定部分。

---

## 输出骨架

默认输出一个 Markdown 草稿文件，使用以下骨架。可以根据具体 idea 增删，但必须保持论文草稿的完整性。

```markdown
# [自拟的论文式标题]

> Working title: [英文论文标题]
>
> Core idea: [一句话说明这个 idea 想解决什么问题、用什么核心机制解决]
>
> Status: Draft / Research memo / Proposal / Paper skeleton

## 1. Problem and Motivation

## 2. Formal Setup and Notation

## 3. Core Insight and Novelty

## 4. Proposed Framework

## 5. Algorithmic Design

## 6. Theoretical Analysis Plan

## 7. Experimental Plan

## 8. Feasibility, Risks, and Failure Modes

## 9. Paper Draft Skeleton

## 10. Next Steps
```

如果用户明确要求中文草稿，标题和正文用中文，但保留必要英文术语。如果用户明确要求英文论文草稿，则整篇用英文。

---

## 各部分写作要求

## 1. Problem and Motivation

第一句话必须直接说明要研究的核心问题，不要从“近年来大模型发展迅速”“机器学习被广泛应用”这种泛泛背景开始。

这一节要写清楚：

- 研究对象是什么；
- 输入、输出、目标或评价标准是什么；
- 为什么现有方法在这个 setting 下不够好；
- 这个不足是 statistical、computational、optimization、modeling、alignment、robustness、scalability、interpretability、data efficiency 还是 evaluation gap；
- 用户的 idea 想抓住哪个关键结构或现象。

好的写法不是：

> 现有方法存在泛化能力不足的问题，因此本文提出一种新方法。

而是：

> 在存在 distribution shift 的序列决策任务中，标准 offline policy learning 通常最小化经验 Bellman error，但这个目标没有区分来自环境动力学变化的误差和来自行为策略覆盖不足的误差。因此当 support mismatch 出现在高价值状态附近时，模型会把不可识别区域的乐观估计误认为真实收益提升。本文的核心想法是把 Bellman error 分解为可识别项和不可识别项，并只在可识别区域内进行 policy improvement。

即使用户没有给出完整背景，也要尽量把问题写成可研究的形式。

---

## 2. Formal Setup and Notation

这一节是整篇草稿的地基。必须建立一个一致的符号系统。

写作要求：

- 尽量保持用户已有符号；如果用户没有符号，就自行定义一套简洁符号；
- 每个核心符号第一次出现时说明含义、空间、维度和索引范围；
- 明确哪些是观测数据，哪些是未知参数，哪些是模型输出，哪些是超参数；
- 对随机变量、样本、训练集、测试分布、环境、策略、模型、loss、risk、constraint 等对象要区分清楚；
- 如果问题涉及多个分布，例如 source / target、train / test、behavior / evaluation、clean / corrupted，要明确写出它们的关系；
- 如果存在 latent variable、graph、trajectory、prompt、token、embedding、reward、intervention 等对象，要说明它们在建模中的作用。

当 idea 尚不成熟时，可以写成“最小 formalization”：

```markdown
作为一个最小版本，可以先考虑如下 setting。给定训练样本 $\mathcal{D}=\{(x_i,y_i)\}_{i=1}^n$，其中 $x_i\in\mathcal{X}$，$y_i\in\mathcal{Y}$。我们希望学习一个模型 $f_\theta:\mathcal{X}\to\mathcal{Y}$。与标准经验风险最小化不同，这里额外假设每个样本还关联一个结构变量 $z_i\in\mathcal{Z}$，它刻画……
```

如果用户 idea 有多种 formalization 路线，可以给出 2 到 3 个 candidate formulations，并明确推荐哪一个最适合作为第一版论文。

---

## 3. Core Insight and Novelty

这一节要把 idea 的“研究味”写出来。

必须回答：

- 这个 idea 的一句话 insight 是什么；
- 为什么这个 insight 有可能成立；
- 它和已有方法的差异在哪里；
- 哪个差异是 paper 的主贡献；
- 哪些贡献只是辅助工程或实验设计；
- 需要什么理论或实验支撑这个 novelty。

推荐写成三层：

1. **Observation**：从论文阅读、实验现象或理论 gap 中观察到什么；
2. **Hypothesis**：基于 observation 提出什么机制性假设；
3. **Methodological consequence**：这个假设如何改变 objective、architecture、algorithm 或 analysis。

例如：

```markdown
核心观察是，现有方法把所有训练误差都压缩进同一个 scalar loss，但在这个问题中，误差至少来自两个来源：一部分是模型容量不足导致的 approximation error，另一部分是数据覆盖不足导致的 identification error。本文的假设是，只有前者适合通过更强模型或更多训练来降低，后者应该通过保守约束或不确定性建模来隔离。因此，方法上的直接后果是：目标函数不再单纯最小化经验损失，而是引入一个可估计的 coverage-aware penalty。
```

不要把 novelty 写成空泛列表。每个创新点都要和后面的公式、算法或实验对应起来。

---

## 4. Proposed Framework

这是草稿的核心部分，要把 idea 变成方法。

根据具体任务，可能包括：

- 模型结构；
- 目标函数；
- 约束条件；
- 估计量；
- 正则项；
- 训练过程；
- 推断过程；
- 数据生成或采样策略；
- 任务分解；
- 多阶段 pipeline；
- 理论抽象框架。

### 公式写作要求

每个核心公式都必须按照以下节奏写：

1. 说明这一步解决什么问题；
2. 给出公式；
3. 逐项解释符号和每一项的作用；
4. 说明该公式和前后模块的关系；
5. 解释直觉：某一项变大或变小时会发生什么；
6. 标注哪些部分是必须实现的，哪些是可选扩展。

公式格式要求：

- 行内公式用 `$...$`，独立公式用 `$$...$$`；
- 不管是行内公式还是独立公式，都写在一行中，不要换行；
- 符号体系严格，不要随意换符号、删粗体、删下标、改上下标；
- 如果原公式有 expectation、summation、integral、argmin、argmax、indicator、norm、trace、determinant、KL、entropy、score、kernel 等结构，要逐项解释。


例如：

```markdown
我们可以把第一版方法写成如下正则化经验风险最小化问题：

$$\hat{\theta}=\arg\min_{\theta\in\Theta}\frac{1}{n}\sum_{i=1}^n\left[\ell(f_\theta(x_i),y_i)+\lambda\,\Omega_\phi(x_i,z_i;\theta)\right].$$

这里第一项是标准预测损失，衡量模型 $f_\theta$ 在观测标签 $y_i$ 上的拟合程度；第二项 $\Omega_\phi$ 是 idea 的核心，它不是普通 weight decay，而是依赖结构变量 $z_i$ 的惩罚项，用来……超参数 $\lambda\ge 0$ 控制预测精度和结构约束之间的权衡。当 $\lambda=0$ 时，方法退化为普通 ERM；当 $\lambda$ 很大时，模型会优先满足……
```

公式必须服务于 idea，不能为了显得数学化而堆公式。

### 多版本方法

如果 idea 可以有简单版和复杂版，建议写成：

- **Minimal version**：最容易实现、最适合验证核心 insight 的版本；
- **Full version**：更接近论文贡献的完整方法；
- **Optional extension**：如果实验顺利，可以加入的增强模块。

这样可以让研究推进更可控。

---

## 5. Algorithmic Design

这一节要把 framework 变成可以实现的算法。

必须包括：

- 输入：数据、模型、超参数、初始化；
- 输出：训练后的模型、估计量、策略、表示或证书；
- 训练循环或优化步骤；
- 每一步对应的数学操作；
- 复杂度瓶颈；
- 实现时容易踩坑的地方。

如果用户没有提供算法，必须根据前面的公式整理一个可复现版本。伪代码可以使用 Markdown code block：

```text
Algorithm 1: [Proposed Method]
Input: dataset D, model f_theta, hyperparameters lambda, eta, number of steps T
Output: learned parameter theta

1. Initialize theta_0
2. for t = 0, ..., T-1 do
3.     Sample a mini-batch B_t from D
4.     Compute the prediction loss L_pred on B_t
5.     Compute the proposed regularizer / estimator / constraint term
6.     Form the total objective L = L_pred + lambda * L_reg
7.     Update theta_{t+1} using gradient descent or the chosen optimizer
8. end for
9. return theta_T
```

伪代码后必须解释：

- 第 4 步和第 5 步分别对应前文哪个公式；
- 哪个步骤是 idea 的核心区别；
- 是否需要 detach / stop-gradient / normalization / clipping / sampling correction；
- mini-batch 估计是否 unbiased；
- 计算复杂度相对 baseline 增加多少；
- 最小实现版可以省略哪些模块。

---

## 6. Theoretical Analysis Plan

这一节不是要求编造已经完成的证明，而是把 idea 转化成**可能写进论文 theory section 的分析路线**。

必须区分三种层次：

1. **可以较容易证明的 sanity theorem**：例如 objective 的退化情形、单调性、等价性、复杂度、某个 estimator 的无偏性；
2. **论文主理论结果的候选形式**：例如 consistency、generalization bound、regret bound、convergence rate、approximation gap、sample complexity；
3. **高风险 conjecture**：可能很有价值，但证明难度较高，未必能放进第一版论文。

每个 theorem candidate 要写清楚：

- theorem 想表达什么；
- 需要哪些 assumptions；
- 数学表述大概是什么；
- bound 或 rate 依赖哪些量；
- 证明路线是什么；
- 哪一步最难；
- 如果证明失败，可以退而求其次证明什么弱版本。

推荐格式：

```markdown
### Candidate Theorem 1: [性质名称]

**Claim.** Under Assumptions A1--A3, the proposed estimator $\hat{\theta}$ satisfies ...

**Why this theorem matters.** 这个结果对应方法中的……模块，它说明……

**Assumptions.**
A1. ...
A2. ...
A3. ...

**Proof roadmap.**
第一步先证明……；第二步利用……把误差分解为……；第三步通过……控制主误差项；最后得到……

**Potential weakness.** 最强的假设是……，它可能在真实实验中不完全成立。如果这个假设太强，可以先证明……
```

如果 idea 偏工程或系统，理论部分也不要完全空着。至少给出：

- 方法为什么可能比 baseline 更稳定；
- 哪些性质可以用 toy model 或 simplified setting 分析；
- 是否可以证明复杂度、误差传播、上界、下界或 failure condition。

---

## 7. Experimental Plan

实验部分要写成能真正指导跑实验的计划，而不是“在多个数据集上验证方法有效”。

必须包括：

- **Research questions**：实验要回答哪些具体问题；
- **Datasets / environments**：应该使用哪些数据集、任务或模拟环境，为什么；
- **Baselines**：每个 baseline 代表什么思路，为什么必须比较；
- **Metrics**：指标如何对应论文 claim；
- **Ablations**：要拆掉哪些模块来验证核心 insight；
- **Sanity checks**：最小 toy experiment 或 controlled experiment；
- **Implementation details**：学习率、batch size、训练步数、模型大小、随机种子、硬件、预处理等需要记录的内容；
- **Expected trends**：预期会看到什么趋势，但必须标注为 hypothesis，不可写成已经发生的结果；
- **Failure diagnostics**：如果结果不好，如何判断是 idea 错了、实现错了、超参数没调好，还是 dataset 不适合。

实验 claim 要和方法 claim 对齐。例如：

- 如果创新点是 robustness，就必须有 shift、noise、adversarial、OOD 或 stress test；
- 如果创新点是 efficiency，就必须报告 wall-clock、FLOPs、memory、sample efficiency 或 convergence speed；
- 如果创新点是 theory-inspired regularization，就必须做 regularizer ablation 和 sensitivity analysis；
- 如果创新点是 interpretability，就必须定义可解释性如何评估，而不是只展示 case study。

不要编造实验结果。如果需要写“预期结果”，必须写成：

> Hypothesis: 如果核心假设成立，我们预期在 coverage 较差的 setting 下，proposed method 相比 ERM 的提升更明显；在 coverage 充分的 setting 下，两者差距应该缩小。

---

## 8. Feasibility, Risks, and Failure Modes

这一节要有判断力，不能只写“该方法具有良好前景”。

必须分析：

- idea 的最强假设是什么；
- 这个假设在真实数据中是否可能不成立；
- 方法是否引入额外超参数，是否难调；
- 计算成本是否可接受；
- 是否有 trivial baseline 可能打败该方法；
- novelty 是否可能不够；
- 理论结果是否可能只能覆盖过度简化 setting；
- 实验是否可能只在 toy case 有效；
- 如果失败，最可能的失败模式是什么。

同时要给出缓解方案：

- 降低 claim；
- 换成更容易成立的 setting；
- 先做 toy proof；
- 先做 diagnostic experiment；
- 把主贡献从方法改成分析或 benchmark；
- 把完整方法拆成 minimal publishable unit。

---

## 9. Paper Draft Skeleton

这一节要把上面的研究内容整理成真实论文结构。默认给出一个可继续扩写的 paper skeleton。

推荐结构：

```markdown
# Title

## Abstract

## 1. Introduction

## 2. Related Work

## 3. Problem Setup

## 4. Method

## 5. Theoretical Analysis

## 6. Experiments

## 7. Limitations

## 8. Conclusion
```

每一节都要写具体内容，不要只写标题。尤其是：

### Abstract

必须写成接近论文摘要的形式，包括：

- 背景中的具体 gap；
- 本文提出什么；
- 方法核心；
- 理论或实验计划能支持什么；
- 贡献边界。

如果还没有实验结果，不能写“experiments show”。应写成 proposal / planned evaluation 的语气，或者使用“we design experiments to test”。

### Introduction

要写成论文 introduction 的雏形，包括：

- 第一段直接切入问题；
- 第二段指出现有方法具体 limitation；
- 第三段给出核心 insight；
- 第四段概述方法；
- 第五段列出 contributions。

Contributions 不能泛泛。每条 contribution 要能对应后文一个 section。

### Related Work

如果用户提供了相关论文，要基于它们写。如果没有提供，不要编造具体引用。可以写成“应覆盖的相关方向”：

- Direction A: 与问题 setting 相关；
- Direction B: 与方法技术相关；
- Direction C: 与理论工具相关；
- Direction D: 与实验 benchmark 相关。

可以说明每类 related work 需要比较什么，但不能虚构不存在的论文细节。

### Method / Theory / Experiments

这三节要和前面的 formal setup、framework、algorithm、theory plan、experimental plan 保持一致，不要换一套符号或重新发明方法。

---

## 10. Next Steps

最后必须给出一个具体推进路线，而不是“未来可以进一步研究”。

至少包括：

- 1 个最小可行理论任务；
- 1 个最小可行实现任务；
- 1 个最小可行实验；
- 1 个最关键的 baseline；
- 1 个最需要用户确认的问题；
- 1 个如果本周推进应该优先完成的 deliverable。

推荐写法：

```markdown
最建议的下一步不是直接写完整论文，而是先完成一个 minimal validation loop：

1. 在 simplified setting 下证明 regularizer 的基本性质；
2. 实现 minimal version，只保留核心惩罚项；
3. 在 toy dataset 上验证该惩罚项是否真的改变模型行为；
4. 与最强的简单 baseline 比较，而不是一开始堆复杂模型；
5. 根据 toy 结果决定主贡献应该放在 theory、method 还是 empirical phenomenon。
```

---

## 写作风格

最终文档应该像一篇认真写给自己的 research draft / paper memo，不像 AI 生成的模板。

遵守以下风格：

- 中文为主时，关键术语可以保留英文，例如 formulation、objective、regularizer、coverage、generalization bound；
- 少用空泛口号，多写具体机制；
- 少用 bullet list，除非确实在列举实验、贡献或步骤；
- 不要频繁使用“首先、其次、最后”的套路；
- 可以有研究判断，例如“这个假设比较强”“这个 novelty 可能需要通过 ablation 才能站住”“这个 theorem 更适合第一版”；
- 对不确定内容要坦诚，不要包装成定论；
- 数学讲解可以稍微口语化，但必须精确；
- 不要为了显得专业而堆术语；
- 不要把 user idea 改得面目全非，所有扩展都要围绕原始 insight 服务。

---

## 输出格式

### 当用户要求生成文件时

生成 `.md` 文件，默认命名为：

```text
research-draft.md
```

如果用户提供了项目名或论文主题，可以另外生成：

```text
[topic]-idea-draft.md
```

并提供下载链接或明确告知文件路径。

### 当用户要求直接输出 Markdown 时

把完整内容放在 fenced code block 中，起始行使用：

```text
```markdown
```

不要渲染 Markdown，保持原始代码，方便用户直接复制。

### 当用户只给出很短 idea 时

也要输出一个完整草稿，但在开头加上：

```markdown
> Note: 当前 idea 信息较少，下面草稿采用若干工作假设。所有标注为 “待确认” 的部分需要后续补充或验证。
```

不要因为信息不足只输出提纲。

---

## 严禁事项

- 不要编造已经存在的实验结果；
- 不要编造论文引用、作者、年份、benchmark 数字或 GitHub 链接；
- 不要把 conjecture 写成 theorem；
- 不要把 proposed experiment 写成 completed experiment；
- 不要只给 brainstorm 列表；
- 不要写成商业计划书或产品方案，除非用户明确要求；
- 不要为了“创新”强行添加和原 idea 无关的复杂模块；
- 不要改变用户原始研究方向，除非明确说明这是 alternative direction；
- 不要在没有定义符号的情况下直接堆公式；
- 不要只写 abstract/introduction，而忽略 theory、algorithm、experiment 和 feasibility。

---

## 输出前自查

输出前必须检查：

- 是否第一句话就说清楚了研究问题；
- 是否把 idea 变成了明确的 problem formulation；
- 是否定义了核心符号，并说明了空间、维度、索引和角色；
- 是否明确区分了用户已有想法、AI 扩展、工作假设和 conjecture；
- 是否写清楚了核心 insight 为什么可能成立；
- novelty 是否具体，是否能对应方法、理论或实验；
- 是否给出了目标函数、算法框架或可实现流程；
- 每个核心公式是否解释了每一项的作用；
- 是否给出了 theorem candidates、假设、结论和 proof roadmap；
- 是否没有把未证明内容写成已证明结论；
- 是否给出了具体实验设计，包括 dataset、baseline、metric、ablation、sanity check 和 failure diagnostics；
- 是否没有编造实验结果；
- 是否分析了可行性、风险和 failure modes；
- 是否提供了真实 paper skeleton，而不是只有提纲；
- 是否给出了下一步最小可行推进路线；
- 整篇是否像一个可继续推进的 research paper draft，而不是 AI brainstorm。
