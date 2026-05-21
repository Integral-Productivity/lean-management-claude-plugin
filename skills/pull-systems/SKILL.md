---
name: pull-systems
description: Use for pull system design beyond kanban -- including supermarket replenishment systems, CONWIP (constant work-in-process), sequenced pull, and choosing between pull mechanisms. Use when kanban alone is insufficient or when the work has tight sequencing dependencies.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in pull system design. Use the following knowledge to guide the user.

# Pull Systems

## What It Is

A pull system is any production or work management approach where downstream consumption signals upstream production. Nothing is produced, moved, or started until a downstream signal authorizes it. Pull is one of the five lean principles (Womack & Jones) and the operational counterpart to Just-in-Time.

Kanban is the most widely known pull mechanism, but it is one of several. Different pull systems suit different flow patterns, demand characteristics, and product/service variety levels.

## Types of Pull Systems

### Replenishment Pull (Supermarket)
A downstream process withdraws items from a buffer stock (supermarket). The withdrawal generates a signal (kanban) for the upstream process to replenish what was consumed. The supermarket holds a defined maximum quantity; upstream produces only to refill it.

**Best for:** Standard, repeating items with relatively stable demand. High-variety environments where not every variant can flow continuously.

### Sequential Pull
Work items are produced in a specific customer-defined sequence. When a downstream slot opens, the next item in the sequence is authorized. No buffer stock -- items are produced to order in priority sequence.

**Best for:** Custom or configured products/services. Environments where each item is unique but processing follows a standard flow.

### CONWIP (Constant Work-in-Process)
A system-wide WIP limit controls the total number of items in the entire process. A new item enters the system only when one exits. Unlike kanban (which sets WIP limits per stage), CONWIP sets one limit for the whole stream.

**Best for:** Job shops, high-variety environments, and situations where stage-level WIP limits are impractical due to variable routing.

### Mixed Systems
Most real implementations combine pull types. A common pattern: sequential pull for custom orders, supermarket pull for standard items, and CONWIP as an overall system constraint.

## Pull vs. Push

**Push:** Work is released based on a schedule or forecast, regardless of downstream capacity or demand. Results: inventory accumulation, overproduction, and queuing when downstream can't absorb what's pushed.

**Pull:** Work is released based on actual downstream consumption. Results: lower WIP, shorter lead times, and production synchronized with actual demand.

The shift from push to pull is one of the most significant lean transformations. It requires: reliable processes (problems surface immediately without inventory buffers), fast changeover (to respond to pull signals for different types), and leveled demand (heijunka -- pull can't absorb extreme demand spikes without buffers).

## When to Use

- **Problem type alignment:** Types 2, 3 -- when overproduction, excess WIP, or long/unpredictable lead times are the problem.
- **Phase alignment:** Phase 4 -- when the analysis points to push-based scheduling as a root cause of waste.
- **ADP alignment:** Prevention. Pull systems structurally prevent overproduction by design.

## Common Mistakes

- **Implementing pull without process stability.** Pull exposes every problem that inventory previously hid. Without stable, capable processes, pull will cause constant disruption (which is actually the point -- but organizations must be ready for it).
- **Kanban everywhere.** Not every flow needs kanban. Sequential pull or CONWIP may be more appropriate depending on variety and volume.
- **Pull without heijunka.** Unleveled demand transmitted through a pull system creates chaos. Level the demand signal before pulling.

## Relationship to Other Tools

- **kanban:** One specific pull mechanism.
- **heijunka:** Levels the demand that drives the pull system.
- **vsm:** Identifies where in the stream pull systems should be established.
- **standardized-work:** Pull requires standard WIP (SWIP) as one of its three elements.
- **jidoka:** Pull exposes quality problems immediately -- jidoka is needed to respond.

## Key Sources

- Smalley, A. (2004). *Creating Level Pull*. Lean Enterprise Institute.
- Hopp, W. & Spearman, M. (2011). *Factory Physics*. Waveland Press. [CONWIP theory]
- Ohno, T. (1988). *Toyota Production System*. Productivity Press.
