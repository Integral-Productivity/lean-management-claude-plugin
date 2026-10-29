// Tests for the A3 file helper that a3-facilitation calls (plan R1, R2, R3, R5, R13).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkA3 } from './check-a3.mjs';
import { newA3, moveStage, nextRevision, nextComponentId, resumePoint } from './a3-file.mjs';

const birth = {
  title: 'Invoices reach customers late',
  slug: 'late-invoices',
  owner: 'Billing lead',
  holder: 'Billing lead',
  holderType: 'human',
  coach: 'Operations coach',
  opened: '2026-01-15',
  nextReview: '2026-01-29',
};

const ok = (path, text) => assert.deepEqual(checkA3(path, text), [], text);

test('newA3 writes a file that passes the format check (R1, R2)', () => {
  const { path, text } = newA3(birth);
  assert.equal(path, 'docs/a3/A3-2026-01-15-late-invoices.md');
  ok(path, text);
  assert.match(text, /^stage: plan$/m);
  assert.match(text, /^revision: A$/m);
  assert.match(text, /^tracker: null$/m);
});

test('newA3 leaves every section empty with "Not yet." (no content written for the holder, AE7)', () => {
  const { text } = newA3(birth);
  for (const section of ['Background', 'Current condition', 'Goal', 'Root cause analysis', 'Countermeasures', 'Plan', 'Check', 'Yokoten']) {
    assert.match(text, new RegExp(`## ${section}\\n\\nNot yet\\.`), section);
  }
  assert.match(text, /- Rev A, 2026-01-15: file created \(Billing lead\)\./);
});

test('newA3 keeps a tracker URL when one is given', () => {
  const { path, text } = newA3({ ...birth, tracker: 'https://example.com/issues/12' });
  ok(path, text);
  assert.match(text, /^tracker: https:\/\/example\.com\/issues\/12$/m);
});

test('newA3 rejects a bad slug, holder type, or review date', () => {
  assert.throws(() => newA3({ ...birth, slug: 'Late Invoices' }), /slug/);
  assert.throws(() => newA3({ ...birth, holderType: 'robot' }), /holder/);
  assert.throws(() => newA3({ ...birth, nextReview: '2026-01-01' }), /next_review/);
  assert.throws(() => newA3({ ...birth, title: '' }), /title/);
});

test('nextRevision counts A..Z, then AA', () => {
  assert.equal(nextRevision('A'), 'B');
  assert.equal(nextRevision('Y'), 'Z');
  assert.equal(nextRevision('Z'), 'AA');
  assert.equal(nextRevision('AZ'), 'BA');
});

const opened = newA3(birth);
const step = (text, to, extra = {}) =>
  moveStage(text, to, { date: '2026-01-29', reason: 'review held', askedBy: 'Operations coach', nextReview: '2026-02-12', ...extra });

test('moveStage follows the PDCA path and passes the check at each step (R5)', () => {
  let text = opened.text;
  for (const to of ['do', 'check', 'do', 'check', 'act']) {
    text = step(text, to);
    ok(opened.path, text);
    assert.match(text, new RegExp(`^stage: ${to}$`, 'm'));
  }
  text = step(text, 'closed', { nextReview: null });
  ok(opened.path, text);
  assert.match(text, /^next_review: null$/m);
});

test('moveStage bumps the revision and logs what changed and who asked (R4)', () => {
  const text = step(opened.text, 'do');
  assert.match(text, /^revision: B$/m);
  assert.match(text, /- Rev B, 2026-01-29: stage plan -> do; review held \(asked by Operations coach\)\./);
  assert.match(text, /^next_review: 2026-02-12$/m);
});

test('moveStage refuses a stage jump the cycle does not allow', () => {
  assert.throws(() => step(opened.text, 'check'), /plan -> check/);
  assert.throws(() => step(opened.text, 'closed', { nextReview: null }), /plan -> closed/);
  assert.throws(() => step(opened.text, 'done'), /stage/);
});

test('moveStage needs a next review date until the A3 is closed ("check scheduled", never DONE)', () => {
  assert.throws(() => step(opened.text, 'do', { nextReview: null }), /next_review/);
});

test('moveStage needs a reason and who asked', () => {
  assert.throws(() => step(opened.text, 'do', { reason: '' }), /reason/);
  assert.throws(() => step(opened.text, 'do', { askedBy: '' }), /asked/);
});

test('nextComponentId skips defined and retired IDs (AE4)', () => {
  const text = opened.text
    .replace('retired_ids: []', 'retired_ids: [RC-2]')
    .replace('## Root cause analysis\n\nNot yet.', '## Root cause analysis\n\n- **RC-1** First cause.');
  assert.equal(nextComponentId(text, 'RC'), 'RC-3');
  assert.equal(nextComponentId(text, 'CM'), 'CM-1');
  assert.throws(() => nextComponentId(text, 'XX'), /prefix/);
});

test('resumePoint reads the stage and the first empty section from the file (the file is the cursor)', () => {
  assert.deepEqual(resumePoint(opened.text), { a3Id: 'A3-2026-01-15-late-invoices', stage: 'plan', revision: 'A', nextReview: '2026-01-29', holderType: 'human', nextSection: 'Background' });
  const filled = opened.text.replace('## Background\n\nNot yet.', '## Background\n\n- **BG-1** Late invoices delay cash.');
  assert.equal(resumePoint(filled).nextSection, 'Current condition');
});
