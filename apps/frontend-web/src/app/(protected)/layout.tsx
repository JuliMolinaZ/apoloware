// src/app/(protected)/layout.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import DashboardHeader from "@/components/Header/DashboardHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useThemeContext } from "@/components/ThemeContext";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);
  const headerHeight = 130;
  const { currentTheme, changeTheme, theme } = useThemeContext();

  return (
    <Container style={{ backgroundColor: theme.palette.background.default }}>
      <Sidebar
        open={sidebarOpen}
        onLogout={() => {
          /* lógica de logout */
        }}
      />

      <MainContent>
        <DashboardHeader
          toggleDrawer={toggleDrawer}
          drawerOpen={sidebarOpen}
          sidebarWidth={sidebarOpen ? 200 : 0}
          onThemeChange={changeTheme}
          currentTheme={currentTheme}
        />

        <Content
          style={{
            marginTop: headerHeight,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {children}
        </Content>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 1rem;
  transition: margin-top 0.3s;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;
