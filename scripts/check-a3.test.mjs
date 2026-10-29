// Tests for the A3 format check (fitness function for ADR-0003, amendment 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkA3, parseFrontMatter, qualityFindings } from './check-a3.mjs';

const valid = `---
format: a3/v1
a3_id: A3-2026-01-15-late-invoices
title: Invoices reach customers late
owner: Billing lead
holder: Billing lead
holder_type: human
coach: Operations coach
stage: plan
opened: 2026-01-15
next_review: 2026-01-29
revision: A
tracker: null
related: []
retired_ids: []
---

# Invoices reach customers late

## Background

- **BG-1** Late invoices delay cash.

## Current condition

- **CC-1** Median time to invoice is 9 days (fact: billing export).

## Goal

- **G-1** Median time to invoice is 3 days by 2026-03-31.

## Root cause analysis

- **RC-1** Invoices wait for a manual approval step.

## Countermeasures

| ID | Countermeasure | Root cause | ADP |
|----|----------------|------------|-----|
| CM-1 | Auto-approve invoices under the limit | RC-1 | prevention |

## Plan

- Owner sets the limit by 2026-02-01 (CM-1).

## Check

- **CK-1** On 2026-01-29, compare median time to invoice with G-1.

## Yokoten

- **YK-1** Not yet.

## Revision log

- Rev A, 2026-01-15: first draft (owner).
`;

const file = 'docs/a3/A3-2026-01-15-late-invoices.md';
const run = (text, path = file) => checkA3(path, text);
const swap = (from, to) => valid.replace(from, to);

test('a valid A3 has no errors', () => {
  assert.deepEqual(run(valid), []);
});

test('parses inline and block lists', () => {
  const fm = parseFrontMatter('---\nrelated: [ADR-0003, "#12"]\nretired_ids:\n  - RC-2\n---\n');
  assert.deepEqual(fm.data.related, ['ADR-0003', '#12']);
  assert.deepEqual(fm.data.retired_ids, ['RC-2']);
});

test('a file with no front matter fails', () => {
  assert.match(run('# Title\n').join(), /front matter/);
});

test('each required header field must be present', () => {
  for (const key of ['format', 'a3_id', 'title', 'owner', 'holder', 'holder_type', 'coach', 'stage', 'opened', 'revision']) {
    const text = valid.replace(new RegExp(`^${key}:.*\\n`, 'm'), '');
    assert.match(run(text).join(), new RegExp(key), `missing ${key}`);
  }
});

test('format must be a3/v1', () => {
  assert.match(run(swap('format: a3/v1', 'format: a3/v2')).join(), /format/);
});

test('a3_id must be A3-YYYY-MM-DD-slug', () => {
  assert.match(run(swap('a3_id: A3-2026-01-15-late-invoices', 'a3_id: A3-0007'), file).join(), /a3_id/);
});

test('the file name must be the A3 ID', () => {
  assert.match(run(valid, 'docs/a3/late-invoices.md').join(), /file name/);
});

test('the date in the A3 ID must equal opened', () => {
  assert.match(run(swap('opened: 2026-01-15', 'opened: 2026-01-16')).join(), /opened/);
});

test('stage must be plan, do, check, act, or closed', () => {
  assert.match(run(swap('stage: plan', 'stage: done')).join(), /stage/);
});

test('holder_type must be human or agent', () => {
  assert.match(run(swap('holder_type: human', 'holder_type: robot')).join(), /holder_type/);
});

test('next_review is required while the A3 is open', () => {
  assert.match(run(swap('next_review: 2026-01-29\n', '')).join(), /next_review/);
});

test('next_review may be null when the A3 is closed', () => {
  const closed = swap('stage: plan', 'stage: closed').replace('next_review: 2026-01-29', 'next_review: null');
  assert.deepEqual(run(closed), []);
});

test('next_review cannot be before opened', () => {
  assert.match(run(swap('next_review: 2026-01-29', 'next_review: 2026-01-01')).join(), /next_review/);
});

test('tracker must be null or an https URL', () => {
  assert.match(run(swap('tracker: null', 'tracker: ticket 12')).join(), /tracker/);
  assert.deepEqual(run(swap('tracker: null', 'tracker: https://example.com/issues/12')), []);
});

test('revision is one or more capital letters', () => {
  assert.match(run(swap('revision: A', 'revision: 1')).join(), /revision/);
});

test('unknown header keys fail, x- extension keys pass', () => {
  assert.match(run(swap('tracker: null', 'tracker: null\ncolour: red')).join(), /colour/);
  assert.deepEqual(run(swap('tracker: null', 'tracker: null\nx-org-project: p-1')), []);
});

test('each required section heading must be present', () => {
  assert.match(run(swap('## Yokoten', '## Spread')).join(), /Yokoten/);
});

test('a component ID cannot be defined twice', () => {
  assert.match(run(swap('- **RC-1** Invoices', '- **RC-1** Other.\n- **RC-1** Invoices')).join(), /RC-1.*twice/);
});

test('a component must sit in the section of its prefix', () => {
  assert.match(run(swap('- **BG-1** Late', '- **CC-9** Late')).join(), /CC-9/);
});

