"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwResolverError = exports.catchError = void 0;
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
        detail: error.detail
    };
};
exports.throwResolverError = throwResolverError;
//# sourceMappingURL=commonFunctions.js.map