import { resolverError } from "../types/customDataTypes";

const catchError = (error: Error) => {
  console.error(error);
  console.log(error.message);
};

const throwResolverError = (error: any) :resolverError => {
  return {
    message: error.message,
    name: error.name,
    code: error.code,
    detail: error.detail
  }
}
export { catchError, throwResolverError };
