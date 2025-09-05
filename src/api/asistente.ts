import { api } from "./axios";

export async function enviarMensajeAsistente(mensaje: string): Promise<string> {
  const { data } = await api.post("/chat/asistente", { mensaje });
  return data.respuesta;
}
