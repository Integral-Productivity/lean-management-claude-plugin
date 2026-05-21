---
name: tps-foundations
description: Use for questions about manufacturing, production systems, Toyota origins, Ohno, Shingo, historical lean foundations, jidoka, just-in-time (JIT), heijunka, poka-yoke, and the Toyota Production System. Also use when tracing the historical lineage of lean concepts or distinguishing Toyota's actual practices from Western interpretations.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in the Toyota Production System and its historical foundations. Use the following knowledge to guide the user.

# Toyota Production System Foundations

## Table of Contents

1. Historical Context
2. The Two Pillars: Just-in-Time and Jidoka
3. Taiichi Ohno's Contributions
4. Shigeo Shingo's Contributions
5. Supporting Concepts
6. The Toyota Way Philosophy
7. Common Misunderstandings
8. Key Sources

---

## 1. Historical Context

The Toyota Production System (TPS) emerged from specific constraints. Post-WWII Japan had limited capital, small domestic markets, and needed to produce multiple vehicle types in low volumes -- the opposite of Ford's high-volume, single-model mass production. TPS was not invented in a single moment; it evolved over roughly three decades (1945-1975) through relentless experimentation on the shop floor.

Kiichiro Toyoda (Toyota's founder) introduced the concept of just-in-time as early as 1937, but Taiichi Ohno -- a production engineer who became an executive -- is credited with developing TPS into a coherent system. Ohno drew inspiration from multiple sources: American supermarkets (the pull/replenishment model that inspired kanban), Ford's flow principles (while rejecting Ford's batch-and-queue implementation), and Sakichi Toyoda's original invention of the automatic loom with stop-on-defect capability (the seed of jidoka).

The system remained largely internal to Toyota until the 1973 oil crisis, when Toyota's resilience during the downturn attracted outside attention. Western awareness grew through the MIT International Motor Vehicle Program, culminating in Womack, Jones, and Roos's *The Machine That Changed the World* (1990), which coined the term "lean production."

Understanding this origin matters because TPS was designed for a specific context -- constrained resources, demand for variety, and a culture that valued long-term thinking and employee development. Transplanting TPS tools without understanding these conditions is a common failure mode.

## 2. The Two Pillars: Just-in-Time and Jidoka

TPS is often represented as a house (the "TPS House" diagram). The two structural pillars are:

### Just-in-Time (JIT)

Produce only what is needed, only when it is needed, only in the amount needed. JIT is a pull-based production philosophy with three operational elements:

- **Takt time** -- The rate at which products must be completed to meet customer demand. Calculated as available production time divided by customer demand. Takt time synchronizes the pace of production to the pace of consumption.
- **Continuous flow** -- Process items one at a time (one-piece flow) through sequential operations without interruption, waiting, or batching. Where true one-piece flow is impossible, use the smallest practical batch size.
- **Pull system (kanban)** -- Downstream processes signal upstream processes to produce. Nothing is produced without a pull signal. Kanban cards (or their digital equivalents) are the physical mechanism; the principle is that consumption authorizes production.

JIT exposes problems by removing the inventory buffer that hides them. Reducing inventory in a system with underlying process problems will cause disruptions -- this is intentional. The disruptions reveal where improvement is needed.

### Jidoka (Autonomation)

Jidoka translates roughly as "automation with a human touch" -- machines and processes that detect abnormalities and stop themselves, freeing workers from monitoring tasks and preventing defects from propagating downstream.

Jidoka has four steps:
1. **Detect** the abnormality (automated or human detection)
2. **Stop** the process (machine auto-stop or worker-initiated stop via andon cord/button)
3. **Fix** the immediate problem (restore normal conditions)
4. **Investigate** the root cause and install a countermeasure (prevent recurrence)

The cultural requirement for jidoka is that stopping production to address a quality problem must be treated as a positive act, not a failure. Organizations that punish line stops will never achieve jidoka. This connects directly to the respect-for-people pillar: workers must have both the authority and the psychological safety to stop the line.

### The Foundation: Heijunka (Production Leveling)

The floor of the TPS house -- beneath both pillars -- is heijunka: leveling the type and quantity of production over a fixed period. Rather than producing in large batches of one type, then switching to another, heijunka sequences production in a mixed pattern that smooths demand on upstream processes and suppliers.

Heijunka addresses mura (unevenness). Without leveling, demand fluctuations cascade upstream as amplified variability (the bullwhip effect), generating both muda (waste from overproduction and inventory) and muri (overburden from surge demand).

## 3. Taiichi Ohno's Contributions

Ohno (1912-1990) is considered the primary architect of TPS. His key contributions:

### The Seven Wastes (Muda)

Ohno identified seven categories of non-value-adding activity. The original seven, in Ohno's ordering:

1. **Overproduction** -- Producing more than needed, faster than needed, or before needed. Ohno considered this the worst waste because it generates all other wastes (excess inventory requires transport, storage, handling, and hides defects).
2. **Waiting** -- Idle time when materials, information, people, or equipment are not ready.
3. **Transport** -- Unnecessary movement of materials or products between process steps.
4. **Overprocessing** -- Performing work beyond what the customer requires, or using more precise/expensive methods than necessary.
5. **Inventory** -- Raw materials, work-in-process, or finished goods beyond what is needed for immediate pull signals. Inventory is a symptom of underlying process problems.
6. **Motion** -- Unnecessary movement of people (reaching, walking, searching) that does not add value.
7. **Defects** -- Producing items that require rework, repair, scrap, or replacement.

The eighth waste -- **non-utilized talent/knowledge** -- was added later by Western lean practitioners and is not part of Ohno's original framework, though it is consistent with the respect-for-people pillar.

### Genchi Genbutsu ("Go and See")

Ohno insisted that understanding comes from direct observation at the actual place (gemba) where work happens, looking at actual things (genbutsu). Management by report, dashboard, or secondhand information is insufficient. Genchi genbutsu is not just "management by walking around" -- it requires disciplined observation with specific intent, standing in the "Ohno circle" (drawing a circle on the floor and observing a process for extended periods to truly understand its dynamics).

### The Kanban System

Ohno developed kanban as the signaling mechanism for pull production, inspired by the supermarket replenishment model. A kanban (literally "signboard") authorizes production or movement of a specific quantity of a specific part. The number of kanbans in a system directly controls work-in-process inventory -- reducing kanbans exposes problems, increasing them buffers them.

## 4. Shigeo Shingo's Contributions

Shingo (1909-1990) was an industrial engineer who consulted extensively with Toyota. While Ohno focused on the production system as a whole, Shingo contributed critical techniques:

### SMED (Single-Minute Exchange of Die)

A methodology for reducing changeover time -- the time required to switch a process from producing one product to another. "Single-minute" means single-digit minutes (under 10 minutes), not literally one minute.

SMED works by:
1. Separating internal setup (must be done while machine is stopped) from external setup (can be done while machine is running)
2. Converting internal setup to external setup wherever possible
3. Streamlining all remaining setup operations

SMED enables small-batch and mixed-model production -- without fast changeovers, heijunka is economically impractical. It directly attacks the batch-size-as-economic-necessity assumption of mass production.

### Poka-Yoke (Mistake-Proofing)

Designing processes and devices so that errors are either impossible to make (prevention) or immediately obvious when made (detection). Examples range from physical devices (a fixture that only accepts correctly oriented parts) to process design (checklists, color-coding, sequence constraints).

Poka-yoke embodies the jidoka principle at the micro level: build quality in at the source rather than inspecting for defects after the fact.

### Source Inspection

Shingo distinguished between three types of inspection:
- **Judgment inspection** -- Sorting good from bad after production (traditional quality control). Does not prevent defects.
- **Informative inspection** -- Statistical process control, successive checks. Reduces defects but does not eliminate them.
- **Source inspection** -- Checking conditions at the point where errors originate, before they become defects. Combined with poka-yoke, source inspection can achieve zero defects.

## 5. Supporting Concepts

### Kaizen (Continuous Improvement)

Kaizen literally means "change for the better." In TPS, it refers to both a philosophy (relentless pursuit of improvement) and a structured practice (kaizen events, suggestion systems, daily improvement routines).

Two forms are commonly distinguished:
- **Process kaizen** -- Small, incremental improvements by frontline workers within their own work area. High frequency, low risk, cumulative impact.
- **System/flow kaizen** -- Larger improvements to the value stream, typically involving management and cross-functional teams. Lower frequency, higher impact per event, requires more coordination.

Kaizen is not the same as innovation (kaikaku -- radical change). Both are needed, but kaizen provides the steady baseline of improvement that sustains and extends the gains from breakthrough changes.

### Andon (Visual Management Signal)

A visual and/or audible signal system that communicates status. In manufacturing, an andon board displays line status (green/yellow/red) and an andon cord allows any worker to signal a problem and, if needed, stop the line.

Andon is the practical mechanism that makes jidoka work on the human side. Its effectiveness depends entirely on how leadership responds when the signal is pulled -- if problems are met with support and curiosity, andon is used freely; if met with blame, it goes silent.

### Standardized Work

The current best-known method for performing a task, documented and followed by all operators. Standardized work has three elements: takt time, work sequence, and standard work-in-process.

Standardized work is not bureaucratic rigidity -- it is the baseline from which kaizen operates. Without a standard, there is no reference point for improvement. The standard is expected to change as improvements are discovered. Workers who do the work own and update the standard.

## 6. The Toyota Way Philosophy

Liker (2004) codified Toyota's management philosophy as fourteen principles organized in four categories:

1. **Philosophy** -- Base decisions on long-term philosophy, even at the expense of short-term financial goals.
2. **Process** -- Create continuous flow, use pull systems, level workload, build a culture of stopping to fix problems, standardize tasks for continuous improvement, use visual control, use only reliable and tested technology.
3. **People and Partners** -- Grow leaders who live the philosophy, develop exceptional people and teams, respect your extended network of partners and suppliers.
4. **Problem Solving** -- Go and see for yourself, make decisions slowly by consensus and implement rapidly, become a learning organization through reflection and continuous improvement.

Rother's *Toyota Kata* (2009) offered an important corrective to the "tool-centric" reading of Liker by arguing that Toyota's real competitive advantage is not the tools but the improvement and coaching routines (kata) that develop people's scientific thinking capability. The Improvement Kata and Coaching Kata describe a practice pattern -- set a challenge, grasp the current condition, establish a target condition, experiment toward it -- that is domain-independent.

## 7. Common Misunderstandings

- **"Lean means cut costs / reduce headcount."** TPS was designed to develop people and improve capability, not to eliminate jobs. Ohno explicitly stated that the purpose of eliminating waste was to redeploy people to value-adding work, not to reduce workforce. Cost reduction is a consequence of waste elimination, not its purpose.
- **"Lean means zero inventory."** JIT targets the minimum inventory required for smooth flow, not zero. Some inventory (safety stock, buffer stock) is appropriate when process capability does not yet support one-piece flow.
- **"Lean is a set of tools."** The tools (kanban, 5S, VSM) are artifacts of a thinking system. Adopting tools without the underlying philosophy of continuous improvement and respect for people produces "fake lean" -- surface compliance without capability development. Rother (2009) calls this "the tools trap."
- **"Lean only works in manufacturing."** The principles (value, flow, pull, perfection, respect) are domain-independent. The specific tools require adaptation. The post-manufacturing lean traditions covered in other skills demonstrate this adaptability.

## 8. Key Sources

- Ohno, T. (1988). *Toyota Production System: Beyond Large-Scale Production*. Productivity Press.
- Shingo, S. (1985). *A Revolution in Manufacturing: The SMED System*. Productivity Press.
- Womack, J., Jones, D., & Roos, D. (1990). *The Machine That Changed the World*. Free Press.
- Womack, J. & Jones, D. (1996). *Lean Thinking: Banish Waste and Create Wealth in Your Corporation*. Simon & Schuster.
- Liker, J. (2004). *The Toyota Way: 14 Management Principles from the World's Greatest Manufacturer*. McGraw-Hill.
- Rother, M. (2009). *Toyota Kata: Managing People for Improvement, Adaptiveness, and Superior Results*. McGraw-Hill.
- Liker, J. & Meier, D. (2006). *The Toyota Way Fieldbook*. McGraw-Hill.
- Shingo, S. (1986). *Zero Quality Control: Source Inspection and the Poka-Yoke System*. Productivity Press.
