# Claude Code — Project Instructions (SpecDD / KISS)

## Prime directive
Follow the project’s source-of-truth documents in the priority order below.  
If there is any conflict, obey the highest-priority document.

## Source of truth (priority)
1) `docs/spec.md` — contracts, rules, restrictions, limits  
2) `docs/agents.md` — working mode (KISS), process  
3) `docs/NOW.md` — current task (only one at a time)  
4) `docs/PRD_vX.md` — scope and intent  
5) `docs/implementation_summary.md` — milestones / history

## Operating mode (default)
- Always start by reading `docs/NOW.md` and confirm the objective + constraints from `docs/spec.md`.
- Keep solutions minimal (KISS). Prefer the simplest thing that satisfies the spec.
- When unsure, ask at most 1–3 short clarification questions; otherwise, make reasonable assumptions and proceed.

## Output policy (important)
- DO NOT write product implementation code (components, services, endpoints, migrations, etc.).
- You MAY write: document templates, checklists, plans, high-level pseudocode, folder structure, contracts, acceptance criteria, and prompts to use in a coding tool.

## Workflow (SpecDD)
1) Restate the task goal + constraints (from `docs/NOW.md` and `docs/spec.md`).
2) Produce: plan + DoD/acceptance criteria + edge cases + risks.
3) Produce two prompts:
   - “Plan Mode” (analysis/plan for the coding tool)
   - “Build/Agent Mode” (instructions to execute)
4) If needed, propose a small textual patch to `docs/spec.md` (never silently change requirements).

## Guardrails
- No scope creep beyond PRD/spec/NOW. If something is missing, flag it explicitly.
- Prefer smaller milestones and incremental validation.
