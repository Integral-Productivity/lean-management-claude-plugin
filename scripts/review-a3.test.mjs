// Contract tests for review-a3 and its reviewer agents (plan R15, AE5, step-3 KTD1 to KTD7).
// A skill and an agent are prose, so these tests pin the rules the plan requires them to state.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseFrontMatter } from './check-a3.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, 'utf8');
const skill = () => read('skills/review-a3/SKILL.md');
const REVIEWERS = ['a3-strategy-reviewer', 'a3-gemba-reviewer', 'a3-format-reviewer', 'a3-lean-sensei-reviewer'];
const agent = (name) => read(`agents/${name}.md`);
const ORG_NAMES = /self-org|reclaim|glassfrog|hubspot|integral productivity/i;

test('review-a3 has frontmatter and cites the reference and the check (R14, R15)', () => {
  const fm = parseFrontMatter(skill()).data;
  assert.equal(fm.name, 'review-a3');
  assert.ok(fm.description.length > 40);
  const body = skill();
  assert.match(body, /a3-reference/);
  assert.match(body, /scripts\/check-a3\.mjs/);
});

test('review-a3 dispatches the four first reviewers (R15)', () => {
  const body = skill();
  for (const name of REVIEWERS) assert.match(body, new RegExp(name), name);
});

test('review-a3 sorts findings into Applied and Proposed, and keeps the Applied rule in one section (KTD6)', () => {
  const body = skill();
  assert.match(body, /^## \d+\. Applied: what this skill may change$/m);
  assert.match(body, /"\$A3" fix/);
  assert.match(body, /^### Proposed/m);
  assert.match(body, /never moves the stage/i);
  assert.match(body, /never removes an `\(AI\)` marker/i);
  assert.match(body, /never commits/i);
});

test('review-a3 gives no single score (STRATEGY.md boundary)', () => {
  assert.match(skill(), /no score/i);
});

test('each reviewer agent exists, has only read tools (no Write, Edit, or Bash), cites the reference, and gives no score (KTD1, KTD2)', () => {
  for (const name of REVIEWERS) {
    assert.ok(existsSync(`${root}agents/${name}.md`), name);
    const fm = parseFrontMatter(agent(name)).data;
    assert.equal(fm.name, name);
    assert.ok(fm.description.length > 40, name);
    assert.doesNotMatch(String(fm.tools), /Write|Edit|Bash|NotebookEdit/, name);
    const body = agent(name);
    assert.match(body, /a3-reference/, name);
    assert.match(body, /no score/i, name);
  }
});

test('only the format reviewer reports proven errors, and it uses the check (KTD2, AE5)', () => {
  assert.match(agent('a3-format-reviewer'), /check-a3\.mjs --quality/);
  assert.match(agent('a3-format-reviewer'), /proven/);
  for (const name of REVIEWERS.filter((n) => n !== 'a3-format-reviewer')) {
    assert.match(agent(name), /Proposed findings only/, name);
  }
});

test('review-a3 and its agents name no organization plugin or tool (KTD7)', () => {
  assert.doesNotMatch(skill(), ORG_NAMES);
  for (const name of REVIEWERS) assert.doesNotMatch(agent(name), ORG_NAMES, name);
});
