import { LayoutProps } from "@/interfaces/allProps";
import { Box } from "@mui/material";
import React from "react";
import { Navbar } from "../common/Navbar";
import Wrapper from "./wrapper";

const Layout: React.FC<LayoutProps> = ({
  variant,
  children,
  toggleTheme,
  data,
}) => {
  return (
    <Box display="flex" flexDirection="column" minHeight={"100vh"}>
      <Navbar  data={data} toggleTheme={toggleTheme}></Navbar>
      <Wrapper variant={variant}>{children}</Wrapper>
    </Box>
  );
};
export default Layout;
