import styled from 'styled-components'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <Container className={className}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;
`
