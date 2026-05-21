---
name: waste-identification
description: Use when systematically identifying, categorizing, or eliminating waste (muda, mura, muri) in a process. Applies to all four of Smalley's problem types. Use the DOWNTIME mnemonic (Defects, Overproduction, Waiting, Non-utilized talent, Transport, Inventory, Motion, Extra-processing) and the three-M framework.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in waste identification and elimination. Use the following knowledge to guide the user.

# Waste Identification

## What It Is

Waste identification is the systematic practice of observing a process and categorizing the non-value-adding activities within it. It is a diagnostic skill, not a tool -- the ability to see waste is fundamental to all lean improvement. Without it, improvement efforts address the wrong things.

Lean distinguishes three categories of waste (the 3Ms): muda (non-value-adding activity), mura (unevenness/variability), and muri (overburden). Most waste identification focuses on muda, but mura and muri are often the root causes that generate muda.

## The Three Categories

### Muda (Non-Value-Adding Activity)

The eight wastes, using the DOWNTIME mnemonic:
- **D**efects -- Work that must be corrected, reworked, scrapped, or replaced.
- **O**verproduction -- Producing more than needed, faster than needed, or before needed. The worst waste -- generates all other wastes.
- **W**aiting -- Idle time. People waiting for information, materials, approvals, decisions, or each other.
- **N**on-utilized talent -- Failing to use people's skills, ideas, creativity, and knowledge. The "eighth waste," not in Ohno's original seven but critical in knowledge work.
- **T**ransport -- Unnecessary movement of materials, products, or information between locations or systems.
- **I**nventory -- Raw materials, work-in-process, or finished goods beyond what's needed for pull signals. In knowledge work: backlog items, unread emails, open browser tabs, unprocessed requests.
- **M**otion -- Unnecessary movement of people -- reaching, searching, clicking, switching contexts.
- **E**xtra-processing -- Work beyond what the customer requires or values. Over-engineering, unnecessary approvals, formatting that no one uses.

**Type 1 vs. Type 2 muda:** Type 1 muda is non-value-adding but currently necessary (regulatory compliance, certain handoffs, some inspection). Type 2 muda is pure waste that can be eliminated immediately. Target Type 2 first.

### Mura (Unevenness)

Variability in demand, workload, process output, or quality. Mura causes reactive behavior -- sometimes overwhelmed, sometimes idle. It generates both muda (overproduction as buffer against variability) and muri (overburden during peak periods).

Identifying mura: Look for uneven workloads across days/weeks, batch-and-burst patterns, feast-or-famine dynamics, inconsistent quality, and unpredictable lead times. Heijunka is the primary countermeasure.

### Muri (Overburden)

Unreasonable demands on people or systems that exceed capacity and degrade performance. Signs of muri: chronic overtime, rushed work, shortcuts taken to meet deadlines, physical strain, cognitive overload, burnout, rising error rates during high-demand periods.

Muri is often invisible because organizations normalize it. "Everyone works 60 hours" is muri. "We always rush at end of quarter" is muri caused by mura.

## How to Practice

### The Waste Walk

A structured gemba observation focused specifically on identifying waste:

1. **Choose a specific process** to observe. Define the boundaries.
2. **Observe without intervening.** Watch full cycles of the process.
3. **Categorize each activity** as value-adding (transforms the product/service in a way the customer values and would pay for), necessary non-value-adding (required but not valued -- compliance, handoffs), or waste (not required, not valued).
4. **Document using the DOWNTIME categories.** For each waste instance, note what it is, how often it occurs, and what impact it has.
5. **Look for mura and muri**, not just muda. Observe workload patterns, pace, and stress indicators.
6. **Quantify where possible.** How much time is spent waiting? How much rework occurs? How much WIP accumulates?

### The Customer Value Test

For any activity, ask three questions:
1. Does the customer care about this? Would they pay for it?
2. Does this activity physically or informationally transform the product/service?
3. Is it done right the first time?

If all three are yes -> value-adding. If any is no -> waste or necessary non-value-adding.

## Adaptation for Knowledge Work

Knowledge work waste is often invisible because the "materials" (information, decisions, code, documents) are intangible. Key translations:

- **Overproduction:** Reports no one reads, features no one uses, emails that didn't need sending, meetings that didn't need to happen.
- **Waiting:** Waiting for approvals, reviews, decisions, information, access, builds, deployments.
- **Transport:** Data re-entry between systems, copying information from one format to another, forwarding emails to the right person.
- **Motion:** Context-switching, tool-switching, searching for information, navigating complex file structures.
- **Inventory:** Unprocessed backlogs, WIP beyond capacity, started-but-not-finished work.

## Common Mistakes

- **Focusing only on muda.** Eliminating muda without addressing the mura and muri that cause it produces temporary results that regress.
- **Calling everything waste.** Not all non-value-adding activity is eliminable. Regulatory compliance, safety checks, and some coordination are necessary. Distinguish Type 1 (reduce) from Type 2 (eliminate).
- **Waste identification without action.** Identifying waste is diagnostic; the problem-solving framework provides the path to countermeasures.
- **Identifying waste in someone else's process without involving them.** Waste identification done TO people rather than WITH people generates defensiveness.

## Relationship to Other Tools

- **vsm:** Value stream mapping is waste identification applied to the end-to-end flow.
- **job-methods:** ECRS analysis at the individual step level is focused waste elimination.
- **gemba:** Waste identification happens at gemba through direct observation.
- **a3 / lean-problem-solving:** Waste identification feeds Phase 2 (Current Condition) and Phase 3 (Analysis).

## Key Sources

- Ohno, T. (1988). *Toyota Production System*. Productivity Press. [Seven wastes]
- Womack, J. & Jones, D. (1996). *Lean Thinking*. Simon & Schuster.
- Bicheno, J. & Holweg, M. (2016). *The Lean Toolbox*. PICSIE Books.
