import { LoginDocument, ResolverError } from "@/generated/output/graphql";
import { LoginControllerProps } from "@/interfaces/allProps";
import { emptyResolverError } from "@/utils/common";
import { isValidEmail, isValidPhoneNumber } from "@/utils/helper";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import LoginView from "../Views/LoginView";

const validationSchema = yup
  .object({
    emailOrUsernameOrPhone: yup
      .string()
      .required("Field can't be empty")
      .test(
        "is-valid-email-or-phone",
        "Enter a valid email, username, or phone number",
        (value) => {
          // Check if it's a valid email or phone number, if not, assume it's a username
          return isValidEmail(value) || isValidPhoneNumber(value) || true; // `true` assumes that any non-email/phone input is a valid username
        },
      ),
    password: yup.string().required("Password is required"),
  })
  .required();
export const LoginController: React.FC<LoginControllerProps> = ({}) => {
  const defaultValues = {
    emailOrUsernameOrPhone: "",
    password: "",
  };

  const theme = useTheme();
  const [Login, { data: logindata, loading, error }] =
    useMutation(LoginDocument);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const [responseError, setResponseError] =
    useState<[ResolverError]>(emptyResolverError);

  useEffect(() => {
    if (responseError.length > 0) {
      console.log("Errors Updated", responseError);
    }
  }, [responseError]);
  const onSubmit: SubmitHandler<{
    emailOrUsernameOrPhone: string;
    password: string;
  }> = async (data) => {
    const response = await Login({
      variables: {
        password: data.password,
        usernameOrEmail: data.emailOrUsernameOrPhone,
      },
    });
    if (response.data?.Login.user) {
      console.log(response.data.Login.user._id);
      router.push("/Home");
      return;
    } else if (response.data?.Login.errors) {
      const val = response.data?.Login.errors;
      var valueErrors: [ResolverError] = emptyResolverError;
      val.map((e) => valueErrors.push(e));
      setResponseError(valueErrors);
    }
  };

  const emailField = (
    <Controller
      name="emailOrUsernameOrPhone"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="Email"
            label="Email, Username or Phone Number"
            placeholder="Enter Your Email"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.emailOrUsernameOrPhone && (
            <Box pl={4}>
              <Typography
                key={errors.emailOrUsernameOrPhone.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.emailOrUsernameOrPhone.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const passwordField = (
    <Controller
      name="password"
      control={control}
      rules={{ required: "password is required" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            required
            id="Password"
            label="Password"
            type="password"
            autoComplete="Create Password"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.password && (
            <Box pl={4}>
              <Typography
                key={errors.password.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.password.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const submitButton = (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary["300"],
        "&:hover": {
          backgroundColor: theme.palette.primary["400"],
        },
      }}
    >
      Submit
    </Button>
  );
  const resetButton = (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => {
        setResponseError(emptyResolverError);
        reset(defaultValues);
      }}
      sx={{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary["300"],
        "&:hover": {
          backgroundColor: theme.palette.primary["400"],
        },
      }}
    >
      Reset
    </Button>
  );
  const responseErrors = (
    <Box p={4}>
      {error && (
        <Typography
          key={error.name}
          sx={{
            color: theme.palette.error.dark,
          }}
        >
          *{error.message}
        </Typography>
      )}
      {responseError &&
        responseError.map((e) => (
          <>
            <Typography
              key={e.code}
              sx={{
                color: theme.palette.error.dark,
              }}
            >
              {e.code !== emptyResolverError[0].code && "[code]:" && e.code}
            </Typography>
            <Typography
              key={e.message}
              sx={{
                color: theme.palette.error.dark,
              }}
            >
              {e.message !== emptyResolverError[0].message &&
                "[message]:" &&
                e.message}
            </Typography>
            <Typography
              key={e.detail}
              sx={{
                color: theme.palette.error.dark,
              }}
            >
              {e.detail !== emptyResolverError[0].detail &&
                "[detail]:" &&
                e.detail}
            </Typography>
            <Typography
              key={e.name}
              sx={{
                color: theme.palette.error.dark,
              }}
            >
              {e.name !== emptyResolverError[0].name && "[name]:" && e.name}
            </Typography>
          </>
        ))}
    </Box>
  );
  return (
    <LoginView
      emailField={emailField}
      passwordField={passwordField}
      submitField={submitButton}
      resetField={resetButton}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      responseErrors={responseErrors}
    />
  );
};
