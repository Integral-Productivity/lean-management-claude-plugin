---
title: Split a coaching skill's prose from a tested file helper, and keep state in the file
date: 2026-10-29
category: skill-design
tags: [a3, skills, tdd, facilitation]
related: [PR #49, docs/plans/2026-10-28-a3-spine-plan.md, ADR-0003]
---

# Split a coaching skill's prose from a tested file helper, and keep state in the file

## Problem

A facilitation skill (`a3-facilitation`) must do two kinds of work. It coaches, which needs judgement. It also keeps a file: it creates a header, moves a PDCA stage, numbers components, and resumes a paused cycle. When both kinds of work live in skill prose, nothing tests the mechanical rules. The model can skip a stage, reuse a retired ID, or forget where the cycle paused.

## What worked

1. **Put the mechanical steps in a small script with unit tests.** `scripts/a3-file.mjs` has four commands: `new`, `stage`, `next-id`, and `resume`. It allows only the PDCA moves (`plan -> do`, `do -> check`, `check -> do`, `check -> act`, `act -> closed`), bumps the revision, and writes the revision log line. Each file it writes passes `scripts/check-a3.mjs`. The tests were written before the code (node:test, no dependencies).
2. **Keep the judgement in prose.** The skill holds the coaching questions, the gates, the Reflection Pauses, and the authorship rule. The skill calls the script, and the script never writes section content.
3. **Make the file the only state.** `resume` reads the header and finds the first section that still says "Not yet." No cursor file or session memory is needed, so any later session can pick up the A3.
4. **Pin the skill's required rules with contract tests.** `scripts/a3-skills.test.mjs` checks that each SKILL.md states the rules the plan requires (for example the "just write it" guard and the `Skipped:` line). Prose cannot be unit-tested, but its contract can.
5. **Keep organization wiring out of the public skill.** The skill states a generic tracker and scheduler contract, and a test checks that it names no organization plugin. A private overlay maps the real integrations.

## Watch for

- Renaming a skill breaks old slash commands. Decide the release version when you rename (issue #50).
- On a repository that auto-merges `claude/*` branches, a push is a merge. Hold the push until each open design decision is answered.
