import {
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
import React, { memo } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
interface MessagesViewProps {}

const MessagesView: React.FC<MessagesViewProps> = ({}) => {
  const theme = useTheme();
  const myMessagesInChannel: GetMyMessagesInChannelQuery | null = useSelector(
    (state: RootState) => state.myMessages.data,
  );
  const userData: MeQuery | null = useSelector(
    (state: RootState) => state.myData.data,
  );
  const channelData: GetChannelQuery | null = useSelector(
    (state: RootState) => state.myChannelData.data,
  );

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

      <Stack direction={"column"} gap={2}>
        {userData &&
          channelData &&
          (channelData as GetChannelQuery).getChannel.members
            ?.filter(
              (member) => member._id !== (userData as MeQuery).Me?.user?._id,
            )
            .map((member) => (
              <Box
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
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography pl={2}>{member.firstName}</Typography>
                  <Typography pl={1}>{member.lastName}</Typography>
                </Stack>
              </Box>
            ))}
      </Stack>

      {userData &&
        myMessagesInChannel &&
        (
          myMessagesInChannel as GetMyMessagesInChannelQuery
        )?.getMyMessagesInChannel
          .filter(
            (message) =>
              message.sender._id !== (userData as MeQuery).Me?.user?._id,
          )
          .map((message) => {
            return (
              <Box>
                {message._id}
                {message.sender._id}
                {message.receiver._id}
              </Box>
            );
          })}
    </Box>
  );
};

export default MessagesView;
