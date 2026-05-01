# AGENTS.md - Project Routing

Este arquivo e um roteador para as instrucoes oficiais do projeto.

## Fonte de verdade (ordem de prioridade)
1. `docs/spec.md` - contratos, regras, restricoes e limites tecnicos.
2. `docs/agents.md` - modo de execucao (KISS), processo e guardrails.
3. `docs/NOW.md` - tarefa atual (uma por vez) e Definition of Done.
4. `docs/architecture.md` - decisoes arquiteturais, ADRs, contratos entre servicos.
5. `docs/PRD_v1.md` - escopo e intencao do produto.
6. `docs/implementation_summary.md` - historico de milestones.

## Regras de aplicacao
- Antes de implementar, leia `docs/NOW.md` e confirme constraints em `docs/spec.md`.
- Em caso de conflito entre documentos, siga sempre `docs/spec.md`.
- Nao adicionar escopo fora de PRD/spec/NOW sem sinalizar explicitamente.
- Se uma mudanca alterar contrato/regra/limite tecnico, atualize `docs/spec.md` no mesmo PR.
- Se uma mudanca alterar decisao arquitetural, atualize `docs/architecture.md` no mesmo PR.

## Instrucoes Codex-Only
- Para tarefas de escrita/edicao textual (docs, prompts, mensagens e comentarios), usar a skill local `ptbr-utf8-guardrails` em `.agents/skills/ptbr-utf8-guardrails/SKILL.md`.
- Essa skill existe somente para o Codex deste repositorio e deve ser aplicada antes de concluir qualquer alteracao textual.
- Toda alteracao textual deve passar em `E:\node_js\node.exe .agents/skills/ptbr-utf8-guardrails/scripts/validate-encoding.js <arquivos>`.
