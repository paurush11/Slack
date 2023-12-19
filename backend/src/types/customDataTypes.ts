export type resolverError = {
  message: string;
  code: string;
  detail: string;
  name: string;
};

export type notFoundError = {
  message: string;
  item: string;
};
