# SpecDD Starter Pack

<p align="center">
  <img src="https://raw.githubusercontent.com/andrey-rsantos/specdd-starter-pack/master/SpecDD_Starter_Pack.png" alt="SpecDD mascot" width="160" />
</p>

Um conjunto mínimo de documentos para **desenvolvimento orientado a especificação (Spec Driven Development)** com IA, sem perder o controle do projeto. Um canivete suíço: serve para qualquer tipo de sistema — web, SaaS, CLI, biblioteca, pipeline de dados, o que for — e foi pensado para os principais agentes de código: **Claude, Codex e OpenCode**.

## Instalação

Na raiz do seu repositório, rode:

```bash
npx specdd-starter-pack
```

[![npm](https://img.shields.io/npm/v/specdd-starter-pack.svg)](https://www.npmjs.com/package/specdd-starter-pack)

Inspirado em metodologias como o [GitHub Spec Kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/Fission-AI/OpenSpec) e [AI Coders Context](https://github.com/vinilana/dotcontext), mas **extremamente enxuto e dando máxima liberdade para quem está construindo**.

## Por que este projeto?

Spec Kit e OpenSpec são ótimos, mas caem em alguns pontos: o Spec Kit traz muito overhead com vários documentos e isso é peso demais para boa parte dos projetos; o OpenSpec é leve, porém engessado. Este starter pack fica no meio-termo pragmático: **4 documentos, rails fortes de processo onde importa (governança), liberdade no resto**.

A ideia central: programar de forma agêntica: **planejar, implementar e revisar** com IA mantendo `docs/` como fonte única da verdade, para que a IA não invente nem fuja do escopo.

---

## O que está incluído

Quatro documentos em `docs/`, mais roteadores curtos por ferramenta.

| Arquivo / Pasta | Para quê |
|---|---|
| `docs/RULES.md` | **Como a IA deve trabalhar** — processo/governança. Fonte oficial das regras. Neutro a stack. |
| `docs/SPEC.md` | Fonte de verdade: **produto** (visão/escopo/fora-de-escopo) + **contrato técnico** (regras, restrições, anti-"IA viajou"). |
| `docs/ARCH.md` | Decisões arquiteturais, ADRs, contratos entre partes. |
| `docs/NOW.md` | Task atual (uma por vez) + seção "Feito" (marcos recentes; histórico completo no git). |
| `CLAUDE.md` / `AGENTS.md` | Roteadores curtos que apontam para `docs/RULES.md`. Não duplicam regra. |
| `.claude/agents/` · `.codex/agents/` · `.opencode/agents/` | Definições de subagentes por ferramenta (`planner` → `implementer` → `reviewer`). |

> **O toolkit é adaptativo.** Estes são apenas os arquivos iniciais — um ponto de partida, não uma camisa de força. Crie, edite, renomeie ou remova o que fizer sentido para o seu projeto: ajuste as regras em `docs/RULES.md`, molde os docs, altere os subagents ou adicione novos. Mantenha só o espírito: `docs/` como fonte da verdade e a IA no trilho.

---

## Como funciona

A fonte oficial das regras é **`docs/RULES.md`**. `CLAUDE.md` e `AGENTS.md` são só roteadores — não duplicam regra.

**Ordem de leitura canônica:** `docs/RULES.md` → `docs/SPEC.md` → `docs/ARCH.md` → `docs/NOW.md`. Em conflito, `docs/SPEC.md` vence.

Princípios:
- **Disciplina de processo é lei** (universal): plano pequeno → partes reversíveis → uma task por vez → SPEC vence → atualizar doc no mesmo PR.
- **Estilo de código é neutro**: o pack não impõe qualquer regra de estilo. Se o seu projeto quiser defaults de estilo e princípios como KISS, YAGNI ou DRY, escreva-os na SPEC.
- **`docs/` é a ponte**: qualquer modelo lê de lá. Por isso você pode misturar ferramentas livremente.

---

## Como usar

Ao rodar `npx specdd-starter-pack`, a CLI é interativa e pergunta:

1. **Tipo de projeto** — novo ou existente (auto-detecta pelo conteúdo da pasta).
2. **Harness** — Claude Code · Codex · OpenCode (um ou vários; copia só o que cada um usa).
3. **Bootstrap** — gera um `BOOTSTRAP.md` com o prompt pronto para o agente preencher os docs.

Divisão de trabalho: a **CLI copia os arquivos**; o **seu agente (LLM) preenche** `SPEC.md`/`ARCH.md`/`NOW.md`. Por isso ela gera o `BOOTSTRAP.md` — você cola no Claude/Codex/OpenCode (ou pede "Execute BOOTSTRAP.md") e o agente preenche. O prompt se adapta:

- **Projeto novo** (sem código): o agente **entrevista você** — pergunta produto, objetivos, escopo e stack — e só então preenche os docs.
- **Projeto existente**: o agente **lê a codebase** e infere os docs a partir do que já existe.

Depois é só apagar o `BOOTSTRAP.md`.

---

## Exemplos de uso

Não há "modos" nem comando especial. Você combina ferramentas como quiser, sempre ancorado em `docs/`. Quatro receitas comuns:

### 1. Um agente só (o mais simples)
Sem subagents, sem trocar de ferramenta — o mesmo agente planeja e executa na mesma thread. Bom para começar e para tarefas menores.

1. Peça o plano (o agente lê `docs/` e escreve a próxima task em `docs/NOW.md`):
   > Leia `docs/RULES.md`, `docs/SPEC.md`, `docs/ARCH.md` e `docs/NOW.md`. Planeje a próxima entrega em passos pequenos e escreva apenas a primeira task em `docs/NOW.md`.
2. Revise a task no `docs/NOW.md` e aprove.
3. Peça para implementar só o que está no NOW:
   > Implemente apenas a task de `docs/NOW.md`. Ao terminar, atualize os docs conforme `docs/RULES.md`.

Tudo em uma janela. O rigor vem dos docs, não da separação de ferramentas.

### 2. Claude planeja → Codex executa
Bom para usar um modelo forte (Claude Opus) no que é caro errar (plano e review) e um modelo barato (Algum do OpenCode) na execução.

1. No Claude, peça o plano (ele lê `docs/` e escreve a próxima task em `docs/NOW.md`):
   > Leia `docs/RULES.md`, `docs/SPEC.md`, `docs/ARCH.md` e `docs/NOW.md`. Planeje a próxima entrega em passos pequenos e escreva apenas a primeira task em `docs/NOW.md`. Depois, gere um **build prompt** pronto para colar em outra ferramenta, pedindo para implementar só o que está em `docs/NOW.md`.
2. Cole o build prompt no Codex para implementar.
3. Volte ao Claude para revisar o diff contra SPEC/ARCH/NOW.

### 3. Vice-versa (ou qualquer par)
Mesma mecânica, invertendo papéis: qualquer modelo forte planeja/revisa, qualquer barato executa. A ponte é sempre `docs/`.

### 4. Subagents (uma ferramenta só)
Se sua ferramenta suporta subagents, rode o ciclo inteiro sem trocar de janela:
`planner` → `implementer` → `reviewer` (em `.claude/agents/`, `.codex/agents/`, `.opencode/agents/`).
O `planner` lê os docs e escreve a task no `docs/NOW.md`; o `implementer` implementa só o NOW; o `reviewer` revisa o diff. Todos seguem `docs/RULES.md`.

> **Nota do autor:** Eu costumo usar Claude Opus 4.8 para planejar e revisar, e Claude Sonnet na execução. Também gosto muito de utilizar o Codex 5.4 ou 5.5 tanto no planejamento quanto na execução. 

---

## Skills (Separei algumas que acho bacanas):

O pack é neutro; skills são um extra que você liga se quiser. Duas recomendadas:

Skills usam o formato aberto [`SKILL.md`](https://agentskills.io) — portável entre ferramentas. Mas o **path de descoberta muda por ferramenta**, então não vêm pré-instaladas: instale na gaveta da sua.

| Ferramenta | Instale em |
|---|---|
| Claude Code | `.claude/skills/<nome>/` |
| Codex | `.agents/skills/<nome>/` |
| OpenCode | `.opencode/skills/<nome>/` (também lê `.claude/skills/` e `.agents/skills/`) |

**find-skills — descoberta de skills (recomendada)**
Acha e instala skills para tarefas específicas, direto do ecossistema aberto.
- Buscar: `npx skills find <tarefa>`
- Instalar: `npx skills add <pacote>` (na pasta de skills da sua ferramenta)

Fonte: [vercel-labs/skills](https://www.skills.sh/vercel-labs/skills/find-skills).
> Espírito: busque/instale à vontade, mas **capacidade nova continua passando por `docs/NOW.md` / `docs/SPEC.md`** — a skill amplia o que você pode fazer, não autoriza a IA a sair do escopo sozinha.

**Test-Driven Development — disciplina de teste (opt-in por projeto)**
Força o ciclo red-green-refactor (teste primeiro → vê falhar → código mínimo). Regra estrita.
O pack é **neutro em estilo**, então TDD **não vem ligado**. Se o seu projeto quer TDD:
1. Ache e instale: `npx skills find test-driven-development` → `npx skills add <pacote>`.
2. Declare na `docs/SPEC.md` que este projeto usa TDD (é um default de estilo — pertence à SPEC, não ao pack).

Fonte: [obra/superpowers](https://www.skills.sh/obra/superpowers/test-driven-development).

---

## Contribuindo

PRs bem-vindos. Só mantenha a ideia: **organização que mantém a IA no trilho com o mínimo possível**.

## Licença

MIT
