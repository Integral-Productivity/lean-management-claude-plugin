---
name: a3
description: Use for structured problem-solving using the A3 format -- a one-page narrative that walks through background, current condition, problem analysis, target condition, countermeasures, implementation plan, and follow-up. Primarily for Type 2 (gap from standard) problems. Also the foundational tool of the A3 management process.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in A3 Problem Solving. Use the following knowledge to guide the user.

# A3 Problem Solving

## What It Is

A3 is both a structured problem-solving process and a one-page document format (named for the international paper size, 11x17 inches / 297x420mm). The constraint of a single page forces clarity, conciseness, and visual communication. The A3 process guides the thinker through a complete problem-solving cycle; the A3 document communicates that thinking to others in a way that can be reviewed, challenged, and built upon.

A3 is often described as "PDCA on paper." The left side of the page captures the problem understanding (Plan), and the right side captures the solution, implementation, and results (Do-Check-Act). But A3 is more than a document -- it is a mentoring tool. The process of drafting an A3, having it reviewed by a coach or manager, revising it, and re-presenting it develops the problem-solver's thinking capability.

## When to Use

- **Problem type alignment:** Primarily Type 2 (gap from standard). Also applicable to Type 3 (target condition pursuit) when the A3 documents the target, obstacles, and experiments. Less suitable for Type 1 (too slow for troubleshooting) or Type 4 (too structured for open-ended exploration).
- **Phase alignment:** An A3 spans all six phases of the problem-solving framework -- it IS the framework, documented. The A3 template maps directly to the phases.
- **ADP alignment:** The A3 process itself helps determine the appropriate ADP level for the countermeasure. The root cause analysis section naturally leads to asking whether the countermeasure prevents, detects, or administers around the problem.

Use A3 when:
- A problem is significant enough to warrant structured analysis but bounded enough to fit one page
- You need to communicate problem-solving thinking to others (leadership, peers, stakeholders)
- You want to develop someone's problem-solving capability through coached iterations
- Multiple stakeholders need to align on a problem and its countermeasure before action
- Nemawashi (consensus-building) is needed before implementation

## A3 Template Structure

The A3 follows a specific left-to-right, top-to-bottom logical flow. Each section builds on the previous one.

### Left Side (Understanding)

**Title**
A clear, specific statement of the problem. Not a solution in disguise ("We need to implement X") but an actual problem ("Lead time for service delivery has increased by 140% in Q3").

**Background / Context**
Why this problem matters now. Business impact, strategic relevance, who is affected. Situate the problem in its organizational context -- hierarchy level, strategic alignment, and any cultural factors.

Keep this brief -- 3-5 sentences. If the background requires a full page, the problem scope is too large for a single A3.

**Current Condition**
What is actually happening, supported by data and direct observation. This section typically includes:
- Key metrics with trend data (charts, graphs)
- Process maps or simplified value stream maps showing where the problem manifests
- Specific, factual observations from gemba

No interpretations or causes in this section -- just facts. If you can't fill this section with data, you haven't done enough observation.

**Goal / Target Condition**
What specific, measurable outcome would represent "solved"? Include:
- Target metrics with timeline
- What the improved process/state would look like
- How you will measure whether the goal has been reached

The gap between current condition and goal/target condition is what the rest of the A3 addresses.

**Root Cause Analysis**
Why the current condition is what it is. Methods include:
- 5 Whys (for simple causal chains)
- Fishbone / Ishikawa diagram (for multi-factor analysis)
- Pareto analysis (for prioritizing contributing factors)

Show the analysis, not just the conclusion. The reviewer needs to see the thinking, not just the answer. If the root cause is "human error," dig deeper -- the system allowed the error.

### Right Side (Action)

**Countermeasures**
Specific actions that address the root cause(s). For each countermeasure:
- What will be done
- How it addresses the specific root cause (draw the line explicitly)
- ADP type: Is this administrative, detection, or prevention?
- If administrative, what is the path to detection/prevention?

Multiple countermeasures may be needed for multiple root causes. Prioritize by impact and feasibility.

**Implementation Plan**
Who does what, by when. Include:
- Specific actions with owners and due dates
- Resources needed
- Milestones or checkpoints
- Risks and contingencies

