import {
  GetMyMessagesInChannelQuery,
  MeQuery,
} from "@/generated/output/graphql";
import { RootState } from "@/store/store";
import {
  Alert,
  Box,
  Divider,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

interface MessagesViewProps {
  messageData: GetMyMessagesInChannelQuery | undefined;
}

const MessagesView: React.FC<MessagesViewProps> = ({ messageData }) => {
  const theme = useTheme();
  const userData: MeQuery | null = useSelector((state: RootState) => state.myData.data);
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
      <Typography key={"FindMembersInChannel"} variant="h4" pt={2}>
        Search for members in channels
      </Typography>

      {/* <Box display={"flex"} flexGrow={1} justifyContent={"center"} p={2}>
                <Tabs variant='fullWidth'>
                    <Tab label={"My Chats"}></Tab>
                    <Tab label={"Groups"}></Tab>
                    <Tab label={"Archived"}></Tab>
                </Tabs>
            </Box> */}

      {messageData?.getMyMessagesInChannel.map((message) => {
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
