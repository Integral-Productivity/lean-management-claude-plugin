# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `a3-reference` skill: the A3 file of record, format `a3/v1` (folder `docs/a3/`, A3 ID `A3-YYYY-MM-DD-slug`, header fields, component IDs, stages, Origin line, quality concerns) with a made-up example A3.
- `scripts/check-a3.mjs`: fitness function that checks A3 headers, file names, sections, and component IDs; runs in CI (`A3 format` workflow).
- ADR-0003 amendment 1: answers the format questions left open by the A3 spine plan.
- `STRATEGY.md`: purpose, positioning, users, boundaries, metrics, and four tracks (shared core, Thinking, Management, Transformation).
- ADR-0004: one plugin with three layers and a shared core.
- `a3-facilitation` skill: runs one A3 from birth through dated reviews to close. It creates the file and header, paces the phases, stops at each Reflection Pause, moves the stage only in a reviewed change, resumes from the file, and skips tracker and scheduler steps when no integration is installed.
- `scripts/a3-file.mjs`: the mechanical A3 steps (`new`, `stage`, `next-id`, `resume`) with tests; it never writes section content.
- `scripts/a3-skills.test.mjs`: contract tests for the A3 skills.

### Changed

- **Breaking:** the `a3` skill is renamed `a3-coaching`. It keeps the method and the coaching questions. Cross-references in other skills and the README point to the new name.

## [1.0.1] - 2026-05-24

### Added

- First public release of the lean-management-claude-plugin: 29 skills covering the lean management lineage from the Toyota Production System through modern lean traditions, organised by tradition:
  - **Foundations & routing**: `lean-thinking`, `lean-problem-solving`, `tps-foundations`
  - **Lean traditions**: `lean-management-system`, `lean-startup`, `lean-ux`, `lean-software-development`, `lean-enterprise`
  - **Flow & pull systems**: `kanban`, `pull-systems`, `heijunka`
  - **Analysis & improvement tools**: `vsm`, `a3`, `pdca`, `kaizen-events`, `waste-identification`, `root-cause-analysis`, `5-whys`
  - **Quality & stability**: `jidoka`, `5s`, `standardized-work`
  - **People development (TWI)**: `job-instruction`, `job-methods`, `job-safety`, `job-relations`
  - **Lean management system**: `leader-standard-work`, `daily-accountability`, `visual-management`, `gemba`
- Plugin manifest at `.claude-plugin/plugin.json` declaring the plugin at version 1.0.1.
- README with skill descriptions and usage examples.
- MIT license.
- Repo-level guidance for contributors and agents in `CLAUDE.md`.

[Unreleased]: https://github.com/Integral-Productivity/lean-management-claude-plugin/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/Integral-Productivity/lean-management-claude-plugin/releases/tag/v1.0.1
