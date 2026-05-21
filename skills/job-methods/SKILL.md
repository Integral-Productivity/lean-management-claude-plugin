---
name: job-methods
description: Use for improving work methods using the Training Within Industry (TWI) Job Methods (JM) approach -- systematically questioning every detail of a job to eliminate unnecessary operations, combine steps, rearrange sequence, and simplify what remains. Applies to Type 2 and Type 3 problems at the task/job level.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Job Methods (TWI-JM). Use the following knowledge to guide the user.

# Job Methods (TWI)

## What It Is

Job Methods (JM) is one of the four Training Within Industry programs, originally developed during WWII and foundational to the Toyota Production System. JM provides a structured approach for analyzing existing work methods and developing improved methods -- it is the lean analog for how standardized work gets improved.

Where standardized work documents the current best method, Job Methods is the discipline for questioning that method and making it better. The JM process systematically examines every detail of a job and asks whether each step can be eliminated, combined, rearranged, or simplified (ECRS).

## When to Use

- **Problem type alignment:** Type 2 (gap from standard where the method itself may be the issue) and Type 3 (pursuing a target condition that requires a better method).
- **Phase alignment:** Phase 3 (Analysis -- is the current method contributing to the problem?) and Phase 4 (Countermeasure Selection -- redesigning the method as a countermeasure).
- **ADP alignment:** Prevention-oriented. Redesigning the method to eliminate the problem at its source rather than administering around it.

Use Job Methods when:
- The current standardized work is being followed, but results are still inadequate
- A process has accumulated steps over time without systematic review
- Waste has been identified in a value stream or process map, and the question is "how do we redesign this step?"
- Someone says "we've always done it this way" -- JM provides the structured challenge to that assumption

## The JM Four-Step Method

### Step 1: Break Down the Job

List every detail of the current method exactly as it is performed today. Each detail should be small enough to question individually but large enough to be a distinct action. For each detail, note:
- What materials are used?
- What tools or equipment are involved?
- What knowledge or skill is required?

This is observation-based -- go to gemba and watch the work being done, don't rely on memory or documentation alone. The written standard and the actual practice often differ.

### Step 2: Question Every Detail

For each detail from Step 1, ask the "5W1H" questions:
- **Why** is this detail necessary? (If no good answer, it's a candidate for elimination.)
- **What** is its purpose?
- **Where** should it be done? (Could it be done at a different point in the sequence?)
- **When** should it be done? (Is the timing optimal?)
- **Who** is best qualified to do it? (Is the right person doing it?)
- **How** is it being done? (Is there a better way?)

The questioning must be genuine, not perfunctory. The most powerful question is the first one: "Why is this necessary?" Many steps survive in processes purely through inertia.

### Step 3: Develop the New Method

Apply the ECRS framework to each detail:

1. **Eliminate** -- Can the detail be removed entirely without affecting quality, safety, or output? Elimination is always the strongest improvement. Every step you don't do is a step that can't go wrong.
2. **Combine** -- Can two or more details be performed together, reducing transitions, handoffs, or setup?
3. **Rearrange** -- Would a different sequence reduce waste (waiting, transport, motion)? Sometimes reordering steps eliminates dependencies or enables parallel work.
4. **Simplify** -- Can the detail be made easier, faster, less error-prone, or less physically demanding? This includes jigs, fixtures, templates, automation, and poka-yoke.

ECRS is a priority sequence -- always try to eliminate before combining, combine before rearranging, rearrange before simplifying. Lower-priority improvements applied to steps that could have been eliminated are waste.

Write up the proposed new method in the same detail format as Step 1.

### Step 4: Apply the New Method

- Present the new method to your supervisor / team / stakeholders. Explain what changed and why using the analysis from Steps 2 and 3.
- Get agreement. JM explicitly requires buy-in -- imposed methods don't sustain.
- Implement immediately (or as quickly as feasible). JM is biased toward rapid implementation, not extended planning.
- Document as the new standardized work.
- Monitor results. Has the improvement delivered the expected benefit? If not, return to Step 2.
- Credit the people who contributed ideas. Recognition sustains the improvement culture.

## Key Principles

- **Every job can be improved.** This is a philosophical stance, not an empirical claim. JM treats the current method as provisional -- the best known today, subject to improvement tomorrow.
- **Question the work, not the worker.** JM analyzes the method, not the person performing it. "Why is this step done this way?" is a method question. "Why did you do it wrong?" is blame.
- **Small improvements compound.** JM typically produces incremental improvements -- eliminating a step here, simplifying a motion there. Individually modest, cumulatively significant.
- **The people doing the work are the best source of improvement ideas.** JM is designed to be used BY workers on THEIR OWN jobs, not by industrial engineers imposing improvements from outside.

## Adaptation for Knowledge Work

In knowledge work, "details" translate to:
- Steps in a digital workflow (clicks, data entry, lookups, approvals)
- Communication steps (emails, messages, meetings, reviews)
- Decision points and their information requirements
- Tool switches and context shifts
- Handoffs between people or systems

The ECRS framework applies directly:
- **Eliminate:** Is this approval step actually necessary? Does anyone read this report? Is this meeting contributing to the outcome?
- **Combine:** Can these two data entry steps be merged into one form? Can this review happen during the existing sync instead of a separate meeting?
- **Rearrange:** Would gathering all required information before starting (rather than discovering needs mid-process) reduce rework?
- **Simplify:** Can a template, automation, or integration reduce the effort of this step?

## Common Mistakes

- **Skipping Step 2 (questioning).** Jumping straight from breakdown to "here's my idea" is solution-jumping with a JM veneer. The questioning step is where the insight lives.
- **Questioning only the obvious steps.** The steps that seem "obviously necessary" are often the ones most worth questioning. They persist because no one challenges them.
- **Improving a step that should be eliminated.** Simplifying or automating a step that adds no value is polishing waste. Always ask "eliminate?" first.
- **Not involving the people who do the work.** JM done TO workers rather than BY or WITH workers produces resentment and poor adoption.

## Relationship to Other Tools

- **standardized-work:** JM's input is the current standardized work; its output is improved standardized work. They form a PDCA pair: standardized work = SDCA (stabilize), JM = PDCA (improve).
- **waste-identification:** JM's questioning step is a focused form of waste identification applied to a specific job.
- **kaizen-events:** JM can be used within a kaizen event as the structured method for improving specific work steps.
- **vsm:** VSM identifies where in the stream waste exists; JM zooms in to improve the method at that specific step.

## Key Sources

- TWI Institute. *Job Methods Training Manual*. War Manpower Commission, Bureau of Training. [Original 1943 program materials]
- Dinero, D. (2005). *Training Within Industry: The Foundation of Lean*. Productivity Press.
- Graupp, P. & Wrona, R. (2006). *The TWI Workbook: Essential Skills for Supervisors*. Productivity Press.
- Liker, J. & Meier, D. (2007). *Toyota Talent*. McGraw-Hill. [TWI integration with Toyota's people development]
