---
name: visual-management
description: Use for making work, status, and abnormalities visible through visual controls, andon systems, obeya rooms, production boards, and other visual management mechanisms. Applies to all problem types. Use when it is difficult to tell normal from abnormal at a glance, or when problems go undetected until they are large.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Visual Management. Use the following knowledge to guide the user.

# Visual Management

## What It Is

Visual management is the practice of making work status, process performance, standards, and abnormalities immediately visible to everyone in the work environment -- without requiring reports, queries, or someone to explain what's happening. The goal is a workplace where anyone can walk in, look around, and understand the current condition in 30 seconds.

Visual management serves lean's core principle: abnormalities must be visible to be addressed. If you can't see a problem, you can't fix it. If status requires a meeting to understand, the management system is carrying unnecessary waste.

## When to Use

- **Problem type alignment:** All types. Visual management is not a problem-solving tool -- it is the infrastructure that makes problem-solving possible by making the current condition transparent.
- **Phase alignment:** Foundational across all phases. Especially critical in Phase 2 (Current Condition Grasp -- can everyone see what's happening?) and Phase 6 (Verification -- are visual controls in place to sustain the improvement and make regression visible?).
- **ADP alignment:** Detection. Visual management is fundamentally a detection mechanism -- it makes deviations from standard immediately obvious so response can be rapid.

Use Visual Management when:
- The current state of work is invisible -- people must ask, search, or attend meetings to learn status
- Problems go unnoticed until they become crises
- Standards exist but deviations aren't caught
- Improvements have been made but there's no mechanism to detect regression
- New team members can't orient themselves without extensive explanation

## Levels of Visual Management

Visual management operates on a maturity spectrum from passive display to active control:

### Level 1: Visual Display (Share Information)

The simplest form -- making information visible that was previously hidden. Examples: posting team metrics on a board, displaying a process map on the wall, showing a project timeline, making WIP visible on a kanban board.

Visual display answers: "What is happening?"

### Level 2: Visual Standard (Define Normal)

Making the expected condition visible so that deviations are obvious by comparison. Examples: floor markings that show where materials belong, color-coded labels that indicate correct placement, target lines on performance charts, WIP limit indicators on kanban columns, "min/max" markers on supply bins.

Visual standards answer: "What should be happening?"

### Level 3: Visual Control (Prevent Deviation)

Physical or system design that makes it difficult or impossible to deviate from the standard. Examples: fixtures that only accept correctly oriented parts (poka-yoke), form validation that prevents incorrect data entry, architectural constraints in software that enforce patterns, physical barriers that prevent wrong routing.

Visual controls answer: "Can the wrong thing happen?"

### Level 4: Visual Guarantee (Make Deviation Impossible)

The highest level -- design that makes the correct action the only possible action. Examples: USB-C connectors that only fit one way, one-way valves, process gates that prevent advancement without required inputs.

Visual guarantees answer: "Has the wrong thing been designed out entirely?"

Progression from Level 1 to Level 4 mirrors the ADP hierarchy: display (administration) -> standard (detection) -> control (prevention) -> guarantee (prevention at source).

## Core Elements of a Visual Workplace

### Performance Boards

Display key metrics at the point of use, updated at a frequency that enables action. Design principles:
- Show trend (are we improving or declining?), not just current state
- Include target alongside actual -- the gap is what matters
- Use red/green or equivalent to signal normal vs. abnormal immediately
- Update frequency matches the cadence at which action can be taken -- daily metrics updated monthly are useless
- Owned by the team, not by management. The team updates their own board.

### Status Indicators

Make the current state of each work item, machine, or process step visible:
- **Kanban boards** -- Most common visual status tool in knowledge work. Columns = stages, cards = work items, WIP limits = capacity constraints.
- **Andon signals** -- Red/yellow/green indicators showing whether a process is running normally, experiencing a problem, or stopped. In digital contexts: dashboards, alerting systems, CI/CD pipeline status.
- **Shadow boards** -- Outlines showing where tools/materials belong, making absence visible instantly. In digital contexts: required fields, template structures, configuration checklists.

### Standard Posting

Post standardized work, operating procedures, quality checks, and safety protocols at the point of use. Not in a binder, not in a wiki that requires three clicks -- at the physical or digital location where the work happens.

### Problem Tracking

Make problems and improvement actions visible:
- Problem/countermeasure boards showing open issues, assigned owners, and status
- A3 documents posted publicly (demonstrates that problem-solving is valued, not hidden)
- Escalation boards showing problems that have been raised to the next level

## Design Principles

- **5-second rule:** Any visual should communicate its message in roughly 5 seconds. If it requires study or explanation, redesign it.
- **Abnormality focus:** The primary purpose is not to show that everything is fine -- it's to make problems instantly visible. Design for the red signal, not the green one.
- **Updated by the people closest to the work.** If a separate person must update the visual, it introduces delay and disconnects the data from reality.
- **Physical > digital, when possible.** Physical boards in shared spaces create ambient awareness. Digital dashboards require intentional access. Use digital when distributed teams require it, but understand the tradeoff.
- **Less is more.** A cluttered visual space communicates nothing. Show only what drives action. If a metric isn't connected to a response protocol (who does what when it turns red?), it shouldn't be displayed.

## Adaptation for Knowledge Work

Knowledge work's primary visibility challenge is that work-in-process is invisible -- it lives in email, documents, code branches, and people's heads. Visual management in knowledge work means:

- **Making WIP visible:** Kanban boards, project tracking tools, shared task lists. The goal is not tracking for reporting -- it's making the volume and flow of work visible to the team.
- **Making status visible:** CI/CD dashboards, support queue metrics, pipeline stage indicators. Real-time or near-real-time, not weekly roll-ups.
- **Making blockers visible:** Blocked items flagged visually on the board. Aging indicators (how long has this item been stuck?). Escalation protocols triggered by visual signals.
- **Making standards visible:** Definition of done, acceptance criteria, code review checklists, onboarding procedures -- posted where the work happens (in the repo, in the tool, at the start of the workflow), not in a separate documentation system.

## Common Mistakes

- **All green, all the time.** If the board never shows red, either the targets are too easy, the data isn't honest, or the system isn't detecting real problems. All-green is a signal that the visual management system is broken.
- **Displaying metrics without response protocols.** A metric turns red. Then what? If there's no defined response, the visual is decoration. Every displayed metric needs a "who does what when this is abnormal" protocol.
- **Information overload.** Walls of charts, dashboards with 40 widgets, boards with 200 cards -- these communicate nothing because the signal is lost in noise.
- **Management-owned visuals.** When management creates and owns the visuals, the team experiences them as surveillance. When the team creates and owns them, they become tools for self-management.
- **Digital-only for co-located teams.** A physical board that everyone walks past is more effective than a digital dashboard that must be intentionally opened. Use digital tools for distributed teams; use physical boards when the team is co-located.

## Relationship to Other Tools

- **kanban:** Kanban boards are the most common form of visual management for workflow.
- **5s:** 5S creates the ordered environment that makes visual management possible. You can't have visual standards if the workplace is chaotic.
- **leader-standard-work:** LSW depends on visual management -- leaders audit visual boards, not spreadsheets.
- **jidoka:** Andon signals are a form of visual management for process status.
- **standardized-work:** Standards posted at point of use are visual management artifacts.
- **daily-accountability:** Daily huddles typically use the performance board as the focal artifact.

## Key Sources

- Galsworth, G. (2005). *Visual Workplace, Visual Thinking*. Visual-Lean Enterprise Press.
- Mann, D. (2014). *Creating a Lean Culture*. Productivity Press. [Visual management as lean management system infrastructure]
- Dennis, P. (2015). *Lean Production Simplified*. Productivity Press.
- Liker, J. (2004). *The Toyota Way*. McGraw-Hill. [Visual control as Toyota Way principle]
