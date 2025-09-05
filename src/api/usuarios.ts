import { api } from "./axios";

// Tipos que devuelve el endpoint /usuarios/socio
export type SocioUsuario = {
  rol: string;
  nombre: string;
  email: string;
  sector: string;
  intereses: string[];
};

// Permite configurar la ruta vía variable de entorno VITE_USERS_SOCIO_PATH, por defecto /usuarios/socio
const USERS_SOCIO_PATH: string =
  (import.meta as any)?.env?.VITE_USERS_SOCIO_PATH ?? "/usuarios/rol/socio";

// GET /usuarios/socio
export async function getSociosUsuariosApi(): Promise<SocioUsuario[]> {
  try {
    const { data } = await api.get<SocioUsuario[]>(USERS_SOCIO_PATH);
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const respData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("getSociosUsuariosApi error", {
      status,
      respData,
      url: USERS_SOCIO_PATH,
    });
    throw err;
  }
}

// Tipos que devuelve el endpoint /usuarios/rol/Organizacion
export type OrganizacionUsuario = {
  rol: string;
  nombre: string;
  email: string;
  sector: string;
  intereses: string[];
};

// Ruta configurable para organizaciones vía VITE_USERS_ORG_PATH, por defecto /usuarios/rol/Organizacion
const USERS_ORG_PATH: string =
  (import.meta as any)?.env?.VITE_USERS_ORG_PATH ??
  "/usuarios/rol/organizacion";

// GET /usuarios/rol/Organizacion
export async function getOrganizacionUsuariosApi(): Promise<
  OrganizacionUsuario[]
> {
  try {
    const { data } = await api.get<OrganizacionUsuario[]>(USERS_ORG_PATH);
    return data;
  } catch (err: any) {
    const status = err?.response?.status;
    const respData = err?.response?.data;
    // eslint-disable-next-line no-console
    console.error("getOrganizacionUsuariosApi error", {
      status,
      respData,
      url: USERS_ORG_PATH,
    });
    throw err;
  }
}
