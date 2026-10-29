// Contract tests for the lean-thinking router (ADR-0004 decision 4 and amendment 1, STRATEGY.md boundaries).
// The router is prose, so these tests pin its shape: an off-ramp for non-lean methods, routing by layer,
// problem types owned by lean-problem-solving, and every skill named under the section of its declared layer.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LAYERS } from './check-layers.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const router = readFileSync(`${root}skills/lean-thinking/SKILL.md`, 'utf8');
const skills = readdirSync(`${root}skills`, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'lean-thinking')
  .map((d) => d.name);
const layerOf = (name) =>
  readFileSync(`${root}skills/${name}/SKILL.md`, 'utf8').match(/^layer:\s*(\S+)/m)?.[1];

// Returns the text of each "### Layer: <name>" section, up to the next heading of level 2 or 3.
function layerSections(text) {
  const sections = {};
  const re = /^### Layer: (\w+)[^\n]*\n([\s\S]*?)(?=^#{2,3} )/gm;
  for (const [, layer, body] of text.matchAll(re)) sections[layer] = body;
  return sections;
}

test('the router has an off-ramp that names non-lean methods and hands off', () => {
  const m = router.match(/^### Step 1: Off-ramp[^\n]*\n([\s\S]*?)(?=^#{2,3} )/m);
  assert.ok(m, 'Step 1: Off-ramp section');
  for (const method of ['DMAIC', 'OKR', 'retrospective', 'Theory of Constraints']) {
    assert.match(m[1], new RegExp(method), method);
  }
  assert.match(m[1], /hand off/i);
  assert.match(m[1], /do not coach/i);
});

test('the router routes by layer, with one section per layer value', () => {
  assert.match(router, /^### Step 2: Layer/m);
  const sections = layerSections(router);
  assert.deepEqual(Object.keys(sections).sort(), [...LAYERS].sort());
});

test('problem types belong to lean-problem-solving', () => {
  const m = router.match(/^### Step 3: Problem type[^\n]*\n([\s\S]*?)(?=^#{2,3} )/m);
  assert.ok(m, 'Step 3: Problem type section');
  assert.match(m[1], /`lean-problem-solving`/);
  for (const type of ['Type 1', 'Type 2', 'Type 3', 'Type 4']) assert.match(m[1], new RegExp(type), type);
});

test('every skill is named under the section of its declared layer, and only there', () => {
  const sections = layerSections(router);
  for (const name of skills) {
    const layer = layerOf(name);
    const tag = `\`${name}\``;
    assert.ok(sections[layer]?.includes(tag), `${name} is missing from Layer: ${layer}`);
    for (const [other, body] of Object.entries(sections)) {
      if (other !== layer) assert.ok(!body.includes(tag), `${name} (layer ${layer}) is listed under Layer: ${other}`);
    }
  }
});
