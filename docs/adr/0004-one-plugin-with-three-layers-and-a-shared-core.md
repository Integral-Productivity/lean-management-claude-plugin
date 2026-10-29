# 4. One plugin with three layers and a shared core

Date: 2026-10-29

## Status

Proposed. Merging this record is the acceptance.

## Context

1. **The plugin holds three kinds of product.** Its 29 skills cover solving one problem
   (A3, 5 Whys, root cause analysis), running the routines of a team (leader standard work,
   daily accountability, visual management), and changing an organization (kaizen events,
   lean enterprise, coaching). The strategy interview for [STRATEGY.md](../../STRATEGY.md)
   showed that each reads as its own plugin: lean thinking, lean management, and lean
   transformation.
2. **The seam test.** The useful cut is what the work acts on, and at what rhythm:
   - Thinking acts on one problem, over one PDCA cycle (days to weeks).
   - Management acts on a recurring operation, in daily and weekly routines.
   - Transformation acts on the organization and its people's capability, over quarters.
3. **The layers stack.** Management produces problems for Thinking (a red board item
   becomes an A3). Transformation develops the people who do Thinking and Management. No
   layer reaches up.
4. **One artifact crosses all three.** An A3 is a Thinking tool, an A3 review is a
   Management routine, and the A3 index and Yokoten across teams are Transformation. The
   A3 format ([ADR-0003](0003-an-a3-of-record-lives-in-git-as-markdown-with-an-id-for-each-component.md))
   therefore belongs to no single layer.
5. **Options weighed** on a decision card on 2026-10-29:
   - One plugin with three layers and a shared core.
   - Three plugins now, plus a core plugin.
   - A brainstorm before any decision.

## Decision

1. **Keep one plugin and one install.** The plugin has three layers (Thinking, Management,
   Transformation) and a shared core (routing by problem type, vocabulary, and the file
   formats such as the A3 reference and its check).
2. **The layers are the tracks** of STRATEGY.md.
3. **Each skill belongs to one layer or to the shared core.** A later change adds a
   `layer:` field to each SKILL.md and a check that every skill declares exactly one.
4. **The router routes by problem type and layer.** When a non-lean method fits better,
   the router names it and hands off; it does not coach it.
5. **Split a layer into its own plugin only** when that layer has users who install it
   without the others.

## Consequences

- No rename, no new repositories, and no marketplace change.
- Sorting the skills into layers is a judgement. A wrong sort costs little here, because
  a skill can move by changing one field.
- Layers can blur again over time. The `layer:` check is the countermeasure.
- Open sorts to settle in the `layer:` change: TWI skills (Management or Transformation),
  `gemba` (used in all three layers), and the four tradition skills (lean startup, lean UX,
  lean software development, lean enterprise), which act more as lenses than as a layer.

## Amendment 1 (2026-10-29): the open sorts and a fifth value, `lens`

The `layer:` change settled the open sorts above on decision cards. The repository owner chose:

- **The four TWI skills are `management`.** `job-instruction`, `job-methods`, `job-relations`, and
  `job-safety` are methods a supervisor uses in the daily work of a team.
- **`gemba` is `core`.** Every layer starts with "go and see", so it is shared, like the vocabulary.
- **The four tradition skills are `lens`.** `lean-startup`, `lean-ux`, `lean-software-development`, and
  `lean-enterprise` apply the whole of lean to a domain (products, design, software delivery, the
  enterprise). They do not act on one problem, one operation, or one organization's capability, so no
  single layer fits them.

### Decision

1. Decision 3 changes: each skill belongs to one layer, to the shared core, or is a lens. The `layer:`
   field takes exactly one of `thinking`, `management`, `transformation`, `core`, or `lens`.
2. A lens is a tradition that reads all three layers through one domain. The router (decision 4) may
   route to a lens when the problem is framed in that domain's terms.
3. `scripts/check-layers.mjs` is the fitness function: it fails when a skill declares no value, more
   than one, or an unknown one. The `Skill layers` workflow runs it on every pull request.

### Consequences

- A new tradition skill is a lens, not a fourth layer. A new layer still needs a new decision.
- A lens can hide work that belongs in a layer. When a lens skill grows a routine or a method of its
  own, move that part into a skill with a layer.
