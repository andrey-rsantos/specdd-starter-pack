# 05 — Review (revisar diff contra os docs)

Use para revisar o diff de uma task antes de fechar.
Copie o bloco abaixo na ferramenta/modelo revisor.

```text
Leia docs/spec.md, docs/architecture.md, docs/NOW.md e os critérios de aceite.
Considere o diff atual (mudanças desta task).

Tarefa: revisar no formato de .agents/templates/review.md:
- Atende ao objetivo e ao critério de pronto do NOW? (sim/não, por quê)
- Viola alguma regra de docs/spec.md? (segurança, dados, permissões, proibições)
- Diverge de docs/architecture.md? (stack, contratos, ADRs)
- Bugs, edge cases ou estados vazios não tratados?
- Scope creep / refactor não pedido?

Saída:
- Veredito: aprovar / ajustar.
- Lista objetiva de correções (uma linha cada: local → problema → fix).
- Se houver milestone fechado, lembre de atualizar docs/implementation_summary.md.

Regras: foco no que importa. Sem reescrever o que já está correto.
```
