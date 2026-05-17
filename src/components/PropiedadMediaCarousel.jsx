import { Carousel, Empty } from "antd";
import { resolveMediaUrl } from "../utils/imageUrl";

export default function PropiedadMediaCarousel({
  items,
  backendUrl,
  emptyDescription = "Sin imágenes disponibles",
}) {
  if (!items?.length) {
    return <Empty description={emptyDescription} />;
  }

  return (
    <Carousel autoplay className="prop-carousel">
      {items.map((item) => (
        <div key={item.id} className="prop-carousel-slide">
          {item.type === "video" ? (
            <video
              src={resolveMediaUrl(item.url, backendUrl)}
              className="prop-video"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={resolveMediaUrl(item.url, backendUrl)}
              alt="Recurso de la propiedad"
              className="prop-image"
            />
          )}
        </div>
      ))}
    </Carousel>
  );
}
