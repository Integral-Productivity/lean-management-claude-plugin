# Runbook: Protect `refs/heads/stable`

**Tracks:** [#7](https://github.com/Integral-Productivity/lean-management-claude-plugin/issues/7) — Add branch protection to `stable` (push-by-Actions-only)
**Pattern source:** [holacracy-claude-plugin#21](https://github.com/Integral-Productivity/holacracy-claude-plugin/issues/21) (closed reference implementation)
**Rationale:** [ADR-0002](../adr/0002-use-tag-driven-stable-branch-for-marketplace-channel-publication.md)

## Why this is a runbook, not a script

Applying a repo ruleset modifies shared infrastructure with non-trivial blast radius:

- A misconfigured ruleset can silently fail to protect (worst case: a human or runaway workflow rewinds `stable` and marketplace users hit a regressed release).
- A misconfigured bypass actor can hard-block the release workflow itself (loud, but you find out only on the next release tag).
- The application requires repo-admin scope; a service account or default `GITHUB_TOKEN` will not have it.

So the steps below are designed to be read, copy-pasted, and verified one at a time by a human with that scope. Each step is independently reversible.

## Two-ruleset design

GitHub ruleset bypass is **whole-ruleset**, not per-rule. To get the property "`ip-releaser` can advance `stable` but **nobody** — including `ip-releaser` — can force-push," we split the protection into two rulesets:

| Ruleset | Rules | Bypass actors | What it enforces |
|---|---|---|---|
| **B**: `stable: no force push` | `non_fast_forward` | *(empty)* | Force-push and history-rewrite refused symmetrically for every actor, including `ip-releaser`. |
| **A**: `stable: restrict direct pushes` | `update`, `deletion` | `ip-releaser` (Integration, `bypass_mode: always`) | Direct pushes and branch deletion blocked for everyone *except* the `ip-releaser` App's installation token, which is exactly what `promote-stable.yml` uses. |

## Prerequisites

Confirm each before starting. Stop and resolve if any is unchecked.

- [ ] `promote-stable.yml` uses an `ip-releaser` installation token. **Status:** ✅ Merged in [PR #13](https://github.com/Integral-Productivity/lean-management-claude-plugin/pull/13) (commit `74d4c87`).
- [ ] Org-level vars `IP_RELEASER_APP_ID` and `IP_RELEASER_APP_CLIENT_ID` are visible to this repo. Check:
   ```bash
   gh variable list --org Integral-Productivity | grep IP_RELEASER
   # Expect two rows, Visibility: all
   ```
- [ ] Org-level secret `OP_SERVICE_ACCOUNT_TOKEN` is visible to this repo (cannot be listed by value; verify in repo Settings → Secrets and variables → Actions).
- [ ] 1Password vault item `op://ip-automation/ip-releaser/private_key` exists and is current.
- [ ] You are authenticated to `gh` as a user with **repo-admin** on `Integral-Productivity/lean-management-claude-plugin`:
   ```bash
   gh auth status
   gh api repos/Integral-Productivity/lean-management-claude-plugin --jq '.permissions'
   # Expect admin: true
   ```
- [ ] No ruleset already exists on `refs/heads/stable` (avoid duplicates):
   ```bash
   gh api repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
     --jq '.[] | select(.target == "branch") | {id, name}'
   ```

## Step 2 — Apply Ruleset B (`stable: no force push`)

Safe to apply at any time after PR #13 merged. The current `promote-stable.yml` does not force-push by design, so this ruleset cannot break a release.

**Payload** — save to a temp file or pipe inline:

```json
{
  "name": "stable: no force push",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/stable"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "non_fast_forward" }
  ],
  "bypass_actors": []
}
```

**Apply:**

```bash
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
  --input - <<'JSON'
{
  "name": "stable: no force push",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/stable"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "non_fast_forward" }
  ],
  "bypass_actors": []
}
JSON
```

**Expected response:** HTTP 201 with the created ruleset object. Capture the `id` for the rollback section — record it below:

> Ruleset B id: `____________` (fill in after applying)

**Verify:**

```bash
gh api repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
  --jq '.[] | select(.name == "stable: no force push") | {id, enforcement, bypass_actors}'
# Expect: enforcement "active", bypass_actors []
```

## Wait gate — observe one real release

Step 3 (Ruleset A) is only safe to apply **after** at least one real release tag has fired the new App-mediated `promote-stable.yml` end-to-end. The reason: if anything is wrong with the App-token credentials path, Ruleset A locks it in — every subsequent release fails to advance `stable` until the ruleset is removed.

The pre-release dry-run from PR #13's test plan validates only the **trigger glob** (that `v0.0.0-rc.0` does NOT trigger). It does **not** validate the credentials path; only a real `vX.Y.Z` tag does that.

**Wait for:** the next `plugin.json` version bump → tag → workflow success.

**Verify the App-mediated path actually ran:** find the workflow run for the tag, then:

```bash
# Replace RUN_ID with the run number from the Actions tab
gh run view <RUN_ID> --log \
  | grep -E "Generate App token|Read ip-releaser App PEM|Fast-forward stable"
# Expect all three step names present, each with non-zero output and no error markers.

# Confirm stable now points at the tagged commit
gh api repos/Integral-Productivity/lean-management-claude-plugin/git/refs/heads/stable \
  --jq '.object.sha'
# Should equal `git rev-parse vX.Y.Z` for the just-released tag.
```

Only proceed to Step 3 once both checks pass.

## Step 3 — Apply Ruleset A (`stable: restrict direct pushes`)

Blocks direct human pushes and branch deletion. The `ip-releaser` App is the sole bypass actor.

**Payload:**

```json
{
  "name": "stable: restrict direct pushes",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/stable"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "update" },
    { "type": "deletion" }
  ],
  "bypass_actors": [
    {
      "actor_id": 3888182,
      "actor_type": "Integration",
      "bypass_mode": "always"
    }
  ]
}
```

`actor_id: 3888182` is the `ip-releaser` App's numeric App ID (canonical, public).
`actor_type: "Integration"` is the GitHub ruleset API term for "GitHub App." Do not change this string.
`bypass_mode: "always"` is required for the workflow case (no PR review involved).

**Apply:**

```bash
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
  --input - <<'JSON'
{
  "name": "stable: restrict direct pushes",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/stable"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "update" },
    { "type": "deletion" }
  ],
  "bypass_actors": [
    {
      "actor_id": 3888182,
      "actor_type": "Integration",
      "bypass_mode": "always"
    }
  ]
}
JSON
```

**Expected response:** HTTP 201. Record the id:

> Ruleset A id: `____________` (fill in after applying)

If the response is `422 Unprocessable Entity` with message *"Actor … must be part of the ruleset source or owner organization"*, it means `ip-releaser` (id `3888182`) is not installed on `Integral-Productivity`. Resolve at the org level before retrying — do **not** substitute a different `actor_id`.

**Verify:**

```bash
gh api repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
  --jq '.[] | select(.name == "stable: restrict direct pushes") | {id, enforcement, rules: [.rules[].type], bypass_actors}'
# Expect: enforcement "active", rules ["update", "deletion"], bypass_actors has one entry with actor_id 3888182.
```

## Live verification (post-application)

The empirical "try to push as a human and confirm it's blocked" test is documented in holacracy#21 as **non-trivial to run cleanly**: GitHub's auto-mode classifier may block experiments that push arbitrary content to marketplace-tracked branches. A safe pattern is to test against a **throwaway branch** with the same ruleset attached, not `stable` itself. Tracker for this verification harness lives at [ip-bots#80](https://github.com/Integral-Productivity/ip-bots/issues/80).

What you **can** verify cheaply, in this repo, without pushing anything:

```bash
# 1. Ruleset list shows both rulesets active on refs/heads/stable
gh api repos/Integral-Productivity/lean-management-claude-plugin/rulesets \
  --jq '.[] | select(.target == "branch") | {name, id, enforcement}'

# 2. Branch protection summary
gh api repos/Integral-Productivity/lean-management-claude-plugin/rules/branches/stable \
  --jq '[.[] | {type, ruleset_id, ruleset_source}]'
# Expect entries for non_fast_forward, update, and deletion.

# 3. Confirm the active workflow file is the App-mediated version
gh api repos/Integral-Productivity/lean-management-claude-plugin/contents/.github/workflows/promote-stable.yml \
  --jq '.content' | base64 -d | grep -c "create-github-app-token"
# Expect 1 or more.
```

## Rollback

Each ruleset can be removed independently. The `ip-releaser` App identity migration in `promote-stable.yml` (PR #13) does NOT need to be reverted to remove these rulesets — it works with or without protection in place.

**Remove Ruleset A** (restore direct push capability):

```bash
gh api --method DELETE \
  repos/Integral-Productivity/lean-management-claude-plugin/rulesets/<RULESET_A_ID>
```

**Remove Ruleset B** (allow force pushes — only do this if force-push protection is causing a release outage you can't otherwise resolve):

```bash
gh api --method DELETE \
  repos/Integral-Productivity/lean-management-claude-plugin/rulesets/<RULESET_B_ID>
```

**Disable without deleting** (preserves the ruleset definition for re-enabling later):

```bash
gh api --method PUT \
  repos/Integral-Productivity/lean-management-claude-plugin/rulesets/<RULESET_ID> \
  -f enforcement=disabled
```

## Closing issue #7

After both rulesets are applied and verified:

1. Update this runbook with the recorded ruleset ids.
2. Comment on [#7](https://github.com/Integral-Productivity/lean-management-claude-plugin/issues/7) with:
   - Both ruleset names + ids
   - Link to the release run that validated the App-mediated path
   - Status of each acceptance criterion (direct push blocked, force push refused, deletion blocked)
3. Close #7. The closing keyword does **not** belong on this runbook PR — the runbook documents the procedure; only the human-applied rulesets satisfy the AC.
