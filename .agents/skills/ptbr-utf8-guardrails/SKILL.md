---
name: ptbr-utf8-guardrails
description: Garanta escrita em portugues brasileiro com acentuacao correta e sem mojibake. Use quando editar ou criar textos neste repositorio (docs, prompts, comentarios de codigo, mensagens e copy), especialmente em tarefas executadas no Codex.
---

# PT-BR UTF-8 Guardrails

## Objetivo

Evitar perda de acentuacao, caracteres quebrados e mojibake ao editar arquivos textuais.

## Processo obrigatorio

1. Escrever normalmente em PT-BR, mantendo acentos e cedilha.
2. Nao converter texto para ASCII por "seguranca".
3. Salvar e editar em UTF-8.
4. Antes de concluir a tarefa, validar os arquivos alterados com Node explicito (evita conflito de PATH no Windows deste projeto):

```bash
& 'E:\node_js\node.exe' .agents/skills/ptbr-utf8-guardrails/scripts/validate-encoding.js caminho/do/arquivo.md caminho/do/outro-arquivo.ts
```

5. Se a validacao falhar:
- Corrigir termos com padrao quebrado (ex.: sequencias UTF-8 interpretadas em ANSI, como `\\u00C3\\u00A7` no texto bruto).
- Revalidar ate zerar erros.

## Guardrails de terminal

- Ao gerar arquivos via PowerShell, preferir escrita com encoding explicito UTF-8.
- Nao misturar ferramentas que possam regravar em code page ANSI.
- Neste repositorio, nao depender de `node` global no PATH para validacao de encoding; usar sempre `E:\node_js\node.exe`.
