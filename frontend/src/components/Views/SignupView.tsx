import { SignupViewProps } from "@/interfaces/allProps";
import { Box, FormControl, Stack, useTheme } from "@mui/material";
import React from "react";
export const SignupView: React.FC<SignupViewProps> = ({
  firstNameField,
  lastNameField,
  usernameField,
  phoneNumberField,
  emailField,
  passwordField,
  confirmPasswordField,
  submitField,
  resetField,
  onSubmit,
  responseErrors,
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
          {firstNameField}
          {lastNameField}
          {usernameField}
          {phoneNumberField}
          {emailField}
          {passwordField}
          {confirmPasswordField}
        </Stack>
        <Stack direction={"row"} spacing={2} alignSelf={"center"} gap={2} p={2}>
          {submitField}
          {resetField}
        </Stack>
        {responseErrors}
      </FormControl>
    </Box>
  );
};
