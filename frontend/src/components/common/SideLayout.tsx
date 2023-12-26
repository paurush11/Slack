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
import { MessagesController } from "../Controller/MessagesController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MeQuery } from "@/generated/output/graphql";
import { setMySelectedChannel } from "@/store/meSlice";

export const SideLayout: React.FC<SideLayoutProps> = ({
  handleSideLayout,
  setIsClickedInMainComp,
  isClickedInMainComp,
  selectedChannelValue,
  setSelectedChannelValue,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const userData: MeQuery | null = useSelector((state: RootState) => state.myData.data);
  const [
    discoverChannelDropdownListOpen,
    setDiscoverChannelDropdownListOpen,
    discoverChannelDropdownListOpenRemove,
  ] = useSessionStorage("channelDropdownListOpen", true);
  const [
    channelDropdownListOpen,
    setChannelDropdownListOpen,
    channelDropdownListOpenRemove,
  ] = useSessionStorage("channelDropdownListOpen", true);
  const [
    messagesOpenDropdownListOpen,
    setMessagesOpenDropdownListOpen,
    messagesOpenDropdownListOpenRemove,
  ] = useSessionStorage("messagesOpenDropdownListOpen", false);
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
      </Box>,
    );
  };
  const discoverChannelOnClickDropdown = () => {
    setDiscoverChannelDropdownListOpen(!discoverChannelDropdownListOpen);
  };
  const discoverChannelOnClickAdd = () => {
    setIsClickedInMainComp(!isClickedInMainComp);
  };
  const membersOnClickAdd = () => {
    console.log("implemented");
    handleSideLayout(
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        bgcolor={"red"}
      >
        <MessagesController

          selectedChannelValue={selectedChannelValue}
        />
      </Box>,
    );
  };
  const membersOnClickDropdown = () => {
    setMessagesOpenDropdownListOpen(!messagesOpenDropdownListOpen);
  };

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      sx={{
        height: "100%",
      }}
      overflow={"scroll"}
      bgcolor={theme.palette.background.paper}
    >
      <Stack direction={"column"} width={"100%"}>
        <TopicHeadings
          headingName={"Channels"}
          onClickAdd={discoverChannelOnClickAdd}
          onClickDropdown={discoverChannelOnClickDropdown}
        />

        {discoverChannelDropdownListOpen && (
          <Box
            height={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List>
              {userData !== null &&
                (userData as MeQuery).Me?.user?.channels.map((c) => (
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
                          dispatch(setMySelectedChannel(c._id))
                          handleSideLayout(
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={"100%"}
                            >
                              <ChannelViewController />
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
        {channelDropdownListOpen && (
          <Box
            height={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List>
              {userData !== null &&
                (userData as MeQuery).Me?.user?.channels.map((c) => (
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
                          dispatch(setMySelectedChannel(c._id))
                          handleSideLayout(
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={"100%"}
                            >
                              <ChannelViewController />
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
        {messagesOpenDropdownListOpen && (
          <Box
            height={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
            sx={{
              overflow: "scroll",
            }}
          >
            <List>
              {userData !== null &&
                (userData as MeQuery).Me?.user?.channels.map((c) => (
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
                          dispatch(setMySelectedChannel(c._id))
                          handleSideLayout(
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              width={"100%"}
                            >
                              <ChannelViewController />
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
      </Stack>
    </Box>
  );
};
