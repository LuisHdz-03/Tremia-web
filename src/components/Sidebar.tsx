import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiMessageCircle,
  FiMessageSquare,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: FiHome, label: "Inicio", to: "/dashboard" },
    { icon: FaBuilding, label: "Organizaciones", to: "/organizations" },
    { icon: FiUsers, label: "Socios", to: "/socios" },
    { icon: FiBriefcase, label: "Eventos", to: "/eventos" },
    { icon: FiMessageSquare, label: "Mensajes", to: "/mensajes" },
    { icon: FiMessageCircle, label: "Foros", to: "/foros" },
    { icon: FiSettings, label: "Configuración", to: "/configuracion" },
  ];

  return (
    <Container $isCollapsed={isCollapsed}>
      <TopBar>
        <HamburgerButton
          onClick={onToggle}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <FiMenu size={18} />
        </HamburgerButton>
      </TopBar>

      <MenuList>
        {menuItems.map((item, index) => (
          <MenuLink
            key={index}
            to={item.to}
            $isCollapsed={isCollapsed}
            end={item.to === "/dashboard"}
          >
            <MenuIcon>
              <item.icon size={20} />
            </MenuIcon>
            {!isCollapsed && (
              <MenuContent>
                <MenuLabel>{item.label}</MenuLabel>
              </MenuContent>
            )}
          </MenuLink>
        ))}
      </MenuList>
    </Container>
  );
}

const Container = styled.aside<{ $isCollapsed: boolean }>`
  width: ${({ $isCollapsed }) => ($isCollapsed ? "60px" : "280px")};
  height: 100%;
  background: #fff;
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const HamburgerButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray600};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
    border-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const MenuList = styled.nav`
  padding: ${({ theme }) => theme.spacing(6)} 0;
  flex: 1;
  overflow-y: auto;
`;

const MenuLink = styled(NavLink)<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme, $isCollapsed }) =>
    $isCollapsed
      ? `${theme.spacing(3)} ${theme.spacing(4)}`
      : `${theme.spacing(3)} ${theme.spacing(6)}`};
  margin: ${({ theme }) => `0 ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? "center" : "flex-start"};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray600};

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  &:not(.active):hover {
    background: ${({ theme }) => theme.colors.gray50};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MenuLabel = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
`;
