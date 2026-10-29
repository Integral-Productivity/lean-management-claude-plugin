---
format: a3/v1
a3_id: A3-2026-01-15-late-invoices
title: Invoices reach customers nine days after delivery
owner: Billing lead
holder: Billing lead
holder_type: human
coach: Operations coach
stage: check
opened: 2026-01-15
next_review: 2026-03-02
revision: C
tracker: https://example.com/tracker/items/42
related:
  - docs/adr/0012-auto-approve-small-invoices.md
retired_ids: [RC-2]
---

# Invoices reach customers nine days after delivery

Example A3. The organization, people, and numbers are made up.

## Background

- **BG-1** Each day an invoice waits delays cash by one day. Finance asked for a shorter cycle this quarter.

## Current condition

- **CC-1** Median time from delivery to invoice is 9 days, 90th percentile 16 days (fact: billing export, 2025-10 to 2025-12, 412 invoices).
- **CC-2** 70% of the wait is in the approval queue (fact: queue timestamps, same period).

## Goal

- **G-1** Median time from delivery to invoice is 3 days by 2026-03-31. Guardrail: invoice error rate stays at or below 1% (fact: 0.8% today).

## Root cause analysis

- **RC-1** Every invoice waits for a manual approval, also small invoices with no risk (fact: approval policy). Why: the policy was written for large contracts and never split.
- **RC-3** Approvers batch the queue once a week (inference: interviews with 3 of 4 approvers; not measured).

## Countermeasures

| ID | Countermeasure | Root cause | ADP |
|----|----------------|------------|-----|
| CM-1 | Approve invoices under the limit automatically | RC-1 | prevention |
| CM-2 | Show the approval queue age on the team board each day | RC-3 | detection |

Rejected: hire one more approver (does not address RC-1).

## Plan

- Billing lead sets the limit and records it in the decision record by 2026-02-01 (CM-1).
- Team lead adds the queue age to the board by 2026-02-03 (CM-2).

## Check

- **CK-1** On 2026-03-02, compare median time to invoice with G-1. Switch trigger: if the median is above 5 days, revisit RC-3.
- **CK-2** Same date: invoice error rate stays at or below 1% (guardrail in G-1).

## Yokoten

- **YK-1** Purchase orders use the same single approval policy. Raised by the operations coach.

## Revision log

- Rev A, 2026-01-15: first draft (owner).
- Rev B, 2026-01-22: removed RC-2 (no evidence at gemba); added RC-3 (coach asked "what did you see?").
- Rev C, 2026-02-03: countermeasures done; stage moved to check.
