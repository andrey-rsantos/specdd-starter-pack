# SpecDD Starter Pack — Guia de Uso (IA-first / Vibecoding / KISS)

## O que é
Um conjunto mínimo de documentos para manter velocidade (KISS) sem perder controle quando você codifica 100% com IA.

## Estrutura
- `docs/PRD_v1.md` — decisão de produto (escopo/fluxo/limites). Versione por arquivo: `PRD_v2.md`, `PRD_v3.md`, etc.
- `docs/spec.md` — contrato de comportamento + restrições técnicas (anti-"IA viajou").
- `docs/architecture.md` — decisões arquiteturais (ADRs), diagrama de componentes, contratos entre serviços.
- `docs/agents.md` — política de execução (KISS + como a IA deve trabalhar).
- `docs/NOW.md` — contexto **atual** (1 tarefa por vez).
- `docs/implementation_summary.md` — **milestones** (marcos) e histórico leve.

---

## CLAUDE.md e AGENTS.md

O repositório inclui dois arquivos de instrução para agentes IA:

- **`CLAUDE.md`** — instrui o Claude especificamente. Papel: planejador e revisor (SpecDD). Não escreve código de implementação (a menos que você peça); produz planos, critérios, prompts e patches de doc.
- **`AGENTS.md`** — coringa. Funciona com qualquer agente (Codex, MiniMax, Qwen, Kimi K2, etc.). O usuário define o papel (planejador ou executor) conforme o contexto.

> **Nota do autor:** Particularmente uso Claude para planejamento e revisão com Sonnet ou Opus, e LLMs mais baratos para execução como Codex ou MiniMax. Essa divisão reduz custo sem perder qualidade nas decisões críticas.

---

## Começando um projeto

1) Copie a pasta `docs/`, `.agents/` e os arquivos `CLAUDE.md` e `AGENTS.md` para o novo repo.
2) Preencha `docs/PRD_v1.md` (10 min) — é o único input manual obrigatório.
3) Rode o **Bootstrap A** (seção abaixo) para gerar todos os outros docs automaticamente.

> Para projetos existentes sem PRD: use o **Bootstrap B**.

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
