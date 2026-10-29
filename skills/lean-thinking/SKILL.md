---
name: lean-thinking
description: Expert guide for lean thinking across the full Toyota Production System lineage through Lean Management, Lean Startup, Lean UX, Lean Software Development, and Lean Enterprise. Use whenever the user asks about lean principles, waste elimination, value stream mapping, continuous improvement, kaizen, kanban, A3 problem solving, hoshin kanri, validated learning, MVP, flow optimization, pull systems, or structured problem-solving -- even without saying "lean." Also trigger on muda/mura/muri, gemba, jidoka, heijunka, andon, poka-yoke, PDCA/SDCA, leader standard work, visual management, daily accountability, TWI, job instruction, job methods, standardized work, lean management system, ADP, Smalley's Four Types, Toyota Kata, or Coaching Kata. Routes each problem to the lean skill that fits its layer and problem type, and names a non-lean method (Six Sigma DMAIC, OKRs, agile retrospective, Theory of Constraints) when one fits better. Covers coaching clients through lean, applying lean to operations, and designing lean curriculum.
status: draft
version: 1.0.0
layer: core
---
# Lean Thinking

A practical and scholarly guide for understanding and applying lean thinking across its full lineage -- from the Toyota Production System through contemporary lean traditions in management, product innovation, UX, software development, and enterprise transformation.

## Shared Foundations

All lean traditions share a common philosophical core. Ground every response in these foundations before specializing into a particular tradition.

### The Five Principles (Womack & Jones, 1996)

1. **Value** -- Define value from the perspective of the end customer. Everything else is a candidate for elimination.
2. **Value Stream** -- Identify the entire sequence of activities required to deliver that value. Map it end-to-end, including information flows and decision points.
3. **Flow** -- Make value-creating steps occur in tight sequence with no waiting, batching, or rework loops. Eliminate interruptions to flow.
4. **Pull** -- Let downstream demand signal upstream production. Nothing is produced until it is needed.
5. **Perfection** -- Pursue continuous improvement (kaizen) relentlessly. Perfection is an asymptote, not a destination.

### The Three Categories of Waste

- **Muda** -- Non-value-adding activity. DOWNTIME mnemonic: Defects, Overproduction, Waiting, Non-utilized talent, Transport, Inventory, Motion, Extra-processing.
- **Mura** -- Unevenness, variability, inconsistency. Often the root cause of both muda and muri.
- **Muri** -- Overburden on people or equipment.

### Respect for People

Lean rests on two pillars: continuous improvement AND respect for people. Respect means developing people's capabilities, trusting frontline workers as the primary source of process knowledge, building psychological safety for surfacing problems, and challenging people to grow through progressively harder problem-solving.

### Systems Thinking

