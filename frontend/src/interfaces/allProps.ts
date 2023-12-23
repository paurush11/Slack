import { UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import { Request, Response } from "express";
import Redis from "ioredis";
import { MeQuery } from "@/generated/output/graphql";
import { FormEventHandler } from "react";

export interface LayoutProps extends WrapperProps {
  toggleTheme: () => any;
  data?: MeQuery | undefined;
}
export interface NavbarProps {
  toggleTheme: () => void;
  data?: MeQuery | undefined;
}
export interface SideLayoutProps {
  data?: MeQuery | undefined;
}
export interface WrapperProps {
  variant?: variantWrapper;
  children: any;
  paddingSize?: number;
}
export interface LoginViewProps extends SubmitAndResetViewProps {
  emailField: React.JSX.Element;
  passwordField: React.JSX.Element;
}
export interface SignupViewProps extends SubmitAndResetViewProps {
  firstNameField: React.JSX.Element;
  lastNameField: React.JSX.Element;
  usernameField: React.JSX.Element;
  phoneNumberField: React.JSX.Element;
  emailField: React.JSX.Element;
  passwordField: React.JSX.Element;
  confirmPasswordField: React.JSX.Element;
}
export interface SubmitAndResetViewProps {
  resetField: React.JSX.Element;
  submitField: React.JSX.Element;
  responseErrors: React.JSX.Element;
  onSubmit: () => void;
}
export interface LoginControllerProps {}

export interface SignUpControllerProps {}
export interface SubmitAndResetControllerProps {
  reset: UseFormReset<any>;
  onSubmit: () => void;
}
export interface LoginAndRegisterProps {
  toggleTheme: () => void;
}
export type variantWrapper = "small" | "regular" | "Large";

export type myContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
