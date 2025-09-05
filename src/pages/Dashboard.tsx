import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

import StatCard from "../components/StatCard";
import ChatWidget from "../components/ChatWidget";
import { FiUsers, FiBriefcase, FiMessageCircle } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import RecentUsers from "../components/RecentUsers";
import {
  getSociosUsuariosApi,
  getOrganizacionUsuariosApi,
} from "../api/usuarios";
import { getForosApi } from "../api/foros";
import { getEventsApi } from "../api/events";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [usuariosCount, setUsuariosCount] = useState<number>(0);
  const [orgCount, setOrgCount] = useState<number>(0);
  const [forosCount, setForosCount] = useState<number>(0);
  const [eventosCount, setEventosCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const [usuarios, orgs, foros, eventos] = await Promise.all([
          getSociosUsuariosApi(),
          getOrganizacionUsuariosApi(),
          getForosApi(),
          getEventsApi(),
        ]);
        setUsuariosCount(usuarios.length);
        setOrgCount(orgs.length);
        setForosCount(foros.length);
        setEventosCount(eventos.length);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error cargando datos del dashboard", err);
      }
    })();
  }, []);

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Content>
          <AdminPanelCard>
            <CardHeader>
              <Title>Panel de Administración</Title>
            </CardHeader>
          </AdminPanelCard>

          <StatsGrid>
            <StatCard
              icon={<FiUsers size={24} />}
              number={usuariosCount}
              label="Usuarios"
              subtitle="Activos"
              color="#3b82f6"
            />
            <StatCard
              icon={<FaBuilding size={24} />}
              number={orgCount}
              label="Organizaciones"
              color="#10b981"
            />
            <StatCard
              icon={<FiBriefcase size={24} />}
              number={eventosCount}
              label="Eventos"
              subtitle="Activos"
              color="#f59e0b"
            />
            <StatCard
              icon={<FiMessageCircle size={24} />}
              number={forosCount}
              label="Foros"
              subtitle="Activos"
              color="#3b82f6"
            />
          </StatsGrid>

          {/* Secciones solicitadas (componentizadas) */}
          <SectionsGrid>
            <RecentUsers />
          </SectionsGrid>
        </Content>
      </BodyLayout>
      <ChatWidget />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(6)};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.gray50};
`;

const AdminPanelCard = styled(Card)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(6)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

// Grid contenedor de secciones
const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(6)};
  margin-top: ${({ theme }) => theme.spacing(6)};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;
