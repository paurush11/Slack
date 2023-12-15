const catchError = (error: Error) => {
  console.error(error);
  console.log(error.message);
};
export { catchError };
