# SPEC.md — <NOME DO SISTEMA>

## 0) Regras do documento
- Fonte de verdade. Em conflito com outro doc, esta vence.
- Define comportamento e restrições. Se algo não está aqui, NÃO é requisito.
- Mudança de regra/contrato exige atualizar este doc no mesmo PR.
- `docs/NOW.md` é contexto operacional (não muda requisitos).

## 1) Produto (o quê / por quê)
- Visão (1–3 linhas): <o que é, para quem, qual valor entrega>
- Problema / oportunidade: <dor atual + por que agora>
- Objetivos da versão (até 3): <...>
- Fora de escopo (trava anti-feature-creep): <o que NÃO fazer>
- Métrica de sucesso (1 só): <ex: primeira venda / X usuários ativos>

## 2) Stack / componentes travados
> Só as linhas que se aplicam (web, CLI, lib, pipeline, embedded, etc.).
- Linguagem(ns): <...>
- Runtime/ambiente: <...>
- Componentes principais: <API, worker, CLI, banco, fila — só o que existir>
- Dependências-chave (fixas): <...>
- Observações: <ex: "sem trocar stack sem decisão">

## 2.1) Convenções de código (opcional)
> O pack é neutro em estilo. Preencha só se este projeto quiser impor defaults.
> Vazio = sem regra de estilo obrigatória.
- Princípios: <ex: KISS, YAGNI, DRY; e quando NÃO aplicar>
- Nomenclatura: <ex: camelCase para variável, PascalCase para tipo>
- Formatação / lint: <ferramenta + config, ex: Prettier + ESLint>
- Padrões a evitar: <ex: sem abstração prematura, sem herança profunda>
- Testes: <ex: nomear como deve_fazer_X; padrão AAA>

## 3) Glossário rápido (opcional)
- <termo>: <definição curta>

## 4) Entidades / conceitos principais (não schema completo)
- <Entidade A>: campos/atributos essenciais
- <Entidade B>: campos/atributos essenciais

## 5) Fluxos obrigatórios (com resultado esperado)
### Fluxo: <nome 1>
- Dado que <pré-condição>
- Quando <ação>
- Então <resultado>
- E <regras adicionais>

### Fluxo: <nome 2>
- ...

## 6) Regras de negócio / domínio (não negociáveis)
- Regra 1: <...>
- Regra 2: <...>

## 7) Regras de persistência / dados (se houver)
- IDs: <uuid | int | ...>
- Soft delete: <sim/não> + como
- Timezone: <...>
- Datas: definição de "mês", "hoje", "período"
- Arredondamento/moeda (se existir): <...>
- Auditoria/histórico (se existir): <...>

## 8) Segurança e permissões (se aplicável)
- Auth obrigatório: <sim/não — remova se não houver>
- Permissões por role:
  - <role 1>: pode <...> / não pode <...>
  - <role 2>: pode <...> / não pode <...>
- Controle de acesso a dados (ex: RLS): <sim/não> + regra geral

## 9) Requisitos não funcionais (só os que importam)
- Performance: <limite simples>
- UX / interface: <ex: "ações críticas com confirmação">
- Confiabilidade: <ex: "operações idempotentes">

## 10) Proibições (anti-"IA viajou")
> As proibições genéricas de processo vivem em `docs/RULES.md` (§Restrições) — fonte única, não duplicar aqui.
> Liste abaixo apenas proibições específicas DESTE produto.
- <ex: nunca chamar API externa X sem cache>
- <ex: não persistir PII em logs>
- <ex: nenhuma operação que não seja idempotente no endpoint Y>

## 11) Critérios de aceite (checklist)
- [ ] <critério 1 testável>
- [ ] <critério 2 testável>
- [ ] <critério 3 testável>
