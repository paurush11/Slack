import { GetChannelQuery, MeQuery } from "@/generated/output/graphql";
import { Request, Response } from "express";
import Redis from "ioredis";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

export interface LayoutProps extends WrapperProps {
}
export interface ChannelViewControllerProps {
  channelId: string;
}
export interface ChannelViewProps {
  data: GetChannelQuery | undefined;
}
export interface NavbarProps {

}
export interface SideLayoutProps {

  handleSideLayout: (content: React.JSX.Element) => void;
  setIsClickedInMainComp: Dispatch<SetStateAction<boolean>>;
  isClickedInMainComp: boolean;
  selectedChannelValue: string;
  setSelectedChannelValue: Dispatch<SetStateAction<string>>;
}
export interface SmallSideLayoutProps {

}

export interface WrapperProps {
  variant?: variantWrapper;
  children: any;
  paddingSize?: number;
}
export interface AddChannelViewProps extends SubmitAndResetViewProps {
  nameField: React.JSX.Element;
  descriptionField: React.JSX.Element;
  iconNameField: React.JSX.Element;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  open: boolean;
}
export interface LoginViewProps extends SubmitAndResetViewProps {
  emailField: React.JSX.Element;
  passwordField: React.JSX.Element;
}
export interface IconSearchProps {
  value: string;
  onChange: (value: any) => void;
  name: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}
export interface IconComponentProps extends IconSearchProps {
  firstIcon: string;
  secondIcon: string;
  thirdIcon: string;
  fourthIcon: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
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
export interface LoginControllerProps { }
export interface SignUpControllerProps { }

export interface SubmitAndResetControllerProps {
  reset: UseFormReset<any>;
  onSubmit: () => void;
}
export interface LoginAndRegisterProps {
}
export type variantWrapper = "small" | "regular" | "Large";

export type myContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
