---
name: job-safety
description: Use for building safe work practices into process design using the Training Within Industry (TWI) Job Safety (JS) approach -- systematic hazard identification and elimination before they cause incidents. Use when designing new processes, evaluating existing ones for safety, or when a safety concern has been surfaced.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Job Safety (TWI-JS). Use the following knowledge to guide the user.

# Job Safety (TWI)

## What It Is

Job Safety (JS) is the TWI program for identifying and eliminating workplace hazards before they cause injury or harm. While the original TWI program focused on physical safety in manufacturing, the principles apply to any form of harm prevention -- physical, psychological, informational, and systemic.

JS provides a structured method for identifying hazards, determining root causes, implementing countermeasures, and verifying effectiveness. It treats safety not as a separate discipline but as an integral part of how work is designed and performed.

## When to Use

- **Problem type alignment:** Types 1 and 2. Type 1: responding to a safety incident or near-miss. Type 2: addressing persistent safety gaps or hazard patterns.
- **Phase alignment:** Embedded throughout. Safety considerations should be present in every phase of problem-solving -- a countermeasure that introduces new hazards is not an improvement.
- **ADP alignment:** Prevention is the primary orientation. The hierarchy of controls (elimination -> substitution -> engineering controls -> administrative controls -> PPE) mirrors ADP, with prevention strongly preferred over detection or administration.

## The JS Method

### Step 1: Identify the Hazard

Survey the work environment and process for conditions that could cause harm:
- **Physical hazards:** Equipment, ergonomics, materials, environmental conditions.
- **Process hazards:** Steps where errors could cause harm to the worker, the customer, or the system.
- **Psychological hazards:** Chronic overburden (muri), unpredictable workloads (mura), psychological unsafety, isolation.
- **Information hazards:** Sensitive data exposure, privacy violations, security vulnerabilities in process design.

Sources of hazard information: incident reports, near-miss reports, worker observations, gemba walks, insurance claims, process failure modes, and -- critically -- asking the people who do the work what feels dangerous or stressful.

### Step 2: Determine the Root Cause

Use root cause analysis tools (5 Whys, fishbone) to understand WHY the hazard exists:
- Is it a design flaw in the process or workspace?
- Is it a missing or inadequate standard?
- Is it a training gap (connects to `job-instruction`)?
- Is it a cultural issue (people feel pressured to skip safety steps)?

### Step 3: Select and Implement Countermeasures

Apply the hierarchy of controls (strongest to weakest):

1. **Elimination** -- Remove the hazard entirely. Redesign the process so the dangerous step doesn't exist.
2. **Substitution** -- Replace the hazardous element with a less hazardous one.
3. **Engineering controls** -- Redesign equipment, workspace, or systems to prevent exposure to the hazard (guards, ventilation, poka-yoke, automated safety checks).
4. **Administrative controls** -- Procedures, training, signage, rotation, reduced exposure time.
5. **Personal protective equipment / safeguards** -- The last line of defense. Least reliable because it depends on individual compliance.

The hierarchy mirrors ADP: elimination and engineering controls are prevention; monitoring and alerts are detection; administrative controls are administration. Always seek the highest level feasible.

### Step 4: Verify and Sustain

- Confirm the countermeasure works: Has the hazard been eliminated or reduced?
- Monitor for new hazards introduced by the countermeasure.
- Update standardized work to incorporate safety changes.
- Train affected workers (`job-instruction`).
- Include safety checks in `leader-standard-work` and `daily-accountability`.

## Psychological Safety in Lean

In knowledge work and lean management, psychological safety is as critical as physical safety. A psychologically unsafe environment -- where people fear blame, punishment, or embarrassment for surfacing problems -- undermines every lean practice:

- **Andon won't be pulled** if pulling it invites blame.
- **Problems won't be surfaced** in daily huddles if surfacing problems leads to personal consequences.
- **Kaizen suggestions won't be offered** if they're dismissed or ridiculed.
- **Standards won't be challenged** if challenging the status quo is career-risky.

Job Safety's scope should explicitly include building and maintaining psychological safety through `job-relations` practices, leader behavior modeling, and organizational norms that reward problem-finding.

## Common Mistakes

- **Treating safety as separate from lean.** Safety is not an add-on -- it's embedded in respect for people. An improvement that makes work faster but less safe is not an improvement.
- **Defaulting to administrative controls.** Training people to be careful is the weakest countermeasure. Design the hazard out of existence first; use administrative controls only as a bridge.
- **Investigating incidents but not near-misses.** Near-misses are free information about system vulnerabilities. An organization that only investigates actual injuries is waiting for harm to occur before learning.
- **Ignoring psychological hazards.** Burnout, chronic stress, and psychological unsafety cause measurable harm -- to people and to organizational performance. They deserve the same structured attention as physical hazards.

## Relationship to Other Tools

- **standardized-work:** Safety requirements are embedded in standardized work -- they're not separate documents.
- **job-instruction:** Safety key points are taught as part of JI's Job Breakdown Sheet (the "Key Points" column).
- **job-relations:** Psychological safety is maintained through JR's foundations for good relations.
- **jidoka:** Safety-critical poka-yoke devices prevent hazardous errors.
- **5s:** An organized workplace is a safer workplace -- tripping hazards, misplaced tools, and cluttered work areas are safety issues.
- **leader-standard-work:** Safety observation and hazard checks are LSW activities.

## Key Sources

- TWI Institute. *Job Safety Training Manual*. War Manpower Commission, Bureau of Training.
- Graupp, P. & Wrona, R. (2006). *The TWI Workbook*. Productivity Press.
- Edmondson, A. (2019). *The Fearless Organization*. Wiley. [Psychological safety]
- Liker, J. & Hoseus, M. (2008). *Toyota Culture*. McGraw-Hill. [Safety as cultural value]
