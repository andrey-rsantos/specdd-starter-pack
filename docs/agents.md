# agents.md — Como a IA deve trabalhar neste repo

## Antes de codar
- Ler docs/PRD_vX.md + docs/spec.md + docs/architecture.md
- Se houver conflito, seguir docs/spec.md e sinalizar

## Modo de execução (KISS)
- Prioridade máxima: lançar rápido com o mínimo necessário.
- Primeiro: propor um plano curto (passos pequenos) quando a mudança for relevante.
- Depois: implementar em commits pequenos e reversíveis.
- Sempre: evitar abstrações e “melhorias” não pedidas.

## Restrições
- Não criar features novas fora do escopo do PRD/spec.
- Não trocar stack/bibliotecas-chave.
- Não criar/alterar schema sem atualizar docs/spec.md (e migrations).
- Não refatorar em massa sem pedido explícito.
- Não alterar regras de negócio sem atualizar docs/spec.md.

## Qualidade mínima
- Tratar erros e estados vazios.
- Validar inputs críticos (frontend e/ou backend).
- Logs básicos onde necessário.

## Rotina de docs (sem burocracia)
- Atualize `docs/NOW.md` ao iniciar/trocar de tarefa (1 task por vez).
- Atualize `docs/implementation_summary.md` somente ao fechar um milestone (mover para Done com data + 1 linha).
- Se uma mudança alterar regra/contrato/limite técnico, atualize `docs/spec.md` no mesmo PR.
- Se uma mudança alterar decisão arquitetural (ADR, stack, contratos entre serviços), atualize `docs/architecture.md` no mesmo PR.
