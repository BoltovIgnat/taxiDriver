/** Форматирует ввод телефона в +7 (XXX) XXX-XX-XX */
export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let normalized = digits;

  if (normalized.startsWith("8")) {
    normalized = `7${normalized.slice(1)}`;
  } else if (!normalized.startsWith("7") && normalized.length > 0) {
    normalized = `7${normalized}`;
  }

  normalized = normalized.slice(0, 11);
  const local = normalized.startsWith("7") ? normalized.slice(1) : normalized;

  if (local.length === 0) return normalized.startsWith("7") ? "+7" : "";

  let result = "+7";
  if (local.length > 0) result += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) result += `) ${local.slice(3, 6)}`;
  if (local.length >= 6) result += `-${local.slice(6, 8)}`;
  if (local.length >= 8) result += `-${local.slice(8, 10)}`;

  return result;
}

export function isValidRuPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}
