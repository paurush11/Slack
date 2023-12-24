import { Box, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { IconComponent } from "./IconComponent";
import { IconSearchProps } from "@/interfaces/allProps";

export const IconSearch: React.FC<IconSearchProps> = ({ value, onChange, name }) => {
  const theme = useTheme()
  const [selected, setSelected] = useState(name);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flexGrow={1}
      p={2}
      height={"40vh"}
      overflow={"scroll"}
      sx={{
        backgroundColor: theme.palette.background.default
      }} >
      <Typography key={"chooseIcon"} variant="h2">
        Choose an Icon for your channel
      </Typography>
      <Divider />
      <Grid container spacing={3} p={5}>
        <IconComponent firstIcon="SocialMedia" secondIcon="Shopping" thirdIcon="Food" fourthIcon="Travel" onChange={onChange} value={value} name={name} setSelected={setSelected} selected={selected} />
        <IconComponent firstIcon="Healthcare" secondIcon="Education" thirdIcon="Finance" fourthIcon="Technology" onChange={onChange} value={value} name={name} setSelected={setSelected}  selected={selected} />
        <IconComponent firstIcon="Sports" secondIcon="Music" thirdIcon="Movies" fourthIcon="Books" onChange={onChange} value={value} name={name} setSelected={setSelected} selected={selected}  />
      </Grid>
    </Box>
  );
};
