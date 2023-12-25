import { LayoutProps } from "@/interfaces/allProps";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../common/Navbar";
import Wrapper from "./wrapper";

const Layout: React.FC<LayoutProps> = ({
  variant,
  children,
  toggleTheme,
  data,
  useSmallLayout,
  setUseSmallLayout

}) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Measure the height of the Navbar and update state
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, []);
  return (
    <Box display="flex" flexDirection="column" minHeight={"100vh"}>
      <Navbar data={data} toggleTheme={toggleTheme} useSmallLayout={useSmallLayout} setUseSmallLayout={setUseSmallLayout}></Navbar>
      <Wrapper variant={variant} paddingSize={navbarHeight}>
        {children}{" "}
      </Wrapper>
    </Box>
  );
};
export default Layout;
