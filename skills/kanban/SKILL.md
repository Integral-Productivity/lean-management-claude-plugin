---
name: kanban
description: Use for pull-based work management using kanban -- including board design, WIP limits, flow metrics (lead time, cycle time, throughput, flow efficiency), making policies explicit, and feedback cadences. Applies to Type 2 and Type 3 problems. Use when the team is overloaded, work lacks visibility, or flow needs improvement without restructuring the process.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Kanban systems. Use the following knowledge to guide the user.

# Kanban

## What It Is

Kanban is a pull-based work management system that uses visual signals to control the flow of work through a process. Originating in Toyota's manufacturing (where physical cards signaled the need to produce or move parts), kanban has been widely adapted for knowledge work, software development, service delivery, and personal productivity.

The core mechanism is simple: work is visualized on a board, work-in-process (WIP) is explicitly limited, and new work is "pulled" into the system only when capacity is available. This simplicity is deceptive -- the discipline of limiting WIP and managing flow requires significant behavioral change from push-based habits.

## When to Use

- **Problem type alignment:** Types 2 and 3. Kanban reveals flow problems (Type 2 -- why is our lead time growing?) and enables target condition pursuit (Type 3 -- can we reduce lead time to X?).
- **Phase alignment:** Phase 4 (Countermeasure Selection) when the analysis points to flow, WIP, or visibility problems. Also a foundational practice for ongoing process management.
- **ADP alignment:** Detection (makes flow problems visible through WIP limits, aging, and blocked items) and Prevention (WIP limits prevent overloading the system).

Use Kanban when:
- Work flows through stages and throughput/lead time matter
- The team is overloaded -- too many things in progress, nothing finishing
- There is no visibility into what's being worked on, what's blocked, or what's queued
- You need to improve flow without changing the underlying process structure (kanban can be overlaid on existing processes)
- The work is variable in size and arrival pattern (kanban handles variability better than rigid scheduling)

## Core Practices

### 1. Visualize the Workflow

Map the stages work moves through, from request/intake to delivered/done. Each stage becomes a column on the board. Cards represent individual work items.

Design principles:
- Columns should reflect how work actually flows, not how it's supposed to flow. If there's an unofficial "waiting for approval" stage, make it a column.
- Include buffers and queues explicitly -- they're often where the most time is spent.
- Use swim lanes to separate work types, priority levels, or team members when the mix matters.

### 2. Limit Work in Process

Set explicit WIP limits for each column (or for the system as a whole). WIP limits are the mechanism that creates pull -- when a slot opens downstream, work is pulled from upstream. Without WIP limits, a kanban board is a task tracker, not a pull system.

How to set WIP limits:
- Start with the number of people who work in that stage. A reasonable starting point is (number of people) + 1 or (number of people) x 1.5.
- Too high: no constraint, no pull effect, no flow pressure.
- Too low: frequent starving of downstream stages, idle time. Surfaces problems aggressively (which is educational but can be demoralizing if done too fast).
- Adjust iteratively. The "right" WIP limit emerges from experience, not calculation.

**The most important thing about WIP limits is enforcing them.** When a column is at its limit, new work cannot enter. This creates productive discomfort -- it forces the question "why is this column full?" which reveals bottlenecks, blockers, and capacity mismatches.

### 3. Manage Flow

Measure and optimize flow using these metrics:
- **Lead time** -- Time from when a request enters the system to when it's delivered. This is what the customer experiences.
- **Cycle time** -- Time from when work actively begins to when it's delivered. The gap between lead time and cycle time is queue/wait time.
- **Throughput** -- Number of items completed per time period.
- **Flow efficiency** -- Active work time / total lead time. In most knowledge-work systems, flow efficiency is 5-15%, meaning items spend 85-95% of their time waiting.
- **Aging** -- How long items have been in their current stage. Items that age beyond the typical cycle time for that stage signal a problem.

### 4. Make Policies Explicit

Define and post the rules that govern the board:
- Entry criteria: What qualifies a work item to enter the system?
- Exit criteria per column: What must be true for an item to move to the next stage?
- WIP limit policies: What happens when a column is full? (Stop starting, help finish, escalate?)
- Priority/expedite policies: How are urgent items handled? (Expedite lanes with their own WIP limit)
- Blocked item protocol: What happens when an item is blocked? Who is responsible for unblocking?

### 5. Implement Feedback Loops

Regular cadences for inspecting and adapting:
- **Daily standup/kanban meeting** -- Focus on the board, not on people. "What's blocked? What needs attention? What can we pull?"
- **Replenishment meeting** -- Periodic review of incoming work: what enters the system next? Based on capacity (pull), not demand (push).
- **Delivery review** -- What did we deliver? What can we learn from the flow data?
- **Retrospective** -- How is the system working? What should we change about our policies, limits, or board design?

### 6. Improve Collaboratively, Evolve Experimentally

Kanban improvement is evolutionary, not revolutionary. Changes to WIP limits, policies, and board design are experiments -- propose a change, try it, measure the effect, keep or revert.

## Common Mistakes

- **No WIP limits.** A board without WIP limits is a visual task list, not a kanban system. The pull mechanism is the point.
- **Treating the board as a to-do list.** Kanban manages flow, not tasks. The focus is on finishing work, not on starting it.
- **Ignoring aging items.** Items sitting in a column for days without movement signal a blocked or neglected item. Without aging visibility, these items become invisible.
- **Unlimited expedite lane.** If everything is urgent, nothing is. An expedite lane without its own strict WIP limit (typically 1) undermines the entire system.
- **Optimizing for utilization instead of flow.** Keeping everyone busy (high utilization) actually damages flow because it eliminates slack, increases queue times, and amplifies variability. Kanban optimizes for throughput and lead time, which requires some slack.

## Relationship to Other Tools

- **pull-systems:** Kanban is one type of pull system. See `pull-systems` for broader pull concepts.
- **heijunka:** Leveling incoming work reduces variability, which improves kanban flow.
- **visual-management:** Kanban boards are the most common form of visual management for workflow.
- **standardized-work:** Kanban's standard WIP limits connect directly to the SWIP element of standardized work.
- **vsm:** VSM identifies where flow is broken; kanban manages and improves flow at the operational level.

## Key Sources

- Anderson, D. (2010). *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press.
- Ohno, T. (1988). *Toyota Production System*. Productivity Press. [Origin of kanban in manufacturing]
- Brechner, E. (2015). *Agile Project Management with Kanban*. Microsoft Press.
- Burrows, M. (2014). *Kanban from the Inside*. Blue Hole Press.
