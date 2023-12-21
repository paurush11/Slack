import { SubmitAndResetViewProps } from "@/interfaces/allProps";
import { Stack, useTheme } from "@mui/material";
import React from "react";

export const SubmitAndResetView: React.FC<SubmitAndResetViewProps> = ({
  submitField,
  resetField,
}) => {
  return (
    <Stack direction={"row"} spacing={2} alignSelf={"center"} gap={2} p={2}>
      {submitField}
      {resetField}
    </Stack>
  );
};
