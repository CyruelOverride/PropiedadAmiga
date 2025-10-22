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
import {getById} from "../api/propiedad";
import config from "../config";

const { Title, Paragraph, Text } = Typography;

function PropiedadAmiga() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState();
  const [loading, setLoading] = useState(true);

  const getTipoOperacionName = (tipo) => {
    switch (tipo) {
      case 1:
        return "Alquiler Anual";
      case 2:
        return "Alquiler Invernal";
      case 3:
        return "Alquiler Temporada";
      case 4:
        return "Venta";
      default:
        return "No especificado";
    }
  };

  const getTipoOperacionColor = (tipo) => {
    switch (tipo) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "orange";
      case 4:
        return "blue";
      default:
        return "default";
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getById(id);
        setPropiedad(res);
      } catch (err) {
        console.error("Error details:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchData();
    } else {
      console.error("No ID provided in URL");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" tip="Cargando propiedad..." />
      </div>
    );
  }

  if (!propiedad) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Empty description="No se encontró la propiedad" />
        <p style={{ marginTop: "1rem", color: "#666" }}>ID: {id}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "2rem auto",
        padding: "0 1rem",
      }}
    >
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: "1.5rem" }}
      >
        {/* Título y tipo */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
            gap: "0.5rem",
          }}
        >
          <Title
            level={3}
            style={{
              margin: 0,
              color: "#2F4F6F",
              wordBreak: "break-word",
              flex: 1,
              minWidth: 220,
            }}
          >
            {propiedad.titulo}
          </Title>
          <Tag
            color={getTipoOperacionColor(propiedad.tipoOperacion)}
            style={{
              fontSize: "0.9rem",
              padding: "4px 12px",
              borderRadius: 8,
              alignSelf: "center",
            }}
          >
            {getTipoOperacionName(propiedad.tipoOperacion)}
          </Tag>
        </div>

        {/* Galería */}
        {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
          <Carousel autoplay style={{ marginBottom: "1.5rem" }}>
            {propiedad.imagenes.map((img, idx) => {
              const url = img.url.startsWith("http")
                ? img.url
                : `${config.backendUrl}/${img.url}`;
              return (
                <div key={idx}>
                  <img
                    src={url}
                    alt={`Imagen ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 420,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                </div>
              );
            })}
          </Carousel>
        ) : (
          <Empty description="Sin imágenes disponibles" />
        )}

        <Divider />

        {/* Detalles */}
        <Descriptions
          bordered
          column={1}
          size="middle"
          labelStyle={{ fontWeight: 600, width: "40%" }}
          contentStyle={{ wordBreak: "break-word" }}
        >
          <Descriptions.Item label="Descripción">
            <Paragraph>{propiedad.descripcion}</Paragraph>
          </Descriptions.Item>

          <Descriptions.Item label="Dirección">
            <Text>{propiedad.direccion}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Dormitorios">
            {propiedad.dormitorios}
          </Descriptions.Item>

          <Descriptions.Item label="Baños">{propiedad.baños}</Descriptions.Item>

          <Descriptions.Item label="Suites">
            {propiedad.suites && propiedad.suites > 0
              ? propiedad.suites
              : "No hay"}
          </Descriptions.Item>

          <Descriptions.Item label="Cocina">
            {propiedad.cocina}
          </Descriptions.Item>

          <Descriptions.Item label="Living Comedor">
            {propiedad.livingComedor ? "Sí" : "No"}
          </Descriptions.Item>

          <Descriptions.Item label="Distancia al Mar">
            {propiedad.distanciaAlMar} metros
          </Descriptions.Item>

          <Descriptions.Item label="Superficie">
            {propiedad.superficie} m²
          </Descriptions.Item>

          <Descriptions.Item label="Garaje">
            {propiedad.garaje}
          </Descriptions.Item>

          {propiedad.servicios && (
            <Descriptions.Item label="Servicios">
              <Text>{propiedad.servicios}</Text>
            </Descriptions.Item>
          )}

          {propiedad.calefaccion && (
            <Descriptions.Item label="Calefacción">
              {propiedad.calefaccion}
            </Descriptions.Item>
          )}

          {propiedad.categoria && (
            <Descriptions.Item label="Categoría">
              {propiedad.categoria}
            </Descriptions.Item>
          )}

          {propiedad.gastos && propiedad.gastos.length > 0 && (
            <Descriptions.Item label="Gastos">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {propiedad.gastos.map((gasto, index) => (
                  <Tag key={index}>{gasto}</Tag>
                ))}
              </div>
            </Descriptions.Item>
          )}

          <Descriptions.Item
            label={`Precio ${getTipoOperacionName(
              propiedad.tipoOperacion
            ).toLowerCase()}`}
          >
            <Text
              strong
              style={{
                color: "#4682B4",
                fontSize: "1.1rem",
              }}
            >
              {propiedad.precio
                ? `USD ${propiedad.precio.toLocaleString()}`
                : "Consultar"}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default PropiedadAmiga;
