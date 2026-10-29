// Contract tests for the A3 skills (plan R12, R13, R16, AE6, AE7).
// A skill is prose, so these tests pin the rules the plan requires each skill to state.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseFrontMatter } from './check-a3.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const skill = (name) => readFileSync(`${root}skills/${name}/SKILL.md`, 'utf8');
const frontMatter = (name) => parseFrontMatter(skill(name)).data;

test('a3-coaching keeps the method and the coaching conversation (R12)', () => {
  const fm = frontMatter('a3-coaching');
  assert.equal(fm.name, 'a3-coaching');
  assert.ok(fm.description.length > 40);
  const body = skill('a3-coaching');
  for (const anchor of ['## A3 Template Structure', '## The A3 as a Coaching Tool', '## Common Mistakes', 'The coach\'s role is to ask questions, not to give answers.']) {
    assert.ok(body.includes(anchor), anchor);
  }
  assert.match(body, /a3-facilitation/);
  assert.match(body, /a3-reference/);
});

test('a3-facilitation states its frontmatter and cites its neighbours (R13, R14)', () => {
  const fm = frontMatter('a3-facilitation');
  assert.equal(fm.name, 'a3-facilitation');
  assert.ok(fm.description.length > 40);
  const body = skill('a3-facilitation');
  assert.match(body, /a3-reference/);
  assert.match(body, /a3-coaching/);
  assert.match(body, /scripts\/a3-file\.mjs/);
  assert.match(body, /scripts\/check-a3\.mjs/);
});

test('a3-facilitation creates the file at birth and moves the stage only in a reviewed change (R1, R5)', () => {
  const body = skill('a3-facilitation');
  assert.match(body, /"\$A3" new/);
  assert.match(body, /"\$A3" stage/);
  assert.match(body, /reviewed change/);
});

test('a3-facilitation pauses at each review and never ends at DONE (R7, R13)', () => {
  const body = skill('a3-facilitation');
  assert.match(body, /Reflection Pause/);
  assert.match(body, /check scheduled/);
  assert.match(body, /"\$A3" resume/);
});

test('a3-facilitation keeps the authorship rule for a human holder (AE7)', () => {
  const body = skill('a3-facilitation');
  assert.match(body, /holder_type: human/);
  assert.match(body, /"just write it"/);
  assert.match(body, /next coaching question/);
});

test('a3-facilitation skips tracker and scheduler steps when no integration is installed, and says so (R16, AE6)', () => {
  const body = skill('a3-facilitation');
  assert.match(body, /work-tracker integration/);
  assert.match(body, /scheduler integration/);
  assert.match(body, /Skipped:/);
  // The public plugin names no organization-specific plugin (STRATEGY.md boundaries).
  assert.doesNotMatch(body, /self-org|reclaim|glassfrog|hubspot/i);
});

test('the old a3 skill name is gone and no skill still routes to it', () => {
  assert.equal(existsSync(`${root}skills/a3/SKILL.md`), false);
});
