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

interface SignUpFormProps {}

export const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
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
            required
            id="FName"
            label="First Name"
            placeholder="Enter Your First Name"
          />
          <TextField
            required
            id="LName"
            label="Last Name"
            placeholder="Enter Your Last Name"
          />
          <TextField
            required
            id="Username"
            label="Username"
            placeholder="Enter Your Preferred Username"
          />
          <TextField
            required
            id="Email"
            label="Email"
            placeholder="Enter Your Email"
          />
          <TextField
            required
            id="Password"
            label="Password"
            type="password"
            autoComplete="Create Password"
          />
          <TextField
            required
            id="Confirm_Password"
            label="Confirm Password"
            type="password"
            autoComplete="Confirm Password"
          />
          <TextField
            required
            id="Phone_Number"
            label="Phone Number"
            placeholder="Enter Your Cell Number"
          />
        </Stack>
      </FormControl>
      <Stack direction={"column"} alignSelf={"center"}>
        <Button
          sx={{
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.secondary.dark,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          {" "}
          Submit
        </Button>
        <Button> Reset</Button>
      </Stack>
    </Box>
  );
};
