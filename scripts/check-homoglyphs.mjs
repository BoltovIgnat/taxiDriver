/**
 * Проверка user-facing текстов на латиницу внутри кириллических слов (гомоглифы).
 * Запуск: npm run check:copy
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src", "data");

/** Допустимая латиница в русских текстах */
const ALLOWED_LATIN =
  /\b(B|Pro|Kia|Rio|Telegram|FAQ|URL|HTTP|HTTPS|PDF|ОСАГО|ПТС|СТС|СНИЛС|ИНН|НПД|ПДД)\b|[₽/]|https?:\/\/|ri-[a-z0-9-]+/gi;

/** Кириллица + латиница в одном «слове» */
const MIXED_WORD = /[\u0400-\u04FF]*[a-zA-Z]+[\u0400-\u04FF]+|[\u0400-\u04FF]+[a-zA-Z]+[\u0400-\u04FF]*/g;

const SCAN_DIRS = [
  SRC,
  join(ROOT, "src", "components", "sections"),
  join(ROOT, "src", "app", "(site)"),
];

function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectFiles(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

function stripAllowed(text) {
  return text.replace(ALLOWED_LATIN, "");
}

const issues = [];

for (const dir of SCAN_DIRS) {
  for (const file of collectFiles(dir)) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, idx) => {
      if (!/["'`]/.test(line)) return;
      if (/^\s+[a-zA-Z_][\w]*\s*:/.test(line)) return;
      if (/\$\{COPY\./.test(line)) return;
      if (
        /import |from |className|icon:|href:|slug|ri-/.test(line) &&
        !/(title|text|answer|question|name|city|region|description|subtitle|label|meta)/.test(line)
      ) {
        return;
      }
      const cleaned = stripAllowed(line);
      const matches = cleaned.match(MIXED_WORD);
      if (matches) {
        for (const m of matches) {
          issues.push({
            file: relative(ROOT, file),
            line: idx + 1,
            snippet: m,
          });
        }
      }
      if (/individually|Пасport|taximeter|taxometer|Кrasno|Бarn|Иркut|Аnap/i.test(line)) {
        issues.push({
          file: relative(ROOT, file),
          line: idx + 1,
          snippet: line.trim().slice(0, 120),
        });
      }
    });
  }
}

if (issues.length > 0) {
  console.error(`Найдено ${issues.length} подозрительных вхождений:\n`);
  for (const i of issues) {
    console.error(`  ${i.file}:${i.line} — ${i.snippet}`);
  }
  process.exit(1);
}

console.log("Проверка гомоглифов: OK");
