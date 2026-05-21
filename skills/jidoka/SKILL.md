---
name: jidoka
description: Use for questions about jidoka (autonomation -- automation with a human touch), building quality at the source, auto-stop on abnormality, andon systems, and separating human work from machine work. Applies to Type 2 and Type 3 problems focused on quality at the point of production.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Jidoka (autonomation and built-in quality). Use the following knowledge to guide the user.

# Jidoka (Autonomation)

## What It Is

Jidoka -- often translated as "autonomation" or "automation with a human touch" -- is one of the two pillars of the Toyota Production System (alongside Just-in-Time). Jidoka is the principle that processes should detect abnormalities and stop themselves, preventing defects from propagating downstream and freeing people from the role of monitoring machines or processes for errors.

The term originates from Sakichi Toyoda's invention of an automatic loom that stopped itself when a thread broke. This single innovation contained the entire philosophy: build the ability to detect problems into the process itself, stop immediately when a problem is detected, fix the immediate condition, and then investigate to prevent recurrence.

Jidoka is fundamentally about building quality at the source rather than inspecting for quality after the fact. It shifts the cost and effort of quality from detection and rework (downstream) to prevention and immediate response (at the point of origin).

## When to Use

- **Problem type alignment:** Types 2 and 3. Type 2: when defects, errors, or rework are persistent problems and the current process doesn't catch them at source. Type 3: when pursuing a target condition of significantly higher quality or reduced rework.
- **Phase alignment:** Phase 4 (Countermeasure Selection) when analysis reveals that problems are being created in one step and discovered in a later step, or that people are spending time monitoring for errors that could be detected automatically.
- **ADP alignment:** Jidoka IS the detection-to-prevention spectrum. At its most basic, jidoka detects abnormalities (detection). At its most mature, jidoka makes abnormalities impossible (prevention/poka-yoke).

## The Four Steps of Jidoka

### Step 1: Detect the Abnormality

Build the ability to recognize "not normal" into the process itself. Detection can be:
- **Automated:** Sensors, validation rules, automated tests, boundary checks, format verification.
- **Human-initiated:** A worker notices something wrong and signals it. This requires both the skill to recognize abnormalities (training -- see `job-instruction`) and the authority/safety to act on them (culture -- see `job-relations`).

Detection requires a clear definition of "normal" -- which is standardized work. Without a standard, there is no abnormality, only variation.

### Step 2: Stop the Process

When an abnormality is detected, stop. In manufacturing, this means stopping the production line (andon cord/button). In knowledge work, this means halting the workflow to address the issue rather than passing defective work downstream.

**The cultural requirement is paramount.** Organizations that punish line stops (explicitly or implicitly) will never achieve jidoka. Leaders must visibly support and even celebrate line stops -- they are investments in quality, not failures of production.

The andon system is the mechanism:
- Worker detects a problem -> pulls the andon cord / clicks the alert
- Visual/audible signal activates -> team leader responds
- If the problem can be resolved within takt time -> resolve and continue
- If not -> stop the line, escalate, and address

### Step 3: Fix the Immediate Problem

Restore the process to normal operating conditions. This is containment -- stopping the bleeding, not curing the disease. The goal is to get back to stable production while preventing the defect from reaching the customer.

### Step 4: Investigate and Install a Countermeasure

After the immediate fix:
- Investigate root cause (5 Whys, fishbone -- see `root-cause-analysis`)
- Develop a countermeasure that prevents recurrence
- Apply the ADP assessment: Can we prevent this from happening (poka-yoke, process redesign)? If not, can we detect it faster? If neither, can we improve the administrative controls?
- Update standardized work to reflect the countermeasure
- Share the learning with adjacent processes that might have the same vulnerability

## Poka-Yoke: Jidoka at the Micro Level

Poka-yoke (mistake-proofing) devices make it physically or logically impossible (or extremely difficult) to make a specific error.

**Prevention poka-yoke** -- Makes the error impossible:
- Physical: A fixture that only accepts correctly oriented parts. A USB-C connector that can't be inserted wrong.
- Digital: Form validation that rejects invalid input. Type systems that prevent category errors at compile time. API contracts that enforce required fields.
- Process: Sequencing that requires Step A completion before Step B can begin. Checklists with mandatory items.

**Detection poka-yoke** -- Makes the error immediately obvious:
- Physical: A gauge that shows red when a dimension is out of spec.
- Digital: Automated tests that run on every commit. Alert rules that fire on anomalous values. Reconciliation checks between systems.
- Process: Self-checks built into the work sequence. Successive checks where the next worker verifies the previous step.

The design principle: prefer prevention over detection.

## Adaptation for Knowledge Work

- **Automated testing** (software): Unit tests, integration tests, end-to-end tests are jidoka. They detect abnormalities (bugs) at the point of creation and stop the process (failing build, blocked merge).
- **CI/CD pipelines:** Continuous integration with automated quality gates is a jidoka system.
- **Form validation:** Input validation that prevents bad data from entering a system is poka-yoke.
- **Monitoring and alerting:** Production monitoring that detects anomalies and alerts or auto-scales is jidoka applied to system operations.
- **Definition of Done:** Explicit criteria that must be met before work is considered complete.

## Common Mistakes

- **Jidoka without andon.** Installing automated detection but no signaling mechanism. The system detects the problem but no one responds.
- **Andon without response.** Installing signals but not responding to them. If pulling the andon cord produces no help, people stop pulling it.
- **Detection without investigation (skipping Step 4).** Catching and fixing defects without investigating root cause. This is firefighting, not jidoka.
- **Over-relying on inspection.** End-of-line inspection is the weakest form of quality management. Jidoka moves quality checks to the earliest possible point.

## Relationship to Other Tools

- **standardized-work:** Jidoka requires a defined standard -- you can only detect "abnormal" if "normal" is defined.
- **visual-management:** Andon signals are a form of visual management.
- **root-cause-analysis:** Step 4 of jidoka uses root cause analysis tools.
- **job-instruction:** Workers need to be trained to recognize abnormalities.
- **a3:** Complex or recurring quality problems surfaced through jidoka may warrant A3 investigation.
- **5s:** An organized workplace supports jidoka -- abnormalities are easier to detect in an ordered environment.

## Key Sources

- Ohno, T. (1988). *Toyota Production System*. Productivity Press. [Jidoka as pillar]
- Shingo, S. (1986). *Zero Quality Control: Source Inspection and the Poka-Yoke System*. Productivity Press. [Definitive poka-yoke reference]
- Liker, J. (2004). *The Toyota Way*. McGraw-Hill. [Principle 5: Build a Culture of Stopping to Fix Problems]
- Baudin, M. (2007). *Working with Machines: The Nuts and Bolts of Lean Operations with Jidoka*. Productivity Press.
