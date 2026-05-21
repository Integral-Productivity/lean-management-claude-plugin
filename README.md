# lean-management

A Claude Code plugin that provides a lean management guru for continuous improvement — applying lean thinking, kaizen, the Toyota Production System lineage, and modern lean traditions (Lean Startup, Lean UX, Lean Software Development, Lean Enterprise) inside AI-assisted workflows.

## Install

From the Claude Code marketplace:

```
/plugin install lean-management
```

Or add this repo directly to your plugin sources.

## What's included

**Foundations & routing**

- [`lean-thinking`](skills/lean-thinking/SKILL.md) — top-level routing skill across the full lean lineage
- [`lean-problem-solving`](skills/lean-problem-solving/SKILL.md) — start here when the user presents a problem
- [`tps-foundations`](skills/tps-foundations/SKILL.md) — Toyota Production System, jidoka, JIT, the historical lineage

**Lean traditions**

- [`lean-management-system`](skills/lean-management-system/SKILL.md) — daily management, hoshin kanri, A3 thinking
- [`lean-startup`](skills/lean-startup/SKILL.md) — validated learning, MVPs, pivots
- [`lean-ux`](skills/lean-ux/SKILL.md) — outcomes over outputs, hypothesis-driven design
- [`lean-software-development`](skills/lean-software-development/SKILL.md) — set-based design, amplify learning
- [`lean-enterprise`](skills/lean-enterprise/SKILL.md) — portfolio management, multi-team coordination

**Flow & pull**

- [`kanban`](skills/kanban/SKILL.md), [`pull-systems`](skills/pull-systems/SKILL.md), [`heijunka`](skills/heijunka/SKILL.md)

**Analysis & improvement**

- [`vsm`](skills/vsm/SKILL.md), [`a3`](skills/a3/SKILL.md), [`pdca`](skills/pdca/SKILL.md), [`kaizen-events`](skills/kaizen-events/SKILL.md), [`waste-identification`](skills/waste-identification/SKILL.md), [`root-cause-analysis`](skills/root-cause-analysis/SKILL.md), [`5-whys`](skills/5-whys/SKILL.md)

**Quality & stability**

- [`jidoka`](skills/jidoka/SKILL.md), [`5s`](skills/5s/SKILL.md), [`standardized-work`](skills/standardized-work/SKILL.md)

**People development (TWI)**

- [`job-instruction`](skills/job-instruction/SKILL.md), [`job-methods`](skills/job-methods/SKILL.md), [`job-safety`](skills/job-safety/SKILL.md), [`job-relations`](skills/job-relations/SKILL.md)

**Lean management system**

- [`leader-standard-work`](skills/leader-standard-work/SKILL.md), [`daily-accountability`](skills/daily-accountability/SKILL.md), [`visual-management`](skills/visual-management/SKILL.md), [`gemba`](skills/gemba/SKILL.md)

## Repo layout

```
.claude-plugin/plugin.json   — Plugin manifest
skills/<skill-name>/SKILL.md — One directory per skill; SKILL.md is the skill body
```

See [`CLAUDE.md`](CLAUDE.md) for contributor guidance.

## License

[MIT](LICENSE).
