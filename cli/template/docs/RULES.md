# RULES.md — Como a IA deve trabalhar neste repo

Regras de processo. Neutras a stack e domínio. Governança, não estilo de código.

## Ordem de leitura (canônica — vale para todos os agentes)
Antes de agir, leia nesta ordem. Se não conseguir ler algum, PARE e sinalize.
1. `docs/RULES.md` (este doc — como trabalhar)
2. `docs/SPEC.md` (fonte de verdade: produto + contrato técnico)
3. `docs/ARCH.md` (decisões arquiteturais)
4. `docs/NOW.md` (task atual + backlog + o que já foi feito)

Consulta sob demanda (NÃO entram na leitura obrigatória — abra só quando a task pedir):
- `docs/knowledge/` — conhecimento durável do projeto. Comece pelo índice `docs/knowledge/README.md`.
- `docs/plans/` — planos e rascunhos. Não são fonte de verdade nem autorização de trabalho.

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

## Backlog e próxima task
- `docs/NOW.md` tem duas listas: **Próxima task** (apenas 1, detalhada) e **Backlog** (fila ordenada, 1 linha por item).
- Ao concluir a task: mova para "Feito", promova o topo do Backlog para "Próxima task" e detalhe (objetivo, arquivos prováveis, critério de pronto).
- Item de backlog NÃO é autorização de trabalho. Só a "Próxima task" é executável.
- Ideia nova que aparecer no meio da task → registre no Backlog em vez de implementar na hora.
- Backlog vazio → PARE e peça o próximo item ao usuário. Não invente task.
- Ordem do backlog é decisão do usuário. Sugira repriorizar, não repriorize sozinho.

## Base de conhecimento (`docs/knowledge/`)
- Guarda conhecimento durável do projeto: documentações e guias internos, FAQs, integrações externas, problemas conhecidos + workaround, decisões operacionais e aprendizados de debugging.
- Consulte antes de investigar do zero algo que tem cara de recorrente ou já resolvido.
- Registre lá o que for reutilizável no futuro; o que for efêmero fica no PR/commit.
- Fronteira: regra de negócio/contrato → `docs/SPEC.md`. Decisão arquitetural/ADR → `docs/ARCH.md`. `knowledge/` é o resto (o "como funciona na prática" e o "já passamos por isso").
- Um arquivo por assunto, nome em kebab-case. Atualize o índice `docs/knowledge/README.md` no mesmo PR.

## Planos e rascunhos (`docs/plans/`)
- Para planos de entregas maiores, investigações e rascunhos que ainda não viraram task.
- Não é fonte de verdade e não autoriza execução: trabalho só acontece via `docs/NOW.md`.
- Plano aprovado → quebre em itens do Backlog do NOW, referenciando o arquivo do plano.
- Nome: `NNN-slug.md`. Marque o status no topo do arquivo (rascunho / aprovado / concluído / descartado).

## Padrão de commits
O título de todos os commits deve seguir este formato:
- :emoji: tipo(escopo): descrição curta em português

O que foi feito:
- Resumo objetivo das alterações.

Como foi feito:
- Abordagem técnica utilizada.

Validação:
- Testes ou verificações executadas.

Regras:
- Escrever todos os commits em português do Brasil.
- O título e o corpo devem refletir exatamente o conteúdo do commit.
- Não declarar testes ou verificações que não foram executados.
- Usar tipos como `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `build` e `chore`.
- Criar commits pequenos, coerentes e relacionados ao que foi feito.

## Restrições
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
- Atualize `docs/NOW.md` ao **iniciar** e ao **concluir** a task. NOW reflete o estado real — nunca lista task já concluída como "atual". Mova o que fechou para a seção "Feito" e promova o próximo item do Backlog.
- Se a mudança alterar regra/contrato/limite técnico → atualize `docs/SPEC.md` no mesmo PR.
- Se a mudança alterar decisão arquitetural (ADR, stack, contratos entre serviços) → atualize `docs/ARCH.md` no mesmo PR.
- Se a task gerou conhecimento reutilizável (armadilha, integração, procedimento) → registre em `docs/knowledge/` e atualize o índice no mesmo PR.
