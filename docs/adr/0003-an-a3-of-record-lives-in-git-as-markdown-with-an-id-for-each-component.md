# 3. An A3 of record lives in Git as markdown with an ID for each component

Date: 2026-10-28

## Status

Proposed. Merging this record is the acceptance.

## Context

1. **A3s made in AI-assisted sessions have no home.** They are saved wherever the session
   happened to be, in different formats, and later sessions find them only through
   someone's memory of the path.
2. **Follow-ups and links are manual.** A3 reviews have dates, but nothing reminds anyone.
   Countermeasures become issues, decision records, and pull requests, but nothing points
   back to the A3.
3. **The `a3` skill does not file.** It teaches the method and calls an A3 "a thinking tool
   and a coaching conversation, not a report to be filed".
4. **An A3 is a projection of components** (background, current condition, goals, root
   causes, countermeasures, checks, Yokoten) worked on in one period of time. A database of
   components may come later.
5. **Prior design.** The [A3 conductor ideation](../ideation/2026-10-21-a3-conductor-command-ideation.md)
   already proposed that the A3 is a file with history and the page is a view (idea 3).
6. **Options weighed** on a decision card on 2026-10-28: Git markdown with an ID per
   component, a component database now, files in shared drives, or deciding later.

## Decision

1. **An A3 of record is one markdown file in Git**, created when the A3 is first drafted.
   It lives in the repository of its topic, at the same folder path in every repository.
   One index, generated from the headers, lists A3s across all repositories.
2. **Each file opens with a header** that names the A3 ID, title, owner, holder, coach,
   PDCA stage, dates, and related decision records and issues.
3. **Each component has a stable ID** with a fixed prefix: BG, CC, G, RC, CM, CK, YK. An ID
   is never reused.
4. **Each PDCA revision is a reviewed change** (a pull request).
5. **A work tracker, when one is used, stays the home of the work item**; the A3 file is the
   home of the reasoning. Each links to the other.
6. **A component database is a later step.** The IDs make that move possible without
   rewriting the A3s.
7. **This plugin owns the A3 practice**, split into coaching, facilitation, reference, and
   review capabilities. Organization-specific wiring goes in a private overlay plugin.

The requirements are in [`docs/plans/2026-10-28-a3-spine-plan.md`](../plans/2026-10-28-a3-spine-plan.md).

## Consequences

- PR review, diff history, and CI checks apply to A3s, such as overdue-review and stage checks.
- Countermeasure work can cite `Origin: A3 <A3 ID> <CM ID>` and be traced back.
- People who do not use Git need a session to file for them.
- A3s sit with the decisions and issues of their topic, but finding them across topics
  depends on the generated cross-repository index.
