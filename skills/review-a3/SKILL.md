---
name: review-a3
description: Use to review one A3 file of record (format a3/v1) before a revision lands -- runs four reviewer agents in parallel (strategy, gemba, format, lean sensei) and returns their findings sorted into Applied (proven format errors fixed without changing any words) and Proposed (evidence-cited questions for the owner). Use at each dated review, before an A3 changes stage, or when someone asks for a review of an A3. Gives no score.
---

# Review an A3

This skill runs reviewer agents over one A3 and brings their findings back to the owner. It does not do the thinking and it does not decide. The reviewers suggest from evidence. The holder and the owner decide and commit.

Use these with it:

- `a3-reference` for the file: header, sections, component IDs, claim tags, the authorship rule, and the quality concerns. The reviewers follow it. Do not repeat it here.
- `a3-facilitation` runs the cycle and calls this skill at each dated review.
- `a3-coaching` for the method and the coaching questions.

```bash
CHECK="${CLAUDE_PLUGIN_ROOT}/scripts/check-a3.mjs"
A3="${CLAUDE_PLUGIN_ROOT}/scripts/a3-file.mjs"
REF="${CLAUDE_PLUGIN_ROOT}/skills/a3-reference/SKILL.md"
```

## 1. Find the A3

Review one A3 file of record: a file in `docs/a3/` whose name is its A3 ID. When the person names no file, list `docs/a3/*.md` and ask which one. When the A3 is not in Git yet, say so and offer `a3-facilitation` to create it; do not review a chat draft as if it were the record.

Read the header. Note the stage, the revision, the holder type, and the next review date. Then run the check once, so you know the starting point:

```bash
node "$CHECK" --quality "<A3 file>"
```

## 2. Dispatch the four reviewers

Dispatch these agents in parallel, each in its own context, so that one lens does not anchor another:

| Agent | Lens |
|-------|------|
| `a3-strategy-reviewer` | Is the problem worth an A3 now? Does the goal connect to the purpose of the area, with a target, a date, and a guardrail? Is the plan within the owner's reach and cadence? |
| `a3-gemba-reviewer` | Do the current condition and the root causes rest on facts seen where the work happens, with sources? |
| `a3-format-reviewer` | Does the file follow the reference? It runs `scripts/check-a3.mjs` and is the only reviewer that reports proven errors. |
| `a3-lean-sensei-reviewer` | Does the thinking hold together, from background to check? What is the next question that grows the owner's problem-solving? |

Pass each agent: the absolute path of the A3 file, the path in `$REF`, today's date, and the stage and holder type. Pass the format reviewer the full output of `node "$CHECK" --quality --today <today> "<A3 file>"` too. The reviewers have read tools only; this skill runs every command. Pass nothing else: no summary of the A3 and no opinion of your own.

When an agent cannot run (agents are not available, or one fails), run that lens yourself from its agent file in this plugin's `agents/` folder, and say so in the report: `Ran inline: <agent> (<reason>)`.

## 3. Applied: what this skill may change

This section is the whole Applied rule. The plan keeps it in one place on purpose.

Applied holds only the fixes that the check proves and that change no words:

- a list item in a component section with no ID gets the next unused ID;
- a missing section heading comes back with "Not yet." under it.

When the format reviewer reports a proven error with one of these fixes, run:

```bash
node "$A3" fix "<A3 file>"
node "$CHECK" "<A3 file>"
```

`fix` prints each change it made. List each one under Applied, with the new ID, so the holder can see it. When an added ID turned a note into a component, the holder can make the note a sub-item instead. Leave the change in the working tree for the holder to see in the diff and land in the reviewed change.

This skill never moves the stage, never removes an `(AI)` marker, never writes or rewrites section content, never adds a component, and never commits or pushes. A proven error that needs words (for example a reference to an ID that is not defined) goes to Proposed, marked `proven, needs the holder`.

## 4. Merge the findings

- Keep each finding's evidence and its question exactly as the reviewer gave it. Do not soften a finding and do not add one of your own.
- When two reviewers report the same component for the same reason, keep one finding and name both reviewers.
- Drop a finding with no evidence, and say how many you dropped.
- Order Proposed findings by reviewer, then by the order of the A3's sections.

## 5. Report

Report in this shape:

```
## Review of <A3 ID>, revision <letter>, stage <stage>

### Applied
- <each change from `fix`>, or "None."

### Proposed
#### Strategy
- **<ID>** <finding> -- Evidence: <...> -- Question for the owner: <...>
#### Gemba
...
#### Format
...
#### Lean sensei
...

### Not reviewed
- <a lens that did not run, and why>, or "None."
```

Then stop. The owner answers the questions. When the owner decides on a change, the holder makes it, and the revision log line names what changed and who asked (`a3-reference`, section 3 and section 4). When `a3-facilitation` called this skill, return the report to it.

## 6. What this skill never does

- No score, no grade, no count of findings presented as a measure, and no pass or fail verdict for the A3, its owner, or a team.
- It never makes a commitment for the owner: decisions, dates, targets, and owners come from people.
- It never writes section content when a human holds the A3.
- It never hides a finding because it is uncomfortable. Facts first, with respect for people.
