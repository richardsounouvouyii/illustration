/** Identifiant court unique pour projets / calques / uploads. */
export function createId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
