import {
  Box,
  Dialog,
  IconButton,
  InputBase,
  Modal,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
interface FindChannelsProps {
  channelOpen: boolean;
  setValue: any;
  setHasBeenClosed: any;
}

const FindChannels: React.FC<FindChannelsProps> = ({
  channelOpen,
  setValue,
  setHasBeenClosed,
}) => {
  const theme = useTheme();
  const onClose = () => {
    setValue(false);
    setHasBeenClosed(true);
  };
  return channelOpen ? (
    <Dialog open onClose={onClose} fullWidth>
      <Stack
        direction={"row"}
        gap={0}
        p={3}
        display={"flex"}
        alignItems={"start"}
      >
        <Box width="100%" display={"flex"} height={"60vh"}>
          <Stack
            direction={"row"}
            gap={2}
            p={4}
            display={"flex"}
            width={"100%"}
          >
            <Typography
              key={"find_your_channels"}
              width={"100%"}
              variant="h5"
              component="h2"
              display={"flex"}
              alignItems={"center"}
              height={"6vh"}
            >
              Find your channels
            </Typography>
            <Box
              position={"relative"}
              display={"flex"}
              flexDirection={"row"}
              p={2}
              height={"6vh"}
              width={"100%"}
              sx={{
                bgcolor: theme.palette.background.default,
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                pr={2}
              >
                <SearchIcon />
              </Box>
              <InputBase fullWidth placeholder="Search Your Channels" />
            </Box>
          </Stack>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </Dialog>
  ) : null;
};

export default FindChannels;
