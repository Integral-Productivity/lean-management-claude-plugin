---
name: root-cause-analysis
description: Use for deepening causal analysis beyond 5 Whys -- including fishbone (Ishikawa) diagrams, fault tree analysis, and structured multi-factor root cause investigation. Applies to Type 1 and Type 2 problems. Use when a single causal chain is insufficient and multiple contributing factors need to be explored systematically.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in Root Cause Analysis. Use the following knowledge to guide the user.

# Root Cause Analysis

## What It Is

Root cause analysis (RCA) is the practice of drilling past symptoms and contributing factors to identify the fundamental cause(s) of a problem -- the cause that, if removed, would prevent recurrence. Lean uses several RCA tools, each suited to different problem complexity levels.

## When to Use

- **Problem type alignment:** Types 1 and 2. Type 1: quick RCA (shallow 5 Whys) to understand what changed. Type 2: deep RCA to identify systemic causes of persistent gaps.
- **Phase alignment:** Phase 3 (Analysis).

## Methods

### 5 Whys

Ask "why does this happen?" iteratively. Each answer becomes the subject of the next "why?" Continue until you reach a systemic cause.

**Example:**
- Problem: Customer received the wrong report.
- Why? The analyst sent the previous client's report.
- Why? Both reports were open and looked similar.
- Why? There's no visual distinction between client workspaces.
- Why? The tool doesn't support workspace-level branding or color-coding.
- Root cause -> System design doesn't differentiate client contexts visually.

**Strengths:** Simple, fast, accessible to anyone. Good for straightforward causal chains.

**Limitations:** Follows a single causal chain -- problems with multiple interacting causes need a different tool. Vulnerable to confirmation bias (each "why" is a choice that reflects the analyst's assumptions). Can land on "human error" too easily if not disciplined.

**Rules:** If the analysis ends at a person ("the operator made a mistake"), it hasn't reached root cause. Ask: "What about the system allowed, invited, or failed to prevent this error?"

### Fishbone / Ishikawa Diagram

A visual tool for multi-factor analysis. The "head" is the problem; the "bones" are categories of potential causes. Standard categories (adaptable): People, Process, Materials, Equipment, Environment, Measurement (the 6Ms). For knowledge work: People, Process, Technology, Information, Environment, Policy.

**How to use:**
1. Write the problem statement at the head.
2. Draw main bones for each cause category.
3. Brainstorm potential causes within each category. Add sub-causes as smaller bones.
4. Identify the most likely root causes through discussion, data, and investigation.
5. Validate: Does addressing this cause prevent recurrence? Test with data.

**Strengths:** Surfaces multiple contributing factors. Prevents tunnel vision. Good for team brainstorming.

**Limitations:** Can generate an overwhelming list of potential causes without prioritization. Requires a separate step to validate which causes actually contribute.

### Fault Tree Analysis

A top-down, deductive method using Boolean logic (AND/OR gates) to trace how combinations of failures lead to the problem. Borrowed from reliability engineering.

**When to use:** Complex systems where the problem results from multiple simultaneous failures. More rigorous than fishbone for safety-critical or high-stakes analysis.

### Pareto Analysis

Not an RCA tool per se, but a prioritization tool often used with RCA. Rank contributing factors by frequency or impact. The Pareto principle (80/20 rule) suggests that a small number of causes account for the majority of the effect. Focus RCA effort on the vital few, not the trivial many.

## Key Principles

- **Root cause != proximate cause.** The proximate cause is what happened immediately before the problem. The root cause is the systemic condition that allowed or created the proximate cause.
- **Never land on human error.** "The person made a mistake" invites "tell the person to be more careful" -- an administrative countermeasure that will fail. The system that permitted the error is the root cause. Design it out (prevention) or detect it automatically (detection).
- **Multiple root causes are common.** Complex problems rarely have a single root cause. The fishbone exists for this reason.
- **Verify with data.** A root cause hypothesis is not a root cause until validated. "If X is the root cause, we would expect to see Y. Do we?"

## Common Mistakes

- **Stopping too early.** Accepting a surface-level cause because it's convenient or politically safe.
- **Following only one chain in 5 Whys.** Each "why" could branch. When multiple branches exist, explore them (or switch to fishbone).
- **Confusing correlation with causation.** Two things happening together doesn't mean one causes the other.
- **Analysis paralysis.** Spending weeks on RCA when a quick experiment would reveal more. Balance depth with speed -- match the RCA effort to the problem's significance.

## Relationship to Other Tools

- **a3:** RCA is a section of the A3. Results of 5 Whys or fishbone analysis appear in the left side of the A3 document.
- **lean-problem-solving Phase 3:** RCA is the primary activity in the Analysis phase.
- **pdca:** RCA is the "Plan" part -- understanding the cause before testing a countermeasure.
- **jidoka Step 4:** After stopping and fixing, jidoka requires RCA to prevent recurrence.
- **5-whys:** For shallow 5 Whys analysis within the lean-problem-solving framework.

## Key Sources

- Ohno, T. (1988). *Toyota Production System*. Productivity Press. [5 Whys origin]
- Ishikawa, K. (1985). *What Is Total Quality Control? The Japanese Way*. Prentice Hall. [Fishbone diagram]
- Sobek, D. & Smalley, A. (2008). *Understanding A3 Thinking*. Productivity Press.
