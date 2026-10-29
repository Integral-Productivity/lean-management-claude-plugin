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

## Amendment 1 (2026-10-29): the file format

The [A3 spine plan](../plans/2026-10-28-a3-spine-plan.md) left three format questions open: the header field names, the A3 ID format, and the common folder path. Every later A3 capability depends on the answers, and a change after files exist means a migration. This amendment fixes them as format `a3/v1`.

### Decision

1. **Folder.** Every repository keeps its A3s in `docs/a3/`.
2. **A3 ID.** `A3-YYYY-MM-DD-short-slug`, with the date the A3 opened. It is set once and never changed. The file name is the ID plus `.md`.
   - Chosen over a per-repository number (`A3-0007`) and a repository prefix with a number (`LEAN-A3-7`). Many sessions work in parallel on different branches and repositories. A counter gives two A3s the same number; a date and slug need no counter and no registry.
3. **Header fields.** YAML front matter with `format` (`a3/v1`), `a3_id`, `title`, `owner`, `holder`, `holder_type` (`human` or `agent`), `coach`, `stage` (`plan`, `do`, `check`, `act`, `closed`), `opened`, `next_review` (required until `closed`), `revision` (`A`, `B`, ...), `tracker` (null or an https URL), `related`, and `retired_ids`. Other keys need an `x-` prefix, so an organization overlay can extend the header without changing the format.
4. **Holder type.** `holder_type` is a separate field because the authorship rule depends on it. With a human holder, the AI gathers data, suggests from evidence (labelled as a suggestion), and runs follow-ups, but nothing lands as the holder's thinking until the holder confirms it. With an agent holder, the agent drafts and is coached. This refines the plan's rule that Claude never writes section content for a human holder: the operator keeps every commitment, and the AI does not hold back a suggestion the evidence supports.
5. **Sections and component IDs.** Nine `##` sections in a fixed order: Background (BG), Current condition (CC), Goal (G), Root cause analysis (RC), Countermeasures (CM), Plan, Check (CK), Yokoten (YK), Revision log. A component is defined by a list item that opens with its bold ID or a table row whose first cell is its ID, as `PREFIX-N`. A removed ID goes into `retired_ids` and is never reused.
6. **One reference.** The `a3-reference` skill describes the format. Other A3 capabilities cite it.
7. **Fitness function.** `scripts/check-a3.mjs` checks each A3 file against this amendment. CI runs it and its tests on every pull request.

### Consequences

- A format change after this needs a new format value (`a3/v2`), a migration, and a new amendment.
- IDs are long to type. Cross-repository references add the repository only when it is not clear.
- The check enforces structure, not the quality of the thinking. `review-a3` covers quality.

## Amendment 2 (2026-10-29): a capture map replaces the tracker and scheduler slots

The repository owner, 2026-10-29: "Wiring directly into only GlassFrog and/or Reclaim is too limiting; we need to be able to support flexibility in where and how work for any part or whole of the A3 is captured."

Decision 5 assumed one work tracker for the whole A3 and one scheduler. That cannot send a countermeasure to an issue tracker, a Yokoten item to another team's board, or the whole A3 to a tool other than the one an overlay hard-wired. So:

- `a3-facilitation` reads a **capture map**: lines of the form `<part> -> <target> via <skill or connector>`, where a part is the whole A3 (`a3`), each review, a component prefix or ID, or a Plan row, and each target holds `stage`, `time`, or `work`.
- One home for each captured item; the owner confirms each capture; links go both ways (`-> <url>` on the component line, the Origin line in the item, `tracker` for the whole A3).
- Only the target that holds `stage` is kept equal to the header stage and checked for a difference.
- One A3 can override map lines with the header extension `x-capture: [part=target, ...]`. The format stays `a3/v1`.
- This plugin names no tool. An overlay plugin or the project's instructions supply the map.

Consequences: decision 5 now reads "a captured item stays the home of its work". The parent plan's R6, R7, R8, and R16 are amended to match. The plan is [`docs/plans/2026-10-29-1625-feat-a3-capture-map-plan.md`](../plans/2026-10-29-1625-feat-a3-capture-map-plan.md).
