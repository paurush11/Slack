import { LayoutProps, WrapperProps } from "@/interfaces/allProps";
import { Box } from "@mui/material";
import React from "react";

const wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box width={"100%"} display={"flex"} flexGrow={1}>
      {children}
    </Box>
  );
};

export default wrapper;
