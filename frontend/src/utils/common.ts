import { NotFoundErrorType, ResolverError } from "@/generated/output/graphql";

export const emptyResolverError: [ResolverError] = [
  {
    code: "code",
    name: "name",
    message: "message",
    detail: "detail",
  },
];

export const emptyNotFoundError: [NotFoundErrorType] = [
  {
    message: "message",
    item: "item",
  },
];
