import {
  ChannelsDocument,
  JoinChannelDocument,
  MeQuery,
} from "@/generated/output/graphql";
import { IconMap } from "@/utils/helper";
import { useMutation, useQuery } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import {
  Alert,
  Box,
  Dialog,
  Grid,
  IconButton,
  InputBase,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import router from "next/router";
import React, { useEffect } from "react";
interface FindChannelsProps {
  channelOpen: boolean;
  setValue: any;
  setHasBeenClosed: any;
  data?: MeQuery | undefined;
  setIsClickedInMainComp: any;
}

const FindChannels: React.FC<FindChannelsProps> = ({
  channelOpen,
  setValue,
  setHasBeenClosed,
  data: meData,
  setIsClickedInMainComp,
}) => {
  const theme = useTheme();
  const onClose = () => {
    setValue(false);
    setHasBeenClosed(true);
    setIsClickedInMainComp(false);
  };
  const { data, error, loading } = useQuery(ChannelsDocument);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };
  const handleCloseFail = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFail(false);
  };
  const [
    joinChannel,
    {
      data: joinChannelData,
      error: joinChannelError,
      loading: joinChannelLoading,
    },
  ] = useMutation(JoinChannelDocument);
  const onSubmit = async (id: string) => {
    const response = await joinChannel({
      variables: {
        channelId: id,
        userId: meData?.Me?._id as string,
      },
    });
    if (response.data?.joinChannel === true) {
      setOpenSuccess(true);
      setTimeout(() => onClose(), 500);
    } else {
      console.error(response.errors);
      setOpenFail(true);
    }
  };

  return channelOpen ? (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Channel Joined
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFail}
        autoHideDuration={6000}
        onClose={handleCloseFail}
      >
        <Alert
          onClose={handleCloseFail}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error in Joining Channel
        </Alert>
      </Snackbar>
      <Dialog open onClose={onClose} fullWidth>
        <Stack
          direction={"row"}
          gap={0}
          p={3}
          display={"flex"}
          alignItems={"start"}
        >
          <Box
            width="100%"
            display={"flex"}
            height={"60vh"}
            flexDirection={"column"}
          >
            <Stack
              direction={"column"}
              gap={2}
              p={4}
              display={"flex"}
              width={"100%"}
            >
              <Typography
                key={"find_your_channels"}
                width={"100%"}
                variant="h3"
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
            <Grid container spacing={3} p={4}>
              {data?.channels.map((e) => (
                <Grid item xs={3} key={e._id}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    overflow={"scroll"}
                  >
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <IconButton
                        aria-label="hi"
                        onClick={() => {
                          onSubmit(e._id);
                        }}
                      >
                        {IconMap[e.IconName as keyof typeof IconMap] &&
                          React.createElement(
                            IconMap[e.IconName as keyof typeof IconMap],
                            {
                              sx: {
                                color: theme.palette.primary["400"],
                                "&:hover": {
                                  color: theme.palette.primary["600"],
                                },
                              },
                            },
                          )}
                      </IconButton>
                      <Typography key={e.Name} align="center">
                        {e.Name}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Dialog>
    </>
  ) : null;
};

export default FindChannels;
