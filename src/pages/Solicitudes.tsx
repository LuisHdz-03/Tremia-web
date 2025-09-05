import { useEffect, useState } from "react";
import { getSolicitudesApi, type Solicitud } from "../api/solicitudes";

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSolicitudesApi()
      .then(setSolicitudes)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Solicitudes recibidas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {solicitudes.map((s) => (
            <li
              key={s.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                marginBottom: 16,
                padding: 16,
              }}
            >
              <strong>Correo:</strong> {s.email} <br />
              <strong>Asunto:</strong> {s.asunto} <br />
              <strong>Descripción:</strong> {s.descripcion} <br />
              <strong>Fecha:</strong>{" "}
              {s.fechaSolicitud
                ? new Date(s.fechaSolicitud).toLocaleDateString("es-MX", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
