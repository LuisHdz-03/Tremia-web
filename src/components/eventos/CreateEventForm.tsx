import React from 'react'
import styled from 'styled-components'
import { createEventApi } from '../../api/events'

// Ensure any incoming value becomes a date-only string (YYYY-MM-DD)
const toDateOnly = (iso: string | undefined): string | undefined => {
  if (!iso) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

interface CreateEventFormProps {
  title: string
  description: string
  start: string
  end: string
  canSubmit: boolean
  onTitleChange: (v: string) => void
  onDescriptionChange: (v: string) => void
  onStartChange: (v: string) => void
  onEndChange: (v: string) => void
  onCreated: (evt: { id: string; title: string; start: string; end?: string;  description?: string;}) => void
  onCancel: () => void
}

export default function CreateEventForm({
  title,
  description,
  start,
  end,
  canSubmit,
  onTitleChange,
  onDescriptionChange,
  onStartChange,
  onEndChange,
  onCreated,
  onCancel,
}: CreateEventFormProps) {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const payload = {
        titulo: title.trim(),
        descripcion: description.trim() || undefined,
        inicio: toDateOnly(start)!,
        fin: toDateOnly(end) || undefined,
      }
    try {
      const res = await createEventApi(payload)
      const newId = String((res as any)?.id ?? `evt_${Date.now()}`)
      // Map spanish backend fields to frontend event shape
      onCreated({
        id: newId,
        title: payload.titulo,
        start: payload.inicio,
        end: payload.fin,
        description: payload.descripcion,
      })
      onCancel()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creando evento', error)
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <Label>Título</Label>
        <Input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Nombre del evento" />
      </Field>
      <Field>
        <Label>Descripción</Label>
        <TextArea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Descripción breve del evento"
        />
      </Field>
      <FieldRow>
        <Field>
          <Label>Inicio</Label>
          <Input type="date" value={start} onChange={(e) => onStartChange(e.target.value)} />
        </Field>
        <Field>
          <Label>Fin (opcional)</Label>
          <Input type="date" value={end} onChange={(e) => onEndChange(e.target.value)} />
        </Field>
      </FieldRow>
      <Actions>
        <SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton>
        <PrimaryButton type="submit" disabled={!canSubmit}>Crear</PrimaryButton>
      </Actions>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
`

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  min-height: 88px;
  resize: vertical;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
`

const PrimaryButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`