Optimizing a local step at the expense of end-to-end flow is anti-lean. Prefer system-level metrics (lead time, throughput, flow efficiency) over local metrics (utilization, individual output). Most performance problems are system problems, not people problems (Deming's 94/6 principle).

## Routing

This skill is the router of the plugin's shared core. It routes in three steps: an off-ramp for problems that a non-lean method fits better, then the layer the work acts on, then (for one problem) the problem type. Each skill declares its layer in the `layer:` field of its SKILL.md ([ADR-0004](../../docs/adr/0004-one-plugin-with-three-layers-and-a-shared-core.md)); the tables below follow those fields.

### Step 1: Off-ramp for non-lean methods

Lean is not the best fit for every problem. Before routing inside this plugin, check whether one of these methods fits the problem better. When one does, name the method, say in one sentence why it fits, and hand off: use a skill for that method if one is installed, or point to its standard reference. Do not coach the method here, and do not translate it into lean terms.

| Signal in the prompt | Method that fits better | Why |
|---|---|---|
| A defect rate or variation that needs statistical analysis (capability studies, designed experiments, control limits) | Six Sigma DMAIC | Its statistical toolkit is built to reduce variation; lean root cause analysis is not |
| Setting company or team goals and measurable key results, with no deployment through catchball | OKRs | It is a goal-setting system; hoshin kanri is the lean way only when the user wants catchball and an X-matrix |
| A team reflecting on its own last sprint or iteration | Agile retrospective | It is the team's own inspect-and-adapt ritual; a PDCA cycle is the lean route only when a specific problem comes out of it |
| Open discovery of user needs before any product hypothesis exists | Design thinking | It explores the problem space; lean startup and lean UX start once a hypothesis can be tested |
| A live outage of an IT service that must be restored now | ITIL incident management (or the team's incident process) | Restoring service comes first; bring the follow-up to Type 1 or Type 2 problem solving after |
| One bottleneck sets the throughput of the whole system | Theory of Constraints | Its five focusing steps target the constraint directly; return to lean for flow and waste elsewhere |

If the method is unclear, say which two methods are candidates and ask one question to choose. The operator decides; the router only suggests.

### Step 2: Layer — what does the work act on?

Ask what the work acts on, and at what rhythm. Route to the layer, then to the skill in that layer's table.

| The work acts on | Rhythm | Layer |
|---|---|---|
| One problem | One PDCA cycle, days to weeks | thinking |
| A recurring operation | Daily and weekly routines | management |
| The organization and its people's capability | Quarters | transformation |
| A whole domain framed in its own terms (startups, UX, software delivery, the enterprise) | Any | lens |
| Shared vocabulary, lineage, observation, or a file format | Any | core |

Layers stack: management surfaces problems for thinking (a red board item becomes an A3), and transformation grows the people who do both. When a request crosses layers, start in the layer of the immediate need and name the next one.

### Layer: thinking — solve one problem

Start with Step 3 to find the problem type, then route to the tool.

| Signal | Skill |
|---|---|
| A problem, challenge, or improvement need (start here) | `lean-problem-solving` |
| A structured problem-solving narrative on one page | `a3-coaching` |
| Run and track one A3 file from draft through reviews to close | `a3-facilitation` |
| A quick causal chain | `5-whys` |
| Deeper causal analysis (fishbone, fault tree) | `root-cause-analysis` |
| Improvement experiments | `pdca` |
| Map and redesign end-to-end flow | `vsm` |
| Find and categorize waste | `waste-identification` |

### Layer: management — run the routines that hold the gains

| Signal | Skill |
|---|---|
| The management system as a whole: strategy deployment, hoshin kanri, daily management | `lean-management-system` |
| Daily routines for leaders and managers | `leader-standard-work` |
| Tiered huddles, status boards, escalation | `daily-accountability` |
| Make work, status, and abnormalities visible | `visual-management` |
| Review one A3 file before a revision lands | `review-a3` |
| Pull-based work management, WIP limits | `kanban` |
| Pull systems beyond kanban (supermarket, CONWIP) | `pull-systems` |
| Level the workload | `heijunka` |
| Define and keep the current best method | `standardized-work` |
| Organize the workplace | `5s` |
| Quality at the source, stop on abnormality | `jidoka` |
| Teach a job (TWI Job Instruction) | `job-instruction` |
| Improve a job method (TWI Job Methods) | `job-methods` |
| Handle people problems (TWI Job Relations) | `job-relations` |
| Build safety into the work (TWI Job Safety) | `job-safety` |

### Layer: transformation — grow capability across the organization

| Signal | Skill |
|---|---|
| Focused rapid improvement events, kaizen blitzes | `kaizen-events` |

Coaching, hoshin planning, and Yokoten across teams belong to this layer as the plugin grows. Until a skill exists for them, say so and route to the nearest skill in the management layer.

### Layer: lens — lean read through one domain

Route to a lens when the problem is framed in that domain's terms. A lens covers all three layers for its domain; when the request narrows to one problem or one routine, route on to the layer's skill.

| Signal | Skill |
|---|---|
| Product/market fit, hypotheses, MVP, pivot, innovation accounting | `lean-startup` |
| UX research, design experiments, outcomes over outputs | `lean-ux` |
| Software delivery, technical practices, set-based design | `lean-software-development` |
| Portfolio, investment horizons, multi-team coordination | `lean-enterprise` |

### Layer: core — shared by every layer

| Signal | Skill |
|---|---|
| Go and see: observation at the place where work happens | `gemba` |
| Toyota origins, Ohno, Shingo, the lineage and its vocabulary | `tps-foundations` |
| The A3 file of record: location, header, IDs, check | `a3-reference` |

This skill (`lean-thinking`) is also core: the shared foundations above and this router.

### Step 3: Problem type (thinking layer)

`lean-problem-solving` owns Smalley's Four Types of Problems and their diagnosis. Hand the problem to it to diagnose the type, unless the user has named a tool inside a problem-solving process already under way. Typical routes after diagnosis:

- **Type 1, troubleshooting** (a standard broke): containment, then a shallow 5 Whys and a check at the gemba; return to the standard.
- **Type 2, gap from standard** (a persistent gap): the full A3 cycle, deep root cause analysis, PDCA.
- **Type 3, target condition** (a new level of performance): the Improvement Kata with PDCA experiments; value stream map future state.
- **Type 4, open-ended** (no standard yet): validated learning through the startup or UX lens, or the off-ramp in Step 1 when no hypothesis exists yet.

### Ambiguous routing

If the layer is unclear, ask one question: "Are you working on one problem, a routine your team runs, or how the organization builds this capability?" If unclear whether the user has a problem or is exploring concepts, ask: "Are you working through a specific problem right now, or exploring lean concepts more generally?"

## Audience Mode

- **Practitioner Mode** -- applying lean to your own work and operations. Be concrete; connect to the actual tools, cadences, and constraints in front of the user.
- **Coaching Mode** -- preparing to teach or coach lean with a client. Frame for client understanding; consider developmental readiness.
- **Curriculum Mode** -- generating learning-grade content. Structure as learning experiences; include reflection prompts and application exercises.

## Optional Pairings (if you have these from other plugins)

Lean thinking pairs naturally with several adjacent skill domains. If you have plugins providing these capabilities, route or compose with them:

- A **customer-journey / experience design** skill -- value stream mapping is the operational backbone of customer journey design.
- A **domain-driven design / event-storming** skill -- flow, bounded contexts, and pull-based architectures are lean applied to software.
- A **developmental / adult-development** skill (e.g., Cook-Greuter EDT, Wilber AQAL) -- different developmental stages engage with lean differently; integral frameworks help diagnose stalled implementations along interior (mindset) and exterior (practices) dimensions.
- A **curriculum / learning design** skill -- for building lean learning experiences.
- A **CRM / pipeline-operations** skill -- lean thinking applied to CRM pipeline operations.
- A **product-discovery / feature-validation** skill -- lean product discovery connected to feature validation.

## Scholarly Integrity

Only cite sources with high confidence. When a concept has been adapted across traditions (e.g., "MVP"), name the distinction explicitly. Distinguish Toyota's actual practices from Western interpretations. Lean has a history of oversimplification -- surface common misapplications when relevant ("lean = cut costs" is a distortion).

## Tone

Direct, practical, grounded. On first use, always provide the English meaning for Japanese terms (muda, gemba, kaizen, etc.). Treat lean with intellectual seriousness -- it is a coherent philosophy, not a grab-bag of efficiency tips.
