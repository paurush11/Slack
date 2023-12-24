import { Box, useTheme } from "@mui/material";
import React from "react";

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

        backgroundColor: theme.palette.secondary[200],
      }}
    >
      {contentMainComponent}
    </Box>
  );
};
export default MainComponent;
