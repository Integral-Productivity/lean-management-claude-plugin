#!/usr/bin/env node
// A3 file helper: the mechanical steps that the a3-facilitation skill runs.
// It creates the file and header (plan R1, R2), moves the stage (R5), finds the next
// component ID (R3), and reads where a paused A3 resumes (R13). It never writes section
// content: that belongs to the holder (skills/a3-reference, section 7).
//
// Usage:
//   node scripts/a3-file.mjs new --title "..." --slug late-invoices --owner "..." --holder "..."
//        --holder-type human --coach "..." --opened 2026-01-15 --next-review 2026-01-29 [--tracker URL] [--dir docs/a3]
//   node scripts/a3-file.mjs stage <file> <to> --reason "..." --asked-by "..." --date 2026-01-29 [--next-review YYYY-MM-DD]
//   node scripts/a3-file.mjs next-id <file> <prefix>
//   node scripts/a3-file.mjs resume <file>
//   node scripts/a3-file.mjs fix <file>
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORMAT, SECTIONS, STAGES, HOLDER_TYPES, parseFrontMatter, unlabelledItem, walkBody } from './check-a3.mjs';

// The moves the PDCA cycle allows (skills/a3-reference, section 5).
export const MOVES = {
  plan: ['do'],
  do: ['check'],
  check: ['do', 'act'],
  act: ['closed'],
  closed: [],
};

const PREFIXES = SECTIONS.map(([, p]) => p).filter(Boolean);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function required(value, name) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${name} is required`);
  return value.trim();
}

function date(value, name) {
  if (!DATE_RE.test(value ?? '')) throw new Error(`${name} must be a YYYY-MM-DD date`);
  return value;
}

export function newA3({ title, slug, owner, holder, holderType, coach, opened, nextReview, tracker = null, dir = 'docs/a3' }) {
  required(title, 'title');
  if (!SLUG_RE.test(slug ?? '')) throw new Error('slug must be 1 to 5 lowercase words with hyphens');
  if (!HOLDER_TYPES.includes(holderType)) throw new Error('holder type must be human or agent');
  date(opened, 'opened');
  date(nextReview, 'next_review');
  if (nextReview < opened) throw new Error('next_review cannot be before opened');
  if (tracker != null && !/^https:\/\/\S+$/.test(tracker)) throw new Error('tracker must be an https URL');

  const a3Id = `A3-${opened}-${slug}`;
  const header = [
    '---',
    `format: ${FORMAT}`,
    `a3_id: ${a3Id}`,
    `title: ${required(title, 'title')}`,
    `owner: ${required(owner, 'owner')}`,
    `holder: ${required(holder, 'holder')}`,
    `holder_type: ${holderType}`,
    `coach: ${required(coach, 'coach')}`,
    'stage: plan',
    `opened: ${opened}`,
    `next_review: ${nextReview}`,
    'revision: A',
    `tracker: ${tracker ?? 'null'}`,
    'related: []',
    'retired_ids: []',
    '---',
  ].join('\n');
  const sections = SECTIONS.map(([name]) =>
    name === 'Revision log' ? `## ${name}\n\n- Rev A, ${opened}: file created (${holder.trim()}).` : `## ${name}\n\nNot yet.`,
  );
  const text = `${header}\n\n# ${title.trim()}\n\n${sections.join('\n\n')}\n`;
  return { path: `${dir}/${a3Id}.md`, text };
}

export function nextRevision(rev) {
  const digits = rev.split('').map((c) => c.charCodeAt(0) - 64);
  let i = digits.length - 1;
  while (i >= 0 && digits[i] === 26) digits[i--] = 1;
  if (i < 0) digits.unshift(1);
  else digits[i] += 1;
  return digits.map((d) => String.fromCharCode(d + 64)).join('');
}

function setField(text, key, value) {
  return text.replace(new RegExp(`^${key}:.*$`, 'm'), `${key}: ${value}`);
}

export function moveStage(text, to, { date: on, reason, askedBy, nextReview = null }) {
  const fm = parseFrontMatter(text);
  if (!fm) throw new Error('the file has no front matter');
  const from = fm.data.stage;
  if (!STAGES.includes(to)) throw new Error(`stage must be one of ${STAGES.join(', ')}`);
  if (!(MOVES[from] ?? []).includes(to)) throw new Error(`the cycle does not allow ${from} -> ${to}`);
  date(on, 'date');
  required(reason, 'reason');
  required(askedBy, 'asked by');
  if (to !== 'closed') {
    date(nextReview, 'next_review');
    if (nextReview < on) throw new Error('next_review cannot be before the date of the move');
  }

  const rev = nextRevision(fm.data.revision);
  let out = setField(text, 'stage', to);
  out = setField(out, 'revision', rev);
  out = setField(out, 'next_review', to === 'closed' ? 'null' : nextReview);
  const line = `- Rev ${rev}, ${on}: stage ${from} -> ${to}; ${reason.trim()} (asked by ${askedBy.trim()}).`;
  return `${out.replace(/\n*$/, '')}\n${line}\n`;
}

