---
name: heijunka
description: Use for workload leveling and production smoothing -- heijunka (level loading) to reduce variability and overburden in both volume and mix. Applies to Type 2 and Type 3 problems where mura (unevenness) is a root cause. Also applies to knowledge-work scheduling and calendar load-leveling.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Heijunka (workload leveling). Use the following knowledge to guide the user.

# Heijunka (Production Leveling)

## What It Is

Heijunka is the practice of leveling the type and volume of work over a time period to reduce variability, smooth demand on people and systems, and create predictable flow. Rather than processing work in the order it arrives (which amplifies peaks and valleys), heijunka distributes work evenly to create a sustainable, consistent rhythm.

Heijunka addresses mura (unevenness) -- the category of waste that Ohno considered the root cause of both muda (waste from overproduction, inventory, etc.) and muri (overburden on people and equipment). An uneven workload means alternating between being overwhelmed and being idle -- both are wasteful, and the overburden phases degrade quality, safety, and morale.

## When to Use

- **Problem type alignment:** Types 2 and 3. Type 2: when an uneven workload is causing quality problems, burnout, missed deadlines, or inconsistent output. Type 3: when pursuing a target condition of more predictable delivery or sustainable pace.
- **Phase alignment:** Phase 4 (Countermeasure Selection) when analysis reveals variability/unevenness as a root cause or contributing factor.
- **ADP alignment:** Prevention. Leveling prevents the cascade of problems that arise from workload peaks.

Use Heijunka when:
- Workload swings dramatically between periods -- some days/weeks are overwhelming, others are slow
- Quality or error rates correlate with high-volume periods
- Upstream processes experience the bullwhip effect (small demand changes amplify into large production swings)
- People are burning out from surge periods even though average workload seems reasonable
- Lead times are unpredictable because queue times vary with demand fluctuations

## Two Dimensions of Leveling

### Volume Leveling

Distribute total work volume evenly across time periods rather than processing in bursts. Instead of completing 20 items on Monday and 5 on Tuesday, level to ~12-13 per day.

In manufacturing, this means producing the same total quantity each shift/day rather than responding to spiky orders. In knowledge work, this means controlling intake cadence -- accepting a consistent number of new items per period rather than accepting everything as it arrives.

### Mix Leveling

Distribute different work types evenly within each period rather than batching by type. Instead of "all Type A on Monday, all Type B on Tuesday," produce a mixed sequence: A-B-A-C-A-B throughout each day.

Mix leveling requires fast changeover between work types (connects to SMED in manufacturing, context-switching management in knowledge work). But it provides major benefits: shorter lead times for every type, reduced inventory/WIP, and more consistent resource utilization.

## How to Implement

### Step 1: Understand Demand

Analyze actual demand data over a meaningful period (weeks or months, not days). What is the average demand rate? What is the variability? Are there patterns (seasonal, weekly, cyclical)?

The goal is not to eliminate all variability in demand -- customers don't submit requests in smooth patterns. The goal is to absorb variability at the scheduling layer rather than transmitting it to the production/execution layer.

### Step 2: Calculate Capacity Rhythm

Determine the sustainable rate at which work can be processed. In manufacturing, this is takt time. In knowledge work, this might be "the team can complete 15 items per week sustainably" or "we can handle 3 new client engagements per month."

The capacity rhythm becomes the pacemaker -- work is released into the system at this rate regardless of demand fluctuation. When demand exceeds capacity, work queues rather than overloading the system. When demand is below capacity, the slack is used for improvement, training, or preparation.

### Step 3: Design the Leveled Schedule

Create a repeating pattern that distributes work types across the available capacity:

- Assign time blocks or slots to different work types based on their demand proportion
- Sequence work types to minimize changeover impact -- alternate between different types rather than batching
- Build in buffer/flex capacity (~10-15%) to handle legitimate variability without breaking the pattern

### Step 4: Control Intake

The leveled schedule only works if intake is controlled. This requires:
- A queue/backlog that buffers demand fluctuation
- A replenishment cadence -- work is pulled from the backlog into the leveled schedule at defined intervals (daily, weekly)
- Explicit policies for handling urgent/expedite requests without breaking the level pattern (an expedite lane with its own capacity allocation)

### Step 5: Monitor and Adjust

Track adherence to the leveled pattern and the effects on flow, quality, and people:
- Are we maintaining the rhythm, or frequently breaking it for "exceptions"?
- Has lead time become more predictable?
- Has the team's experience of workload improved?
- Adjust the pattern as demand shifts or capacity changes.

## Adaptation for Knowledge Work

- **Calendar leveling:** Using AI scheduling assistants or manual time-blocking to create a repeating weekly pattern -- dedicated blocks for different work types (client work, admin, improvement, deep work). This is personal heijunka.
- **Sprint/iteration cadence:** Fixed-length iterations (common in Agile) are a form of volume leveling -- a consistent amount of work is committed each iteration regardless of demand backlog size.
- **Intake discipline:** Establishing a replenishment cadence (weekly planning meeting, daily intake limit) rather than responding to every request as it arrives.
- **Batch size reduction:** Smaller work items are easier to level than large, variable-sized projects. If work items vary wildly in size, consider decomposing larger items to enable smoother flow.

## Common Mistakes

- **Leveling production without leveling intake.** Smoothing the execution layer while allowing unlimited, uncontrolled input creates a growing backlog and eventually breaks the level pattern.
- **Treating all exceptions as legitimate.** Every exception to the leveled pattern erodes the practice. Distinguish genuine emergencies from urgency inflation ("this customer is important"). Most "exceptions" are failures of planning, not genuine emergencies.
- **Ignoring changeover cost.** Mix leveling only works if switching between work types is fast. If context-switching is expensive, invest in reducing changeover time before attempting fine-grained mix leveling.
- **Leveling to averages without accounting for variability.** If average demand is 10/day but actual demand ranges from 3 to 20, leveling to 10 will fail half the time. Build buffer capacity or manage the variability source.

## Relationship to Other Tools

- **kanban:** Kanban manages flow; heijunka smooths the input to flow. Kanban without heijunka handles variable demand reactively; heijunka without kanban doesn't manage the flow through the system.
- **standardized-work:** Leveling enables standardized work by creating predictable, repeatable conditions.
- **pull-systems:** Heijunka is the foundation of pull -- it sets the rhythm at which pull signals should operate.
- **leader-standard-work:** A leader's standard work should include monitoring adherence to the leveled schedule.
- **visual-management:** The heijunka box or leveled schedule board is a visual management artifact.

## Key Sources

- Ohno, T. (1988). *Toyota Production System*. Productivity Press.
- Liker, J. (2004). *The Toyota Way*. McGraw-Hill. [Principle 4: Level Out the Workload]
- Smalley, A. (2004). *Creating Level Pull*. Lean Enterprise Institute.
- Dennis, P. (2015). *Lean Production Simplified*. Productivity Press.
