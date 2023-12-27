import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddBoxIcon from "@material-ui/icons/AddBox";
interface TopicHeadingsProps {
  headingName: string;
  onClickAdd: () => void;
  onClickDropdown: () => void;
}

const TopicHeadings: React.FC<TopicHeadingsProps> = ({
  headingName,
  onClickAdd,
  onClickDropdown,
}) => {
  if (headingName === "You") {
    /// have all posts
    /// saved
    /// upvoted
    /// downvoted
  } else if (headingName === "My Messages") {
  }
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      overflow={"clip"}
      p={1}
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      }}
    >
      <IconButton onClick={onClickDropdown}>
        <ArrowDropDownIcon
          style={{
            color: theme.palette.primary.contrastText,
          }}
        />
      </IconButton>
      <Typography key="channels" variant="subtitle1">
        {headingName}
      </Typography>
      <Box flexGrow={1} />
      <IconButton onClick={onClickAdd}>
        <AddBoxIcon
          style={{
            color: theme.palette.primary.contrastText,
          }}
        />
      </IconButton>
    </Box>
  );
};
export default TopicHeadings;
