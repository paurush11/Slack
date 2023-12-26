import { ChannelViewProps } from "@/interfaces/allProps";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const ChannelView: React.FC<ChannelViewProps> = ({}) => {
  return (
    <Box display={"flex"} flexGrow={1} height={"100%"}>
      <Box width={"100%"} p={4}>
        <Typography key={data?.getChannel.Name} variant="h1">
          {data?.getChannel.Name}
        </Typography>
        <Divider />
      </Box>

      <Stack direction={"column"} p={2}></Stack>
    </Box>
  );
};

export default ChannelView;
