// Crear un nuevo foro
export async function createForoApi(
  payload: Omit<ForumPost, "id">
): Promise<ForumPost> {
  try {
    const { data } = await api.post<ForumPost>(FOROS_PATH, payload);
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const resData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("createForoApi error", {
      status,
      resData,
      url: FOROS_PATH,
      payload,
    });
    throw err;
  }
}
// Eliminar foro por ID
export async function deleteForoApi(id: number | string): Promise<void> {
  try {
    await api.delete(`${FOROS_PATH}/${id}`);
  } catch (err: any) {
    const status = err?.response?.status;
    const resData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("deleteForoApi error", {
      status,
      resData,
      url: FOROS_PATH,
      id,
    });
    throw err;
  }
}
import { api } from "./axios";

export type ForumPost = {
  id: number;
  nombreAutor: string;
  correoAutor: string;
  titulo: string;
  descripcion: string;
};

export type ComentPost = {
  id: number;
  autor: string;
  contenido: string;
};

const FOROS_PATH: string =
  (import.meta as any)?.env?.VITE_FOROS_PATH ?? "../api/foros";

export async function getForosApi(): Promise<ForumPost[]> {
  try {
    const { data } = await api.get<ForumPost[]>(FOROS_PATH);
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const resData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("getForosApi error", { status, resData, url: FOROS_PATH });
    throw err;
  }
}
const COMENTARIOS_PATH: string =
  (import.meta as any)?.env?.VITE_COMENTARIOS_PATH ?? "../api/foros";

// get para los comentarios
export async function getComentariosForoApi(
  foroId: number
): Promise<ComentPost[]> {
  try {
    const { data } = await api.get<ComentPost[]>(
      `${COMENTARIOS_PATH}?foroId=${foroId}`
    );
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const resData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("getComentariosForoApi error", {
      status,
      resData,
      url: COMENTARIOS_PATH,
      foroId,
    });
    throw err;
  }
}
