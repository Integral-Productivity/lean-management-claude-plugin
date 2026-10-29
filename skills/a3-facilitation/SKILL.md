---
name: a3-facilitation
description: Use to run and track one A3 from first draft through dated reviews to close -- creates the A3 file and header in docs/a3/, paces the coaching conversation phase by phase, stops at each Reflection Pause and review, moves the PDCA stage in a reviewed change, and resumes a paused A3 from its file. Use when someone starts an A3, returns to one, or holds its review. For the method and the coaching questions, use a3-coaching.
---

# A3 facilitation

This skill runs the A3 cycle the way a conductor runs a piece of work: one phase at a time, with a gate at each phase, and a record in Git. It does not do the thinking. The holder thinks and commits. The AI does the legwork: it gathers data, adds instrumentation, keeps the file, and holds the dates.

Use these with it:

- `a3-coaching` for the method, the sections, and the coaching questions.
- `a3-reference` for the file: folder, header, A3 ID, component IDs, stages, the Origin line, and the authorship rule. Do not repeat the reference here. Follow it.
- `lean-problem-solving` for the phase exit criteria and the Reflection Pauses.

The mechanical steps run through `scripts/a3-file.mjs` in this plugin. The script never writes section content.

```bash
A3="${CLAUDE_PLUGIN_ROOT}/scripts/a3-file.mjs"
```

## 1. Before an A3 exists: check the problem type

Run the problem typing in `lean-problem-solving` first.

- Type 2 (gap from standard), or Type 3 framed as an experiment: open an A3.
- Type 1 (troubleshooting): contain first, then use `5-whys`. Say why an A3 is too slow here.
- Type 4 (open-ended): use `lean-startup` or `lean-ux`. Say why.
- No standard exists yet: write the standard and one measure first (SDCA), then come back.
- A method outside lean fits better (for example DMAIC, OKRs, or a retrospective): name it, say why, and hand off. Do not coach it.

The person can override with a reason. Record the reason in the first revision log line.

## 2. Find the seat

Ask who owns the problem, who holds the A3 (writes the sections), and who coaches. The holder type decides the authorship rule (`a3-reference`, section 7):

- `holder_type: human`: Claude asks the coaching questions, gathers data, and suggests from evidence, labelled `(AI)` with its evidence. Nothing lands in the file as the holder's thinking until the holder confirms it. When the holder says "just write it", answer with the next coaching question and write no section content. Offer data work instead: what to measure, where to look, what to pull.
- `holder_type: agent`: the agent drafts from its own work, with `(AI)` markers and claim tags. A human or a named reviewer coaches, and the review is never skipped.

## 3. Birth: create the file when the first draft exists

When the holder has a problem statement and a first fact, create the file in the repository of the topic. Do not wait for a full draft, and do not copy the A3 into Git later.

```bash
node "$A3" new --title "<the problem, not a solution>" --slug <2-5-words> \
  --owner "<owner>" --holder "<holder>" --holder-type human --coach "<coach>" \
  --opened <YYYY-MM-DD> --next-review <YYYY-MM-DD>
```

The file opens at stage `plan`, revision A, with "Not yet." under each section. Then:

1. Put the holder's confirmed words into the sections, each with a component ID. Use `node "$A3" next-id <file> <prefix>` for each new component. An ID is never reused.
2. Run `node "${CLAUDE_PLUGIN_ROOT}/scripts/check-a3.mjs" <file>` and fix every error.
3. Land the file as a reviewed change (a pull request) that the holder and coach can see.
4. Run the integration steps in section 7.

If the session cannot write to the topic's repository, say so and ask the person to add it. Do not file the A3 somewhere else.

## 4. Pace the plan phase by phase

Walk the `lean-problem-solving` phases in A3 order: Background, Current condition, Goal, Root cause analysis, Countermeasures, Plan, Check. For each phase:

1. Ask the coaching questions from `a3-coaching` for that section, in the holder's own words.
2. Check the phase exit criteria in `lean-problem-solving` against what the holder wrote.
3. Report the gate result: `complete`, `blocked: <what is missing>`, or `loop back to <phase>: <why>`.
4. At each Reflection Pause, stop. Name what the holder does before the next session (for example a gemba visit: what to watch, where, for how long, whom to ask). End the turn. Do not run the next phase in the same turn.

Gates that always apply:

