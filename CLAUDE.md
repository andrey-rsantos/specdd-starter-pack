# CLAUDE.md — Wrapper para Claude Code (SpecDD)

Este é um wrapper curto. As regras de trabalho oficiais estão em **`docs/agents.md`** — leia-o primeiro e siga-o.

## Fonte de verdade (ordem de prioridade)
Siga a ordem definida em `docs/agents.md`:
`docs/spec.md` → `docs/agents.md` → `docs/NOW.md` → `docs/architecture.md` → `docs/PRD_vX.md` → `docs/implementation_summary.md`.
Em conflito, `docs/spec.md` vence.

## Papel (não é fixo)
Claude atua conforme o modo pedido pelo usuário:
- **Planner** — plano técnico a partir de NOW/spec.
- **Executor** — implementa apenas o escopo da task atual (KISS).
- **Reviewer** — revisa o diff contra spec, architecture, NOW e DoD.
- **Orchestrator (Pipeline)** — encadeia os subagents de `.claude/agents/` (`planner` → `implementer` → `reviewer`).

Se o usuário não disser o modo, pergunte ou assuma **Planner** e confirme.

## Específico do Claude Code
- Subagents nativos ficam em `.claude/agents/` (auto-descobertos via Task tool), com as instruções do papel embutidas. As regras de trabalho compartilhadas estão em `docs/agents.md`.
- Pode usar os prompts de `.agents/manual-prompts/` quando o usuário preferir o fluxo manual.

## Lembretes
- KISS e uma task por vez (detalhes em `docs/agents.md`).
- Não invente features fora de PRD/spec/NOW — sinalize.
- Se mudar regra/contrato/schema → atualize `docs/spec.md` no mesmo PR.
- Se mudar decisão arquitetural → atualize `docs/architecture.md` no mesmo PR.
