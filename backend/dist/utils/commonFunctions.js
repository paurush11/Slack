"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateUserCreationInput = exports.throwNotFoundError = exports.throwResolverError = exports.catchError = void 0;
const catchError = (error) => {
    console.error(error);
    console.log(error.message);
};
exports.catchError = catchError;
const throwResolverError = (error) => {
    return {
        message: error.message,
        name: error.name,
        code: error.code,
        detail: error.detail,
    };
};
exports.throwResolverError = throwResolverError;
const throwNotFoundError = (item) => {
    return {
        message: "Not found",
        item: item,
    };
};
exports.throwNotFoundError = throwNotFoundError;
const validateUserCreationInput = (data) => {
    if (!data.email.includes("@")) {
        return {
            message: "Invalid Email, please have an @ in a mail",
            name: "Email not valid",
            code: "422",
            detail: "The mail you have entered is not valid. Kindly refer message field",
        };
    }
    else if (data.firstName.length <= 3) {
        return {
            message: "Invalid firstName, please length >=3",
            name: "firstName not valid",
            code: "422",
            detail: "The firstName you have entered is not valid. Kindly refer message field",
        };
    }
    else if (data.lastName.length <= 3) {
        return {
            message: "Invalid LastName, please length >=3",
            name: "LastName not valid",
            code: "422",
            detail: "The LastName you have entered is not valid. Kindly refer message field",
        };
    }
    else if (data.username.length <= 3) {
        return {
            message: "Invalid username, please length >=3",
            name: "username not valid",
            code: "422",
            detail: "The username you have entered is not valid. Kindly refer message field",
        };
    }
    else if (data.phoneNumber.length !== 10) {
        return {
            message: "Invalid phoneNumber, please length should 10",
            name: "phoneNumber not valid",
            code: "422",
            detail: "The phoneNumber you have entered is not valid. Kindly refer message field",
        };
    }
    return null;
};
exports.validateUserCreationInput = validateUserCreationInput;
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            message: "Invalid password, please must follow constraint",
            name: "Password not valid",
            code: "422",
            detail: "The password you have entered is not valid. Kindly refer message field",
        };
    }
    return null;
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=commonFunctions.js.map