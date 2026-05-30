# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
