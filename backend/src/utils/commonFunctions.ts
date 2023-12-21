import { UserCreationInput } from "src/resolvers/exports";
import { notFoundError, resolverError } from "../types/customDataTypes";

const catchError = (error: Error) => {
  console.error(error);
  console.log(error.message);
};

const throwResolverError = (error: any): resolverError => {
  return {
    message: error.message,
    name: error.name,
    code: error.code,
    detail: error.detail,
  };
};
const throwNotFoundError = (item: string): notFoundError => {
  return {
    message: "Not found",
    item: item,
  };
};
const validateUserCreationInput = (
  data: UserCreationInput,
): resolverError | null => {
  if (!data.email.includes("@")) {
    return {
      message: "Invalid Email, please have an @ in a mail",
      name: "Email not valid",
      code: "422",
      detail:
        "The mail you have entered is not valid. Kindly refer message field",
    };
  } else if (data.firstName.length <= 3) {
    return {
      message: "Invalid firstName, please length >=3",
      name: "firstName not valid",
      code: "422",
      detail:
        "The firstName you have entered is not valid. Kindly refer message field",
    };
  } else if (data.lastName.length <= 3) {
    return {
      message: "Invalid LastName, please length >=3",
      name: "LastName not valid",
      code: "422",
      detail:
        "The LastName you have entered is not valid. Kindly refer message field",
    };
  } else if (data.username.length <= 3) {
    return {
      message: "Invalid username, please length >=3",
      name: "username not valid",
      code: "422",
      detail:
        "The username you have entered is not valid. Kindly refer message field",
    };
  }
  return null;
};
const validatePassword = (password: string): resolverError | null => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      message: "Invalid password, please must follow constraint",
      name: "Password not valid",
      code: "422",
      detail:
        "The password you have entered is not valid. Kindly refer message field",
    };
  }

  return null;
};

export {
  catchError,
  throwResolverError,
  throwNotFoundError,
  validateUserCreationInput,
  validatePassword,
};
