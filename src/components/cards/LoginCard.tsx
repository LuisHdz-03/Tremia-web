import type { ReactNode } from 'react'
import styled from 'styled-components'

interface LoginCardProps {
  title?: string
  children: ReactNode
}

export default function LoginCard({ title = 'Iniciar sesión', children }: LoginCardProps) {
  return (
    <Card role="region" aria-label={title}>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Card>
  )
}

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  border: 1px solid rgba(0, 0, 0, 0.06);
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: currentColor;
    margin: ${({ theme }) => theme.spacing(4)} auto 0;
    border-radius: ${({ theme }) => theme.radii.pill};
    opacity: 0.85;
  }
`

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`
