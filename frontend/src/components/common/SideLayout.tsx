import { SideLayoutProps } from "@/interfaces/allProps";

import { Box, useTheme } from "@mui/material";
import React from "react";

const SideLayout: React.FC<SideLayoutProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexGrow={1}
      sx={{
        height: "100%",
      }}
    >
      hi
    </Box>
  );
};
export default SideLayout;
