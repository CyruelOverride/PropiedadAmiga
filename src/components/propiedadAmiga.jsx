import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Spin,
  Carousel,
  Divider,
  Descriptions,
  Card,
  Empty,
  Tag,
} from "antd";
import { getById } from "../api/propiedad";
import config from "../config";
import "./propiedad.css"; // Usamos la misma para consistencia

const { Title, Paragraph, Text } = Typography;

function PropiedadAmiga() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTipoOperacionName = (tipo) => {
    switch (tipo) {
      case 1: return "Alquiler Anual";
      case 2: return "Alquiler Invernal";
      case 3: return "Alquiler Temporada";
      case 4: return "Venta";
      default: return "No especificado";
    }
  };

  const getTipoOperacionColor = (tipo) => {
    switch (tipo) {
      case 1: return "blue";
      case 2: return "green";
      case 3: return "orange";
      case 4: return "blue";
      default: return "default";
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getById(id);
        setPropiedad(res.data || res); // aseguramos usar .data si existe
      } catch (err) {
        console.error("Error al traer la propiedad:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
    else setLoading(false);
  }, [id]);

  if (loading)
    return (
      <div className="centered-container">
        <Spin size="large" tip="Cargando propiedad..." />
      </div>
    );

  if (!propiedad)
    return (
      <div className="centered-container">
        <Empty description="No se encontró la propiedad" />
      </div>
    );

  return (
    <div className="propiedad-container">
      <Card bordered={false} className="prop-card">
        {/* Encabezado */}
        <div className="prop-header">
          <div className="prop-title">
            <Title level={2}>{propiedad.titulo}</Title>
            <div className="prop-subinfo">
              <Tag color={getTipoOperacionColor(propiedad.tipoOperacion)}>
                {getTipoOperacionName(propiedad.tipoOperacion)}
              </Tag>
              {propiedad.categoria && <span className="categoria">{propiedad.categoria}</span>}
            </div>
          </div>
        </div>

        {/* Galería */}
        {propiedad.imagenes?.length > 0 ? (
         <Carousel autoplay className="prop-carousel">
            {propiedad.imagenes.map((img, idx) => (
              <div key={idx}>
                <img
                  src={`${config.backendUrl}/${img.url}`}
                  alt={`Imagen ${idx + 1}`}
                  className="prop-image"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Empty description="Sin imágenes disponibles" />
        )}

        {/* Descripción */}
        <div className="prop-section prop-description">
          <Title level={4}>Descripción</Title>
          <Paragraph className="text-wrap">
            {propiedad.descripcion || "Sin descripción"}
          </Paragraph>
        </div>

        {/* Servicios */}
        {propiedad.servicios && (
          <div className="prop-section prop-services">
            <Title level={5}>Servicios</Title>
            <Paragraph className="text-wrap">{propiedad.servicios}</Paragraph>
          </div>
        )}

        {/* Gastos */}
        {propiedad.gastos?.length > 0 && (
          <div className="prop-section prop-gastos">
            <Title level={5}>Gastos</Title>
            <div className="tags-container">
              {propiedad.gastos.map((g, i) => <Tag key={i}>{g}</Tag>)}
            </div>
          </div>
        )}

        <Divider />

        {/* Detalles */}
        <Descriptions
          bordered
          column={1}
          size="middle"
          labelStyle={{ fontWeight: 600, width: "25%", verticalAlign: "top" }}
          contentStyle={{ padding: "8px 12px" }}
        >
          <Descriptions.Item label="Dirección">{propiedad.direccion}</Descriptions.Item>
          <Descriptions.Item label="Distancia al Mar">{propiedad.distanciaAlMar} metros</Descriptions.Item>
          <Descriptions.Item label="Superficie">{propiedad.superficie} m²</Descriptions.Item>
          {propiedad.categoria !== "Terreno" && (
            <>
          <Descriptions.Item label="Dormitorios">{propiedad.dormitorios}</Descriptions.Item>
          <Descriptions.Item label="banos">{propiedad.banos}</Descriptions.Item>
          <Descriptions.Item label="Suites">{propiedad.suites > 0 ? propiedad.suites : "No hay"}</Descriptions.Item>
          <Descriptions.Item label="Cocina">{propiedad.cocina}</Descriptions.Item>
          <Descriptions.Item label="Living Comedor">{propiedad.livingComedor ? "Sí" : "No"}</Descriptions.Item>
          <Descriptions.Item label="Garaje">{propiedad.garaje}</Descriptions.Item>
          {propiedad.calefaccion && (
            <>
              <Descriptions.Item label="Calefacción">{propiedad.calefaccion}</Descriptions.Item>
              <Descriptions.Item label="Tipo">{propiedad.categoriaCalefaccion || "-"}</Descriptions.Item>
            </>
          )}
          </>
        )}
        </Descriptions>

        <Divider />

        {/* Precio */}
        <div style={{ marginTop: "1rem" }}>
          <Text strong style={{ fontSize: "1.2rem" }}>
            Precio {getTipoOperacionName(propiedad.tipoOperacion).toLowerCase()}:{" "}
            {propiedad.precio ? `USD ${propiedad.precio.toLocaleString()}` : "Consultar"}
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default PropiedadAmiga;
