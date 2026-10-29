// Tests for the A3 format check (fitness function for ADR-0003, amendment 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkA3, parseFrontMatter } from './check-a3.mjs';

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
