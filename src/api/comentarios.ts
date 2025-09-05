// api/foros.ts
import { api } from "./axios";

// =====================
// Tipos
// =====================
export type ForumPost = {
  id: string;
  nombreAutor: string;
  correoAutor: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
};

export type ForoComentario = {
  id: string;
  foroId: string;
  autor: string;
  contenido: string;
  fecha: string;
};

// =====================
// Rutas
// =====================
const FOROS_PATH: string =
  (import.meta as any)?.env?.VITE_FOROS_PATH ?? "/foros";

const COMENTARIOS_PATH: string =
  (import.meta as any)?.env?.VITE_COMENTARIOS_PATH ?? "/foros";

// =====================
// Obtener todos los foros
// =====================
export async function getForosApi(): Promise<ForumPost[]> {
  try {
    const { data } = await api.get<ForumPost[]>(FOROS_PATH);
    return data.map((f) => ({
      ...f,
      fechaCreacion:
        f.fechaCreacion && typeof f.fechaCreacion === "string"
          ? f.fechaCreacion
          : f.fechaCreacion
          ? new Date(f.fechaCreacion).toLocaleString()
          : "",
    }));
  } catch (err: any) {
    console.error("getForosApi error", err);
    throw err;
  }
}

// =====================
// Obtener comentarios de un foro
// =====================
export async function getComentariosForoApi(
  foroId: string
): Promise<ForoComentario[]> {
  try {
    const { data } = await api.get<ForoComentario[]>(
      `${COMENTARIOS_PATH}/${foroId}/comentarios`
    );
    return data.map((c) => ({
      ...c,
      foroId,
      autor: c.autor || "Anónimo",
      fecha:
        c.fecha && typeof c.fecha === "string"
          ? c.fecha
          : c.fecha
          ? new Date(c.fecha).toLocaleString()
          : "",
    }));
  } catch (err: any) {
    console.error("getComentariosForoApi error", { foroId, err });
    throw err;
  }
}
