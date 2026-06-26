# agents.md — Regras de trabalho da IA (fonte oficial)

Este é o documento **oficial** de como a IA deve trabalhar neste repositório.
`CLAUDE.md` e `AGENTS.md` são apenas wrappers curtos que apontam para cá — não duplique regras lá.

---

## Filosofia (KISS)
- Prioridade máxima: lançar rápido com o mínimo necessário.
- Primeiro: propor um plano curto (passos pequenos) quando a mudança for relevante.
- Depois: implementar em commits pequenos e reversíveis.
- Sempre: evitar abstrações e "melhorias" não pedidas.

## Uma task por vez
- `docs/NOW.md` é o foco. Só uma task ativa.
- Se `docs/NOW.md` estiver vazio ou desatualizado: interprete o pedido, preencha o NOW (objetivo + critérios de pronto) e confirme antes de implementar.

## Ordem de prioridade dos documentos
1. `docs/spec.md` — contratos, regras, restrições e limites técnicos.
2. `docs/agents.md` — modo de trabalho (este arquivo).
3. `docs/NOW.md` — tarefa atual (uma por vez) e Definition of Done.
4. `docs/architecture.md` — decisões arquiteturais, ADRs, contratos entre serviços.
5. `docs/PRD_vX.md` — escopo e intenção do produto.
6. `docs/implementation_summary.md` — histórico de milestones.

> Em caso de conflito, obedeça sempre o documento de maior prioridade. `docs/spec.md` vence qualquer conflito.

## Antes de codar
- Ler `docs/spec.md`, `docs/NOW.md`, `docs/architecture.md` e o `docs/PRD_vX.md` vigente.
- Confirmar objetivo e constraints. Se houver conflito, seguir `docs/spec.md` e sinalizar.

## Restrições
- Não criar features fora do escopo do PRD/spec sem aviso. Se o pedido estiver fora do escopo, sinalize e pergunte antes de continuar.
- Não trocar stack/bibliotecas-chave.
- Não criar/alterar schema sem atualizar `docs/spec.md` (e migrations).
- Não refatorar em massa sem pedido explícito.
- Não alterar regras de negócio sem atualizar `docs/spec.md`.

## Qualidade mínima
- Tratar erros e estados vazios.
- Validar inputs críticos (frontend e/ou backend).
- Logs básicos onde necessário.

---

## Quando atualizar cada documento (sem burocracia)

### `docs/spec.md`
Atualize **no mesmo PR** quando mudar: regra de negócio, permissões/segurança, contratos de dados (schema, timezone, soft delete) ou limites técnicos/proibições.

### `docs/architecture.md`
Atualize **no mesmo PR** quando mudar: stack de uma camada, contratos entre serviços ou decisão arquitetural relevante (nova fila, novo serviço, mudança de auth). Registre como ADR resumido: contexto + decisão + trade-offs.

### `docs/NOW.md`
Atualize sempre que começar ou trocar de tarefa (1 task por vez).

### `docs/implementation_summary.md`
- Preencha `Planned` no início (3–7 milestones).
- Mantenha **apenas 1** em `In progress`.
- Mova para `Done` **só ao fechar** um milestone (data + 1 linha).

---

## Modos de execução

O papel do agente **não é fixo**. O usuário escolhe o modo. Os arquivos em `.agents/` apoiam cada modo, mas a fonte da verdade continua sendo `docs/`.

### 1. Manual Prompt Relay Mode
Fluxo baseado em prompts copiáveis entre ferramentas/modelos. Útil para usar um modelo forte (Claude/Opus/Sonnet) como planejador/revisor e modelos mais baratos (Kimi/Codex/OpenCode/Qwen) como executores.
- Prompts prontos em `.agents/manual-prompts/` (`01-specify` → `05-review`).
- Você copia o prompt da etapa, cola na ferramenta escolhida e leva o resultado para `docs/`.

### 2. Single Agent Mode
Um único agente assume um papel por vez, conforme o pedido:
- **Planner** — transforma NOW/spec em plano técnico pequeno.
- **Executor** — implementa apenas o escopo da task atual.
- **Reviewer** — revisa o diff contra spec, architecture, NOW e DoD.

### 3. Pipeline / Subagents Mode
Fluxo com subagents especializados, para ambientes que suportam papéis (Claude Code, OpenCode, etc.). O ciclo padrão (KISS) tem 3 papéis:
`planner` → `implementer` → `reviewer`.
O `planner` lê os docs, faz o plano pequeno e escreve a próxima task em `docs/NOW.md`; o `implementer` implementa só o NOW; o `reviewer` revisa o diff. O orquestrador encadeia os subagents, mas cada um lê de `docs/` e respeita as mesmas regras deste arquivo.

> Para escalar (opcional): se os docs forem grandes ou um plano gerar várias tasks, dá pra adicionar subagents `spec-reader` (resume os docs antes do planner) e `task-breaker` (sequencia as tasks). No padrão não vêm prontos — o `planner` já cobre os dois. O fluxo granular também existe nos prompts manuais (`.agents/manual-prompts/`: `01-specify`, `03-tasks`).

Cada ferramenta tem seus próprios arquivos de subagent, com as instruções do papel embutidas (sem rotear). As regras de trabalho compartilhadas ficam aqui em `docs/agents.md`:
- **Claude Code:** subagents nativos em `.claude/agents/*.md` (frontmatter + corpo), auto-descobertos via Task tool.
- **OpenCode:** subagents em `.opencode/agents/*.md` com `mode: subagent`; tools restritas via `permission:`. Invocados por `@mention` ou automaticamente pela `description`.
- **Codex:** custom agents em `.codex/agents/*.toml` quando quiser spawnar pelo ambiente Codex.

> Em qualquer modo: KISS, uma task por vez, `docs/` é a fonte da verdade.
