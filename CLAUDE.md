# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A Claude Code plugin that provides lean management skills — tools for applying lean thinking, kaizen, and continuous improvement practices within AI-assisted workflows.

## Plugin Structure

```
.claude-plugin/plugin.json   — Plugin manifest (name, version, author)
.claude/settings.local.json  — Dev-time permissions (Read/Bash allowlist)
skills/<skill-name>/SKILL.md — One directory per skill; SKILL.md is the skill body
```

Skills are discovered by the Claude Code plugin loader via the `.claude-plugin/plugin.json` manifest. Each skill lives in its own subdirectory under `skills/` and is defined entirely by its `SKILL.md` file.

## SKILL.md Frontmatter

Every `SKILL.md` begins with YAML frontmatter. Recognized fields:

| Field | Purpose |
|-------|---------|
| `description` | One-line summary shown in skill listings |
| `disable-model-invocation` | If `true`, the skill content is injected as instructions without triggering a model call |

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Write YAML frontmatter with at least `description`.
3. Write the skill body — instructions the model follows when the skill is invoked.
4. Register any new `Read` or `Bash` permissions needed by the skill in `.claude/settings.local.json`.

## Lean Management Domain Context

Skills in this plugin draw on:
- **Gemba Kaizen** — "go see, ask why, show respect"; problems are understood at the source
- **5 Whys** — iterative root-cause analysis; ask why at least five times before concluding
- **Systemic thinking** — focus on process and system causes, not individual blame ("5 Whos" is a trap to avoid)

New skills should stay consistent with this framing.

## Settings Permissions

`.claude/settings.local.json` controls what Bash and file-read operations are allowed during local development. When a skill needs to read files outside this repo or run shell commands, add the permission pattern there. Use least-privilege patterns (prefer `Read(path/to/specific/dir/**)` over broad globs).

## Release process

Releases are tag-driven. To publish a new version:

1. Bump `version` in `.claude-plugin/plugin.json` on a PR; merge to `main`.
2. From `main` at the merge commit, push tag `vX.Y.Z` matching the new version (`git tag vX.Y.Z && git push origin vX.Y.Z`).
3. The [`Promote to stable`](.github/workflows/promote-stable.yml) workflow verifies the tag matches `plugin.json` and fast-forwards `refs/heads/stable`. The marketplace serves this branch.

Pre-release suffixes (`-rc`, `-beta`, `-alpha`) intentionally don't match the trigger and won't ship to users.

Never commit directly to `stable` — see [ADR-0002](docs/adr/0002-use-tag-driven-stable-branch-for-marketplace-channel-publication.md).

## Agent skills

### Issue tracker

GitHub Issues on `Integral-Productivity/lean-management-claude-plugin` via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical five-role vocabulary, defaults unchanged: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.