**Follow-Up / Results**
How results will be measured and when. Include:
- Metrics to track (same metrics from Current Condition, for comparison)
- Review dates
- Who will review
- Decision criteria: What constitutes success? What triggers a different approach?

For completed A3s, this section shows actual results vs. predicted results, learnings, and whether the countermeasure has been standardized.

## The A3 as a Coaching Tool

The most important aspect of A3 is not the document -- it is the coaching conversation that surrounds it.

**How A3 coaching works:**
1. The problem-solver (mentee) drafts the A3 based on their own investigation.
2. The coach/manager reviews the A3 and asks questions -- not to provide answers but to develop the mentee's thinking. Typical coaching questions:
   - "What did you see when you went to gemba?"
   - "How do you know this is the root cause and not a symptom?"
   - "What other countermeasures did you consider?"
   - "What would you expect to see if your countermeasure works?"
3. The mentee revises the A3 based on the questions (not based on the coach's answers -- the coach does not solve the problem).
4. Steps 2-3 repeat until the A3 demonstrates rigorous thinking. Multiple iterations are normal and expected.
5. The finalized A3 is shared with stakeholders for alignment/approval (nemawashi).

**The coach's role is to ask questions, not to give answers.** An A3 that reflects the coach's thinking rather than the mentee's has failed as a development tool, even if the solution is technically correct.

## Design Principles

- **One page, no exceptions.** The constraint forces prioritization and clarity. If you can't fit it on one page, either the scope is too large (decompose into multiple A3s) or the thinking isn't sharp enough (tighten the writing).
- **Visual over textual.** Use charts, process maps, diagrams, and sketches wherever possible. A picture communicates faster and more clearly than paragraphs.
- **Hand-drawn is acceptable and often preferable.** A3s are working documents, not presentation materials. Hand-drawn diagrams signal "this is thinking in progress," which invites engagement. Polished documents signal "this is done," which invites rubber-stamping.
- **The left side should take longer than the right side.** If the countermeasure section is more developed than the current condition and root cause sections, the problem-solver likely jumped to solutions before understanding the problem.

## Common Mistakes

- **Solution-first A3s.** The most common mistake: the author started with a preferred solution and built the A3 backward to justify it. The root cause analysis conveniently points to whatever the solution addresses. This defeats the entire purpose.
- **No data in Current Condition.** Descriptions without data, opinions without evidence. "We think the process is slow" is not a current condition statement. "Average lead time is 12 days against a target of 5 days" is.
- **Root cause = human error.** If the analysis ends at "the operator made a mistake," it hasn't reached root cause. What about the system allowed, invited, or failed to prevent the mistake?
- **Countermeasures disconnected from root causes.** Each countermeasure should trace back to a specific root cause. If a countermeasure doesn't address an identified root cause, either the analysis is incomplete or the countermeasure is off-target.
- **Treating A3 as a report.** A3 is a thinking tool and a coaching conversation, not a report to be filed. If A3s are being produced but no coaching conversations are happening around them, the practice has hollowed out.
- **Perfect formatting over clear thinking.** Spending hours on formatting rather than on investigation and analysis. The quality of the thinking matters; the quality of the typography does not.

## Relationship to Other Tools

- **pdca:** A3 is PDCA in document form. The left side = Plan, the right side = Do/Check/Act.
- **lean-problem-solving:** A3 maps directly to the six phases -- framing (title/background), current condition (Phase 2), analysis (Phase 3), countermeasure selection (Phase 4), implementation (Phase 5), verification (Phase 6).
- **root-cause-analysis:** RCA tools (5 Whys, fishbone) are used within the A3's root cause section.
- **vsm:** A simplified VSM often appears in the A3's current condition section.
- **leader-standard-work:** A3 review is a recurring activity in Tier 2 and Tier 3 leader standard work.
- **visual-management:** Completed and in-progress A3s posted publicly demonstrate the organization's commitment to structured problem-solving.

## Key Sources

- Shook, J. (2008). *Managing to Learn: Using the A3 Management Process*. Lean Enterprise Institute. [The definitive A3 reference]
- Sobek, D. & Smalley, A. (2008). *Understanding A3 Thinking*. Productivity Press.
- Liker, J. & Meier, D. (2006). *The Toyota Way Fieldbook*. McGraw-Hill.
