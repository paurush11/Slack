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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FlightIcon from "@mui/icons-material/Flight";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ComputerIcon from "@mui/icons-material/Computer";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PublicIcon from "@mui/icons-material/Public";

import { ResolverError } from "../generated/output/graphql";

const IconMap = {
  Apple: AppleIcon,
  AcUnit: AcUnitIcon,
  Facebook: FacebookIcon,
  Shopping: ShoppingCartIcon,
  Food: FastfoodIcon,
  Travel: FlightIcon,
  Healthcare: LocalHospitalIcon,
  Education: SchoolIcon,
  Finance: AccountBalanceWalletIcon,
  Technology: ComputerIcon,
  Sports: SportsSoccerIcon,
  Music: MusicNoteIcon,
  Movies: MovieIcon,
  Books: LibraryBooksIcon,
  SocialMedia: PublicIcon,
};
export const toErrorMap = (errors: ResolverError[]) => {
  const errorMap: any = {};
  errors.forEach(({ message, code, detail, name }) => {
    errorMap[code] = { message, detail, name };
  });
  return errorMap;
};

export { isValidEmail, isValidPhoneNumber, isValidName, IconMap };
