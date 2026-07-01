// Sincroniza o README do npm a partir do README raiz (fonte única).
// Roda no prepack: antes de `npm pack`/`npm publish`.
// Reescreve a imagem de path relativo para URL absoluta (o npm não
// resolve caminhos relativos do repositório na página do pacote).
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_README = join(__dirname, "..", "..", "README.md");
const CLI_README = join(__dirname, "..", "README.md");

const RAW_BASE =
  "https://raw.githubusercontent.com/andrey-rsantos/specdd-starter-pack/master";

let md = await readFile(ROOT_README, "utf8");

// src="algo.png" (relativo) -> src="<raw>/algo.png" (absoluto).
// Ignora o que já é absoluto (http...).
md = md.replace(
  /(<img[^>]*\ssrc=")(?!https?:\/\/)([^"]+)"/g,
  (_, pre, path) => `${pre}${RAW_BASE}/${path}"`
);

await writeFile(CLI_README, md);
console.log("README sincronizado do raiz -> cli/README.md");
