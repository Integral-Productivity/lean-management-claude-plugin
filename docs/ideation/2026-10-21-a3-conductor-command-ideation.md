---
date: 2026-10-21
topic: a3-conductor-command
focus: "Add a conductor-style command like compound-engineering:lfg to facilitate A3 problem-solving, step by step."
mode: repo-grounded
---

# Ideation: an A3 conductor command

## The short version

A conductor for A3 cannot copy `lfg` whole. `lfg` is valuable because it gates each step on a child's `status: complete` and routes by request shape. It is hands-off, and it ends at `DONE`. An A3 conductor should keep the gates and the routing, and invert the other two choices:

- **Claude does not author the thinking.** The A3 skill defines an A3 that reflects the coach's thinking as a failure (`skills/a3/SKILL.md:111`).
- **The run is paced and resumable, and it does not end at "plan written".** An A3 lives for weeks: gemba visits, implementation, and a dated check of results (`skills/lean-problem-solving/SKILL.md:350`).

All six ideation frames reached these two inversions on their own. That convergence is the strongest signal in this run.

## Codebase context

- **Public plugin** (`lean-management-claude-plugin`, v1.0.1): 29 skills and no `commands/` directory. `skills/5-whys` is the only skill with `disable-model-invocation: true`. It is the existing pattern for a user-invoked facilitation command that adds no always-on cost.
- **`skills/a3/SKILL.md`** describes the A3 sections, the coaching loop, and six common mistakes. It is reference content only. Nothing facilitates an A3, holds state, or produces the artifact.
- **`skills/lean-problem-solving/SKILL.md`** has six phases. Each phase has written **Exit criteria** (lines 155, 180, 204, 280, 301, 320) and a **Reflection Pause**. That is the gate content a conductor needs, already written.
- **Private overlay** (`lean-management-internal-claude-plugin`): it ships one delta skill. Never copy a public skill there (ADR-0002). The IP-specific parts of a conductor go in as lines in `lean-at-integral-productivity`: Own Operations Mode (HubSpot, Reclaim.ai, Zapier) and Praxis Platform Mode.
- **Reference pattern** (`compound-engineering:lfg`): intake routing, a verified work source, numbered steps, status-gated advance, stop-and-say-why, and a stage view.
- **Past learnings** (overlay `docs/solutions/`): always-on token cost is measured. Duplicate skill names across plugins fail the `duplicate-skill-names` check.
- **External context** (web research, 2026):
  - [Graban (Mar 2026)](https://www.leanblog.org/2026/03/help-me-doesnt-mean-do-it-for-me-chatgpt-coaching/) compared a lean coaching bot with ChatGPT. ChatGPT produced a finished A3 with invented data, and the user learned nothing. The fix he reports is that the bot refuses to write the user's A3.
  - [LEI's beta AI coach](https://tech.lean.org/journal/welcome-your-new-ai-coach) is the only public institutional experiment found.
  - Digital A3 vendors such as [KaiNexus](https://blog.kainexus.com/improvement-disciplines/lean/pdsa/a3/a3-software/how-a3-software-supports-the-7-problem-solving-steps) are record-keepers and routers, not coaches.
  - [Coaching Kata](https://public.websites.umich.edu/~jmondisa/TK/The_Coaching_Kata.html) uses short, repeated daily cycles. That is a model for resumable sessions.
  - No open-source A3 "conductor" exists, so treat the design as new.

## Topic axes

1. Step sequencing and gates
2. Evidence intake
3. Coaching stance
4. The A3 artifact
5. Lifecycle after the session

## Ranked ideas

1. [Paced conductor on a phase-contract spine](#1-paced-conductor-on-a-phase-contract-spine)
2. [Mentee-authorship guard: brake pedal, no steering wheel](#2-mentee-authorship-guard-brake-pedal-no-steering-wheel)
3. [The A3 is a file with history; the page is a view](#3-the-a3-is-a-file-with-history-the-page-is-a-view)
4. [Type gate at the door](#4-type-gate-at-the-door)
5. [Evidence ledger with a gemba break](#5-evidence-ledger-with-a-gemba-break)
6. [No DONE: the last act is a dated check against a sealed prediction](#6-no-done-the-last-act-is-a-dated-check-against-a-sealed-prediction)
7. [Coach's second chair and a flawed-A3 dojo](#7-coachs-second-chair-and-a-flawed-a3-dojo)

### 1. Paced conductor on a phase-contract spine

- **Axis:** Step sequencing and gates
- **Description:** A thin, user-invoked command (`/a3`) walks the six lean-problem-solving phases, mapped onto the A3 sections. Each phase returns `complete`, `blocked`, or `loop-back:<phase>`. The gate is checked against the exit criteria, on text the user wrote. The session ends at every Reflection Pause, saves a phase cursor, and resumes from it next time. Built-in checks:
  - Lint the problem statement for causal or solution language.
  - Flag a root cause that names a person.
  - Lock Countermeasures until Current Condition and Root Cause pass.
  - Keep a "parking lot" for solutions the user brings early. At Phase 4, check whether the root-cause chain really leads to the parked idea or was built backward from it.

  The phase table belongs to `lean-problem-solving`, not to the command. A later Kata, PDCA, or kaizen-event conductor can then reuse it.
- **Basis:**
  - `direct:` `lean-problem-solving/SKILL.md:165`: "If the problem statement contains causal language ... or solution language ... Return to framing."
  - `direct:` exit criteria at lines 155, 180, 204, 280, 301, 320.
  - `direct:` `lfg/SKILL.md`: "Only a valid `status: complete` may advance".
  - `direct:` `a3/SKILL.md:118`: "The left side should take longer than the right side."
  - `reasoned:` `lfg` must not end a turn before DONE. Copying that loop would turn the Reflection Pauses into prompts the user can skip. Ending the session at each pause is the only way to enforce them.
- **Rationale:** This keeps `lfg`'s strongest mechanism and drops the part that breaks A3. Solution-first A3s are the top named mistake (`a3/SKILL.md:122`). Today nothing in the repo prevents them.
- **Downsides:** Strict gates can feel bureaucratic. An override with a written reason may be needed. The phase-to-section mapping also needs care, because A3 sections and the six phases do not line up one to one.
- **Confidence:** 85%
- **Complexity:** Medium

### 2. Mentee-authorship guard: brake pedal, no steering wheel

- **Axis:** Coaching stance
- **Description:** The conductor is like a driving-school instructor, who has a brake but no steering wheel. It can stop the run, send it back a phase, and ask questions. It never writes A3 section content.
  - Every line in the A3 carries a provenance tag: "user said" or "user confirmed from evidence".
  - Questions come only from the A3 coaching questions and the Coaching Kata five, filled with the user's own words. This is the Clean Language rule: no new cause, tool, or solution words from Claude.
  - When the user says "just write it", the conductor answers with the next question.
  - Mechanical work, such as layout, versioning, and reminders, is automated in full.
- **Basis:**
  - `direct:` `a3/SKILL.md:111`: "An A3 that reflects the coach's thinking rather than the mentee's has failed as a development tool, even if the solution is technically correct."
  - `external:` Graban 2026: the drafting chatbot failed, and the bot that asked questions worked.
  - `reasoned:` an LLM's default way to help is to solve. If the rule exists only in the prompt, it leaks, often through leading questions. Provenance tags make a leak visible and measurable.
- **Rationale:** Without this guard, the conductor is a failed development tool by the skill's own definition. It is also the gap in the market: vendors ship templates, and generic chatbots ship finished, invented A3s.
- **Downsides:** Users who are stuck may give up. The guard needs a humane way to get unstuck, such as a contrasting example from a different domain, labeled as such. Linting Claude's own questions for leading words is not a solved problem.
- **Confidence:** 85%
- **Complexity:** Medium

### 3. The A3 is a file with history; the page is a view

- **Axis:** The A3 artifact
- **Description:** The source of truth is a structured text file. It holds one block per A3 section, the phase cursor, the evidence ledger (idea 5), and a revision log. The log records each coach question, what the user changed, and why, in the style of a "response to reviewers" letter.
  - The one-page render (markdown or HTML) is derived from the file and never edited directly.
  - A space budget per section enforces "one page, no exceptions". When a section overflows, the conductor offers to split off a child A3 linked to the parent, rather than shrink the text.
  - A traceability table links each countermeasure to a root cause and its ADP type (Administration, Detection, Prevention). Countermeasures with no root cause, and plans that are administrative only, are flagged.
  - Sections lock once their gate passes. Editing a locked section reopens its gate.
- **Basis:**
  - `direct:` `a3/SKILL.md:108`: "Multiple iterations are normal and expected."
  - `direct:` "One page, no exceptions ... decompose into multiple A3s".
  - `direct:` `a3/SKILL.md:125`: countermeasures disconnected from root causes.
  - `direct:` "If A3s are being produced but no coaching conversations are happening around them, the practice has hollowed out."
  - `reasoned:` A3 work runs across many sessions, and every other idea here reads from this file. The schema is the most leveraged choice in the design and the hardest to reverse.
- **Rationale:** It makes resuming possible. The revision log records how the person's thinking developed, which is what an A3 exists to produce. The structure also leaves room for a later portfolio of A3s (see rejected J).
- **Downsides:** A schema is a commitment, so the first version should be small. A file in the user's repo may not fit non-developer users. The storage location is an open question for brainstorming.
- **Confidence:** 80%
- **Complexity:** Medium

### 4. Type gate at the door

- **Axis:** Step sequencing and gates
- **Description:** Step 0 runs Smalley's problem-typing protocol before any A3 section exists, and routes like `lfg`'s intake:
  - Type 1 goes to containment and `5-whys`.
  - Type 4 goes to `lean-startup` or `lean-ux`.
  - An implicit or missing standard starts an SDCA detour: write the standard down, define one measure, and resume once it is stable.
  - Only Type 2, and Type 3 framed as an experiment, opens an A3.
- **Basis:**
  - `direct:` `a3/SKILL.md:20`: "Primarily Type 2 ... Less suitable for Type 1 ... or Type 4".
  - `direct:` `lean-problem-solving/SKILL.md:106` (the SDCA branch).
  - `direct:` `lfg`: "Route by what the request is."
- **Rationale:** This is cheap to build, because the typing protocol is already written. It stops the conductor from becoming the default hammer, which the repo names as "tool fetishism". It also makes the command the entry point to a family of lean conductors.
- **Downsides:** A user who typed `/a3` may not want to hear "this is not an A3". The handoff must feel helpful and should be easy to override.
- **Confidence:** 80%
- **Complexity:** Low

### 5. Evidence ledger with a gemba break

- **Axis:** Evidence intake
- **Description:** Each claim offered for Current Condition is tagged:
  - observed at gemba (who, where, when)
  - measured (metric, source, date range)
  - testimony from the person doing the work
  - assumed or recalled

  Assumed claims cannot enter Current Condition. They go to a hypotheses list that opens in Phase 3. Metrics can be pulled from connectors, but only an observation the user made in person passes the "two-key" gate. When the observations are not there yet, the session ends with a concrete gemba assignment (what to watch, where, for how long, whom to ask) and resumes when the user returns.

  In the IP overlay, Own Operations Mode maps HubSpot stage durations and Reclaim.ai data to metric sources. It stores the query, not only the number, so the follow-up check re-runs the same measurement.
- **Basis:**
  - `direct:` `a3/SKILL.md:51`: "No interpretations or causes in this section -- just facts. If you can't fill this section with data, you haven't done enough observation."
  - `direct:` `lean-problem-solving/SKILL.md:180`, the Phase 2 exit criteria.
  - `direct:` the failure mode "Skipping gemba".
  - `reasoned:` a chat is a conference room by default. Claude cannot go to gemba, so the pause is the method, not a failure.
- **Rationale:** It blocks the most likely AI-assisted failure: a plausible Current Condition invented in chat. It also gives the overlay a concrete IP-only job, which is wiring IP's tools into evidence intake.
- **Downsides:** Tagging adds friction to every entry. Connector pulls depend on which tools a user has. That belongs in the overlay, not upstream.
- **Confidence:** 75%
- **Complexity:** Medium

### 6. No DONE: the last act is a dated check against a sealed prediction

- **Axis:** Lifecycle after the session
- **Description:**
  - **Seal the prediction.** At the Phase 4 gate, the conductor records "we predict [action] will move [metric] to [value] by [date] because [rationale]" and locks it.
  - **Schedule the check.** The run ends at "check scheduled", never at DONE. It creates the follow-up: a calendar hold or task, which is a Reclaim.ai task in the overlay.
  - **Weight the closure date by countermeasure strength.** The date uses the problem's natural recurrence interval, and administrative countermeasures get a longer watch, like an epidemiologist's "two incubation periods" rule before declaring an outbreak over.
  - **Resume at Phase 5/6.** The user compares the actual result with the sealed text. A miss loops back to Phase 3 as learning.
- **Basis:**
  - `direct:` `lean-problem-solving/SKILL.md:222` (the prediction form).
  - `direct:` `lean-problem-solving/SKILL.md:317`: "return to Phase 3 ... This is not failure".
  - `direct:` `lean-problem-solving/SKILL.md:350`: "Declaring victory too early".
  - `direct:` the ADP section: administrative controls "erode over time".
  - `reasoned:` hindsight bias quietly breaks Check. Only an artifact that outlives the session can prevent it.
- **Rationale:** The most common way A3s decay is a plan that is written and never verified. A conductor that owns the return date is the only thing in the design that addresses this.
- **Downsides:** Scheduling needs a tool connection. The public plugin can only write the date into the file. The real scheduling is overlay work.
- **Confidence:** 75%
- **Complexity:** Medium

### 7. Coach's second chair and a flawed-A3 dojo

- **Axis:** Coaching stance
- **Description:** These are two more seats in the same conductor, not new skills.
  - **Second chair.** A coach brings a mentee's draft. The conductor walks the review one section at a time, names which common mistake the draft shows, and proposes questions, never answers, for the coach to ask.
  - **Dojo.** The roles reverse. Claude presents a plausible A3 that contains one seeded mistake: human error as root cause, an orphan countermeasure, or an opinion-only Current Condition. The human practices coaching it with questions only. At the end, the conductor reveals the seeded flaw. This fits Praxis Platform Mode as a TfU (Teaching for Understanding) "performance of understanding".
- **Basis:**
  - `direct:` `a3/SKILL.md:102`: "The coach/manager reviews the A3 and asks questions -- not to provide answers".
  - `direct:` the common-mistakes list (lines 120-127) supplies the scenario bank.
  - `direct:` the overlay's Praxis Platform Mode uses `tfu-curriculum-design`.
  - `reasoned:` IP is a coaching practice, so the coach seat may be used more than the problem-solver seat. In the dojo, Claude's text is the object being critiqued, not the answer, so the authorship rule from idea 2 still holds.
- **Rationale:** It serves coaches as well as problem-solvers. It also gives IP a curriculum product from the same engine, added as one line in the delta skill.
- **Downsides:** It adds scope. It is better as a second release, after ideas 1-3 work with one seat.
- **Confidence:** 65%
- **Complexity:** Medium

## Rejection summary

46 raw candidates from 6 frames (5 ideation agents and 1 web researcher). Most rejections were merges, because the frames converged heavily.

| Idea | Reason |
|---|---|
| Left/right effort ratio gate | Merged into #1 as one gate check. |
| Right side locked until left passes | Merged into #1. |
| Solution parking lot with a backward-trace check | Merged into #1. |
| Registered Reports: a human signs off the left side | Merged into #1 as an optional reviewer gate. It is a strong v2 option. |
| Clean Language question templates | Merged into #2. |
| Two-key current condition, live-query metrics | Merged into #5. |
| One-page budget with child A3 split; countermeasure traceability matrix | Merged into #3. |
| Sealed prediction; closure rule by recurrence interval | Merged into #6. |
| SDCA detour as its own branch | Merged into #4. |
| A3 portfolio and compounding learning records (the `ce-compound` analogue) | Deferred. It has high leverage but no value until about 10 A3s are closed. Reserve the fields in #3's schema now. |
| Nemawashi / catchball step before implementation | Better as a v2 gate inside #1. IP is a solo operation today. |
| Team mode with independent observations first | Too costly for v1, with no current multi-person user. Revisit when IP adds employees. |
| Render looks like a sketch until gates pass | The value is low relative to the cost. It also conflicts with "formatting over thinking" if it gets built first. |

**Verification note:** A separate basis-verifier agent was not run. Claude spot-checked the main `direct:` quotes against the files (`a3/SKILL.md` lines 51, 111, 118, 122; `lean-problem-solving/SKILL.md` lines 165, 222, 317, 350 and all six exit-criteria lines), and all matched. Evidence scouts were skipped, because the subject's whole footprint is about five skill files that each agent read directly.
