# SpecDD Starter Pack

<p align="center">
  <img src="SpecDD_Starter_Pack.png" alt="SpecDD mascot" width="160" />
</p>

Este é um conjunto mínimo de documentos para desenvolvimento assistido por IA sem perder o controle do projeto. Criei ele com foco em desenvolvimento de SaaS, MicroSaaS e sistemas web de pequeno porte, que é basicamente com o que trabalho nos dias de hoje.

Inspirado em metodologias como o GitHub Spec Kit (https://github.com/github/spec-kit) e AI Coders Context (https://github.com/vinilana/dotcontext), mas extremamente simplificado, montei este Starter Pack pensado para quem precisa de velocidade, mas sem perder o controle do que a IA está fazendo, seja você um desenvolvedor experiente ou alguém que está começando a codar com IA.


## Por que este projeto?

Ferramentas como Spec Kit são ótimas para times grandes e sistemas complexos. Para um SaaS solo ou um sistema web pequeno, elas podem adicionar um overhead desnecessário (ainda mais se você não for um desenvolvedor de ofício ou não tiver muita experiência com desenvolvimento assistido por IA).

Este starter pack resolve isso: documentação mínima o suficiente para manter a IA no trilho, sem travar o desenvolvimento.

---

## O que está incluído

| Arquivo / Pasta | Para quê |
|---|---|
| `docs/PRD_v1.md` | Decisão de produto — escopo, fluxo, limites. Versione por arquivo: `PRD_v2.md`, `PRD_v3.md`, etc. |
| `docs/spec.md` | Contrato técnico — regras, restrições, anti-"IA viajou" |
| `docs/architecture.md` | Decisões arquiteturais, ADRs, contratos entre serviços |
| `docs/agents.md` | Como a IA deve trabalhar (KISS, sem inventar) |
| `docs/NOW.md` | Tarefa atual — uma por vez |
| `docs/implementation_summary.md` | Milestones e histórico leve |
| `CLAUDE.md` | Wrapper curto para Claude Code seguir o SpecDD |
| `AGENTS.md` | Wrapper curto e genérico para qualquer agente (Codex, OpenCode, Kimi, Qwen…) |
| `.agents/manual-prompts/` | Prompts copiáveis do fluxo manual (`01-specify` → `05-review`) |
| `.agents/templates/` | Formatos de saída (spec, plan, tasks, review) |
| `.claude/agents/` · `.opencode/agents/` | Subagents nativos por ferramenta (fluxo pipeline) |

---

## Como o agente lê as regras

A fonte oficial das regras de trabalho da IA é **`docs/agents.md`**. Os arquivos de entrada são wrappers curtos que só apontam para lá (sem duplicar regra):

- **`CLAUDE.md`** — wrapper para o Claude Code.
- **`AGENTS.md`** — wrapper genérico para qualquer agente (Codex, OpenCode, Kimi, Qwen, MiniMax, etc.).

O **papel do agente não é fixo**. Você escolhe o modo: Planner, Executor, Reviewer, Manual Prompt Relay ou Subagent Pipeline (detalhes em `docs/agents.md`).

---

## Modos de uso

### Manual Prompt Relay Mode
Fluxo baseado em prompts copiáveis entre ferramentas/modelos. Útil para usar um modelo forte (Claude/Opus/Sonnet) como planejador/revisor e modelos mais baratos (Kimi/Codex/OpenCode/Qwen) como executores.

Use os prompts em `.agents/manual-prompts/`, em ordem:
`01-specify` → `02-plan` → `03-tasks` → `04-implement` → `05-review`.
Copia o prompt da etapa, cola na ferramenta escolhida, leva o resultado para `docs/`.

### Subagent Pipeline Mode
Fluxo com subagents especializados, para ambientes que suportam papéis (Claude Code, OpenCode, etc.). O ciclo padrão (KISS) tem 3 papéis:
`planner` → `implementer` → `reviewer`.
O `planner` lê os docs, planeja e escreve a próxima task no `docs/NOW.md`; o `implementer` implementa só o NOW; o `reviewer` revisa o diff. Cada ferramenta tem seus subagents nativos com as instruções embutidas (`.claude/agents/`, `.opencode/agents/`, …); todos leem de `docs/` e seguem as mesmas regras. Papéis opcionais `spec-reader`/`task-breaker` para escalar (ver `docs/agents.md`).

> Os dois modos usam os mesmos `docs/` como fonte da verdade. Escolha o que se encaixa na sua ferramenta.

> **Nota do autor:** Particularmente uso Claude para planejamento e revisão com Sonnet ou Opus, e LLMs mais baratos para execução como Codex ou MiniMax. Essa divisão reduz custo sem perder qualidade nas decisões críticas — mas é opcional.

---

## Como usar

### Novo projeto
1. Baixe o ZIP disponível neste repositório.
2. Extraia na raiz do seu repositório.
3. Preencha `docs/PRD_v1.md` (10 min) — é o único input manual obrigatório.
4. Rode o **Bootstrap A** (seção abaixo) para gerar os demais docs automaticamente.

### Projeto existente
1. Baixe e extraia o ZIP.
2. Rode o **Bootstrap B** (seção abaixo) — a IA lê sua codebase e preenche todos os docs.

---

## Bootstrap — Iniciando os documentos

Use estes prompts **uma vez**, no início do projeto, para preencher todos os docs automaticamente.

### (Bootstrap A) Novo projeto — preencher docs a partir do PRD
```text
Leia estes arquivos:
- docs/PRD_v1.md
- docs/agents.md
- docs/spec.md
- docs/architecture.md
- docs/implementation_summary.md
- docs/NOW.md

Tarefa:
1) Gerar/atualizar docs/spec.md baseado no PRD_v1.md, travando:
   - stack (fixa)
   - entidades principais (conceito)
   - fluxos obrigatórios
   - regras de negócio não negociáveis
   - regras de dados (timezone, ids, soft delete etc.)
   - permissões por role
   - proibições (anti-feature creep / anti-refactor)
   - critérios de aceite do MVP (checklist)

2) Gerar docs/architecture.md com:
   - stack e responsabilidade de cada camada
   - diagrama de componentes (ASCII ou Mermaid)
   - decisões arquiteturais iniciais como ADRs resumidos (contexto + decisão + trade-offs)
   - contratos entre serviços (se houver)

3) Ajustar docs/agents.md apenas se necessário para refletir o estilo do projeto (KISS, mudanças pequenas, sem inventar features).

4) Preencher docs/implementation_summary.md com 3–7 milestones planejados alinhados ao PRD.

5) Preencher docs/NOW.md com a primeira task do MVP (apenas 1), incluindo critério de pronto.

Formato de saída:
- Para cada arquivo, devolva o conteúdo completo pronto para colar.

Regras:
- Não inventar features fora do PRD.
- Não criar arquitetura extra. KISS.
```

### (Bootstrap B) Projeto existente — preencher docs a partir da codebase
```text
Leia toda a codebase deste projeto (estrutura de pastas, arquivos principais, configurações, migrations, rotas, modelos, README se existir).

Tarefa: preencher os docs do SpecDD Starter Pack com base no que já existe no código.

1) Gerar docs/spec.md inferindo do código:
   - stack real (linguagens, frameworks, libs principais)
   - entidades principais (modelos/schemas encontrados)
   - fluxos obrigatórios (rotas/endpoints/handlers encontrados)
   - regras de negócio (validações, guards, lógica encontrada)
   - regras de dados (tipos de id, soft delete, timezone, etc.)
   - permissões por role (middleware de auth encontrado)
   - proibições: liste o que NÃO deve ser alterado sem decisão explícita
   - critérios de aceite: liste o que já funciona como "done"

2) Gerar docs/architecture.md com:
   - stack e responsabilidade de cada camada (baseado no código real)
   - diagrama de componentes (ASCII ou Mermaid) mostrando as partes do sistema
   - decisões arquiteturais identificadas como ADRs (ex: "por que esse banco?", "por que essa estrutura de pastas?")
   - contratos entre serviços (APIs internas, filas, eventos encontrados)

3) Gerar docs/PRD_v1.md inferindo:
   - o que o sistema faz (visão geral)
   - público-alvo provável
   - funcionalidades já implementadas (escopo real)
   - o que parece estar fora de escopo atual

4) Preencher docs/implementation_summary.md:
   - o que já está "Done" (funcionalidades existentes, com data aproximada se possível)
   - próximos milestones razoáveis com base no estado atual

5) Preencher docs/NOW.md com a próxima task mais lógica dado o estado atual da codebase.

Formato de saída:
- Para cada arquivo, devolva o conteúdo completo pronto para colar.

Regras:
- Não inventar features que não existem no código.
- Não propor refatorações. Documentar o que existe.
- KISS. Se não encontrar evidência, deixe o placeholder do template.
```

---

## Loop diário (vibecoding)
**Regra:** uma task por vez.

1) Atualize `docs/NOW.md` com:
   - objetivo (1 frase)
   - critérios de pronto (3–7 bullets testáveis)
   - "não fazer" (limites)
