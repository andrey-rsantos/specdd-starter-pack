# SpecDD Starter Pack

<p align="center">
  <img src="SpecDD_Starter_Pack.png" alt="SpecDD mascot" width="160" />
</p>

Um conjunto mínimo de documentos para **desenvolvimento orientado a especificação (Spec Driven Development)** com IA, sem perder o controle do projeto. Um canivete suíço: serve para qualquer tipo de sistema — web, SaaS, CLI, biblioteca, pipeline de dados, o que for — e funciona com qualquer agente de código (Claude, Codex, OpenCode e outros).

Inspirado em metodologias como o [GitHub Spec Kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/Fission-AI/OpenSpec) e [AI Coders Context](https://github.com/vinilana/dotcontext), mas **extremamente enxuto e direto ao que interessa**.

## Por que este projeto?

Spec Kit e OpenSpec são ótimos, mas pesados — muito overhead para a maioria dos projetos. Este starter pack ocupa o nicho oposto: **4 documentos, rails fortes de processo onde importa (governança), neutro no resto**.

A ideia central: programar de forma agêntica — **planejar, implementar e revisar** com IA — mantendo `docs/` como fonte única da verdade, para que a IA não invente nem fuja do escopo.

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

---

## Como funciona

A fonte oficial das regras é **`docs/RULES.md`**. `CLAUDE.md` e `AGENTS.md` são só roteadores — não duplicam regra.

**Ordem de leitura canônica:** `docs/RULES.md` → `docs/SPEC.md` → `docs/ARCH.md` → `docs/NOW.md`. Em conflito, `docs/SPEC.md` vence.

Princípios:
- **Disciplina de processo é lei** (universal): plano pequeno → partes reversíveis → uma task por vez → SPEC vence → atualizar doc no mesmo PR.
- **Estilo de código é neutro**: o pack não impõe KISS/DRY nem qualquer regra de estilo. Se o seu projeto quiser defaults de estilo, escreva-os na SPEC.
- **`docs/` é a ponte**: qualquer modelo lê de lá. Por isso você pode misturar ferramentas livremente.

---

## Como usar

### Novo projeto
1. Copie os arquivos deste pack (`docs/`, `CLAUDE.md`, `AGENTS.md`, e as pastas de subagents da sua ferramenta) para a raiz do seu repositório.
2. Rode o **Bootstrap A** (abaixo): descreva o produto e a IA preenche os docs.

### Projeto existente
1. Copie os mesmos arquivos para a raiz do seu repositório.
2. Rode o **Bootstrap B** — a IA lê sua codebase e preenche os docs.

---

## Exemplos de uso

Não há "modos" nem comando especial. Você combina ferramentas como quiser, sempre ancorado em `docs/`. Três receitas comuns:

### 1. Claude planeja → Codex executa
Bom para usar um modelo forte (Claude/Opus) no que é caro errar — plano e review — e um modelo barato (Codex/OpenCode) na execução.

1. No Claude, peça o plano (ele lê `docs/` e escreve a próxima task em `docs/NOW.md`):
   > Leia `docs/RULES.md`, `docs/SPEC.md`, `docs/ARCH.md` e `docs/NOW.md`. Planeje a próxima entrega em passos pequenos e escreva apenas a primeira task em `docs/NOW.md`. Depois, gere um **build prompt** pronto para colar em outra ferramenta, pedindo para implementar só o que está em `docs/NOW.md`.
2. Cole o build prompt no Codex para implementar.
3. Volte ao Claude para revisar o diff contra SPEC/ARCH/NOW.

### 2. Vice-versa (ou qualquer par)
Mesma mecânica, invertendo papéis: qualquer modelo forte planeja/revisa, qualquer barato executa. A ponte é sempre `docs/`.

### 3. Subagents (uma ferramenta só)
Se sua ferramenta suporta subagents, rode o ciclo inteiro sem trocar de janela:
`planner` → `implementer` → `reviewer` (em `.claude/agents/`, `.codex/agents/`, `.opencode/agents/`).
O `planner` lê os docs e escreve a task no `docs/NOW.md`; o `implementer` implementa só o NOW; o `reviewer` revisa o diff. Todos seguem `docs/RULES.md`.

No Codex, peça explicitamente para usar os subagentes e indique os papéis desejados; sem esse pedido, o trabalho continua na thread atual.

> **Nota do autor:** uso Claude (Opus/Sonnet) para planejar e revisar, e LLMs mais baratos (Codex/MiniMax) para executar. Reduz custo sem perder qualidade nas decisões críticas — mas é opcional.

---

## Bootstrap — Iniciando os documentos

Use uma vez, no início, para preencher todos os docs automaticamente.

### (Bootstrap A) Novo projeto
```text
Leia: docs/RULES.md, docs/SPEC.md, docs/ARCH.md, docs/NOW.md

Contexto do produto (preencha em 2–5 linhas):
- O que é / para quem / qual valor:
- Objetivos desta versão (até 3):
- O que NÃO fazer (fora de escopo):

Tarefa:
1) Preencher docs/SPEC.md:
   - seção Produto (visão, problema, objetivos, fora de escopo, métrica de sucesso);
   - componentes/stack, entidades principais, fluxos obrigatórios,
     regras de negócio não negociáveis, regras de dados, permissões (se houver),
     proibições (anti-feature-creep), critérios de aceite (checklist).
2) Preencher docs/ARCH.md: componentes e responsabilidades, diagrama
   (ASCII/Mermaid), ADRs resumidos (contexto + decisão + trade-offs), contratos entre partes.
3) Preencher docs/NOW.md com a primeira task (apenas 1) + critério de pronto.
4) Ajustar docs/RULES.md só se necessário (o pack é neutro; adicione defaults de estilo aqui se quiser).

Saída: conteúdo completo de cada arquivo, pronto para colar.
Regras: não inventar features fora do escopo descrito. Sem arquitetura extra.
```

### (Bootstrap B) Projeto existente — a partir da codebase
```text
Leia toda a codebase (estrutura, arquivos principais, configs, migrations, rotas, modelos, README).

Tarefa: preencher os docs do SpecDD com base no que já existe.
1) docs/SPEC.md inferindo do código: seção Produto (o que o sistema faz, público
   provável, escopo real, fora de escopo); stack real, entidades, fluxos, regras de
   negócio, regras de dados, permissões, proibições (o que NÃO mexer), critérios já "done".
2) docs/ARCH.md: componentes e responsabilidades reais, diagrama, ADRs
   identificados, contratos entre partes.
3) docs/NOW.md: preencher a seção "Feito" com o estado atual e a próxima task mais lógica.
4) Ajustar docs/RULES.md só se necessário.

Saída: conteúdo completo de cada arquivo, pronto para colar.
Regras: não inventar o que não existe no código. Não propor refatorações.
```

---

## Skills (extras opcionais)

O pack é neutro — skills são um extra que você liga se quiser. Duas recomendadas:

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
> Espírito SpecDD: busque/instale à vontade, mas **capacidade nova continua passando por `docs/NOW.md` / `docs/SPEC.md`** — a skill amplia o que você pode fazer, não autoriza a IA a sair do escopo sozinha.

**Test-Driven Development — disciplina de teste (opt-in por projeto)**
Força o ciclo red-green-refactor (teste primeiro → vê falhar → código mínimo). Regra estrita.
O pack é **neutro em estilo**, então TDD **não vem ligado**. Se o seu projeto quer TDD:
1. Ache e instale: `npx skills find test-driven-development` → `npx skills add <pacote>`.
2. Declare na `docs/SPEC.md` que este projeto usa TDD (é um default de estilo — pertence à SPEC, não ao pack).

Fonte: [obra/superpowers](https://www.skills.sh/obra/superpowers/test-driven-development).

---

## Filosofia

- **Disciplina de processo é lei** — plano pequeno, partes reversíveis, uma task por vez, SPEC vence.
- **Estilo é neutro** — o pack não impõe estilo de código; adicione o seu na SPEC se quiser.
- **`docs/` é a fonte da verdade** — qualquer modelo lê de lá; misture ferramentas à vontade.

---

## Contribuindo

PRs bem-vindos. Só mantenha o espírito: **mínimo que mantém a IA no trilho**.

## Licença

MIT
