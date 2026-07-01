# AGENTS.md — Roteador (SpecDD)

Roteador curto para qualquer agente (Codex, OpenCode, Kimi, Qwen, etc.).
Antes de qualquer ação, leia **`docs/RULES.md`** e siga a ordem canônica declarada nele.
Se não conseguir ler algum arquivo obrigatório, pare e sinalize.

## Específico do Codex
- Os agentes customizados do fluxo SpecDD estão em `.codex/agents/`: `planner`, `implementer` e `reviewer`.
- Só use subagentes quando o usuário pedir explicitamente por subagentes, delegação ou trabalho paralelo. Caso contrário, trabalhe na thread atual.
- Em fluxos com subagentes, somente o agente principal controla as transições de estado de `docs/NOW.md` exigidas por `docs/RULES.md`; os subagentes não movem a task entre seções.
