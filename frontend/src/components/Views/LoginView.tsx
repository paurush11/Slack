import { LoginViewProps } from "@/interfaces/allProps";
import { Box, FormControl, Stack, useTheme } from "@mui/material";
import React from "react";
import SubmitAndResetController from "../Controller/SubmitAndResetController";

const LoginView: React.FC<LoginViewProps> = ({
  emailField,
  passwordField,
  onSubmit,
  handleSubmit,
  reset,
}) => {
  const theme = useTheme();

  return (
    <Box
      component={"form"}
      bgcolor={`${theme.palette.background.paper}`}
      display={"flex"}
      flexDirection={"column"}
    >
      <FormControl fullWidth margin="normal">
        <Stack spacing={2} width="80%" alignSelf="center">
          {emailField}
          {passwordField}
        </Stack>
      </FormControl>
      <SubmitAndResetController
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        reset={reset}
      />
    </Box>
  );
};
export default LoginView;
