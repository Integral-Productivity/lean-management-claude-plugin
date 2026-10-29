#!/usr/bin/env node
// A3 format check: the fitness function for ADR-0003, amendment 1.
// The format itself is described in skills/a3-reference/SKILL.md.
//
// Usage: node scripts/check-a3.mjs [file ...]
// With no arguments it checks docs/a3/*.md and the reference's examples.
// Exits 1 and prints one line per error when any file breaks the format.
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
const DEFINITION_RE = new RegExp(`^\\s*(?:[-*]\\s+\\*\\*(${COMPONENT})\\*\\*|\\|\\s*(?:\\*\\*)?(${COMPONENT})(?:\\*\\*)?\\s*\\|)`);

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

function checkBody(body, d, errors) {
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => h[1].trim());
  for (const [name] of SECTIONS) {
    if (!headings.includes(name)) errors.push(`section "## ${name}" is missing`);
  }
  const retired = new Set(Array.isArray(d.retired_ids) ? d.retired_ids : []);
  const defined = new Map();
  const references = [];
  let prefix;
  for (const line of body.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) {
      const section = SECTIONS.find(([name]) => name === h[1].trim());
      prefix = section ? section[1] : undefined;
      continue;
    }
    const def = line.match(DEFINITION_RE);
    const id = def && (def[1] || def[2]);
    if (id) {
      const own = id.split('-')[0];
      if (prefix === undefined || own !== prefix) errors.push(`${id} is defined outside its section`);
      if (defined.has(id)) errors.push(`${id} is defined twice`);
      if (retired.has(id)) errors.push(`${id} is retired and cannot be used again`);
      defined.set(id, true);
    }
    for (const ref of line.matchAll(COMPONENT_ANY)) {
      if (ref[0] !== id) references.push(ref[0]);
    }
  }
  for (const ref of new Set(references)) {
    if (!defined.has(ref) && !retired.has(ref)) errors.push(`${ref} is referenced but not defined`);
  }
}

export function checkA3(path, text) {
  const fm = parseFrontMatter(text);
  if (!fm) return ['the file must open with YAML front matter between --- lines'];
  const errors = [];
  checkHeader(path, fm.data, fm.keys, errors);
  checkBody(fm.body, fm.data, errors);
  return errors;
}

function defaultFiles(root) {
  const dirs = ['docs/a3', 'skills/a3-reference/examples'].map((d) => join(root, d));
  return dirs.filter(existsSync).flatMap((dir) =>
    readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'index.md').map((f) => join(dir, f)),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
  const files = process.argv.length > 2 ? process.argv.slice(2) : defaultFiles(root);
  let failed = 0;
  for (const f of files) {
    for (const e of checkA3(f, readFileSync(f, 'utf8'))) {
      console.error(`${f}: ${e}`);
      failed += 1;
    }
  }
  console.log(`Checked ${files.length} A3 file(s): ${failed} error(s).`);
  process.exit(failed ? 1 : 0);
}
