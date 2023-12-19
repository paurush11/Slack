"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwNotFoundError = exports.throwResolverError = exports.catchError = void 0;
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
//# sourceMappingURL=commonFunctions.js.map