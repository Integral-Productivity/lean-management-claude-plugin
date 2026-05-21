---
name: lean-thinking
description: Expert guide for lean thinking across the full Toyota Production System lineage through Lean Management, Lean Startup, Lean UX, Lean Software Development, and Lean Enterprise. Use whenever the user asks about lean principles, waste elimination, value stream mapping, continuous improvement, kaizen, kanban, A3 problem solving, hoshin kanri, validated learning, MVP, flow optimization, pull systems, or structured problem-solving -- even without saying "lean." Also trigger on muda/mura/muri, gemba, jidoka, heijunka, andon, poka-yoke, PDCA/SDCA, leader standard work, visual management, daily accountability, TWI, job instruction, job methods, standardized work, lean management system, ADP, Smalley's Four Types, Toyota Kata, or Coaching Kata. Covers coaching clients through lean, applying lean to operations, and designing lean curriculum.
status: draft
version: 1.0.0
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

Based on the user's prompt, route to the appropriate individual skill from this plugin.

### Problem-first philosophy

When the user presents a problem, challenge, or improvement opportunity, ALWAYS start with the `lean-problem-solving` skill. Do not skip to a specific tool unless the user has already typed their problem and is explicitly requesting a named tool in the context of an established problem-solving process.

### Domain routing

| Signal in the prompt | Individual skill |
|---|---|
| User has a problem, challenge, improvement need | `lean-problem-solving` (start here) |
| Manufacturing, production systems, Toyota, Ohno, Shingo, historical foundations, jidoka, JIT, heijunka, poka-yoke | `tps-foundations` |
| Organizational alignment, strategy deployment, hoshin kanri, A3 thinking, daily management, leader standard work, gemba walks, catchball | `lean-management-system` |
| Product/market fit, hypothesis testing, validated learning, MVP, pivot, build-measure-learn, innovation accounting, lean canvas | `lean-startup` |
| UX research, design experiments, outcomes over outputs, collaborative design, hypothesis-driven design | `lean-ux` |
| Software delivery, technical practices, deployment, set-based design, last responsible moment, amplify learning | `lean-software-development` |
| Portfolio management, enterprise scale, multi-team coordination, investment horizons, mission command | `lean-enterprise` |

### Tool routing (activated from lean-problem-solving Phase 4, or by direct user request)

**Flow and pull:**
- Pull-based work management → `kanban`
- Pull systems beyond kanban (supermarket, CONWIP, sequenced) → `pull-systems`
- Workload leveling, variability reduction → `heijunka`

**Analysis and improvement:**
- Map and redesign end-to-end flow → `vsm`
- Structured problem-solving narrative → `a3`
- Improvement experiments → `pdca`
- Focused rapid improvement → `kaizen-events`
- Waste categorization → `waste-identification`
- Causal analysis → `root-cause-analysis` (shallow 5 Whys → `5-whys`)

**Quality and stability:**
- Quality at source, auto-stop on abnormality → `jidoka`
- Workspace organization → `5s`
- Defining and maintaining current best method → `standardized-work`

**People development (TWI):**
- Structured skill transfer → `job-instruction`
- Standardized work definition and improvement → `job-methods`
- Safe work practices → `job-safety`
- Working relationships, people problems → `job-relations`

**Lean Management System:**
- Structured daily management routines for managers → `leader-standard-work`
- Tiered huddles, status boards, escalation → `daily-accountability`
- Making work, status, and abnormalities visible → `visual-management`
- Observation practice → `gemba`

### Ambiguous routing

If the tradition is unclear, ask one clarifying question before routing. If unclear whether the user is presenting a problem or exploring concepts, ask: "Are you working through a specific problem right now, or exploring lean concepts more generally?"

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
