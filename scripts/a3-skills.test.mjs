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

test('a3-facilitation captures any part of an A3 through a capture map, and names no tool (C1, KTD1-KTD4)', () => {
  const body = skill('a3-facilitation');
  const s7 = body.slice(body.indexOf('## 7.'), body.indexOf('## 8.'));
  assert.match(s7, /capture map/);
  for (const part of ['`a3`', '`review`', '`CM`', '`CK`', '`YK`', '`plan`']) assert.ok(s7.includes(part), part);
  assert.match(s7, /<part> -> <target> via <skill or connector>/);
  assert.match(s7, /holds `stage`/);
  assert.match(s7, /holds `time`/);
  assert.match(s7, /one home/i);
  assert.match(s7, /confirm/);
  assert.match(s7, /-> <url>/);
  assert.match(s7, /Origin: A3/);
  // The public plugin names no organization tool (STRATEGY.md boundaries).
  assert.doesNotMatch(body, /self-org|reclaim|glassfrog|hubspot|jira|trello/i);
});

test('a3-facilitation skips a part with no capture target, and says so (C1, KTD6, AE1)', () => {
  const s7 = skill('a3-facilitation').split('## 7.')[1].split('## 8.')[0];
  assert.match(s7, /Skipped: YK-1 capture \(no capture target for YK\)/);
  assert.match(s7, /Never call a tool that the capture map does not name/);
});

test('a3-facilitation lets one A3 override a map line in its header (KTD5)', () => {
  const s7 = skill('a3-facilitation').split('## 7.')[1].split('## 8.')[0];
  assert.match(s7, /x-capture: \[/);
  assert.match(s7, /"\$A3" resume/);
});

test('a3-facilitation covers every A3 section, with clarify, study, and rework work (C6, AE5)', () => {
  const s7 = skill('a3-facilitation').split('## 7.')[1].split('## 8.')[0];
  for (const part of ['`BG`', '`CC`', '`G`', '`RC`', '`CM`', '`plan`', '`CK`', '`YK`']) assert.ok(s7.includes(part), part);
  for (const kind of ['`clarify`', '`study`', '`rework`']) assert.ok(s7.includes(kind), kind);
  assert.match(s7, /`CC:study`/);
  assert.match(s7, /Revision log/);
  assert.match(s7, /most specific/i);
  assert.match(s7, /Work \(study\): .* -> <url>/);
  // A coach's or a reviewer's ask for more work on a section becomes a capture, after the owner confirms.
  assert.match(s7, /coach/i);
});

test('a3-reference states the capture links and the x-capture key (C2)', () => {
  const body = skill('a3-reference');
  assert.match(body, /x-capture/);
  assert.match(body, /-> <url>/);
  assert.match(body, /holds the stage/);
});

test('the old a3 skill name is gone and no skill still routes to it', () => {
  assert.equal(existsSync(`${root}skills/a3/SKILL.md`), false);
});
