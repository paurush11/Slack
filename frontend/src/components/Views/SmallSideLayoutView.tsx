import { SmallSideLayoutProps } from "@/interfaces/allProps";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import PostAddIcon from "@material-ui/icons/PostAdd";
import QueueIcon from "@material-ui/icons/Queue";

const SmallSideLayout: React.FC<SmallSideLayoutProps> = ({}) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignContent={"center"}
      bgcolor={theme.palette.background.paper}
      height={"100%"}
      p={1}
      gap={6}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={2}
      >
        <IconButton>
          <HomeIcon
            style={{
              color: theme.palette.primary[600],
            }}
          />
        </IconButton>
        <Typography variant="subtitle2" key={"hone"}>
          Home
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <IconButton>
          <ChatIcon
            style={{
              color: theme.palette.primary[600],
            }}
          />
        </IconButton>
        <Typography variant="body1" key={"Messages"}>
          Messages
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <IconButton>
          <PostAddIcon
            style={{
              color: theme.palette.primary[600],
            }}
          />
        </IconButton>
        <Typography variant="subtitle2" key={"Add Post"}>
          Add Post
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <IconButton>
          <QueueIcon
            style={{
              color: theme.palette.primary[600],
            }}
          />
        </IconButton>
        <Typography variant="subtitle2" key={"Add Channel"}>
          Add Channel
        </Typography>
      </Box>
    </Box>
  );
};
export default SmallSideLayout;
