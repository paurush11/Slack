import { SignUpControllerProps } from "@/interfaces/allProps";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SignupView } from "../Views/SignupView";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidEmail, isValidName, isValidPhoneNumber } from "@/utils/helper";
import { useMutation } from "@apollo/client";
import { RegisterDocument, ResolverError } from "@/generated/output/graphql";
import router from "next/router";
import { emptyResolverError } from "@/utils/common";

const validationSchema = yup
  .object({
    email: yup
      .string()
      .required("Field can't be empty")
      .test("is-valid-email", "Enter a valid email", (value) => {
        return isValidEmail(value);
      }),
    firstName: yup
      .string()
      .required("Field can't be empty")
      .test("is-valid-name", "Enter a valid first name", (value) => {
        return isValidName(value);
      }),
    lastName: yup
      .string()
      .required("Field can't be empty")
      .test("is-valid-name", "Enter a valid Last name", (value) => {
        return isValidName(value);
      }),
    username: yup
      .string()
      .required("Field can't be empty")
      .test("is-valid-name", "Enter a valid Last name", (value) => {
        return isValidName(value);
      }),
    phoneNumber: yup
      .string()
      .required("Field can't be empty")
      .test("is-valid-number", "Enter a valid phone number", (value) => {
        return isValidPhoneNumber(value);
      }),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
export const SignUpController: React.FC<SignUpControllerProps> = ({ }) => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    confirmPassword: "",
  };
  const {
    control,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const theme = useTheme();
  const [Register, { data, loading, error }] = useMutation(RegisterDocument);
  const [responseError, setResponseError] =
    useState<[ResolverError]>(emptyResolverError);
  useEffect(() => {
    if (responseError.length > 0) {
      // Perform any action when responseError updates
      console.log("Errors Updated", responseError);
    }
  }, [responseError]);
  const formData = getValues();
  const onSubmit: SubmitHandler<{
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }> = async () => {
    const response = await Register({
      variables: {
        password: formData.password,
        UserCreationInput: {
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
        },
      },
    });
    if (response.data?.Register.user) {
      router.push("/Home");
    } else if (response.data?.Register.errors) {
      const val = response.data?.Register.errors;
      var valueErrors: [ResolverError] = emptyResolverError;
      val.map((e) => valueErrors.push(e));
      setResponseError(valueErrors);
    }
  };

  const firstNameField = (
    <Controller
      name="firstName"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="FName"
            label="First Name"
            placeholder="Enter Your First Name"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.firstName && (
            <Box pl={4}>
              <Typography
                key={errors.firstName.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.firstName.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const lastNameField = (
    <Controller
      name="lastName"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="LName"
            label="Last Name"
            placeholder="Enter Your Last Name"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.lastName && (
            <Box pl={4}>
              <Typography
                key={errors.lastName.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.lastName.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const emailField = (
    <Controller
      name="email"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="Email"
            label="Email"
            placeholder="Enter Your Email"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.email && (
            <Box pl={4}>
              <Typography
                key={errors.email.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.email.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const usernameField = (
    <Controller
      name="username"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="Username"
            label="Username"
            placeholder="Enter Your Preferred Username"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.username && (
            <Box pl={4}>
              <Typography
                key={errors.username.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.username.message}
              </Typography>
            </Box>
          )}
        </>
      )}
    ></Controller>
  );
  const phoneNumberField = (
    <Controller
      name="phoneNumber"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            color="primary"
            required
            id="Phone_Number"
            label="Phone Number"
            placeholder="Enter Your Cell Number"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.phoneNumber && (
            <Box pl={4}>
              <Typography
                key={errors.phoneNumber.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.phoneNumber.message}
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
  const confirmPasswordField = (
    <Controller
      name="confirmPassword"
      control={control}
      rules={{}}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            required
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="Confirm Password"
            error={!!errors.root}
            helperText={errors.root?.message || ""}
          />
          {errors && errors.confirmPassword && (
            <Box pl={4}>
              <Typography
                key={errors.confirmPassword.message}
                sx={{
                  color: theme.palette.error.dark,
                }}
              >
                *{errors.confirmPassword.message}
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
    <Box pt={4}>
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
    <SignupView
      emailField={emailField}
      passwordField={passwordField}
      firstNameField={firstNameField}
      lastNameField={lastNameField}
      usernameField={usernameField}
      phoneNumberField={phoneNumberField}
      confirmPasswordField={confirmPasswordField}
      submitField={submitButton}
      resetField={resetButton}
      onSubmit={handleSubmit(onSubmit)}
      responseErrors={responseErrors}
    />
  );
};
