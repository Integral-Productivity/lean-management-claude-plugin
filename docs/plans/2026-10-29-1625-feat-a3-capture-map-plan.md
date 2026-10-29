---
title: A3 capture map - Plan
type: feat
date: 2026-10-29
topic: a3-capture-map
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
execution: code
---

# A3 capture map - Plan

## Goal Capsule

- **Objective:** Let any part of an A3, or the whole A3, be captured in any set of work tools, and keep the public plugin free of tool names.
- **Means:** Replace the two fixed integration slots in `a3-facilitation` section 7 (one work tracker, one scheduler, both for the whole A3) with a capture map. An overlay plugin or the project's instructions supply the map. One A3 can override map lines in its header.
- **Parent plan:** [`2026-10-28-a3-spine-plan.md`](2026-10-28-a3-spine-plan.md), R6, R7, R8, R16 (amended here).
- **Product authority:** the repository owner, 2026-10-29: "Wiring directly into only GlassFrog and/or Reclaim is too limiting; we need to be able to support flexibility in where and how work for any part or whole of the A3 is captured."
- **Open blockers:** None. Where the map lives was decided on 2026-10-29 by the repository owner on a decision card: "Org default + per-A3 override", the option this plan builds.

## Key Technical Decisions

- **KTD1. The unit of capture is an A3 part.** Parts: `a3` (the whole A3), `review` (each dated review), a component prefix (`CM`, `CK`, `YK`) or one component ID (`CM-2`), and `plan` (a Plan row). (user-directed: "any part or whole of the A3".)
- **KTD2. A map line is `<part> -> <target> via <skill or connector>`, with what the target holds: `stage`, `time`, or `work`.** Only a target that holds `stage` is kept equal to the header stage and checked for a mismatch. A target that holds `time` is a schedule entry, not a home.
- **KTD3. One home for each captured item; draft and confirm before each write; links both ways.** The component line gets `-> <url>`. The external item gets the existing `Origin: A3 <A3 ID> <component ID>` line. The home of the `a3` part goes in the header `tracker` field. (user-approved, ADR-0003 decision 5.)
- **KTD4. The public plugin names no tool.** The map comes from an overlay plugin or the project's own instructions. (user-approved, STRATEGY.md boundary; test KTD7 of the review-a3 plan and the existing a3-skills test enforce it.)
- **KTD5. Per-A3 override: header `x-capture`, a list of `part=target` items.** It replaces the map line for that part in this A3 only. The `x-` prefix keeps format `a3/v1` unchanged. Separable: its own test, its own paragraph, and a parse function that the rest of the contract does not depend on. (Chosen by the repository owner on a decision card, 2026-10-29: "Org default + per-A3 override".)
- **KTD7. Every section is a part, and a part can carry a work kind** (added 2026-10-29, owner's comments on the design note: "coverage across all individual parts of an A3 and their sections" and "reframing actions like narrow, widen, shift"). Parts add `BG`, `CC`, `G`, `RC` and their items. Kinds: `clarify`, `study`, `rework`, `reframe`, as `<part>:<kind>`. The most specific map line wins. The Revision log is not a part.
- **KTD6. No map line, or a target whose skill is not installed: skip and say which part was skipped.** Never call a tool the map does not name.

## Requirements

- C1. `a3-facilitation` section 7 states the capture map, the parts, the line shape, KTD2-KTD6, and the skip message, and names no organization tool.
- C2. `a3-reference` states the capture links: `-> <url>` on a component line, the Origin line in the external item, `tracker` as the home of the `a3` part, and `x-capture` as a known extension key.
- C3. `scripts/a3-file.mjs resume` reports `capture`: the parsed `x-capture` overrides as `{ part: target }`, or `{}`. A malformed item fails with a message naming it.
- C4. ADR-0003 amendment 2 records the change from two slots to a capture map.
- C5. The parent plan's R6, R7, R8, and R16 say "a target that holds the stage" or "capture targets" instead of "the tracker" and "the scheduler".

- C6. Section 7 lists every section as a part (the Revision log excepted), the work kinds, the most-specific rule, the `Work (<kind>):` back-link line, and that a coach's or reviewer's ask becomes a capture after the owner confirms.
- C7. `parseCapture` accepts `<part>:<kind>` for section parts and items, and rejects an unknown kind or a kind on `a3` or `review`.
- C8. `resume` treats a section with only "Not yet." and `Work` lines as empty; the check accepts `Work` lines.
- C9. Section 7 names the `reframe` kind (narrow, widen, or shift the framing), and `parseCapture` accepts it.

## Acceptance Examples

- AE1. **Covers C1, KTD6.** Given the map has no line for `YK`, when the A3 moves to `act` with YK-1 named, then the run says `Skipped: YK-1 capture (no capture target for YK)`.
- AE2. **Covers C3, KTD5.** Given the header `x-capture: [a3=board, CM-2=repo-issues]`, when `resume` runs, then it reports `capture: { a3: "board", "CM-2": "repo-issues" }`.
- AE3. **Covers C3.** Given `x-capture: [CM-2]`, when `resume` runs, then it fails and names `CM-2`.
- AE4. **Covers KTD2.** Given two targets, one that holds `stage` and one that holds `time`, when the stage moves, then only the `stage` target is updated.

- AE5. **Covers C6.** Section 7 names `CC:study` and the kinds.
- AE6. **Covers C7.** `x-capture: [CC:study=research-board]` reports `{ "CC:study": "research-board" }`; `CC:dance=board` fails and names `CC:dance`.
- AE7. **Covers C8.** Background holds "Not yet." and one `Work (clarify):` line; `resume` reports `nextSection: Background`, and the check passes.
- AE8. **Covers C9.** `x-capture: [BG:reframe=board]` reports `{ "BG:reframe": "board" }`; section 7 shows `Work (reframe): narrow ...`.

## Implementation Units

1. **Tests first.** `scripts/a3-skills.test.mjs`: replace the R16/AE6 test with capture-map assertions (C1, AE1, KTD2, KTD3, no tool names). `scripts/a3-file.test.mjs`: AE2, AE3, and `capture: {}` without the key. See them fail.
2. **`scripts/a3-file.mjs`:** `parseCapture(list)` and `capture` in `resumePoint`.
3. **Skill and reference prose:** section 7 of `a3-facilitation`; capture links in `a3-reference` sections 3 and 6.
4. **Records:** ADR-0003 amendment 2; parent plan R6, R7, R8, R16.
5. **Verify:** `node --test scripts/*.test.mjs && node scripts/check-a3.mjs`.

## Scope Boundaries

- The Integral Productivity default map is overlay work (lean-management-internal-claude-plugin), a separate PR that follows this one.
- The R8 check script itself is built elsewhere (claude-config step 5b). This plan only changes what R8 compares.
- No change to the `a3/v1` required fields.

## Planning notes

- Planning ran in pipeline mode inside lfg, from the design note and the owner's message. The full ce-plan research and document-review passes were shortened: the change is prose plus one small parse function, and the design note already holds the research.
