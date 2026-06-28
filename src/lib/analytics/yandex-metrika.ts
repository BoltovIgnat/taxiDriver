declare global {
  interface Window {
    ym?: (id: number, method: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

export type MetrikaGoal =
  | "calc_interaction"
  | "form_submit"
  | "phone_click"
  | "messenger_click";

export function getMetrikaId(): number | null {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id) return null;
  const parsed = Number(id);
  return Number.isFinite(parsed) ? parsed : null;
}

export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = getMetrikaId();
  if (!id || !window.ym) return;
  window.ym(id, "reachGoal", goal, params);
}
