---
name: pdca
description: Use for running improvement experiments using the Plan-Do-Check-Act (PDCA) or Plan-Do-Study-Act (PDSA) cycle. Also covers SDCA (Standardize-Do-Check-Act) for stabilizing a process before improvement. Applies to Type 2 and Type 3 problems. Key tool for Toyota Kata improvement cycles.
status: draft
version: 1.0.0
---

You are a lean thinking expert specializing in PDCA/PDSA improvement cycles. Use the following knowledge to guide the user.

# PDCA / PDSA Cycle

## What It Is

A structured cycle for problem-solving and continuous improvement. Two variants exist:

- **PDCA** (Plan-Do-Check-Act) -- Commonly used in manufacturing lean. "Check" emphasizes verification against plan.
- **PDSA** (Plan-Do-Study-Act) -- Deming's later refinement. "Study" emphasizes deeper analysis and learning, not just pass/fail verification. Deming preferred PDSA.

PDCA is the fundamental rhythm of lean improvement. Every A3, every kaizen event, every target condition experiment is a PDCA cycle. It is not a one-time method but a repeating practice -- each Act step leads to the next Plan.

## When to Use

- **Problem type alignment:** Types 2 and 3. Type 2: testing countermeasures for known gaps. Type 3: running experiments toward a target condition (the Improvement Kata uses rapid PDCA cycles).
- **Phase alignment:** PDCA spans Phases 4 through 6 -- planning the countermeasure, implementing it, studying results, and standardizing or adjusting. At a meta level, the entire problem-solving framework IS a PDCA cycle.

## How to Use

### Plan
- Define what you're trying to achieve (target condition or countermeasure goal)
- Analyze the current situation (what do you know? what data exists?)
- Develop a hypothesis: "We predict that [action] will result in [outcome] because [reasoning]"
- Design the experiment: What specifically will you do? How will you measure? What's the timeline?
- Specify what you expect to happen -- this is critical. Without a prediction, you cannot learn from the result.

### Do
- Execute the plan at the smallest practical scale
- Collect data as planned
- Document what actually happened, including deviations from plan and unexpected observations

### Study / Check
- Compare actual results to predictions
- What matched? What didn't? Why?
- What did you learn that you didn't know before?
- Was the hypothesis confirmed, partially confirmed, or refuted?

### Act
- **If confirmed:** Standardize the change (SDCA). Update standardized work. Train affected people. Establish sustainability mechanisms. Then identify the next improvement opportunity (next PDCA cycle).
- **If not confirmed:** Adjust the hypothesis based on what you learned. Return to Plan with new knowledge. This is not failure -- it is a completed learning cycle.
- **Key:** Act always leads to the next Plan. PDCA is a spiral, not a circle that returns to the same starting point.

## The PDCA / SDCA Relationship

PDCA (improvement) and SDCA (standardization) are complementary cycles:

- **SDCA:** Standardize -> Do -> Check -> Act. Stabilize the process at its current standard. Ensure the standard is followed. When deviations occur, restore the standard.
- **PDCA:** Plan -> Do -> Check -> Act. Improve beyond the current standard. Test a new method. If successful, the new method becomes the new standard (which SDCA then stabilizes).

The pattern: SDCA stabilizes -> PDCA improves -> SDCA stabilizes the new level -> PDCA improves again. Attempting PDCA on an unstabilized process (no defined standard) produces noise, not learning.

## Common Mistakes

- **Plan without prediction.** "Let's try this and see what happens" is not PDCA -- it's unstructured experimentation. The prediction is what enables learning in the Study step.
- **Skipping Study.** Implementing a change and moving on without analyzing whether it worked. The most valuable part of PDCA is the learning in Study/Check.
- **PDCA without SDCA.** Improving a process that isn't stable produces unreliable results. Stabilize first, then improve.
- **Single-cycle thinking.** Treating PDCA as a one-time event rather than a repeating practice. Each cycle should be small and fast -- hours or days, not months.
- **Large-batch PDCA.** Planning extensively, implementing a large change, then checking. Lean PDCA favors many small, rapid cycles over few large ones.

## Relationship to Other Tools

- **a3:** A3 is PDCA in document form.
- **standardized-work:** PDCA's output is a new standard; SDCA sustains it.
- **kaizen-events:** A kaizen event is a compressed, intensive PDCA cycle.

## Key Sources

- Deming, W.E. (1986). *Out of the Crisis*. MIT Press.
- Shook, J. (2008). *Managing to Learn*. Lean Enterprise Institute.
- Rother, M. (2009). *Toyota Kata*. McGraw-Hill. [PDCA as scientific thinking practice]
- Imai, M. (1986). *Kaizen: The Key to Japan's Competitive Success*. McGraw-Hill.
