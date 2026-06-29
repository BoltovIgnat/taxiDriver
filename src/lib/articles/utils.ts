const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(title: string): string {
  const lower = title.trim().toLowerCase();
  let result = "";

  for (const char of lower) {
    if (TRANSLIT[char]) {
      result += TRANSLIT[char];
    } else if (/[a-z0-9]/.test(char)) {
      result += char;
    } else if (/\s|[-_]/.test(char)) {
      result += "-";
    }
  }

  return result
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} мин`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
