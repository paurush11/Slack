import ChannelViewController from "@/components/Controller/ChannelViewController";
import { GetChannelQuery, MeQuery } from "@/generated/output/graphql";
import { SideLayoutProps } from "@/interfaces/allProps";
import { setMessageReceiverFirstName, setMessageReceiverId, setMessageReceiverLastName, setMessageReceiverUsername, setMySelectedChannel } from "@/store/meSlice";
import { RootState } from "@/store/store";
import { IconMap } from "@/utils/helper";
import useSessionStorage from "@/utils/useSessionStorage";
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddChannelController } from "../Controller/AddChannelController";
import { MessagesController } from "../Controller/MessagesController";
import TopicHeadings from "./TopicHeadings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ChatController } from "../Controller/ChatController";
import { setsideLayoutData } from "@/store/sideLayoutDataSlice";
export const SideLayout: React.FC<SideLayoutProps> = ({

  setIsClickedInMainComp,
  isClickedInMainComp,
}) => {
  const theme = useTheme();
  const userData: MeQuery | null = useSelector(
    (state: RootState) => state.myData.data,
  );
  const channelData: GetChannelQuery | null = useSelector(
    (state: RootState) => state.myChannelData.data,
  );
  useEffect(() => { }, [channelData])
  const channelId = useSelector((state: RootState) => state.myData.channelId);
  const dispatch = useDispatch();

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



  const discoverChannelOnClickDropdown = () => {
    setDiscoverChannelDropdownListOpen(!discoverChannelDropdownListOpen);
  };
  const discoverChannelOnClickAdd = () => {
    setIsClickedInMainComp(!isClickedInMainComp);
  };
  const channelOnClickDropdown = () => {
    setChannelDropdownListOpen(!channelDropdownListOpen);
  };
  const channelOnClickAdd = () => {
    console.log("implemented");
    dispatch(setsideLayoutData(<Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      bgcolor={"red"}
    >
      <AddChannelController />
    </Box>))
    
  };
  const membersOnClickAdd = () => {
    console.log("implemented");
    dispatch(setsideLayoutData(
      <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      bgcolor={"red"}
    >
      <MessagesController />
    </Box>
    ))

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
          headingName={channelData && (channelData as GetChannelQuery).getChannel.Name ? (channelData as GetChannelQuery).getChannel.Name : "Channel"}
          onClickAdd={discoverChannelOnClickAdd}
          onClickDropdown={discoverChannelOnClickDropdown}
        />

        {discoverChannelDropdownListOpen && (
          <Box
            maxHeight={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List key={"123456"}>
              <ListItem key={"posts"}>
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

                  </ListItemIcon>

                  <ListItemText>Posts</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem key={"threads"}>
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

                  </ListItemIcon>

                  <ListItemText>threads</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem key={"mentions"}>
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

                  </ListItemIcon>

                  <ListItemText>Mentions</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
        <TopicHeadings
          headingName={"Your Channels"}
          onClickAdd={channelOnClickAdd}
          onClickDropdown={channelOnClickDropdown}
        />
        {channelDropdownListOpen && (
          <Box
            maxHeight={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            bgcolor={theme.palette.background.paper}
          >
            <List key={"12345"}>
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
                          dispatch(setMySelectedChannel(c._id));
                          dispatch(setsideLayoutData(<Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"100%"}
                          >
                            <ChannelViewController />
                          </Box>))

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
            maxHeight={"25vh"}
            overflow={"scroll"}
            display={"flex"}
            width={"100%"}
            bgcolor={theme.palette.background.paper}

          >
            <List key={"1234"}>
              {channelData !== null && userData !== null && (channelData as GetChannelQuery) !== undefined &&
                (channelData as GetChannelQuery).getChannel.members?.filter((member) => member._id !== (userData as MeQuery).Me?.user?._id).map((m) => (
                  <>
                    <ListItem key={m._id} sx={{
                      width: "100%"
                    }}>
                      <ListItemButton
                        sx={{
                          p: 0,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center", // Center horizontally
                          alignItems: "center", // Center vertically
                          borderRadius: "10px",
                          gap: 1
                        }}
                        onClick={() => {
                          dispatch(setMessageReceiverId(m._id))
                          dispatch(setMessageReceiverFirstName(m.firstName))
                          dispatch(setMessageReceiverLastName(m.lastName))
                          dispatch(setMessageReceiverUsername(m.username))
                          dispatch(setsideLayoutData(<Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"100%"}
                          >
                            <ChatController />
                          </Box>))
                          
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            pl: 2,
                            pr: 2,
                            minWidth: "auto", // Remove the minimum width
                            marginRight: "0px", // Remove default right margin if present
                            display: "flex",
                            justifyContent: "center"
                          }}

                        >
                          <AccountCircleIcon
                            style={{
                              color: theme.palette.primary[200],
                            }}
                          />
                        </ListItemIcon>

                        <ListItemText>{m.firstName}</ListItemText>
                        <ListItemText>{m.lastName}</ListItemText>
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
