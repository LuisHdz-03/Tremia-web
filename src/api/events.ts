// api/eventos.ts
import { api } from "./axios";

// =====================
// Tipos
// =====================
export type CreateEventPayload = {
  titulo: string;
  descripcion: string;
  organizacion: string;
  fechaInicio: any; // ISO string
  fechaFin?: any; // ISO string opcional
  tipo: string;
  uid: string;
};

export type BackendEvent = {
  id: string;
  titulo: string;
  inicio: string; // ISO string
  fin?: string; // ISO string opcional
  descripcion?: string;
  tipo: string;
};

export type CreateEventResponse = {
  id?: string;
  message?: string;
  [key: string]: unknown;
};

export type UpdateEventPayload = Partial<{
  titulo: string;
  descripcion?: string;
  inicio: string;
  fin?: string;
  tipo: string;
}>;

// =====================
// Ruta base
// =====================
const EVENTS_PATH = (import.meta as any)?.env?.VITE_EVENTS_PATH ?? "/eventos";

// =====================
// GET /eventos
// =====================
export async function getEventsApi(): Promise<BackendEvent[]> {
  try {
    const { data } = await api.get<BackendEvent[]>(EVENTS_PATH);

    // Normalizar fechas a ISO strings
    return data.map((e: any) => ({
      ...e,
      inicio: e.fechaInicio ? new Date(e.fechaInicio).toISOString() : "",
      fin: e.fechaFin ? new Date(e.fechaFin).toISOString() : undefined,
    }));
  } catch (err: any) {
    console.error("getEventsApi error", { err, url: EVENTS_PATH });
    throw err;
  }
}

// =====================
// POST /eventos
// =====================
export async function createEventApi(
  payload: CreateEventPayload
): Promise<CreateEventResponse> {
  try {
    const { data } = await api.post<CreateEventResponse>(EVENTS_PATH, payload);
    return data;
  } catch (err: any) {
    console.error("createEventApi error", {
      status: err?.response?.status,
      respData: err?.response?.data,
      url: EVENTS_PATH,
      payload,
    });
    throw err;
  }
}

// =====================
// DELETE /eventos/:id
// =====================
export async function deleteEventApi(
  id: string
): Promise<{ message?: string }> {
  try {
    const { data } = await api.delete<{ message?: string }>(
      `${EVENTS_PATH}/${id}`
    );
    return data;
  } catch (err: any) {
    console.error("deleteEventApi error", {
      status: err?.response?.status,
      respData: err?.response?.data,
      url: `${EVENTS_PATH}/${id}`,
    });
    throw err;
  }
}

// =====================
// PUT /eventos/:id
// =====================
export async function updateEventApi(
  id: string,
  payload: UpdateEventPayload
): Promise<{ message?: string } & BackendEvent> {
  try {
    const { data } = await api.put<{ message?: string } & BackendEvent>(
      `${EVENTS_PATH}/${id}`,
      payload
    );

    // Normalizar fechas
    return {
      ...data,
      inicio: data.inicio ? new Date(data.inicio).toISOString() : "",
      fin: data.fin ? new Date(data.fin).toISOString() : undefined,
    };
  } catch (err: any) {
    console.error("updateEventApi error", {
      status: err?.response?.status,
      respData: err?.response?.data,
      url: `${EVENTS_PATH}/${id}`,
      payload,
    });
    throw err;
  }
}
