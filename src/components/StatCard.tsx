import styled from 'styled-components'
import { type ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  number: string | number
  label: string
  subtitle?: string
  color: string
  trend?: string
  trendColor?: string
}

export default function StatCard({ 
  icon, 
  number, 
  label, 
  subtitle, 
  color, 
  trend, 
  trendColor = '#10b981' 
}: StatCardProps) {
  return (
    <Container>
      <ColorBar $color={color} />
      <Content>
        <IconContainer $color={color}>
          {icon}
        </IconContainer>
        <Stats>
          <Number>{number.toLocaleString()}</Number>
          <Label>{label}</Label>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {trend && <Trend $color={trendColor}>{trend}</Trend>}
        </Stats>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }
`

const ColorBar = styled.div<{ $color: string }>`
  height: 4px;
  background: ${({ $color }) => $color};
  width: 100%;
`

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(5)};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(4)};
`

const IconContainer = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  min-width: 0;
`

const Number = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1;
`

const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
`

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray500};
`

const Trend = styled.div<{ $color: string }>`
  font-size: 0.8rem;
  color: ${({ $color }) => $color};
  font-weight: 600;
`
