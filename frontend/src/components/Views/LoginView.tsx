import { LoginViewProps } from "@/interfaces/allProps";
import { Box, FormControl, Stack, useTheme } from "@mui/material";
import React from "react";

const LoginView: React.FC<LoginViewProps> = ({
  emailField,
  passwordField,
  submitField,
  resetField,
  responseErrors,
  onSubmit,
}) => {
  const theme = useTheme();
  return (
    <Box
      component={"form"}
      bgcolor={`${theme.palette.background.paper}`}
      display={"flex"}
      flexDirection={"column"}
      onSubmit={onSubmit}
    >
      <FormControl fullWidth margin="normal">
        <Stack spacing={2} width="80%" alignSelf="center">
          {emailField}
          {passwordField}
        </Stack>
      </FormControl>
      <Stack direction={"row"} spacing={2} alignSelf={"center"} gap={2} p={2}>
        {submitField}
        {resetField}
      </Stack>
      {responseErrors}
    </Box>
  );
};
export default LoginView;
