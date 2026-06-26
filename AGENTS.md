# AGENTS.md — Wrapper genérico para agentes (SpecDD)

Wrapper curto para qualquer agente (Codex, OpenCode, Kimi, Qwen, MiniMax, etc.).
As regras de trabalho oficiais estão em **`docs/agents.md`** — leia-o primeiro e siga-o.

## Fonte de verdade (ordem de prioridade)
Siga a ordem definida em `docs/agents.md`:
`docs/spec.md` → `docs/agents.md` → `docs/NOW.md` → `docs/architecture.md` → `docs/PRD_vX.md` → `docs/implementation_summary.md`.
Em conflito, `docs/spec.md` vence.

## Papel (não é fixo)
O agente atua conforme o modo pedido pelo usuário. Veja "Modos de execução" em `docs/agents.md`:
- **Planner** — plano técnico a partir de NOW/spec.
- **Executor** — implementa apenas o escopo da task atual (KISS).
- **Reviewer** — revisa o diff contra spec, architecture, NOW e DoD.
- **Manual Prompt Relay** — gera ou usa os prompts de `.agents/manual-prompts/` para alternar entre ferramentas/modelos.
- **Orchestrator (Pipeline/Subagents)** — encadeia os papéis `planner` → `implementer` → `reviewer`, definidos nos subagents nativos da ferramenta (ex: `.claude/agents/`, `.opencode/agents/`, `.codex/agents/`), se ela suportar subagents. Papéis opcionais `spec-reader`/`task-breaker` para casos maiores (ver `docs/agents.md`).

Se o usuário não disser o modo, pergunte ou assuma **Planner** e confirme.

## Compatibilidade entre agentes
- Codex, OpenCode, Kimi, Qwen, MiniMax e outros agentes não ficam restritos a Executor.
- Se a ferramenta não suportar subagents, use **Manual Prompt Relay** com os prompts de `.agents/manual-prompts/`.
- Se a ferramenta suportar subagents, use **Pipeline/Subagents** com os subagents nativos dela (ex: `.claude/agents/`, `.opencode/agents/`, `.codex/agents/`).
- No Codex, use os custom agents nativos de `.codex/agents/*.toml` quando o usuário pedir subagents ou execução paralela.

## Lembretes
- KISS e uma task por vez (detalhes em `docs/agents.md`).
- Não adicionar escopo fora de PRD/spec/NOW sem sinalizar.
- Se mudar regra/contrato/limite técnico → atualize `docs/spec.md` no mesmo PR.
- Se mudar decisão arquitetural → atualize `docs/architecture.md` no mesmo PR.
