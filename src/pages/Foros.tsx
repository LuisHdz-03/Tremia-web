import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatWidget from "../components/ChatWidget";
import ForumsHeader from "../components/foros/ForumsHeader";
import ForumsList from "../components/foros/ForumsList";
import MembersAside from "../components/foros/MembersAside";

export default function Foros() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Content>
          <Grid>
            <Main>
              <StickyHeader>
                <ForumsHeader />
              </StickyHeader>
              <CenterList>
                <ForumsList />
              </CenterList>
            </Main>
            <Aside>
              <MembersAside />
            </Aside>
          </Grid>
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
  padding: 0 ${({ theme }) => theme.spacing(6)}
    ${({ theme }) => theme.spacing(6)};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.gray50};
  /* permite sticky interno */
  position: relative;
`;

const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(6)};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;

const Main = styled.div`
  min-height: 0; /* necesario para layouts con overflow */
  min-width: 0; /* permite que el contenido haga shrink en flex */
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;
  /* Evita ver el contenido por detrás cuando hace scroll */
  background: ${({ theme }) => theme.colors.background};
  /* Hacerla más alta (doble-ish) */
  padding-top: ${({ theme }) => theme.spacing(6)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  /* Separador inferior */
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const CenterList = styled.div`
  /* el scroll vive en Content, aquí solo el contenido */
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Aside = styled.div`
  position: sticky;
  top: 0;
  width: 320px;
  min-width: 320px;
  flex: 0 0 320px;
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const CommentsCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;
