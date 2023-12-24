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
  const [data, setData] = useState();
  if (headingName === "My Channels") {
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
      p={1}
      sx={{
        bgcolor: theme.palette.primary.light,
      }}
    >
      <IconButton>
        <ArrowDropDownIcon />
      </IconButton>
      <Typography key="channels" variant="h5">
        {headingName}
      </Typography>
      <Box flexGrow={1} />
      <IconButton>
        <AddBoxIcon />
      </IconButton>
    </Box>
  );
};
export default TopicHeadings;
