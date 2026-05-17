/**
 * Convierte un campo guardado como texto (p. ej. "Piscina, Gimnasio") en lista de strings.
 * @param {string | string[] | null | undefined} value
 * @returns {string[]}
 */
export function parseCommaList(value) {
  if (value == null || value === "") return [];
  if (Array.isArray(value)) {
    return value.map((s) => String(s).trim()).filter(Boolean);
  }
  return String(value)
    .split(","||";"||".")
    .map((s) => s.trim())
    .filter(Boolean);
}
