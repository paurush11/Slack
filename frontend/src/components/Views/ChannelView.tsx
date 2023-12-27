import { ChannelsQuery, GetChannelQuery } from "@/generated/output/graphql";
import { ChannelViewProps } from "@/interfaces/allProps";
import { RootState } from "@/store/store";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ChannelView: React.FC<ChannelViewProps> = ({}) => {
  const channelData: GetChannelQuery | null = useSelector(
    (state: RootState) => state.myChannelData.data,
  );

  return (
    <Box display={"flex"} flexGrow={1} height={"100%"}>
      <Box width={"100%"} p={4}>
        {channelData && (
          <Typography
            key={(channelData as GetChannelQuery)?.getChannel.Name}
            variant="h1"
          >
            {(channelData as GetChannelQuery)?.getChannel.Name}
          </Typography>
        )}

        <Divider />
      </Box>

      <Stack direction={"column"} p={2}></Stack>
    </Box>
  );
};

export default ChannelView;
