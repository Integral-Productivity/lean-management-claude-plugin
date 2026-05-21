---
name: lean-software-development
description: Use for questions about applying lean to software delivery, technical practices, continuous deployment, set-based design, last responsible moment decision-making, amplifying learning in development, code-level flow, and the Poppendieck lean software principles.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Lean Software Development. Use the following knowledge to guide the user.

# Lean Software Development

## Scope

This reference covers lean thinking applied specifically to software development, as articulated primarily by Mary and Tom Poppendieck. It translates TPS principles into the software domain, addressing how code is designed, written, tested, and delivered.

## The Seven Principles (Poppendieck & Poppendieck)

### 1. Eliminate Waste

In software, the primary wastes are:
- **Partially done work** -- Code written but not integrated, tested, or deployed. The software equivalent of WIP inventory.
- **Extra features** -- Functionality built that users don't need or use. The most expensive form of software waste because every feature carries ongoing maintenance cost.
- **Relearning** -- Knowledge lost because it wasn't captured, or rediscovery of previously solved problems.
- **Handoffs** -- Each handoff (dev to QA, QA to ops, team to team) loses information and adds delay.
- **Task switching** -- Context switching between multiple projects degrades throughput by 20-40% per additional project.
- **Delays** -- Waiting for decisions, approvals, code reviews, environments, deployments.
- **Defects** -- Bugs that escape to later stages or production. The later a defect is found, the more expensive the fix.

### 2. Build Quality In

Quality is built in at the source (jidoka), not tested in after the fact. Software practices:
- **Test-Driven Development (TDD)** -- Write the test before the code. The test is the specification.
- **Continuous Integration** -- Integrate code frequently (multiple times per day). Each integration triggers automated tests. Failed tests stop the pipeline (andon).
- **Pair programming / code review** -- Real-time quality check at the point of creation. Source inspection (Shingo) applied to code.
- **Refactoring** -- Continuously improving code structure without changing behavior. Kaizen for codebases.

### 3. Create Knowledge (Amplify Learning)

Software development is a learning process, not a production process. Amplify learning through:
- Short feedback cycles (ship frequently, learn from production)
- Set-based design (explore multiple solutions, converge based on evidence)
- Knowledge-sharing practices (documentation, pair programming, tech talks)

### 4. Defer Commitment (Decide as Late as Possible)

Make irreversible decisions at the last responsible moment -- the point where not deciding would eliminate an option. This is not procrastination; it is preserving options while uncertainty is high and committing when enough information exists.

**Set-based design** is the primary mechanism: explore multiple solutions in parallel, eliminate weak options as data emerges, converge on the best option late. This is the opposite of point-based design (pick one approach early and iterate on it).

### 5. Deliver Fast

Speed is enabled by small batches, flow, and pull -- not by working harder. Reduce batch size (smaller user stories, smaller PRs, smaller deployments). Reduce WIP (fewer things in progress at once). Automate the deployment pipeline to reduce changeover time (SMED for software).

### 6. Respect People

The people doing the work make the technical decisions. Managers create the environment; developers choose the implementation. Respect includes: providing autonomy, building skills, protecting from unreasonable demands (muri), and trusting professional judgment.

### 7. Optimize the Whole

Optimize the entire value stream, not individual functions. A team that optimizes its own throughput at the expense of downstream integration or customer outcomes is locally optimizing. Metrics should measure end-to-end delivery (lead time from idea to production), not local activity (velocity, story points completed).

## DevOps and Continuous Delivery as Lean

DevOps and Continuous Delivery are lean principles applied to the software delivery pipeline:
- **Continuous Delivery** eliminates the batch-and-release pattern (overproduction, inventory).
- **Infrastructure as Code** is standardized work for environments.
- **Monitoring and alerting** is jidoka -- automated detection of production abnormalities.
- **Blameless post-mortems** embody respect for people -- focus on the system, not the individual.

## When This Tradition Applies

- **Problem type:** Types 2, 3 for delivery process improvement. Type 4 for new product development (combined with lean startup/UX).
- **Context signals:** Software delivery pipelines, development team practices, technical debt, deployment frequency, code quality, CI/CD, DevOps.

## Key Sources

- Poppendieck, M. & Poppendieck, T. (2003). *Lean Software Development: An Agile Toolkit*. Addison-Wesley.
- Poppendieck, M. & Poppendieck, T. (2006). *Implementing Lean Software Development*. Addison-Wesley.
- Humble, J. & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate*. IT Revolution Press.
- Kim, G., et al. (2016). *The DevOps Handbook*. IT Revolution Press.
