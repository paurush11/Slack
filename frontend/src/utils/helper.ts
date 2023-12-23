const isValidEmail = (value: string) => {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
const isValidPhoneNumber = (value: string) => {
  return /^\d{10}$/.test(value); // Validates a 10 digit phone number
};
const isValidName = (value: string) => {
  return value.length >= 3;
};
import AppleIcon from "@mui/icons-material/Apple";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ResolverError } from "../generated/output/graphql";

const IconMap = {
  Apple: AppleIcon,
  AcUnit: AcUnitIcon,
  Facebook: FacebookIcon,
};
export const toErrorMap = (errors: ResolverError[]) => {
  const errorMap: any = {};
  errors.forEach(({ message, code, detail, name }) => {
    errorMap[code] = { message, detail, name };
  });
  return errorMap;
};

export { isValidEmail, isValidPhoneNumber, isValidName, IconMap };
