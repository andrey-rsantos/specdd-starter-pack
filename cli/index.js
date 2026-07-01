#!/usr/bin/env node
import { existsSync } from "node:fs";
import { cp, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  intro,
  outro,
  select,
  multiselect,
  confirm,
  isCancel,
  cancel,
  spinner,
  note,
} from "@clack/prompts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = join(__dirname, "template");

// Mapeia cada harness para os arquivos/pastas que ele precisa.
// docs/ é sempre copiado (base do fluxo, independe de ferramenta).
const HARNESS = {
  claude: { label: "Claude Code", paths: ["CLAUDE.md", ".claude"] },
  codex: { label: "Codex", paths: ["AGENTS.md", ".codex"] },
  opencode: { label: "OpenCode", paths: ["AGENTS.md", ".opencode"] },
};

function bail() {
  cancel("Cancelado. Nada foi alterado.");
  process.exit(0);
}

function guard(value) {
  if (isCancel(value)) bail();
  return value;
}

// Heurística: se a pasta tem sinais de código, provavelmente é projeto existente.
async function looksExisting(dir) {
  const signals = ["package.json", "src", "go.mod", "pyproject.toml", "Cargo.toml", "pom.xml"];
  const entries = new Set(await readdir(dir).catch(() => []));
  return signals.some((s) => entries.has(s));
}

function bootstrapDoc(kind) {
  const footer = `\n\n---\n> Arquivo temporário. Depois que o agente preencher docs/SPEC.md,\n> docs/ARCH.md e docs/NOW.md, apague este BOOTSTRAP.md com segurança.`;

  if (kind === "new") {
    return `# Bootstrap — Projeto novo

Cole este arquivo (ou peça "Execute BOOTSTRAP.md") no seu agente de código.

Leia primeiro: docs/RULES.md, docs/SPEC.md, docs/ARCH.md, docs/NOW.md

Este é um projeto novo, ainda sem código. A fonte de contexto é o usuário —
então NÃO preencha nada antes de entrevistá-lo.

Passo 1 — Entreviste o usuário. Faça estas perguntas (curtas, de uma vez) e
AGUARDE as respostas antes de continuar:
- O que é o produto, para quem e qual valor entrega?
- Objetivos desta versão (até 3)?
- O que está FORA de escopo (o que NÃO fazer)?
- Métrica de sucesso (apenas 1)?
- Stack/linguagem já decidida? Se não, sugira uma e peça confirmação.

Passo 2 — Só depois das respostas, preencha nesta ordem:
1) docs/SPEC.md (produto, stack, entidades, fluxos, regras de negócio, regras
   de dados, permissões, proibições, critérios de aceite).
2) docs/ARCH.md (componentes e responsabilidades, diagrama, ADRs resumidos,
   contratos entre partes).
3) docs/NOW.md com a primeira task (apenas 1) + critério de pronto.
4) Ajuste docs/RULES.md só se necessário.

Regras: se algo ficou ambíguo, pergunte antes de assumir. Não invente features
fora do que o usuário descreveu. Sem arquitetura extra.${footer}`;
  }

  return `# Bootstrap — Projeto existente

Cole este arquivo (ou peça "Execute BOOTSTRAP.md") no seu agente de código.

Leia toda a codebase (estrutura, arquivos principais, configs, migrations,
rotas, modelos, README).

Tarefa: preencher os docs do SpecDD com base no que já existe.
1) docs/SPEC.md inferindo do código (produto, stack real, entidades, fluxos,
   regras de negócio, regras de dados, permissões, proibições, critérios "done").
2) docs/ARCH.md: componentes e responsabilidades reais, diagrama, ADRs
   identificados, contratos entre partes.
3) docs/NOW.md: preencher a seção "Feito" com o estado atual e a próxima task.
4) Ajustar docs/RULES.md só se necessário.

Saída: conteúdo completo de cada arquivo.
Regras: não inventar o que não existe no código. Não propor refatorações.${footer}`;
}

async function main() {
  intro("specdd-starter-pack — scaffold");

  const target = process.cwd();

  const detected = (await looksExisting(target)) ? "existing" : "new";
  const kind = guard(
    await select({
      message: "Tipo de projeto",
      initialValue: detected,
      options: [
        { value: "new", label: "Novo", hint: detected === "new" ? "detectado" : undefined },
        { value: "existing", label: "Existente", hint: detected === "existing" ? "detectado" : undefined },
      ],
    })
  );

  const harnesses = guard(
    await multiselect({
      message: "Quais harness? (espaço seleciona)",
      options: Object.entries(HARNESS).map(([value, { label }]) => ({ value, label })),
      initialValues: ["claude"],
      required: true,
    })
  );

  const wantBootstrap = guard(
    await confirm({
      message: "Gerar BOOTSTRAP.md para o agente preencher os docs?",
      initialValue: true,
    })
  );

  // Monta a lista de paths a copiar. Set evita duplicar AGENTS.md
  // quando Codex e OpenCode são escolhidos juntos.
  const toCopy = new Set(["docs"]);
  for (const h of harnesses) HARNESS[h].paths.forEach((p) => toCopy.add(p));

  // Avisa sobre sobrescrita antes de tocar em qualquer coisa.
  const clashes = [...toCopy].filter((p) => existsSync(join(target, p)));
  if (clashes.length) {
    const ok = guard(
      await confirm({
        message: `Já existe: ${clashes.join(", ")}. Sobrescrever?`,
        initialValue: false,
      })
    );
    if (!ok) bail();
  }

  const s = spinner();
  s.start("Copiando arquivos");
  for (const p of toCopy) {
    await cp(join(TEMPLATE, p), join(target, p), { recursive: true });
  }
  if (wantBootstrap) {
    await writeFile(join(target, "BOOTSTRAP.md"), bootstrapDoc(kind));
  }
  s.stop("Arquivos copiados");

  const installed = [...toCopy].sort().join(", ");
  note(installed, "Instalado");

  const next = wantBootstrap
    ? 'Rode no seu agente: "Execute BOOTSTRAP.md" — depois apague o arquivo.'
    : "Preencha docs/SPEC.md, docs/ARCH.md e docs/NOW.md para começar.";
  outro(next);
}

main().catch((err) => {
  cancel(`Erro: ${err.message}`);
  process.exit(1);
});
