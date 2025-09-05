// --------------------- tipos y API ---------------------
import { api } from "./axios";

export type Mensaje = {
  id: string;
  remitente: string;
  contenido: string;
  fecha: string;
};

export type Chat = {
  chatId: string;
  participantes: string[]; // IDs de los participantes
  ultimaActualizacion: string;
  mensajes: Mensaje[];
};

const MENSAJES_PATH = (import.meta as any)?.env?.VITE_MENSAJES_PATH ?? "/chat";

// Obtener mensajes de un chat
export async function getMensajesDeChatApi(chatId: string): Promise<Mensaje[]> {
  try {
    const response = await api.get<any[]>(
      `${MENSAJES_PATH}/${chatId}/mensajes`
    );

    // 🔍 Log completo de la respuesta Axios
    console.log("📦 Respuesta completa Axios getMensajesDeChatApi:", response);

    const data = response.data;

    return data.map((m) => ({
      id: m.id,
      remitente: m.remitente ?? "",
      contenido: m.contenido ?? "",
      fecha: m.fecha?.toDate
        ? m.fecha.toDate().toISOString()
        : new Date().toISOString(),
    }));
  } catch (err: any) {
    console.error("getMensajesDeChatApi error", {
      status: err?.response?.status,
      respData: err?.response?.data,
      chatId,
    });
    throw err;
  }
}

// Obtener todos los chats de un usuario (con mensajes)
export async function getChatsDeUsuarioApi(uid: string): Promise<Chat[]> {
  try {
    const response = await api.get<any[]>(
      `${MENSAJES_PATH}/usuario/${uid}/chats`
    );

    // 🔍 Log completo de la respuesta Axios
    console.log("📦 Respuesta completa Axios getChatsDeUsuarioApi:", response);

    const data = response.data;

    // Transformar los datos del backend a la forma de nuestro frontend
    return data.map((chat) => {
      // 🔑 Normalizar ultimaActualizacion
      let ultimaActualizacion: string;
      if (typeof chat.ultimaActualizacion === "string") {
        ultimaActualizacion = new Date(chat.ultimaActualizacion).toISOString();
      } else if (chat.ultimaActualizacion?._seconds) {
        ultimaActualizacion = new Date(
          chat.ultimaActualizacion._seconds * 1000
        ).toISOString();
      } else if (chat.ultimaActualizacion?.toDate) {
        ultimaActualizacion = chat.ultimaActualizacion.toDate().toISOString();
      } else {
        ultimaActualizacion = new Date().toISOString();
      }

      // 🔑 Normalizar mensajes
      const mensajes: Mensaje[] = (chat.mensajes || []).map((m: any) => {
        let fecha: string;
        if (typeof m.fecha === "string") {
          fecha = new Date(m.fecha).toISOString();
        } else if (m.fecha?._seconds) {
          fecha = new Date(m.fecha._seconds * 1000).toISOString();
        } else if (m.fecha?.toDate) {
          fecha = m.fecha.toDate().toISOString();
        } else {
          fecha = new Date().toISOString();
        }

        return {
          id: m.id,
          remitente: m.remitente ?? "",
          contenido: m.contenido ?? "",
          fecha,
        };
      });

      return {
        chatId: chat.chatId || chat.id,
        participantes: chat.participantes || chat.users || [],
        ultimaActualizacion,
        mensajes,
      };
    });
  } catch (err: any) {
    if (err.response?.status === 404) {
      return [];
    }
    console.error("getChatsDeUsuarioApi error", {
      status: err?.response?.status,
      respData: err?.response?.data,
      uid,
    });
    throw err;
  }
}
