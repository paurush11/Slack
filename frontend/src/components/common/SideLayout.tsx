import { SideLayoutProps } from "@/interfaces/allProps";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { AddChannelController } from "../Controller/AddChannelController";
import TopicHeadings from "./TopicHeadings";
import { IconMap } from "@/utils/helper";
import useSessionStorage from "@/utils/useSessionStorage";
import ChannelViewController from "@/components/Controller/ChannelViewController";

export const SideLayout: React.FC<SideLayoutProps> = ({
  data,
  handleSideLayout,
  setIsClickedInMainComp,
  isClickedInMainComp,
}) => {
  const theme = useTheme();
  const [discoverChannelDropdownListOpen, setDiscoverChannelDropdownListOpen, discoverChannelDropdownListOpenRemove] =
    useSessionStorage("channelDropdownListOpen", true);
  const [channelDropdownListOpen, setChannelDropdownListOpen, channelDropdownListOpenRemove] =
    useSessionStorage("channelDropdownListOpen", true);
  const [messagesOpenDropdownListOpen, setMessagesOpenDropdownListOpen, messagesOpenDropdownListOpenRemove] =
    useSessionStorage("messagesOpenDropdownListOpen", false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const channelOnClickDropdown = () => {
    setChannelDropdownListOpen(!channelDropdownListOpen);
  };
  const channelOnClickAdd = () => {
    console.log("implemented");
    handleSideLayout(
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        bgcolor={"red"}
      >
        <AddChannelController />
      </Box>
    );
  };
  const discoverChannelOnClickDropdown = () => { };
  const discoverChannelOnClickAdd = () => {
    setIsClickedInMainComp(!isClickedInMainComp);
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
      bgcolor={theme.palette.background.paper}
    >
      <Stack direction={"column"} width={"100%"}>
        <TopicHeadings
          headingName={"Channels"}
          onClickAdd={discoverChannelOnClickAdd}
          onClickDropdown={discoverChannelOnClickDropdown}
        />

        {channelDropdownListOpen && (
          <Box
            height={"30vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List>
              {data !== undefined &&
                data.Me?.channels.map((c) => (
                  <>
                    <ListItem key={c._id}>
                      <ListItemButton
                        sx={{
                          p: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center", // Center horizontally
                          alignItems: "center", // Center vertically
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          handleSideLayout(
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={"100%"}
                            >
                              <ChannelViewController channelId={c._id} />
                            </Box>,
                          );
                        }}
                      >
                        <ListItemIcon

                          sx={{
                            pl: 2,
                            pr: 2,
                            minWidth: "auto", // Remove the minimum width
                            marginRight: "0px", // Remove default right margin if present
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {IconMap[c.IconName as keyof typeof IconMap] &&
                            React.createElement(
                              IconMap[c.IconName as keyof typeof IconMap],
                              { sx: { color: theme.palette.primary[600] } },
                            )}
                        </ListItemIcon>

                        <ListItemText>{c.Name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </Box>
        )}
        <TopicHeadings
          headingName={"You"}
          onClickAdd={channelOnClickAdd}
          onClickDropdown={channelOnClickDropdown}
        />
        {discoverChannelDropdownListOpen && (
          <Box
            height={"30vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List>
              {data !== undefined &&
                data.Me?.channels.map((c) => (
                  <>
                    <ListItem key={c._id}>
                      <ListItemButton
                        sx={{
                          p: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center", // Center horizontally
                          alignItems: "center", // Center vertically
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          handleSideLayout(
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={"100%"}
                            >
                              <ChannelViewController channelId={c._id} />
                            </Box>,
                          );
                        }}
                      >
                        <ListItemIcon

                          sx={{
                            pl: 2,
                            pr: 2,
                            minWidth: "auto", // Remove the minimum width
                            marginRight: "0px", // Remove default right margin if present
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {IconMap[c.IconName as keyof typeof IconMap] &&
                            React.createElement(
                              IconMap[c.IconName as keyof typeof IconMap],
                              { sx: { color: theme.palette.primary[600] } },
                            )}
                        </ListItemIcon>

                        <ListItemText>{c.Name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </Box>
        )}


        <TopicHeadings
          headingName={"My Messages"}
          onClickDropdown={membersOnClickDropdown}
          onClickAdd={membersOnClickAdd}
        />
        {
          messagesOpen && <Box height={"30vh"} overflow={"scroll"} display={"flex"} >
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
                        onClick={() => {
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
                        }}
                      >
                        <ListItemIcon

                          sx={{
                            p: 2,
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

                        <ListItemText>{c.Name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </Box>
        }
      </Stack>
    </Box>
  );
};
