import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import SubmitAndReset from "./SubmitAndReset";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const theme = useTheme();
  return (
    <Box
      component={"form"}
      bgcolor={`${theme.palette.background.paper}`}
      display={"flex"}
      flexDirection={"column"}
    >
      <FormControl fullWidth margin="normal">
        <Stack spacing={2} width={"80%"} alignSelf={"center"}>
          <TextField
            color="primary"
            required
            id="Email"
            label="Email, Username or Phone Number"
            placeholder="Enter Your Email"
          />
          <TextField
            required
            id="Password"
            label="Password"
            type="password"
            autoComplete="Create Password"
          />
        </Stack>
      </FormControl>
      <SubmitAndReset />
    </Box>
  );
};
