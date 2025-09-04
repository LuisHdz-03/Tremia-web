import styled from 'styled-components'
import Card from '../Card'
import { type ReactNode } from 'react'

interface SettingSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export default function SettingSection({ title, description, children, className }: SettingSectionProps) {
  return (
    <SectionCard className={className}>
      <Header>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Header>
      <Content>
        {children}
      </Content>
    </SectionCard>
  )
}

const SectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background: #fff;
`

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
`

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.gray50};
`
