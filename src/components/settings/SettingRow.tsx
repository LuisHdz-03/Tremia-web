import styled from 'styled-components'
import { type ReactNode } from 'react'

interface SettingRowProps {
  label: string
  description?: string
  control: ReactNode
  className?: string
}

export default function SettingRow({ label, description, control, className }: SettingRowProps) {
  return (
    <Row className={className}>
      <Texts>
        <Label>{label}</Label>
        {description && <Description>{description}</Description>}
      </Texts>
      <Control>{control}</Control>
    </Row>
  )
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} 0;
`

const Texts = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`

const Label = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Description = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
`

const Control = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`
