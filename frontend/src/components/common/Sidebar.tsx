
import { MeQuery } from "@/generated/output/graphql";
import { IconMap } from "@/utils/helper";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from "@mui/material";
import React, { useState } from "react";

interface SidebarProps {
    data: MeQuery | undefined
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()
    return (
        <Drawer
            open={open}
            variant="permanent"
            sx={{
                zIndex: 0,
                
            }}
            onClose={() => setOpen(false)}>
            <Toolbar />
            <Box 
            display={"flex"}
            flexGrow={1}
            sx={{
                backgroundColor: theme.palette.primary.light
            }}>
                <List>
                    {data !== undefined && data.Me?.channels.map((c) => (
                        <ListItem key={c._id}>
                            <ListItemButton
                            >
                                <ListItemIcon>
                                    {IconMap[c.IconName as keyof typeof IconMap] && React.createElement(IconMap[c.IconName as keyof typeof IconMap])}
                                    </ListItemIcon>
                                    {/* <ListItemText>{c.Name}</ListItemText> */}
                            </ListItemButton>
                            <Divider />
                        </ListItem>
                        
                    ))}

                </List>
            </Box>



        </Drawer>
    );
};

export default Sidebar;
