import { MeQuery } from "@/generated/output/graphql";
import { IconMap } from "@/utils/helper";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

interface SidebarProps {
  data: MeQuery | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const drawerWidth = 100;
  return (
    <Drawer
      open={open}
      variant="permanent"
      sx={{
        zIndex: 0,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
      onClose={() => setOpen(false)}
    >
      <Toolbar />
      <Box
        flexGrow={1}
        sx={{
          overflow: "auto",
          backgroundColor: theme.palette.primary.contrastText,
        }}
      >
        <List>
          {data !== undefined &&
            data.Me?.channels.map((c) => (
              <>
                <ListItem key={c._id}>
                  <ListItemButton
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto", // Remove the minimum width
                        marginRight: "0px", // Remove default right margin if present
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {IconMap[c.IconName as keyof typeof IconMap] &&
                        React.createElement(
                          IconMap[c.IconName as keyof typeof IconMap],
                          { sx: { color: theme.palette.primary.dark } },
                        )}
                    </ListItemIcon>
                    {/* <ListItemText>{c.Name}</ListItemText> */}
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
