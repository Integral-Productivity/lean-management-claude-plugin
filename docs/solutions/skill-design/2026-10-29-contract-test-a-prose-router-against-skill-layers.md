---
title: Contract-test a prose router against each skill's declared layer
date: 2026-10-29
category: skill-design
tags: [routing, layers, tdd, fitness-function]
related: [PR #63, PR #61, ADR-0004, STRATEGY.md]
---

# Contract-test a prose router against each skill's declared layer

## Problem

`lean-thinking` is the router of the shared core. It routed by tradition and by tool lists, written by hand. After the `layer:` field arrived (PR #61), the router did not use it: it listed the four lens skills as domains, mixed core skills into tool lists, and did not name `a3-reference` or `review-a3`. A prose router drifts each time a skill is added or moves layer, and nothing fails.

## What worked

1. **Route in three steps, in this order:** an off-ramp for non-lean methods (name the method, say why, hand off, do not coach it), then the layer the work acts on, then the problem type, which `lean-problem-solving` owns. The off-ramp comes first so the plugin never coaches a method outside its boundary.
2. **One table per layer value**, under a heading the test can find (`### Layer: <value>`). The router stays prose that a person can read and edit.
3. **A contract test as the fitness function.** `scripts/router.test.mjs` reads every `skills/*/SKILL.md`, takes its `layer:`, and fails when the skill is missing from its layer's section or appears under another layer. It also pins the off-ramp methods and the hand-off rule. It runs in the `Skill layers` workflow, next to `check-layers.mjs`, so a moved layer fails in the same job that checks the field.
4. **Write the test first.** All four tests failed on the old router, which proved that they detect the drift they guard against.

## Watch for

- A generated table would never drift, but it ties the router's wording to each skill's `description`. At 32 skills, the hand-written table plus a test was the cheaper choice (decision card, option A).
- The section regex stops at the next heading of level 2 or 3. A level-4 heading inside a layer section stays part of that section; a level-3 heading ends it.
