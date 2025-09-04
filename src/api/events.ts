import { api } from './axios'

// Backend expects spanish field names
export type CreateEventPayload = {
  titulo: string
  descripcion?: string
  inicio: string
  fin?: string
}

export type CreateEventResponse = {
  id?: string
  message?: string
  [key: string]: unknown
}

const EVENTS_PATH = (import.meta as any)?.env?.VITE_EVENTS_PATH ?? '/eventos'

export async function createEventApi(payload: CreateEventPayload): Promise<CreateEventResponse> {
  try {
    const { data } = await api.post<CreateEventResponse>(EVENTS_PATH, payload)
    return data
  } catch (err: any) {
    const status = err?.response?.status
    const respData = err?.response?.data
    // Log extendido para depurar 400 del backend
    // eslint-disable-next-line no-console
    console.error('createEventApi error', { status, respData, url: EVENTS_PATH, payload })
    throw err
  }
}

export async function deleteEventApi(id: string): Promise<{ message?: string }> {
  try {
    const { data } = await api.delete<{ message?: string }>(`${EVENTS_PATH}/${id}`)
    return data
  } catch (err: any) {
    const status = err?.response?.status
    const respData = err?.response?.data
    // eslint-disable-next-line no-console
    console.error('deleteEventApi error', { status, respData, url: `${EVENTS_PATH}/${id}` })
    throw err
  }
}

export type UpdateEventPayload = Partial<{
  titulo: string
  descripcion?: string
  inicio: string
  fin?: string
}>

export async function updateEventApi(id: string, payload: UpdateEventPayload): Promise<{ message?: string } & BackendEvent> {
  try {
    const { data } = await api.put<{ message?: string } & BackendEvent>(`${EVENTS_PATH}/${id}`, payload)
    return data
  } catch (err: any) {
    const status = err?.response?.status
    const respData = err?.response?.data
    // eslint-disable-next-line no-console
    console.error('updateEventApi error', { status, respData, url: `${EVENTS_PATH}/${id}`, payload })
    throw err
  }
}

// Backend event shape
export type BackendEvent = {
  id: string
  titulo: string
  inicio: string
  fin?: string
  descripcion?: string
}

export async function getEventsApi(): Promise<BackendEvent[]> {
  try {
    const { data } = await api.get<BackendEvent[]>(EVENTS_PATH)
    return data
  } catch (err: any) {
    const status = err?.response?.status
    const respData = err?.response?.data
    // eslint-disable-next-line no-console
    console.error('getEventsApi error', { status, respData, url: EVENTS_PATH })
    throw err
  }
}
