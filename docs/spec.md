# spec.md — <NOME DO SISTEMA>

## 0) Regras do documento
- Este documento define comportamento e restrições.
- Se algo não estiver aqui, NÃO é requisito.
- Mudanças de regra exigem atualização deste spec.
- `docs/NOW.md` é contexto operacional (não muda requisitos).
- `docs/implementation_summary.md` registra milestones (histórico leve).

## 1) Stack travada
- Frontend: <...>
- Backend/API: <...>
- Database: <...>
- Auth: <...>
- Deploy: <...>
- Observações: <ex: “sem trocar stack sem decisão”>

## 2) Princípios de implementação (KISS)
- Implementar o mínimo que atenda os critérios de aceite.
- Preferir código simples e legível a abstrações.
- Evitar arquiteturas/patterns complexos no MVP (DDD/CQRS/microservices).
- Refatorar apenas quando houver dor real (bug, complexidade, repetição crítica).

## 3) Glossário rápido (opcional)
- <termo>: <definição curta>

## 4) Entidades principais (conceito, não schema completo)
- <Entidade A>: campos essenciais (ex: id, ownerId, status, created_at)
- <Entidade B>: campos essenciais

## 5) Fluxos obrigatórios (com resultado esperado)
### Fluxo: <nome 1>
- Dado que <pré-condição>
- Quando <ação>
- Então <resultado>
- E <regras adicionais>

### Fluxo: <nome 2>
- ...

## 6) Regras de negócio (não negociáveis)
- Regra 1: <...>
- Regra 2: <...>
- Regra 3: <...>

## 7) Regras de persistência / dados
- IDs: <uuid | int | ...>
- Soft delete: <sim/não> + como
- Timezone: <...>
- Datas: definição de “mês”, “hoje”, “período”
- Arredondamento/moeda (se existir): <...>
- Auditoria/histórico (se existir): <...>

## 8) Segurança e permissões
- Auth obrigatório: <...>
- Permissões por role:
  - <role 1>: pode <...> / não pode <...>
  - <role 2>: pode <...> / não pode <...>
- RLS (se aplicável): <sim/não> + regra geral

## 9) Requisitos não funcionais (somente os que importam)
- Performance: <limite simples>
- UX: <ex: “ações críticas com confirmação”>
- Confiabilidade: <ex: “operações idempotentes”>

## 10) Proibições (anti-“IA viajou”)
- Proibido adicionar features fora do MVP.
- Proibido trocar stack.
- Proibido criar/alterar schema sem atualizar este spec.md.
- Proibido alterar regra de negócio sem atualizar este spec.md.
- Proibido refatorar em massa sem pedido.

## 11) Critérios de aceite (checklist do MVP)
- [ ] <critério 1 testável>
- [ ] <critério 2 testável>
- [ ] <critério 3 testável>