2) Peça pra IA implementar **apenas** o NOW.
3) Se mudar regra/contrato/segurança/dados → atualize `docs/spec.md` no mesmo PR.
4) Se mudar decisão arquitetural → atualize `docs/architecture.md` no mesmo PR.

---

## Quando atualizar cada arquivo (sem burocracia)

### PRD (`docs/PRD_vX.md`)
Crie nova versão quando mudar:
- escopo do produto
- fluxo principal
- decisão importante

**Não sobrescreva versões antigas.**

### spec (`docs/spec.md`)
Atualize quando mudar:
- regra de negócio
- permissões / segurança
- contratos de dados (schema, timezone, soft delete)
- limites técnicos/proibições

### architecture (`docs/architecture.md`)
Atualize quando mudar:
- stack ou tecnologia de uma camada
- contratos entre serviços
- decisão arquitetural relevante (nova fila, novo serviço, mudança de auth)

Registre como ADR resumido: contexto + decisão + trade-offs aceitos.

### agents (`docs/agents.md`)
Quase nunca. Atualize só se mudar o seu **modo de trabalhar**.

### NOW (`docs/NOW.md`)
Sempre que começar/trocar de tarefa.

### implementation_summary (`docs/implementation_summary.md`)
- Preencha `Planned` no início (3–7 milestones).
- Mantenha **apenas 1** em `In progress`.
- Mova para `Done` **só ao fechar** um milestone (data + 1 linha).

