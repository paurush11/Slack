import { IconComponentProps } from "@/interfaces/allProps";
import { IconMap } from "@/utils/helper";

import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export const IconComponent: React.FC<IconComponentProps> = ({
  firstIcon,
  secondIcon,
  thirdIcon,
  fourthIcon,
  onChange,
  value,
  name,
  setSelected,
  selected,
}) => {
  const theme = useTheme();

  return (
    <>
      <Grid item xs={3} key={firstIcon}>
        <Box display={"flex"} justifyContent={"center"}>
          <Stack direction={"column"}>
            <IconButton
              aria-label="hi"
              onClick={() => {
                name = firstIcon;
                value = firstIcon;
                onChange(value);
                setSelected(name);
              }}
            >
              {IconMap[firstIcon as keyof typeof IconMap] &&
                React.createElement(
                  IconMap[firstIcon as keyof typeof IconMap],
                  {
                    sx: {
                      color:
                        selected === firstIcon
                          ? theme.palette.primary["600"]
                          : theme.palette.primary["400"],
                      "&:hover": {
                        color: theme.palette.primary["600"],
                      },
                    },
                  },
                )}
            </IconButton>
            <Typography key={firstIcon}>{firstIcon}</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3} key={secondIcon}>
        <Box display={"flex"} justifyContent={"center"}>
          <Stack direction={"column"}>
            <IconButton
              aria-label="hi"
              onClick={() => {
                name = secondIcon;
                value = secondIcon;
                onChange(value);
                setSelected(name);
              }}
            >
              {IconMap[secondIcon as keyof typeof IconMap] &&
                React.createElement(
                  IconMap[secondIcon as keyof typeof IconMap],
                  {
                    sx: {
                      color:
                        selected === secondIcon
                          ? theme.palette.primary["600"]
                          : theme.palette.primary["400"],
                      "&:hover": {
                        color: theme.palette.primary["600"],
                      },
                    },
                  },
                )}
            </IconButton>
            <Typography key={secondIcon}>{secondIcon}</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3} key={thirdIcon}>
        <Box display={"flex"} justifyContent={"center"}>
          <Stack direction={"column"}>
            <IconButton
              aria-label="hi"
              onClick={() => {
                name = thirdIcon;
                value = thirdIcon;
                onChange(value);
                setSelected(name);
              }}
            >
              {IconMap[thirdIcon as keyof typeof IconMap] &&
                React.createElement(
                  IconMap[thirdIcon as keyof typeof IconMap],
                  {
                    sx: {
                      color:
                        selected === thirdIcon
                          ? theme.palette.primary["600"]
                          : theme.palette.primary["400"],
                      "&:hover": {
                        color: theme.palette.primary["600"],
                      },
                    },
                  },
                )}
            </IconButton>
            <Typography key={thirdIcon}>{thirdIcon}</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3} key={fourthIcon}>
        <Box display={"flex"} justifyContent={"center"}>
          <Stack direction={"column"}>
            <IconButton
              aria-label="hi"
              size="large"
              onClick={() => {
                name = fourthIcon;
                value = fourthIcon;
                onChange(value);
                setSelected(name);
              }}
            >
              {IconMap[fourthIcon as keyof typeof IconMap] &&
                React.createElement(
                  IconMap[fourthIcon as keyof typeof IconMap],
                  {
                    sx: {
                      color:
                        selected === fourthIcon
                          ? theme.palette.primary["600"]
                          : theme.palette.primary["400"],
                      "&:hover": {
                        color: theme.palette.primary["600"],
                      },
                    },
                  },
                )}
            </IconButton>
            <Typography key={fourthIcon}>{fourthIcon}</Typography>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
