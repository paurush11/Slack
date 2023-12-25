import { AddChannelViewProps } from "@/interfaces/allProps";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const AddChannelView: React.FC<AddChannelViewProps> = ({
  onSubmit,
  nameField,
  descriptionField,
  iconNameField,
  submitField,
  resetField,
  responseErrors,
  open,
  handleClose,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={"100%"}
      width={"100%"}
      p={2}
      component={"form"}
      bgcolor={`${theme.palette.background.paper}`}
      display={"flex"}
      flexDirection={"column"}
      onSubmit={onSubmit}
    >
      <Typography key={"AddChannels"} variant="h1">
        Add Channel
      </Typography>
      <Divider />
      <FormControl fullWidth margin="normal">
        <Stack direction={"column"} p={2} gap={2}>
          {nameField}
          {descriptionField}
          {iconNameField}
        </Stack>
        <Stack
          direction={"row"}
          gap={2}
          p={2}
          width={"100%"}
          justifyContent={"center"}
          spacing={8}
        >
          {submitField}
          {resetField}
        </Stack>
      </FormControl>
      <Box>{responseErrors}</Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Channel has been created
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddChannelView;
