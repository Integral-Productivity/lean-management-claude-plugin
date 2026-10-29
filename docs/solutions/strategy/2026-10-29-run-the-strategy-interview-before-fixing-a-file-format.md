---
title: Run the strategy interview before you fix a file format
date: 2026-10-29
category: strategy
tags: [a3, strategy, format, authorship]
related: [PR #48, STRATEGY.md, ADR-0003, ADR-0004, skills/a3-reference]
---

# Run the strategy interview before you fix a file format

## Problem

Step 1 of the A3 spine (PR #48) had to define the A3 file format (`a3/v1`) and write the repository's STRATEGY.md. The format was drafted in parallel with the strategy interview, from the plan's defaults. One default was the authorship rule: "Claude never writes section content for a human holder."

The interview answers then changed that rule mid-build:

- **Positioning.** The owner wanted the AI "empowered": it gathers data, instruments, and suggests from the available evidence, but every commitment stays with the operator. An AI that only asks questions and holds back help was ruled out. The "never writes" rule held back help, so it was too strict.
- **Stress test** ("draft my A3 from this transcript"). The owner asked for facts first, analysis labelled, clear attribution of human and AI work, and a clear mark on which claims are verified. That added format rules that the draft did not have.

A format fixed before the interview would have shipped a rule the strategy contradicts.

## What worked

1. **Ask the strategy questions before the format is final.** Draft the format in parallel if you must, but hold the push until Positioning and the stress tests are answered.
2. **Read each answer for its effect on the draft.** After each answer, ask: "Does this change a rule in the format?" Write the impact down in the interview log next to the answer.
3. **Change the rule, and say why in the decision record.** ADR-0003 amendment 1 replaced "never writes" with a rule tied to `holder_type`: with a human holder, the AI suggests from evidence (labelled as a suggestion), and nothing lands as the holder's thinking until the holder confirms it.
4. **Turn stress-test answers into checkable format rules.** AI-authored components are marked `(AI)`, and the claim tags `fact`, `inference`, and `not measured` are required on the current condition, goal, and root-cause sections. `scripts/check-a3.mjs` can check them.
5. **Let structure questions surface early too.** The Users question showed three possible plugins. The answer (one plugin, three layers, and a shared core) became ADR-0004 in the same PR, before any skill was split.

## Watch for

- On a repository that auto-merges `claude/*` branches, a push is a merge. Keep the format commit local until the interview ends.
- A stress test is cheap and finds rules a feature list does not. Run at least one that asks the AI to do the operator's thinking.
- If the format already shipped, a strategy change needs a format amendment and a version decision, not a quiet edit.