test('a retired component ID cannot be defined again (AE4)', () => {
  assert.match(run(swap('retired_ids: []', 'retired_ids: [RC-1]')).join(), /RC-1.*retired/);
});

test('retired_ids entries must be component IDs', () => {
  assert.match(run(swap('retired_ids: []', 'retired_ids: [foo]')).join(), /retired_ids/);
});

test('a component reference must point to a defined or retired ID', () => {
  assert.match(run(swap('| RC-1 | prevention |', '| RC-7 | prevention |')).join(), /RC-7/);
});

test('an (AI) attribution marker after the ID is allowed', () => {
  assert.deepEqual(run(swap('- **RC-1** Invoices', '- **RC-1** (AI) Invoices')), []);
});

test('a list item in a component section with no ID fails, with its line (AE5)', () => {
  const errors = run(swap('- **CC-1** Median', '- **CC-1** Median time is known.\n- Approvals wait a week'));
  assert.equal(errors.length, 1);
  assert.match(errors[0], /line \d+: list item in "## Current condition" has no CC ID/);
});

test('numbered items without an ID fail too; sub-items, Plan, and Revision log items do not', () => {
  assert.match(run(swap('- **BG-1** Late invoices delay cash.', '- **BG-1** Late invoices delay cash.\n1. Cash is short')).join(), /no BG ID/);
  assert.deepEqual(run(swap('- **BG-1** Late invoices delay cash.', '- **BG-1** Late invoices delay cash.\n  - a detail under BG-1')), []);
  assert.deepEqual(run(swap('- Owner sets the limit', '- Someone else helps.\n- Owner sets the limit')), []);
});

// An A3 with no quality concerns: every claim tagged, each CM names its RC, review not yet due.
const clean = valid
  .replace('- **G-1** Median time to invoice is 3 days by 2026-03-31.', '- **G-1** Median time to invoice is 3 days by 2026-03-31 (fact: target set by the owner).')
  .replace('- **RC-1** Invoices wait for a manual approval step.', '- **RC-1** Invoices wait for a manual approval step (fact: approval policy).');
const quality = (text, today = '2026-01-20') => qualityFindings(file, text, { today });

test('a clean A3 has no quality warnings', () => {
  assert.deepEqual(quality(clean), []);
});

test('quality: an untagged claim in CC, G, or RC is reported', () => {
  const found = quality(clean.replace(' (fact: approval policy)', ''));
  assert.equal(found.length, 1);
  assert.match(found[0], /RC-1 .*untagged claim/);
});

test('quality: an inference or a not-measured tag counts as tagged', () => {
  assert.deepEqual(quality(clean.replace('(fact: approval policy)', '(inference: interviews)')), []);
  assert.deepEqual(quality(clean.replace('(fact: approval policy)', '(not measured: time the queue)')), []);
});

test('quality: a countermeasure with no root cause is reported', () => {
  assert.match(quality(clean.replace('| RC-1 | prevention |', '| - | prevention |')).join(), /CM-1 .*no root cause/);
});

test('quality: a past next_review on an open A3 is reported, not on a closed one', () => {
  assert.match(quality(clean, '2026-02-01').join(), /next_review 2026-01-29 has passed/);
  assert.deepEqual(quality(clean.replace('stage: plan', 'stage: closed').replace('next_review: 2026-01-29', 'next_review: null'), '2026-02-01'), []);
});

test('the CLI checks the named file, with or without --quality (no argument is dropped)', async () => {
  const { execFileSync } = await import('node:child_process');
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const dir = mkdtempSync(`${tmpdir()}/a3-`);
  const path = `${dir}/A3-2026-01-15-late-invoices.md`;
  writeFileSync(path, swap('- **CC-1** Median', '- Median'));
  const cli = new URL('./check-a3.mjs', import.meta.url).pathname;
  for (const args of [[path], ['--quality', path], ['--quality', '--today', '2026-01-20', path]]) {
    assert.throws(() => execFileSync('node', [cli, ...args], { stdio: 'pipe' }), /no CC ID/, args.join(' '));
  }
});

test('a rejected option, a thematic break, and a numbered definition are not unlabelled items', () => {
  const at = '- **CC-1** Median time to invoice is 9 days (fact: billing export).';
  assert.deepEqual(run(swap(at, `${at}\n- Rejected: hire one more approver (does not address RC-1).`)), []);
  assert.deepEqual(run(swap(at, `${at}\n\n* * *\n`)), []);
  assert.deepEqual(run(swap(at, '1. **CC-1** Median time to invoice is 9 days (fact: billing export).')), []);
  assert.match(run(swap(at, `${at}\n- **Note:** approvals wait.`)).join(), /no CC ID/);
});

test('the CLI refuses a --today value that is not a date', async () => {
  const { execFileSync } = await import('node:child_process');
  const cli = new URL('./check-a3.mjs', import.meta.url).pathname;
  assert.throws(() => execFileSync('node', [cli, '--quality', '--today', 'docs/a3/x.md'], { stdio: 'pipe' }), /--today needs a YYYY-MM-DD date/);
});