export function nextComponentId(text, prefix) {
  if (!PREFIXES.includes(prefix)) throw new Error(`prefix must be one of ${PREFIXES.join(', ')}`);
  const fm = parseFrontMatter(text);
  const used = [...(fm?.body ?? '').matchAll(new RegExp(`\\b${prefix}-(\\d+)\\b`, 'g'))].map((m) => Number(m[1]));
  for (const id of Array.isArray(fm?.data.retired_ids) ? fm.data.retired_ids : []) {
    const m = id.match(new RegExp(`^${prefix}-(\\d+)$`));
    if (m) used.push(Number(m[1]));
  }
  return `${prefix}-${Math.max(0, ...used) + 1}`;
}

// Per-A3 capture overrides (skills/a3-facilitation, section 7): header `x-capture: [part=target, ...]`.
// A part is a3, review, plan, a component prefix, or one component ID.
// Section work kinds (a3-facilitation, section 7): a section or a component can need
// clarifying, more study, rework, or a new framing, apart from the work its own items name.
export const WORK_KINDS = ['clarify', 'study', 'rework', 'reframe'];
const PART_RE = new RegExp(`^(?:a3|review|(?:plan|(?:${PREFIXES.join('|')})(?:-\\d+)?)(?::(?:${WORK_KINDS.join('|')}))?)$`);

export function parseCapture(items) {
  const capture = {};
  for (const item of items ?? []) {
    const [part, target, ...extra] = String(item).split('=').map((x) => x.trim());
    if (!part || !target || extra.length || !PART_RE.test(part)) {
      throw new Error(`x-capture item "${item}" must be <part>=<target>, part one of a3, review, plan, ${PREFIXES.join(', ')} or a component ID, with an optional :${WORK_KINDS.join(', :')}`);
    }
    capture[part] = target;
  }
  return capture;
}

export function resumePoint(text) {
  const fm = parseFrontMatter(text);
  if (!fm) throw new Error('the file has no front matter');
  const empty = SECTIONS.map(([name]) => name).find((name) => {
    const m = fm.body.match(new RegExp(`^## ${name}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm'));
    // A Work line records captured work on the section; it is not section content.
    return m && m[1].replace(/^Work \(\w+\):.*$/gm, '').trim() === 'Not yet.';
  });
  const d = fm.data;
  return { a3Id: d.a3_id, stage: d.stage, revision: d.revision, nextReview: d.next_review, holderType: d.holder_type, nextSection: empty ?? null, capture: parseCapture(d['x-capture']) };
}

// The mechanical fixes review-a3 may apply (its Applied step). They change no words:
// an unlabelled item in a component section gets the next unused ID, and a missing
// section heading comes back with "Not yet." in format order.
export function fixA3(text) {
  const fm = parseFrontMatter(text);
  if (!fm) throw new Error('the file has no front matter');
  const head = text.slice(0, text.length - fm.body.length);
  const lines = fm.body.split('\n');
  const changes = [];

  walkBody(fm.body, 0, ({ line, number, section }) => {
    const text = section?.[1] ? unlabelledItem(line) : null;
    if (text == null) return;
    const id = nextComponentId(head + lines.join('\n'), section[1]);
    lines[number - 1] = line.replace(/^([-*]|\d+\.)\s+/, (marker) => `${marker}**${id}** `);
    changes.push(`added ${id} to "${text}"`);
  });

  SECTIONS.forEach(([name], order) => {
    if (lines.some((l) => l.trim() === `## ${name}`)) return;
    const later = SECTIONS.slice(order + 1).map(([n]) => `## ${n}`);
    const at = lines.findIndex((l) => later.includes(l.trim()));
    const block = [`## ${name}`, '', 'Not yet.', ''];
    if (at >= 0) lines.splice(at, 0, ...block);
    else {
      while (lines.length && lines[lines.length - 1] === '') lines.pop();
      lines.push('', ...block);
    }
    changes.push(`restored "## ${name}" with "Not yet."`);
  });

  return { text: changes.length ? head + lines.join('\n') : text, changes };
}

function flags(args) {
  const out = {};
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--')) out[args[i].slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = args[++i];
  }
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'new') {
      const { path, text } = newA3(flags(rest));
      if (existsSync(path)) throw new Error(`${path} already exists`);
      mkdirSync(join(path, '..'), { recursive: true });
      writeFileSync(path, text);
      console.log(path);
    } else if (cmd === 'stage') {
      const [file, to, ...more] = rest;
      writeFileSync(file, moveStage(readFileSync(file, 'utf8'), to, flags(more)));
      console.log(`${file}: stage ${to}`);
    } else if (cmd === 'next-id') {
      console.log(nextComponentId(readFileSync(rest[0], 'utf8'), rest[1]));
    } else if (cmd === 'fix') {
      const { text, changes } = fixA3(readFileSync(rest[0], 'utf8'));
      if (changes.length) writeFileSync(rest[0], text);
      console.log(changes.length ? changes.map((c) => `${rest[0]}: ${c}`).join('\n') : `${rest[0]}: no mechanical fixes`);
    } else if (cmd === 'resume') {
      console.log(JSON.stringify(resumePoint(readFileSync(rest[0], 'utf8'))));
    } else {
      throw new Error('usage: a3-file.mjs new|stage|next-id|resume|fix (see the header of this file)');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
