import { TextField } from "@mui/material";
import React, { useState } from "react";
import LoginView from "../Views/LoginView";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { LoginControllerProps } from "@/interfaces/allProps";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidEmail, isValidPhoneNumber } from "@/utils/helper";

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
  const [someState, setSomeState] = useState();
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

  const emailField = (
    <Controller
      name="emailOrUsernameOrPhone"
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
  return (
    <LoginView
      emailField={emailField}
      passwordField={passwordField}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      reset={reset}
    />
  );
};
