export function buildGalleryItems(propiedad) {
  const images = (propiedad?.imagenes ?? []).map((img) => ({
    type: "image",
    id: `img-${img.id}`,
    url: img.url,
  }));
  const videos = (propiedad?.videos ?? []).map((v) => ({
    type: "video",
    id: `vid-${v.id}`,
    url: v.url,
  }));
  return [...images, ...videos];
}
