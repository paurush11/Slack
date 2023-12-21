import { Button, Stack, useTheme } from "@mui/material";
import React from "react";

interface submitAndResetProps {}

const SubmitAndReset: React.FC<submitAndResetProps> = ({}) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} spacing={2} alignSelf={"center"} gap={2} p={2}>
      <Button
        sx={{
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary["300"],
          "&:hover": {
            backgroundColor: theme.palette.primary["400"],
          },
        }}
      >
        {" "}
        Submit
      </Button>
      <Button
        sx={{
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary["300"],
          "&:hover": {
            backgroundColor: theme.palette.primary["400"],
          },
        }}
      >
        {" "}
        Reset
      </Button>
    </Stack>
  );
};
export default SubmitAndReset;
