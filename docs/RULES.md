# RULES.md — Como a IA deve trabalhar neste repo

Regras de processo. Neutras a stack e domínio. Governança, não estilo de código.

## Ordem de leitura (canônica — vale para todos os agentes)
Antes de agir, leia nesta ordem. Se não conseguir ler algum, PARE e sinalize.
1. `docs/RULES.md` (este doc — como trabalhar)
2. `docs/SPEC.md` (fonte de verdade: produto + contrato técnico)
3. `docs/ARCH.md` (decisões arquiteturais)
4. `docs/NOW.md` (task atual + o que já foi feito)

## Prioridade em conflito
`docs/SPEC.md` vence. Em conflito com qualquer outro doc, siga a SPEC e sinalize a divergência.

## Quando parar e perguntar
- Requisito ambíguo ou falta info que muda a implementação → pergunte antes de codar.
- 2+ interpretações válidas com impacto diferente → liste e peça a escolha.
- Detalhe trivial sem impacto → assuma o default óbvio, siga e avise na entrega.

## Modo de execução
- Primeiro: proponha um plano curto (passos pequenos) quando a mudança for relevante.
- Depois: implemente em mudanças pequenas e reversíveis.
- Uma task por vez (a de `docs/NOW.md`).

## Restrições (anti-"IA viajou")
- Não criar features fora do escopo de SPEC/NOW.
- Não trocar stack/componentes-chave sem pedido explícito.
- Não criar/alterar schema/contrato sem atualizar `docs/SPEC.md` (e gerar migration, se o projeto usar).
- Não alterar regra de negócio sem atualizar `docs/SPEC.md`.
- Não refatorar em massa sem pedido explícito.

## Qualidade mínima
- Tratar erros e estados vazios.
- Validar inputs críticos nas bordas do sistema (UI, API, CLI, arquivo/entrada externa).
- Cobrir lógica não-trivial (regras de negócio, cálculos, parsing, fluxos) com teste antes de fechar a task.
- Se o projeto ainda não tem setup de teste, sinalizar antes de introduzir.

## Definition of Done (piso)
Uma task só está pronta quando:
- Atende ao critério de pronto escrito no NOW.
- Lógica não-trivial coberta por teste; suíte relevante verde.
- Erros e estados vazios tratados; inputs críticos validados.
- Docs atualizados no mesmo PR (SPEC/ARCH/NOW conforme as regras abaixo).
- Sem scope creep nem refactor não pedido.

## Rotina de docs
- Atualize `docs/NOW.md` ao **iniciar** e ao **concluir** a task. NOW reflete o estado real — nunca lista task já concluída como "atual". Mova o que fechou para a seção "Feito".
- Se a mudança alterar regra/contrato/limite técnico → atualize `docs/SPEC.md` no mesmo PR.
- Se a mudança alterar decisão arquitetural (ADR, stack, contratos entre serviços) → atualize `docs/ARCH.md` no mesmo PR.
