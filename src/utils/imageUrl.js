/**
 * @param {string | undefined | null} url Valor guardado en BD (ruta relativa o URL absoluta Cloudinary/CDN).
 * @param {string} baseUrl URL base del API (sin barra final) para prefijar rutas relativas.
 */
export function resolveMediaUrl(url, baseUrl) {
  if (url == null || url === "") return "";
  const u = String(url).trim();
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  const base = String(baseUrl || "").replace(/\/$/, "");
  const path = u.replace(/^\//, "");
  return base ? `${base}/${path}` : path;
}
