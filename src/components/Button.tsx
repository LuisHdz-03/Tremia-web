import styled from 'styled-components'
import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'secondary', onClick, className }: ButtonProps) {
  return (
    <StyledButton $variant={variant} onClick={onClick} className={className}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${({ $variant, theme }) => $variant === 'primary' ? `
    background: ${theme.colors.primary};
    color: #fff;
    
    &:hover {
      background: #1e4ba8;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(41, 87, 205, 0.25);
    }
  ` : `
    background: ${theme.colors.gray200};
    color: ${theme.colors.textSecondary};
    
    &:hover {
      background: ${theme.colors.gray300};
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`
