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
| `docs/PRD_v1.md` | Decisão de produto — escopo, fluxo, limites |
| `docs/spec.md` | Contrato técnico — regras, restrições, anti-"IA viajou" |
| `docs/architecture.md` | Decisões arquiteturais, ADRs, contratos entre serviços |
| `docs/agents.md` | Como a IA deve trabalhar (KISS, sem inventar) |
| `docs/NOW.md` | Tarefa atual — uma por vez |
| `docs/implementation_summary.md` | Milestones e histórico leve |
| `CLAUDE.md` | Instrução para Claude (planejador/revisor) |
| `AGENTS.md` | Instrução coringa para qualquer agente executor |
| `.agents/skills/` | Skills auxiliares para agentes executores |

---

## Como usar

### Novo projeto
1. Baixe o ZIP disponível neste repositório.
2. Extraia na raiz do seu repositório.
3. Preencha `docs/PRD_v1.md` (10 min).
4. Rode o **Bootstrap A** do `STARTER_PACK_GUIDE.md` para gerar os demais docs automaticamente.

### Projeto existente
1. Baixe e extraia o ZIP.
2. Rode o **Bootstrap B** do `STARTER_PACK_GUIDE.md` — a IA lê sua codebase e preenche todos os docs.

> Guia completo você encontra no arquivo `STARTER_PACK_GUIDE.md`.

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
- **Planejador + executor** — Claude para decisões, LLMs mais baratos para código.

---

## Contribuindo

Se usar e quiser melhorar, fique à vontade para abrir um PR. Sugestões de novos templates, melhorias nos prompts de bootstrap ou ajustes nos guardrails são bem-vindos. 🤙

Só mantenha o espírito do projeto: **mínimo que funciona**.

---

## Licença

MIT