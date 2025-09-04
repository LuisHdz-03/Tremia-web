import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'
import type { EventItem } from '../../types/events'
import { useEffect, useState } from 'react'

// Normalize any value to date-only (YYYY-MM-DD) to avoid timezone shifts
const toDateOnly = (iso: string | undefined): string | undefined => {
  if (!iso) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export type EditEventModalProps = {
  open: boolean
  event: EventItem | null
  onOpenChange: (open: boolean) => void
  onSave: (updated: EventItem) => Promise<void> | void
}

export default function EditEventModal({ open, event, onOpenChange, onSave }: EditEventModalProps) {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setStart(toDateOnly(event.start) || '')
      setEnd(toDateOnly(event.end) || '')
      setDescription(event.description || '')
    }
  }, [event])

  const canSubmit = title.trim().length > 0 && start.trim().length > 0

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Editar evento</ModalTitle>
            <Dialog.Close asChild>
              <CloseBtn aria-label="Cerrar">×</CloseBtn>
            </Dialog.Close>
          </ModalHeader>
          <ModalBody>
            <FormGrid
              onSubmit={async (e) => {
                e.preventDefault()
                if (!event || !canSubmit) return
                const updated: EventItem = {
                  id: event.id,
                  title: title.trim(),
                  start: toDateOnly(start)!,
                  end: toDateOnly(end) || undefined,
                  description: description.trim() || undefined,
                }
                await onSave(updated)
              }}
            >
              <Field>
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>
              <Field>
                <Label>Descripción</Label>
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
              </Field>
              <FieldRow>
                <Field>
                  <Label>Inicio</Label>
                  <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </Field>
                <Field>
                  <Label>Fin (opcional)</Label>
                  <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </Field>
              </FieldRow>
              <EditActions>
                <SecondaryButton type="button" onClick={() => onOpenChange(false)}>Cancelar</SecondaryButton>
                <PrimaryButton type="submit" disabled={!canSubmit}>Guardar cambios</PrimaryButton>
              </EditActions>
            </FormGrid>
          </ModalBody>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
`

const ModalContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(560px, 92vw);
  background: #fff;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 1001;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`

const ModalTitle = styled(Dialog.Title)`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray600};
`

const FormGrid = styled.form`
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

const EditActions = styled.div`
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
