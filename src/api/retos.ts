import { api } from "./axios";

export type Reto = {
  id: string;
  titulo: string;
  descripcion?: string;
  estado?: string;
  fechaCreacion?: string;
  fechaCierre?: string;
};

const RETOS_PATH: string =
  (import.meta as any)?.env?.VITE_RETOS_PATH ?? "/retos";

export async function getRetosApi(): Promise<Reto[]> {
  try {
    const { data } = await api.get<Reto[]>(RETOS_PATH);
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const respData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("getRetosApi error", { status, respData, url: RETOS_PATH });
    throw err;
  }
}