- Current condition holds facts only. A claim with no source is tagged `(not measured: <follow-up>)` and cannot pass the gate as a fact.
- Countermeasures stay locked until Current condition and Root cause analysis pass. Park a solution the holder brings early, and at the Countermeasures phase check whether the root-cause chain leads to it or was built backward from it.
- A root cause that names a person loops back: ask what in the system allowed it.

## 5. Resume a paused A3

The file is the cursor. No other state is kept.

```bash
node "$A3" resume <file>
```

It returns the stage, revision, next review date, holder type, and the first section that still says "Not yet." Read the revision log for the last gate result, then continue from that point. Tell the person where they are in one line before the next question.

## 6. Move the stage, and hold each review

The stage moves only in a reviewed change to the file, never in chat alone.

```bash
node "$A3" stage <file> <to> --date <YYYY-MM-DD> --reason "<what changed>" \
  --asked-by "<who asked>" --next-review <YYYY-MM-DD>
```

The script allows only the PDCA moves: `plan -> do`, `do -> check`, `check -> do`, `check -> act`, `act -> closed`. It bumps the revision letter and writes the revision log line. Every stage except `closed` needs a next review date.

- **plan -> do:** the holder approved the countermeasures and the plan, and the Check section names each dated check, its target, a guardrail measure, and a switch trigger.
- **At each dated review (do -> check):** compare each CK item with its target. Bring the evidence. When a choice is needed, ask the holder and record their decision. Run `review-a3` on the revision when it is installed; otherwise ask the coach to review and say `Skipped: review-a3 (not installed)`.
- **check -> do:** the target was not met. Revise the countermeasures; a miss is learning, not failure.
- **check -> act:** the target was met. Record each adopted standard with an `Origin: A3 <A3 ID> <CM ID>` line, and name each Yokoten (YK) item.
- **act -> closed:** the standards are recorded and the Yokoten are named.

A run ends at "check scheduled", never at DONE. Each stop names the next review date and who holds it. This is a Reflection Pause too: end the turn.

## 7. Integrations: the capture map

Work tools are not part of this plugin. Any part of an A3, or the whole A3, can be captured in any set of tools. A **capture map** says where each part goes. An overlay plugin or the project's own instructions supply the map.

**Parts.** `a3` (the whole A3 as one work item), `review` (each dated review: `next_review` and each dated CK item), a component prefix (`CM`, `CK`, `YK`) or one component ID (for example `CM-2`), and `plan` (one row of the Plan section).

**A map line** has the form `<part> -> <target> via <skill or connector>`, and says what the target holds:

- holds `stage`: the target tracks the A3 stage. At most one target holds the stage, and it is the home of the `a3` part.
- holds `time`: the target schedules time, for example for a review. It is not a home; it points at one.
- holds `work`: the target is the home of that part's work item.

**Rules.**

1. Give each captured item one home. Different parts can have different homes.
2. Draft each capture and get the owner's confirmation before you create or change anything. One part per confirmation.
3. Link both ways. Write `-> <url>` at the end of the component line. Put `Origin: A3 <A3 ID> <component ID>` in the external item (`a3-reference`, section 6). Write the home of the `a3` part into `tracker` in the header.
4. At birth and at each stage move, update only the target that holds `stage`, so that it shows the header stage. On resume and at each review, compare it with the header. On a difference, report both values and change nothing until the owner says which is right.
5. For each review date, call each target for `review`. Pass the A3 ID, title, owner, file path, and the date. Record the reference you get back in the revision log line.
6. Never call a tool that the capture map does not name.

**Per-A3 override.** One A3 can replace a map line for its own parts with the header key `x-capture`, for example `x-capture: [a3=team-board, CM-2=code-issues]`. Each item is `<part>=<target>`, and the target is a name from the capture map. `node "$A3" resume <file>` reports the overrides as `capture`.

**When a part has no target,** or its target's skill or connector is not installed, skip it and say which part was skipped, for example:

> Skipped: YK-1 capture (no capture target for YK). Skipped: review capture (no capture target for review). The review date 2026-11-12 is in the header only.

## 8. What the facilitator never does

- It never writes section content as the holder's thinking when a human holds the A3.
- It never makes a commitment for the holder: approvals, dates, and owners come from people.
- It never removes a heading or reuses a component ID.
- It never ends a run at DONE.
- It never gives one score for a person or a team.
