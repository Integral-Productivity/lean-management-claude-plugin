#!/usr/bin/env node
// A3 format check: the fitness function for ADR-0003, amendment 1.
// The format itself is described in skills/a3-reference/SKILL.md.
//
// Usage: node scripts/check-a3.mjs [--quality] [--today YYYY-MM-DD] [file ...]
// With no file arguments it checks docs/a3/*.md and the reference's examples.
// Exits 1 and prints one line per error when any file breaks the format.
// --quality also prints warnings for the mechanical quality concerns; they never change the exit code.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const FORMAT = 'a3/v1';
export const STAGES = ['plan', 'do', 'check', 'act', 'closed'];
export const HOLDER_TYPES = ['human', 'agent'];

// Section heading -> the component prefix that is defined in it (null: none).
export const SECTIONS = [
  ['Background', 'BG'],
  ['Current condition', 'CC'],
  ['Goal', 'G'],
  ['Root cause analysis', 'RC'],
  ['Countermeasures', 'CM'],
  ['Plan', null],
  ['Check', 'CK'],
  ['Yokoten', 'YK'],
  ['Revision log', null],
];

const REQUIRED = ['format', 'a3_id', 'title', 'owner', 'holder', 'holder_type', 'coach', 'stage', 'opened', 'revision'];
const OPTIONAL = ['next_review', 'tracker', 'related', 'retired_ids'];
const ID_RE = /^A3-(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const COMPONENT = '(?:BG|CC|G|RC|CM|CK|YK)-\\d+';
const COMPONENT_RE = new RegExp(`^${COMPONENT}$`);
const COMPONENT_ANY = new RegExp(`\\b${COMPONENT}\\b`, 'g');
// A definition is a list item that opens with the bold ID, or a table row whose first cell is the ID.
const DEFINITION_RE = new RegExp(`^\\s*(?:(?:[-*]|\\d+\\.)\\s+\\*\\*(${COMPONENT})\\*\\*|\\|\\s*(?:\\*\\*)?(${COMPONENT})(?:\\*\\*)?\\s*\\|)`);
// A top-level list item (bulleted or numbered). In a component section it must be a definition (AE5),
// unless it records a rejected option. A thematic break (`* * *`, `- - -`) is not an item.
export const ITEM_RE = /^(?:[-*]|\d+\.)\s+(.*)$/;
const BREAK_RE = /^\s*([-*_])(?:\s*\1){2,}\s*$/;
const REJECTED_RE = /^rejected\b/i;
export const isDefinition = (line) => DEFINITION_RE.test(line);
// A top-level item that the format requires to carry a component ID; returns its text.
export function unlabelledItem(line) {
  if (BREAK_RE.test(line) || isDefinition(line)) return null;
  const m = line.match(ITEM_RE);
  return m && !REJECTED_RE.test(m[1]) ? m[1] : null;
}
const CLAIM_TAG_RE = /\((?:fact|inference|not measured):/;

const unquote = (s) => s.replace(/^(['"])(.*)\1$/, '$2');

function scalar(raw) {
  const v = raw.trim();
  if (v === '' || v === 'null' || v === '~') return null;
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    return inner === '' ? [] : inner.split(',').map((s) => unquote(s.trim()));
  }
  return unquote(v);
}

// Reads the flat front matter this format allows: scalars, inline lists, block lists.
export function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  const data = {};
  const keys = [];
  let listKey = null;
  for (const line of m[1].split('\n')) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    keys.push(key);
    if (value.trim() === '') {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = scalar(value);
      listKey = null;
    }
  }
  return { data, keys, body: text.slice(m[0].length) };
}

function checkHeader(path, d, keys, errors) {
  for (const key of REQUIRED) {
    if (d[key] === undefined || d[key] === null || d[key] === '') errors.push(`header field ${key} is missing`);
  }
  for (const key of keys) {
    if (!REQUIRED.includes(key) && !OPTIONAL.includes(key) && !key.startsWith('x-')) {
      errors.push(`header field ${key} is not part of ${FORMAT} (use an x- prefix for extensions)`);
    }
  }
  if (d.format && d.format !== FORMAT) errors.push(`format must be ${FORMAT}, not ${d.format}`);
  const id = typeof d.a3_id === 'string' ? d.a3_id.match(ID_RE) : null;
  if (d.a3_id && !id) errors.push(`a3_id ${d.a3_id} must look like A3-YYYY-MM-DD-short-slug`);
  if (d.a3_id && basename(path) !== `${d.a3_id}.md`) errors.push(`file name must be ${d.a3_id}.md`);
  if (d.opened && !DATE_RE.test(d.opened)) errors.push(`opened must be a YYYY-MM-DD date`);
  if (id && d.opened && id[1] !== d.opened) errors.push(`the date in a3_id must equal opened (${d.opened})`);
  if (d.stage && !STAGES.includes(d.stage)) errors.push(`stage must be one of ${STAGES.join(', ')}`);
  if (d.holder_type && !HOLDER_TYPES.includes(d.holder_type)) errors.push(`holder_type must be human or agent`);
  if (d.revision && !/^[A-Z]+$/.test(d.revision)) errors.push(`revision must be capital letters (A, B, ... AA)`);
  if (d.next_review == null) {
    if (d.stage && d.stage !== 'closed') errors.push(`next_review is required until the stage is closed`);
  } else if (!DATE_RE.test(d.next_review)) {
    errors.push(`next_review must be a YYYY-MM-DD date`);
  } else if (d.opened && d.next_review < d.opened) {
    errors.push(`next_review cannot be before opened`);
  }
  if (d.tracker != null && !/^https:\/\/\S+$/.test(d.tracker)) errors.push(`tracker must be null or an https URL`);
  for (const key of ['related', 'retired_ids']) {
    if (d[key] != null && !Array.isArray(d[key])) errors.push(`${key} must be a list`);
  }
  for (const r of Array.isArray(d.retired_ids) ? d.retired_ids : []) {
    if (!COMPONENT_RE.test(r)) errors.push(`retired_ids entry ${r} is not a component ID`);
  }
}

// Walks the body once and hands each line to visit with its section and file line number.
export function walkBody(body, offset, visit) {
  let section;
  body.split('\n').forEach((line, i) => {
    const h = line.match(/^## (.+)$/);
    if (h) {
      section = SECTIONS.find(([name]) => name === h[1].trim()) ?? null;
      return;
    }
    const def = line.match(DEFINITION_RE);
    visit({ line, number: offset + i + 1, section, id: def && (def[1] || def[2]) });
  });
}

function checkBody(body, d, offset, errors) {
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => h[1].trim());
  for (const [name] of SECTIONS) {
    if (!headings.includes(name)) errors.push(`section "## ${name}" is missing`);
  }
  const retired = new Set(Array.isArray(d.retired_ids) ? d.retired_ids : []);
  const defined = new Map();
  const references = [];
  walkBody(body, offset, ({ line, number, section, id }) => {
    const prefix = section === undefined ? undefined : section?.[1] ?? null;
    if (id) {
      const own = id.split('-')[0];
      if (prefix === undefined || own !== prefix) errors.push(`${id} is defined outside its section`);
      if (defined.has(id)) errors.push(`${id} is defined twice`);
      if (retired.has(id)) errors.push(`${id} is retired and cannot be used again`);
      defined.set(id, true);
    } else if (prefix && unlabelledItem(line) != null) {
      errors.push(`line ${number}: list item in "## ${section[0]}" has no ${prefix} ID: "${unlabelledItem(line).slice(0, 40)}"`);
    }
    for (const ref of line.matchAll(COMPONENT_ANY)) {
      if (ref[0] !== id) references.push(ref[0]);
    }
  });
  for (const ref of new Set(references)) {
    if (!defined.has(ref) && !retired.has(ref)) errors.push(`${ref} is referenced but not defined`);
  }
}

// Lines before the body: the front matter block.
const bodyOffset = (text, body) => text.slice(0, text.length - body.length).split('\n').length - 1;

export function checkA3(path, text) {
  const fm = parseFrontMatter(text);
  if (!fm) return ['the file must open with YAML front matter between --- lines'];
  const errors = [];
  checkHeader(path, fm.data, fm.keys, errors);
  checkBody(fm.body, fm.data, bodyOffset(text, fm.body), errors);
  return errors;
}

// Warnings for the mechanical quality concerns in skills/a3-reference, section 8.
// They do not fail the check; review-a3 reports them for the holder to weigh.
export function qualityFindings(path, text, { today = new Date().toISOString().slice(0, 10) } = {}) {
  const fm = parseFrontMatter(text);
  if (!fm) return [];
  const found = [];
  walkBody(fm.body, bodyOffset(text, fm.body), ({ line, number, id }) => {
    if (!id) return;
    const prefix = id.split('-')[0];
    if (['CC', 'G', 'RC'].includes(prefix) && !CLAIM_TAG_RE.test(line)) {
      found.push(`${id} (line ${number}): untagged claim; tag it (fact: <source>), (inference: <basis>), or (not measured: <follow-up>)`);
    }
    if (prefix === 'CM' && !/\bRC-\d+\b/.test(line)) {
      found.push(`${id} (line ${number}): no root cause named; each countermeasure names the RC it addresses`);
    }
  });
  const d = fm.data;
  if (d.stage !== 'closed' && typeof d.next_review === 'string' && d.next_review < today) {
    found.push(`next_review ${d.next_review} has passed (today ${today}); check that a revision landed after it`);
  }
  return found;
}

function defaultFiles(root) {
  const dirs = ['docs/a3', 'skills/a3-reference/examples'].map((d) => join(root, d));
  return dirs.filter(existsSync).flatMap((dir) =>
    readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'index.md').map((f) => join(dir, f)),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
  const args = process.argv.slice(2);
  const withQuality = args.includes('--quality');
  const at = args.indexOf('--today');
  const today = at >= 0 ? args[at + 1] : undefined;
  if (at >= 0 && !DATE_RE.test(today ?? '')) {
    console.error('--today needs a YYYY-MM-DD date');
    process.exit(2);
  }
  const named = args.filter((a, i) => a !== '--quality' && a !== '--today' && !(at >= 0 && i === at + 1));
  const files = named.length ? named : defaultFiles(root);
  let failed = 0;
  let warned = 0;
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    for (const e of checkA3(f, text)) {
      console.error(`${f}: ${e}`);
      failed += 1;
    }
    if (withQuality) {
      for (const w of qualityFindings(f, text, today ? { today } : {})) {
        console.log(`${f}: warning: ${w}`);
        warned += 1;
      }
    }
  }
  console.log(`Checked ${files.length} A3 file(s): ${failed} error(s)${withQuality ? `, ${warned} warning(s)` : ''}.`);
  process.exit(failed ? 1 : 0);
}
