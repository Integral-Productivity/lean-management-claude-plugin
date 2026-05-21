---
name: standardized-work
description: Use for defining, documenting, and maintaining the current best method for a process -- the foundation of continuous improvement. Covers takt time, work sequence, standard work-in-process (SWIP), and the difference between standardized work (operator-level) and work standards (engineering-level). Applies to Type 1, Type 2, and as output of Type 3 improvement.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Standardized Work. Use the following knowledge to guide the user.

# Standardized Work

## What It Is

Standardized work is the current best-known method for performing a task, documented in enough detail that any trained person can follow it and produce consistent results. It is the foundation of both stability (SDCA) and improvement (PDCA) -- without a defined standard, there is no baseline against which to measure improvement, and no way to distinguish a genuine problem from normal variation.

Standardized work is NOT bureaucratic rigidity, a permanent prescription, or a way to control workers. It is owned by the people who do the work, expected to change as improvements are discovered, and serves as the explicit agreement about "how we do this today" that makes abnormalities visible.

## Three Elements

In its classic manufacturing form, standardized work has three required elements:

1. **Takt time** -- The rate at which work must be completed to meet customer demand. Takt time sets the rhythm; every work cycle should align with it.
2. **Work sequence** -- The specific order of steps a worker follows within one takt cycle. Not the process sequence (which is the order materials flow through machines) but the human sequence of actions.
3. **Standard work-in-process (SWIP)** -- The minimum amount of in-process inventory required to maintain the work sequence without interruption. Neither more nor less.

### Adaptation for Knowledge Work

In service, software, and knowledge work, the three elements translate to:

1. **Cadence/rhythm** -- How frequently does this work need to be completed? What's the expected cycle time? Even when takt time doesn't strictly apply, establishing a regular cadence creates predictability.
2. **Method sequence** -- The defined steps, decision points, and handoff protocols for completing the work. In knowledge work, this often includes: which tools to use, what information to gather, what quality checks to perform, and where to hand off.
3. **Work-in-process limits** -- How many items or tasks should be in progress simultaneously. Directly connects to kanban WIP limits.

## When to Use

- **Problem type alignment:** Most relevant for Types 1 and 2 (restoring or closing a gap from standard). Also essential as the output of Type 3 (the new standard that results from reaching a target condition).
- **Phase alignment:** Standardized work appears in Phase 6 (Verification and Standardization) as the mechanism for locking in improvements, and in Phase 2 (Current Condition Grasp) as the baseline for understanding what's supposed to happen.

Use standardized work when:
- Multiple people perform the same work and consistency matters
- The current "standard" is implicit, oral, or variable between people -- formalizing it is itself an improvement
- An improvement has been made and needs to be sustained
- Training new people in a role or function (connects to `job-instruction`)
- Abnormalities need to be made visible -- without a standard, everything looks like a special case

## How to Create Standardized Work

1. **Observe the current method.** Go to gemba. Watch multiple people perform the same task. Note variations -- where different people do things differently, there is no real standard yet.
2. **Identify the current best method.** Among the variations observed, which produces the best quality, safety, and efficiency? This becomes the starting point, not an idealized version.
3. **Document the method.** Use the simplest format that communicates clearly:
   - **Standardized Work Chart** -- Shows the physical layout, worker movement, and work sequence on a diagram. Best for work with spatial elements.
   - **Standardized Work Combination Table** -- Shows the time breakdown of each step (manual time, auto/machine time, walk time) against takt time. Best for cycle-time analysis.
   - **Job Breakdown Sheet** -- Lists key steps, key points for each step (quality, safety, technique), and reasons for each key point. Best for training (connects directly to `job-instruction` TWI method).
4. **Validate with the people who do the work.** The standard must be agreed upon by those who will follow it. Imposed standards generate compliance, not commitment.
5. **Post visually at the point of use.** Standards that live in binders or shared drives are invisible. Post them where the work happens -- physical or digital.
6. **Establish the audit cadence.** How frequently will leaders observe the work against the standard? (Connects to `leader-standard-work`.)

## Key Principles

- **The people who do the work own the standard.** Managers and engineers can support, but frontline workers define and update the standard based on their direct experience.
- **The standard is the baseline for improvement, not the ceiling.** Every standard is expected to change -- the question is always "what's the next improvement?" This is the PDCA/SDCA cycle: stabilize at the current standard (SDCA), improve beyond it (PDCA), stabilize at the new standard (SDCA), repeat.
- **No standard = no improvement.** If the method varies every time, you cannot distinguish signal from noise, cannot measure improvement, and cannot sustain gains. Defining the standard is often the first and most important improvement.
- **Standards make abnormalities visible.** When everyone follows the same method, deviations stand out.

## Common Mistakes

- **Writing the standard and filing it away.** If it's not visible at the point of use and regularly audited, it doesn't exist.
- **Creating the standard without involving the workers.** Results in a document that describes how management thinks work should be done, not how it actually is done.
- **Treating the standard as permanent.** If your standardized work hasn't been updated in months, either the work hasn't improved (unlikely) or the standard has become decoration.
- **Over-documenting.** The standard should capture what matters for quality, safety, and consistency -- not every micro-motion. If following the standard requires more effort than doing the work, it's too detailed.

## Relationship to Other Tools

- **job-methods:** The structured process for improving standardized work. Job Methods asks "can we eliminate, combine, rearrange, or simplify steps in the current standard?"
- **job-instruction:** Uses the standardized work (specifically the Job Breakdown Sheet) as the basis for training new workers.
- **pdca:** Standardized work is both the input to and output of every improvement cycle.
- **leader-standard-work:** Leaders audit adherence to standardized work as part of their daily routine.
- **visual-management:** Standards are posted visually; visual controls make deviation from standard obvious.
- **kanban:** WIP limits in a kanban system are a form of standard work-in-process.

## Key Sources

- Ohno, T. (1988). *Toyota Production System*. Productivity Press. [Chapter on standardized work as foundation]
- Liker, J. & Meier, D. (2006). *The Toyota Way Fieldbook*. McGraw-Hill. [Detailed standardized work documentation methods]
- Dennis, P. (2015). *Lean Production Simplified*. Productivity Press. [Practical standardized work chapter]
- TWI Institute. *Job Methods Training Manual*. [Original TWI approach to work method improvement]
