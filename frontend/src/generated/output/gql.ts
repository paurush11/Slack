/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}":
    types.ResolverErrorFragmentDoc,
  "fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}":
    types.UserFieldsFragmentDoc,
  "mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}":
    types.LoginDocument,
  "mutation Logout {\n  Logout\n}": types.LogoutDocument,
  "mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}":
    types.RegisterDocument,
  "query Me {\n  Me {\n    username\n    lastName\n    email\n    _id\n    firstName\n    channels {\n      _id\n      Name\n      IconName\n      Description\n    }\n    messagesReceived {\n      _id\n      TextMessage\n      receiverSeen\n    }\n  }\n}":
    types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}",
): (typeof documents)["fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}",
): (typeof documents)["fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}",
): (typeof documents)["mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Logout {\n  Logout\n}",
): (typeof documents)["mutation Logout {\n  Logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}",
): (typeof documents)["mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Me {\n  Me {\n    username\n    lastName\n    email\n    _id\n    firstName\n    channels {\n      _id\n      Name\n      IconName\n      Description\n    }\n    messagesReceived {\n      _id\n      TextMessage\n      receiverSeen\n    }\n  }\n}",
): (typeof documents)["query Me {\n  Me {\n    username\n    lastName\n    email\n    _id\n    firstName\n    channels {\n      _id\n      Name\n      IconName\n      Description\n    }\n    messagesReceived {\n      _id\n      TextMessage\n      receiverSeen\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
