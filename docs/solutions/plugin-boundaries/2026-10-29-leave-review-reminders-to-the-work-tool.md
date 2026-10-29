---
title: Leave review reminders to the work tool; ship only what no other tool can do
date: 2026-10-29
category: plugin-boundaries
tags: [a3, boundaries, capture-map, index]
related: [PR #56, PR #60, docs/plans/2026-10-28-a3-spine-plan.md]
---

# Leave review reminders to the work tool; ship only what no other tool can do

## Problem

The A3 plan gave two jobs to a configuration repository: an overdue-review and stage-drift check (R8), and a cross-repository A3 index (R10). That repository's STRATEGY.md forbids new logic. Also, the A3 capture map (PR #56) already sends review dates to the user's work tool (a calendar, a task manager, or a tracker). A second reminder system would duplicate that tool.

## What worked

1. **Read the target repository's STRATEGY boundaries before building a step a plan assigns to it.** The conflict showed before any code was pushed, and it went to the owner on a decision card.
2. **Ask which tool already owns the job.** Reminders and due dates belong to the work tool that holds the A3's dated reviews. The plugin does not track them.
3. **Ship only what nothing else does.** No work tool reads A3 headers across repositories, so the index (`scripts/a3-index.mjs`, PR #60) stays. The caller names the repositories; the plugin names none.
4. **A drift check waits for a real stage holder.** Comparing the header stage with the target marked `holds: stage` needs a reader for each tool. Build it only when a dedicated lean tool exists.

## Watch for

- If dedicated lean tooling is built later, the overdue and drift checks can return there, as callers of the work tool, not as a second reminder system.
- `check-a3.mjs --quality` still warns on a passed `next_review` inside a review. That is a review finding, not a reminder.
