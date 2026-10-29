#!/usr/bin/env node
// Skill layer check: the fitness function for ADR-0004, decision 3.
// Every skills/<name>/SKILL.md declares exactly one `layer:` in its front matter,
// and the value is one of the three layers or the shared core.
//
// Usage: node scripts/check-layers.mjs [file ...]
// With no file arguments it checks skills/*/SKILL.md.
// Exits 1 and prints one line per error when any skill breaks the rule.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const LAYERS = ['thinking', 'management', 'transformation', 'core'];

const unquote = (s) => s.replace(/^(['"])(.*)\1$/, '$2');

// Returns the error messages for one SKILL.md text; an empty list means it passes.
export function checkLayer(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return ['no front matter'];
  const lines = m[1].split(/\r?\n/);
  const at = lines.flatMap((line, i) => (/^layer\s*:/.test(line) ? [i] : []));
  if (at.length > 1) return ['more than one layer key'];
  if (at.length === 0) return ['no layer: declare one of ' + LAYERS.join(', ')];
  const value = lines[at[0]].replace(/^layer\s*:/, '').trim();
  if (value === '') {
    // A block list under the key is more than one layer; anything else is empty.
    const items = lines.slice(at[0] + 1).filter((l) => /^\s+-\s/.test(l));
    return [items.length ? 'more than one layer: a skill belongs to one layer or the core' : 'no layer: declare one of ' + LAYERS.join(', ')];
  }
  if (value.startsWith('[') || value.includes(',')) return ['more than one layer: a skill belongs to one layer or the core'];
  const layer = unquote(value);
  if (!LAYERS.includes(layer)) return [`unknown layer "${layer}": use one of ${LAYERS.join(', ')}`];
  return [];
}

// Checks the given files, or every skills/*/SKILL.md; returns "path: message" lines.
export function checkSkills(files) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const targets = files?.length
    ? files
    : readdirSync(join(root, 'skills'), { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => join('skills', d.name, 'SKILL.md'));
  return targets.flatMap((f) => {
    const path = existsSync(f) ? f : join(root, f);
    if (!existsSync(path)) return [`${f}: missing SKILL.md`];
    return checkLayer(readFileSync(path, 'utf8')).map((e) => `${f}: ${e}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const errors = checkSkills(process.argv.slice(2));
  for (const e of errors) console.error(e);
  if (errors.length) process.exit(1);
  console.log('Every skill declares exactly one layer.');
}
