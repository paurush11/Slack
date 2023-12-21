import { SignUpControllerProps } from "@/interfaces/allProps";
import { Box, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SignupView } from "../Views/SignupView";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidEmail, isValidName, isValidPhoneNumber } from "@/utils/helper";

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
    confirmPassword: yup.string().required("Password is required"),
  })
  .required();
export const SignUpController: React.FC<SignUpControllerProps> = ({}) => {
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
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const onSubmit = () => {
    // Handle form submission
  };
  const firstNameField = (
    <Controller
      name="firstName"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
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
      )}
    ></Controller>
  );
  const lastNameField = (
    <Controller
      name="lastName"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
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
      )}
    ></Controller>
  );
  const emailField = (
    <Controller
      name="email"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
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
      )}
    ></Controller>
  );
  const usernameField = (
    <Controller
      name="username"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
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
      )}
    ></Controller>
  );
  const phoneNumberField = (
    <Controller
      name="phoneNumber"
      control={control}
      rules={{ required: "Field can't be empty" }}
      render={({ field }) => (
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
      )}
    ></Controller>
  );

  const passwordField = (
    <Controller
      name="password"
      control={control}
      rules={{ required: "password is required" }}
      render={(field) => (
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
      )}
    ></Controller>
  );
  const confirmPasswordField = (
    <Controller
      name="confirmPassword"
      control={control}
      rules={{ required: "password is required" }}
      render={(field) => (
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
      )}
    ></Controller>
  );

  return (
    <SignupView
      emailField={emailField}
      passwordField={passwordField}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      reset={reset}
      firstNameField={firstNameField}
      lastNameField={lastNameField}
      usernameField={usernameField}
      phoneNumberField={phoneNumberField}
      confirmPasswordField={confirmPasswordField}
    />
  );
};
