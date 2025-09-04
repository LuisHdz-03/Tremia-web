import styled from 'styled-components'
import { FaBuilding } from 'react-icons/fa'

export default function Header() {
  return (
    <Bar role="banner">
      <Brand>
        <BrandIcon>
          <FaBuilding size={18} />
        </BrandIcon>
        <BrandText>
          <Title>Tremia</Title>
          <Subtitle>Club empresarial</Subtitle>
        </BrandText>
      </Brand>
    </Bar>
  )
}

const Bar = styled.header`
  height: 64px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: 0 ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  position: sticky;
  top: 0;
  z-index: 10;
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  min-width: 0;
`

const BrandIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: grid;
  place-items: center;
`

const BrandText = styled.div`
  line-height: 1.1;
`

const Title = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray500};
`

 
