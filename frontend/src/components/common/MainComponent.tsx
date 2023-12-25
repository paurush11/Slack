import { Box, useTheme } from "@mui/material";
import React from "react";
import { AddChannelController } from "../Controller/AddChannelController";

interface MainComponentProps {
  contentMainComponent: React.JSX.Element;
}

const MainComponent: React.FC<MainComponentProps> = ({
  contentMainComponent,
}) => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexGrow={1}
      sx={{
        height: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {contentMainComponent}
    </Box>
  );
};
export default MainComponent;
