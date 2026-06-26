# 01 — Specify (ideia/PRD → spec)

Use quando precisar transformar uma ideia ou o PRD em especificação clara.
Copie o bloco abaixo na ferramenta/modelo escolhido.

```text
Leia docs/PRD_vX.md (versão vigente) e docs/spec.md.
Se houver apenas uma ideia solta, peça os pontos faltantes em no máximo 3 perguntas curtas.

Tarefa: gerar/atualizar docs/spec.md travando:
- stack (fixa)
- entidades principais (conceito, não schema completo)
- fluxos obrigatórios (com resultado esperado)
- regras de negócio não negociáveis
- regras de dados (ids, soft delete, timezone, datas, moeda)
- permissões por role
- proibições (anti-feature creep / anti-refactor)
- critérios de aceite do MVP (checklist testável)

Use o formato de .agents/templates/spec.md.

Regras:
- Não inventar features fora do PRD.
- KISS. Se não houver evidência, deixe placeholder.
- Devolva o conteúdo completo pronto para colar.
```
