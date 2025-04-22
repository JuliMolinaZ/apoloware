// src/components/Sidebar/Sidebar.tsx
"use client";

import React from "react";
import {
  Drawer,
  ListItemButton,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { sidebarItems } from "@/config/sidebarItems";

const headerHeight = 60;

const sidebarLogos: Record<string, string> = {
  Home: "home-simple.svg",
  Users: "user.svg",
  Picking: "pickin.svg",
  Slotting: "slotting.svg",
  Dashboards: "dashboard.svg",
  Packing: "packing.svg",
  Locations: "location.svg",
  Arrivals: "arrivals.svg",
  Putaway: "putaway.svg",
  Items: "cube.svg",
  Titan: "titan-chat-blue.png",
  Chat: "chat.svg",
};

export interface SidebarProps {
  open: boolean;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const getPath = (label: string) =>
    label.toLowerCase() === "home" ? "/dashboard" : `/${label.toLowerCase()}`;

  const handleNavigate = (label: string) => {
    router.push(getPath(label));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    router.push("/auth/login");
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? 200 : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": (theme: any) => ({
          width: open ? 200 : 0,
          overflowX: "hidden",
          transition: "width 0.3s ease",
          backgroundColor: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          fontFamily: "Nunito Sans",
          color: "#757575",
        }),
      }}
    >
      <Box sx={{ height: headerHeight }} />

      {open && (
        <Box sx={{ textAlign: "center", p: 2 }}>
          <img
            src="/logos/Apoloware.svg"
            alt="Logo Apolo"
            style={{ width: 100, height: "auto" }}
          />
        </Box>
      )}

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {sidebarItems.map((item) => {
          const itemPath = getPath(item.label);
          const active = pathname === itemPath;

          return (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavigate(item.label)}
              sx={{
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                backgroundColor: active ? "rgba(0, 0, 255, 0.1)" : "inherit",
                justifyContent: open ? "initial" : "center",
                px: open ? 2 : 0,
              }}
            >
              <img
                src={`/logos/${sidebarLogos[item.label]}`}
                alt={t(`sidebar.${item.label}`)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 4,
                  filter: active
                    ? "invert(27%) sepia(85%) saturate(620%) hue-rotate(190deg) brightness(96%) contrast(92%)"
                    : "none",
                }}
              />
              {open && (
                <ListItemText
                  primary={t(`sidebar.${item.label}`)}
                  sx={{
                    ml: 2,
                    "& .MuiTypography-root": {
                      fontWeight: "bold",
                      fontFamily: "Nunito Sans",
                      color: "#757575",
                    },
                  }}
                />
              )}
            </ListItemButton>
          );
        })}

        <Box sx={{ flexGrow: 1 }} />

        {open && (
          <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              sx={{
                fontWeight: "bold",
                fontFamily: "Nunito Sans",
                color: "#757575",
              }}
            >
              {t("sidebar.Logout")}
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
