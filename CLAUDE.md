# CLAUDE.md — Roteador (SpecDD)

Roteador curto. Regras de trabalho e ordem de leitura canônica vivem em @docs/RULES.md — leia primeiro. `docs/SPEC.md` é a fonte de verdade; em conflito, ela vence.

## Específico do Claude Code
- Subagents nativos em `.claude/agents/` (`planner` → `implementer` → `reviewer`), auto-descobertos via Task tool. As instruções do papel ficam embutidas neles; as regras compartilhadas, em `docs/RULES.md`.
