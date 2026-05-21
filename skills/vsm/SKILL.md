---
name: vsm
description: Use for value stream mapping -- mapping and redesigning end-to-end flow across a process or value stream. Applies to Type 2 and Type 3 problems. Use when the user needs to understand the current state of a process end-to-end, identify flow improvements, or design a future state.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Value Stream Mapping (VSM). Use the following knowledge to guide the user.

# Value Stream Mapping (VSM)

## What It Is

Value stream mapping is a visual analysis tool that documents the entire end-to-end flow of materials, information, and activities required to deliver a product or service. It distinguishes value-adding steps from waste, quantifies the time spent in each state, and provides the basis for designing an improved future state.

A value stream map is not a process map. Process maps document how steps are performed; value stream maps document how value flows (or doesn't) through the system, including the queues, delays, information loops, and decision points that process maps typically omit.

## When to Use

- **Problem type alignment:** Types 2 and 3. Type 2: identifying where waste accumulates in a known value stream. Type 3: designing a future state that achieves a new level of performance.
- **Phase alignment:** Phase 2 (Current Condition Grasp -- mapping what actually happens) and Phase 4 (Countermeasure Selection -- designing the future state).
- **ADP alignment:** Detection (current state map reveals waste) and Prevention (future state redesign eliminates waste at source).

## How to Do It

### Current State Map

1. **Select a product/service family** and define start/end boundaries. Map one value stream at a time.
2. **Start with the customer.** Document customer demand: volume, frequency, variety, quality expectations.
3. **Walk the process in reverse** (from customer back to trigger). At each step, record:
   - Process time (PT) -- time actually spent working
   - Lead time (LT) -- total elapsed time including waiting
   - Changeover time -- time to switch between work types
   - Uptime/availability
   - Quality rate (% right first time / %C&A)
   - Batch size
   - Number of operators/people
4. **Document inventory/queues** between steps -- the triangles on a VSM. In knowledge work, this is items sitting in inboxes, backlogs, or approval queues.
5. **Map information flows** -- how do steps know what to work on? Push (schedule) or pull (signal)?
6. **Draw the timeline** at the bottom: process time bars (value-adding) below, lead time bars (total elapsed) above. Sum both.
7. **Calculate flow efficiency:** Total PT / Total LT. This single number reveals how much time is spent working vs. waiting.

### Future State Map

1. **Apply lean principles** to redesign the stream:
   - Can steps be combined or performed in flow (eliminating queues)?
   - Where can pull systems replace push scheduling?
   - Can batch sizes be reduced?
   - Where is heijunka needed to level demand?
   - Which steps need quality improvement (jidoka, poka-yoke)?
   - Where can supermarket pull systems decouple the stream?
2. **Set a pacemaker process** -- the single point in the stream that receives the production schedule. Everything downstream flows; everything upstream is pulled.
3. **Design implementation plan** -- break the gap between current and future state into focused improvement loops (typically kaizen events or A3s).

### Key Metrics

- **Lead time:** Total time from request to delivery.
- **Process time:** Time actually working on the item.
- **Flow efficiency:** PT / LT (typically 5-15% in knowledge work).
- **%C&A (Percent Complete and Accurate):** How often downstream receives usable work without rework. Measures handoff quality.

## Adaptation for Knowledge Work

In knowledge work, the "inventory" between steps is invisible -- items in email, Slack, approval queues, backlogs. Making this invisible WIP visible is the primary insight. Focus on information flow (how do people know what to work on?), decision points (who approves, how long does it take?), and rework loops (how often does work bounce back?).

## Common Mistakes

- **Mapping the ideal process instead of the actual process.** VSM must reflect reality -- go to gemba and observe.
- **Mapping too broadly.** A value stream map of "everything we do" is useless. Pick a specific product/service family.
- **Stopping at the current state.** A current state map without a future state design and implementation plan is analysis without action.
- **Ignoring information flows.** In many value streams, information flow problems (unclear signals, missing data, approval delays) cause more waste than material/work flow problems.

## Relationship to Other Tools

- **kanban:** VSM identifies where pull systems should be established; kanban implements them.
- **kaizen-events:** VSM future state implementation is typically broken into focused kaizen events.
- **a3:** A3 can be used to structure the improvement of specific VSM segments.
- **heijunka:** VSM reveals where leveling is needed to smooth flow.

## Key Sources

- Rother, M. & Shook, J. (1999). *Learning to See*. Lean Enterprise Institute. [The definitive VSM workbook]
- Keyte, B. & Locher, D. (2004). *The Complete Lean Enterprise: Value Stream Mapping for Administrative and Office Processes*. Productivity Press.
- Martin, K. & Osterling, M. (2014). *Value Stream Mapping*. McGraw-Hill.
