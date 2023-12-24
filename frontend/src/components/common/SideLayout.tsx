import { SideLayoutProps } from "@/interfaces/allProps";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import TopicHeadings from "./TopicHeadings";
import { LoginController } from "../Controller/LoginController";
import { AddChannelController } from "../Controller/AddChannelController";

export const SideLayout: React.FC<SideLayoutProps> = ({
  data,
  handleSideLayout,
}) => {
  const theme = useTheme();
  const channelOnClickDropdown = () => { };
  const channelOnClickAdd = () => {
    console.log("implemented");
    handleSideLayout(
      <Box 
      display={"flex"} 
      alignItems={"center"} 
      justifyContent={"center"} 
      width={"100%"}
      >
        <AddChannelController />
      </Box>
    );
  };
  const membersOnClickAdd = () => { };
  const membersOnClickDropdown = () => { };

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      sx={{
        height: "100%",
      }}
    >
      <Stack direction={"column"} width={"100%"}>
        <TopicHeadings
          headingName={"My Channels"}
          onClickAdd={channelOnClickAdd}
          onClickDropdown={channelOnClickDropdown}
        />
        <TopicHeadings
          headingName={"My Messages"}
          onClickDropdown={membersOnClickDropdown}
          onClickAdd={membersOnClickAdd}
        />
      </Stack>
    </Box>
  );
};