---

## Quais docs referenciar para implementar (Copilot / Opencode / Antigravity)
**Para implementar uma task:**
- `docs/agents.md`
- `docs/spec.md`
- `docs/architecture.md`
- `docs/NOW.md`
- (opcional) `docs/PRD_v1.md` (bom para reforçar escopo)

**Para mudança de escopo:**
- `docs/PRD_v2.md` (ou nova versão)
- `docs/spec.md`
- `docs/agents.md`
- `docs/NOW.md`

**Para fechar milestone:**
- `docs/implementation_summary.md`

---

## Prompts prontos (copy/paste)

### (A) Implementar a task atual
```text
Leia docs/agents.md, docs/spec.md, docs/architecture.md, docs/NOW.md e docs/PRD_v1.md.

Antes de implementar, avalie o pedido:
- Se docs/NOW.md estiver vazio ou desatualizado: interprete o pedido, preencha o NOW (objetivo + critérios de pronto) e confirme antes de continuar.
- Se o pedido conflitar com docs/spec.md: avise o conflito e pergunte se o usuário quer atualizar a spec antes de continuar.
- Se o pedido estiver fora do escopo do PRD: avise, pergunte se o usuário quer expandir o escopo — se sim, crie docs/PRD_v2.md, atualize docs/spec.md e docs/NOW.md antes de implementar.

Depois de validado:
Implemente APENAS o que está em docs/NOW.md.
Faça mudanças pequenas e reversíveis (KISS).
Se precisar mudar regra/contrato/schema, atualize docs/spec.md no mesmo PR.
Se precisar mudar decisão arquitetural, atualize docs/architecture.md no mesmo PR.
Não invente features.
```

### (B) Mudança de escopo (criar PRD_v2 + ajustar spec + NOW)
```text
Mudança: <descreva>.
Crie docs/PRD_v2.md (curto) com escopo entra/não entra e fluxo.
Atualize docs/spec.md com os novos contratos.
Se houver impacto arquitetural, atualize docs/architecture.md com o ADR da decisão.
Depois escreva 1 task inicial em docs/NOW.md com critérios de pronto.
KISS. Sem overengineering.
```

### (C) Fechar milestone (atualizar summary)
```text
Fechamos o milestone M?. Atualize docs/implementation_summary.md:
- mover para Done com data e 1 linha de resumo
- colocar o próximo milestone em In progress com DoD em bullets
Não mexa no spec.
```

---

## Para não-técnicos

Use os prompts de Bootstrap para gerar os docs automaticamente.
Depois é só pedir o que você quer ao seu agente de IA — ele preenche o
`docs/NOW.md`, valida contra as regras do projeto e implementa.

Uma dica: de vez em quando pergunte ao agente o que ele está fazendo e
peça que cite de onde tirou aquela decisão (os arquivos em `/docs`).
Isso te mantém no controle sem precisar ler código.

---

## Filosofia

- **KISS** — o mínimo que mantém a IA no trilho.
- **Uma task por vez** — `docs/NOW.md` como foco.
- **Spec como lei** — `docs/spec.md` vence qualquer conflito.
- **Papel flexível** — você escolhe o modo (manual relay ou subagents); o agente não tem papel fixo.

---

## Contribuindo

Se usar e quiser melhorar, fique à vontade para abrir um PR. Sugestões de novos templates, melhorias nos prompts de bootstrap ou ajustes nos guardrails são bem-vindos. 🤙

Só mantenha o espírito do projeto: **mínimo que funciona**.

---

## Licença

MIT
