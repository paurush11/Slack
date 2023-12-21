import { SubmitAndResetControllerProps } from "@/interfaces/allProps";
import { Button, useTheme } from "@mui/material";
import React from "react";
import { SubmitAndResetView } from "../Views/SubmitAndResetView";

const SubmitAndResetController: React.FC<SubmitAndResetControllerProps> = ({
  handleSubmit,
  onSubmit,
  reset,
}) => {
  const theme = useTheme();
  const submitField = (
    <Button
      onClick={handleSubmit(onSubmit)}
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
  );

  const resetField = (
    <Button
      onClick={reset}
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
  );
  return (
    <SubmitAndResetView submitField={submitField} resetField={resetField} />
  );
};

export default SubmitAndResetController;
