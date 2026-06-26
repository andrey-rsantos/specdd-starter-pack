# 04 — Implement (implementar só a task atual)

Use para implementar apenas a task de `docs/NOW.md`.
Copie o bloco abaixo na ferramenta/modelo executor.

```text
Leia docs/agents.md, docs/spec.md, docs/architecture.md, docs/NOW.md e docs/PRD_vX.md.

Antes de implementar, avalie o pedido:
- Se docs/NOW.md estiver vazio/desatualizado: interprete, preencha o NOW e confirme.
- Se o pedido conflitar com docs/spec.md: avise e pergunte antes de continuar.
- Se estiver fora do escopo do PRD: avise; se o usuário expandir, crie docs/PRD_v2.md e atualize spec/NOW antes.

Depois de validado:
- Implemente APENAS o que está em docs/NOW.md.
- Mudanças pequenas e reversíveis (KISS).
- Trate erros e estados vazios; valide inputs críticos.
- Se mudar regra/contrato/schema → atualize docs/spec.md no mesmo PR.
- Se mudar decisão arquitetural → atualize docs/architecture.md no mesmo PR.
- Não invente features.
```
