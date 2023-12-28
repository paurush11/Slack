import {
  GetAllMessagesInChannelQuery,
  GetChannelQuery,
  GetMyMessagesInChannelQuery,
  MeQuery,
} from "@/generated/output/graphql";
import { RootState } from "@/store/store";
import {
  Alert,
  Box,
  Divider,
  Icon,
  IconButton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Message, User } from "@/interfaces/allProps";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { setsideLayoutData } from "@/store/sideLayoutDataSlice";
import { ChatController } from "../Controller/ChatController";
interface MessagesViewProps {
  messagesInChannel: Message[]
  setMessagesInChannel: React.Dispatch<React.SetStateAction<Message[]>>
}
type UserStateRole = User & {
  isReceiver: boolean
}
type FriendsState = {
  [key: string]: Message[];
};
type UserState = {
  [key: string]: UserStateRole;
};

const MessagesView: React.FC<MessagesViewProps> = ({ messagesInChannel, setMessagesInChannel }) => {
  const theme = useTheme();
  const userData = useSelector((state: RootState) => state.myData.data);
  const [friends, setFriends] = useState<FriendsState>({});
  const [users, setUsers] = useState<UserState>({});

  useEffect(() => {
    if (messagesInChannel && userData) {
      setFriends(prevFriends => {
        const newFriends: FriendsState = { ...prevFriends };
        const newUsers: UserState = { ...users }

        messagesInChannel.forEach((msg) => {
          let otherUserId: string = "";
          let otherUser;

          if (msg.senderId === (userData as MeQuery).Me?.user?._id) {
            otherUserId = msg.receiverID;
            otherUser = {
              ...msg.receiver,
              isReceiver: true
            } as UserStateRole
          } else if (msg.receiverID === (userData as MeQuery).Me?.user?._id) {
            otherUserId = msg.senderId;
            otherUser = { ...msg.sender, isReceiver: false } as UserStateRole;
          }

          if (otherUserId) {
            if (!newFriends[otherUserId]) {
              newFriends[otherUserId] = [];
            }
            if (!newUsers[otherUserId]) {
              newUsers[otherUserId] = otherUser as UserStateRole
            }
            newFriends[otherUserId].push(msg);

          }
        });


        setUsers(newUsers);

        return newFriends;
      });
    }
  }, [messagesInChannel, userData]);




  const dispatch = useDispatch()
  return (
    <Box
      height={"100%"}
      width={"100%"}
      p={2}
      component={"form"}
      bgcolor={`${theme.palette.background.paper}`}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography key={"AddChats"} variant="h1">
        Chats
      </Typography>
      <Divider />

      {/* <Box display={"flex"} flexGrow={1} justifyContent={"center"} p={2}>
                <Tabs variant='fullWidth'>
                    <Tab label={"My Chats"}></Tab>
                    <Tab label={"Groups"}></Tab>
                    <Tab label={"Archived"}></Tab>
                </Tabs>
            </Box> */}
      <Box maxHeight={"40vh"}>
        <Stack direction={"column"} gap={2}>
          {userData && Object.entries(friends)
            .map(([friendId, messages]) => {
              messages = messages.map(msg => ({ ...msg, createdAt: new Date(msg.createdAt).getTime() })).sort((msgA, msgB) => msgA.createdAt - msgB.createdAt).map(msg => ({ ...msg, createdAt: new Date(msg.createdAt).toDateString() }));

              const lastMessage = messages[messages.length - 1];
              const handleBoxClick = () => {

                // Your logic here
                console.log('Box clicked!');
                dispatch(
                  setsideLayoutData(
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={"100%"}
                    >
                      <ChatController />
                    </Box>
                  )
                )
              };

              return (
                <Box
                  onClick={handleBoxClick}
                  display={"flex"}
                  justifyContent={"start"}
                  borderColor={"black"}
                  sx={{
                    borderBottom: { xs: "1px solid", md: "2px solid" },
                  }}
                  alignItems={"center"}
                  p={2}
                  borderRadius={4}
                >
                  <IconButton size="small">
                    <AccountCircleIcon
                      style={{
                        color: theme.palette.primary[200],
                      }}
                    />
                  </IconButton>
                  <Stack display={"flex"}>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      pt={2}
                    >
                      <Typography pl={2} variant="h3">{users[friendId].firstName}</Typography>
                      <Typography pl={1} variant="h3">{users[friendId].lastName}</Typography>

                    </Stack>
                    <Box>
                      <Typography pl={2} variant="subtitle2" color={theme.palette.primary[600]}>{lastMessage.TextMessage}</Typography>
                    </Box>

                  </Stack>
                  <Box display={"flex"} flexGrow={1} />
                  {lastMessage.senderId !== (userData as MeQuery).Me?.user?._id && <FiberManualRecordIcon style={{
                    height: 10

                  }} />}



                </Box>
              )

            })
          }
        </Stack>

      </Box>



    </Box>
  );
};

export default MessagesView;
