import { Box, useTheme } from "@mui/material";
import React from "react";
import { AddChannelController } from "../Controller/AddChannelController";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MainComponentProps {
  
}

const MainComponent: React.FC<MainComponentProps> = ({
 
}) => {
  const theme = useTheme();
  const contentMainComponent = useSelector((state:RootState)=>state.sideLayoutData.sideLayoutData)

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
