// Tests for the skill layer check (fitness function for ADR-0004, decision 3 and amendment 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { checkLayer, checkSkills, LAYERS } from './check-layers.mjs';

const skill = (front) => `---\nname: example\ndescription: An example skill.\n${front}---\n\n# Example\n`;

test('the five values are the three layers, the shared core, and a lens', () => {
  assert.deepEqual(LAYERS, ['thinking', 'management', 'transformation', 'core', 'lens']);
});

test('a skill with one known layer passes', () => {
  for (const layer of LAYERS) assert.deepEqual(checkLayer(skill(`layer: ${layer}\n`)), []);
});

test('a quoted layer passes', () => {
  assert.deepEqual(checkLayer(skill(`layer: "thinking"\n`)), []);
});

test('a skill with no layer fails', () => {
  assert.match(checkLayer(skill(''))[0], /no layer/);
});

test('an empty layer fails', () => {
  assert.match(checkLayer(skill('layer:\n'))[0], /no layer/);
});

test('a skill with two layer keys fails', () => {
  assert.match(checkLayer(skill('layer: thinking\nlayer: management\n'))[0], /more than one layer/);
});

test('a list of layers fails', () => {
  assert.match(checkLayer(skill('layer: [thinking, management]\n'))[0], /more than one layer/);
  assert.match(checkLayer(skill('layer:\n  - thinking\n  - management\n'))[0], /more than one layer/);
  assert.match(checkLayer(skill('layer: thinking, management\n'))[0], /more than one layer/);
});

test('an unknown layer fails', () => {
  assert.match(checkLayer(skill('layer: tradition\n'))[0], /unknown layer "tradition"/);
});

test('a file with no front matter fails', () => {
  assert.match(checkLayer('# Example\n')[0], /no front matter/);
});

test('a layer key in the body does not count', () => {
  assert.match(checkLayer(skill('') + '\nlayer: thinking\n')[0], /no layer/);
});

test('every skill in this repository declares exactly one layer', () => {
  const dirs = readdirSync(new URL('../skills/', import.meta.url));
  const errors = checkSkills();
  assert.ok(dirs.length > 0);
  assert.deepEqual(errors, []);
});
