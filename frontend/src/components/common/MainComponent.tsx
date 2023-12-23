import { Box, useTheme } from "@mui/material";
import React from "react";

interface MainComponentProps {}

const MainComponent: React.FC<MainComponentProps> = ({}) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexGrow={1}
      sx={{
        height: "100%",
      }}
    ></Box>
  );
};
export default MainComponent;
