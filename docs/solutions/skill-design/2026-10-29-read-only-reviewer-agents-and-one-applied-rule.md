---
title: Give reviewer agents read tools only, and keep the "Applied" rule in one section
date: 2026-10-29
category: skill-design
tags: [a3, agents, review, tdd]
related: [PR #52, PR #53, issue #54, docs/plans/2026-10-28-a3-spine-plan.md]
---

# Give reviewer agents read tools only, and keep the "Applied" rule in one section

## Problem

`review-a3` runs four reviewer agents (strategy, gemba, format, lean sensei) over one A3 file of record. Reviewers that can write or run commands can change the record without the holder seeing it. Reviewers that each decide what to fix can disagree about what a review may change. The STRATEGY.md boundaries also apply: the review gives no score, the AI suggests from evidence, and the owner commits.

## What worked

1. **The agents get read tools only** (`Read, Grep, Glob`). The skill runs every command, for example `check-a3.mjs --quality --today <date>`, and passes the output to the format reviewer. That way one place owns side effects, and a test can check each agent's `tools:` line.
2. **One proof source.** Only the format reviewer reports `proven` errors, and only when the check reports them. The other reviewers give Proposed findings only, each with evidence and a question for the owner.
3. **One section owns the Applied rule.** Section 3 of the skill lists the only changes the skill may make: add a missing ID, or restore a missing heading with "Not yet.". Both changes come from `a3-file.mjs fix` and change no words. The changes are left uncommitted so the holder sees them in the diff. Everything else goes to Proposed. The maintainer confirmed "mechanical fixes only" on a decision card (PR #53).
4. **Put the fix in the tested helper, not in prose.** `fixA3` reuses the check's `walkBody` and `unlabelledItem`, so the fixer and the checker cannot disagree about what an item is. Edge cases found in review: `Rejected:` option bullets, numbered items, bold-led items, thematic breaks, and the trailing newline.
5. **Contract-test the prose.** `scripts/review-a3.test.mjs` pins the frontmatter, the four agent names, the Applied section heading, the never-rules, "no score", the read-only tools, and the absence of organization names.

## Watch for

- Contract tests prove that the rules are stated, not that the reviewers judge well. Seeded test A3s with an eval run close that gap (issue #54).
- A CLI argument filter like `i !== at + 1` drops the first argument when the flag is absent (`at === -1`). Guard with `at >= 0`.
