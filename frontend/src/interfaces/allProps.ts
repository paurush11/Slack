import { UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import { Request, Response } from "express";
import Redis from "ioredis";

export interface LayoutProps extends WrapperProps {
  toggleTheme: () => any;
}
export interface WrapperProps {
  variant?: variantWrapper;
  children: any;
}
export interface LoginViewProps extends SubmitAndResetControllerProps {
  emailField: React.JSX.Element;
  passwordField: React.JSX.Element;
}
export interface SignupViewProps extends SubmitAndResetControllerProps {
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
}
export interface LoginControllerProps {}

export interface SignUpControllerProps {}
export interface SubmitAndResetControllerProps {
  handleSubmit: UseFormHandleSubmit<any, undefined>;
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
