import { api } from "./axios";

export type Solicitud = {
  id: string;
  email: string;
  asunto: string;
  descripcion: string;
  fechaSolicitud: any;
};

const SOLICITUDES_PATH: string =
  (import.meta as any)?.env?.VITE_SOLICITUDES_PATH ?? "../api/solicitudes";

// Después de traer las solicitudes
export async function getSolicitudesApi(): Promise<Solicitud[]> {
  try {
    const { data } = await api.get<Solicitud[]>(SOLICITUDES_PATH);

    // Convertimos los timestamps a string legible
    const solicitudes = data.map((s) => {
      let fecha: any = s.fechaSolicitud;

      // Si viene como objeto Firestore Timestamp
      if (fecha && typeof fecha === "object" && "seconds" in fecha) {
        fecha = new Date(fecha.seconds * 1000).toLocaleString();
      } else if (fecha) {
        // Si viene como string ISO
        fecha = new Date(fecha).toLocaleString();
      } else {
        fecha = "";
      }

      return {
        ...s,
        fechaSolicitud: fecha,
      };
    });

    return solicitudes;
  } catch (err: any) {
    console.error("getSolicitudesApi error", err);
    throw err;
  }
}

export async function crearSolicitudApi(
  payload: Omit<Solicitud, "id" | "fechaSolicitud">
): Promise<Solicitud> {
  try {
    const { data } = await api.post<Solicitud>(SOLICITUDES_PATH, payload);

    // Normalizamos fecha al crear
    let fecha = data.fechaSolicitud;
    if (fecha && typeof fecha === "object" && "seconds" in fecha) {
      fecha = new Date(fecha.seconds * 1000).toLocaleString();
    } else if (fecha) {
      fecha = new Date(fecha).toLocaleString();
    } else {
      fecha = "";
    }

    return { ...data, fechaSolicitud: fecha };
  } catch (err: any) {
    const status = err?.response?.status;
    const resData = err?.response?.data;
    console.error("crearSolicitudApi error", {
      status,
      resData,
      url: SOLICITUDES_PATH,
      payload,
    });
    throw err;
  }
}
