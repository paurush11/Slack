/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}": types.ResolverErrorFragmentDoc,
    "fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}": types.UserFieldsFragmentDoc,
    "mutation CreateChannel($description: String!, $iconName: String!, $name: String!) {\n  createChannel(description: $description, iconName: $iconName, name: $name) {\n    errors {\n      message\n      item\n    }\n    channel {\n      _id\n      createdAt\n      updatedAt\n      Name\n      Description\n      posts {\n        _id\n      }\n      members {\n        _id\n      }\n      IconName\n    }\n  }\n}": types.CreateChannelDocument,
    "mutation CreateMessage($message: String!, $receiverId: String!, $channelId: String!) {\n  createMessage(message: $message, receiverId: $receiverId, channelId: $channelId) {\n    success\n    data {\n      senderId\n      receiverID\n      TextMessage\n      _id\n      channelID\n      receiverSeen\n      sender {\n        firstName\n        lastName\n        username\n      }\n      receiver {\n        username\n        lastName\n        firstName\n      }\n    }\n    notFoundError {\n      message\n      item\n    }\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n  }\n}": types.CreateMessageDocument,
    "mutation joinChannel($userId: String!, $channelId: String!) {\n  joinChannel(userId: $userId, channelId: $channelId)\n}": types.JoinChannelDocument,
    "mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  Logout\n}": types.LogoutDocument,
    "mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}": types.RegisterDocument,
    "mutation SeeMessage($seeMessageId: String!) {\n  seeMessage(id: $seeMessageId) {\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    notFoundError {\n      message\n      item\n    }\n    data {\n      _id\n      sender {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      receiver {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      TextMessage\n      createdAt\n      senderId\n      receiverSeen\n      receiverID\n      channelID\n    }\n  }\n}": types.SeeMessageDocument,
    "query Channels {\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}": types.ChannelsDocument,
    "query GetAllMessagesInChannel($channelId: String!) {\n  getAllMessagesInChannel(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}": types.GetAllMessagesInChannelDocument,
    "query GetChannel($channelId: String!) {\n  getChannel(channelId: $channelId) {\n    _id\n    Name\n    IconName\n    Description\n    members {\n      _id\n      username\n      email\n      firstName\n      lastName\n    }\n    posts {\n      _id\n    }\n  }\n}": types.GetChannelDocument,
    "query GetMyMessagesInChannel($friendId: String!, $channelId: String!) {\n  getMyMessagesInChannel(friendId: $friendId, channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}": types.GetMyMessagesInChannelDocument,
    "query Me {\n  Me {\n    user {\n      username\n      lastName\n      email\n      _id\n      firstName\n      channels {\n        _id\n        Name\n        IconName\n        Description\n      }\n      messagesReceived {\n        _id\n        TextMessage\n        receiverSeen\n      }\n      posts {\n        _id\n      }\n      comments {\n        _id\n      }\n    }\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    error {\n      message\n      item\n    }\n  }\n}": types.MeDocument,
    "subscription MessageDeleted($channelId: String!) {\n  messageDeleted(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}": types.MessageDeletedDocument,
    "subscription MessageUpdatedSubscription($channelId: String!) {\n  messageUpdated(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}": types.MessageUpdatedSubscriptionDocument,
    "subscription NewMessageSubscription($channelId: String!) {\n  newMessage(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}": types.NewMessageSubscriptionDocument,
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
export function graphql(source: "fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}"): (typeof documents)["fragment ResolverError on resolverError {\n  message\n  code\n  detail\n  name\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}"): (typeof documents)["fragment UserFields on Member {\n  username\n  lastName\n  firstName\n  email\n  _id\n  isActive\n  createdAt\n  updatedAt\n  messagesReceived {\n    _id\n    TextMessage\n  }\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateChannel($description: String!, $iconName: String!, $name: String!) {\n  createChannel(description: $description, iconName: $iconName, name: $name) {\n    errors {\n      message\n      item\n    }\n    channel {\n      _id\n      createdAt\n      updatedAt\n      Name\n      Description\n      posts {\n        _id\n      }\n      members {\n        _id\n      }\n      IconName\n    }\n  }\n}"): (typeof documents)["mutation CreateChannel($description: String!, $iconName: String!, $name: String!) {\n  createChannel(description: $description, iconName: $iconName, name: $name) {\n    errors {\n      message\n      item\n    }\n    channel {\n      _id\n      createdAt\n      updatedAt\n      Name\n      Description\n      posts {\n        _id\n      }\n      members {\n        _id\n      }\n      IconName\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMessage($message: String!, $receiverId: String!, $channelId: String!) {\n  createMessage(message: $message, receiverId: $receiverId, channelId: $channelId) {\n    success\n    data {\n      senderId\n      receiverID\n      TextMessage\n      _id\n      channelID\n      receiverSeen\n      sender {\n        firstName\n        lastName\n        username\n      }\n      receiver {\n        username\n        lastName\n        firstName\n      }\n    }\n    notFoundError {\n      message\n      item\n    }\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"): (typeof documents)["mutation CreateMessage($message: String!, $receiverId: String!, $channelId: String!) {\n  createMessage(message: $message, receiverId: $receiverId, channelId: $channelId) {\n    success\n    data {\n      senderId\n      receiverID\n      TextMessage\n      _id\n      channelID\n      receiverSeen\n      sender {\n        firstName\n        lastName\n        username\n      }\n      receiver {\n        username\n        lastName\n        firstName\n      }\n    }\n    notFoundError {\n      message\n      item\n    }\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation joinChannel($userId: String!, $channelId: String!) {\n  joinChannel(userId: $userId, channelId: $channelId)\n}"): (typeof documents)["mutation joinChannel($userId: String!, $channelId: String!) {\n  joinChannel(userId: $userId, channelId: $channelId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"): (typeof documents)["mutation Login($password: String!, $usernameOrEmail: String!) {\n  Login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  Logout\n}"): (typeof documents)["mutation Logout {\n  Logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"): (typeof documents)["mutation Register($password: String!, $UserCreationInput: UserCreationInput!) {\n  Register(password: $password, UserCreationInput: $UserCreationInput) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      firstName\n      lastName\n      isActive\n      username\n      email\n    }\n    errors {\n      message\n      code\n      detail\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SeeMessage($seeMessageId: String!) {\n  seeMessage(id: $seeMessageId) {\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    notFoundError {\n      message\n      item\n    }\n    data {\n      _id\n      sender {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      receiver {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      TextMessage\n      createdAt\n      senderId\n      receiverSeen\n      receiverID\n      channelID\n    }\n  }\n}"): (typeof documents)["mutation SeeMessage($seeMessageId: String!) {\n  seeMessage(id: $seeMessageId) {\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    notFoundError {\n      message\n      item\n    }\n    data {\n      _id\n      sender {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      receiver {\n        _id\n        lastName\n        firstName\n        isActive\n        username\n      }\n      TextMessage\n      createdAt\n      senderId\n      receiverSeen\n      receiverID\n      channelID\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Channels {\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}"): (typeof documents)["query Channels {\n  channels {\n    _id\n    Name\n    IconName\n    Description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllMessagesInChannel($channelId: String!) {\n  getAllMessagesInChannel(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"): (typeof documents)["query GetAllMessagesInChannel($channelId: String!) {\n  getAllMessagesInChannel(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetChannel($channelId: String!) {\n  getChannel(channelId: $channelId) {\n    _id\n    Name\n    IconName\n    Description\n    members {\n      _id\n      username\n      email\n      firstName\n      lastName\n    }\n    posts {\n      _id\n    }\n  }\n}"): (typeof documents)["query GetChannel($channelId: String!) {\n  getChannel(channelId: $channelId) {\n    _id\n    Name\n    IconName\n    Description\n    members {\n      _id\n      username\n      email\n      firstName\n      lastName\n    }\n    posts {\n      _id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyMessagesInChannel($friendId: String!, $channelId: String!) {\n  getMyMessagesInChannel(friendId: $friendId, channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"): (typeof documents)["query GetMyMessagesInChannel($friendId: String!, $channelId: String!) {\n  getMyMessagesInChannel(friendId: $friendId, channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  Me {\n    user {\n      username\n      lastName\n      email\n      _id\n      firstName\n      channels {\n        _id\n        Name\n        IconName\n        Description\n      }\n      messagesReceived {\n        _id\n        TextMessage\n        receiverSeen\n      }\n      posts {\n        _id\n      }\n      comments {\n        _id\n      }\n    }\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    error {\n      message\n      item\n    }\n  }\n}"): (typeof documents)["query Me {\n  Me {\n    user {\n      username\n      lastName\n      email\n      _id\n      firstName\n      channels {\n        _id\n        Name\n        IconName\n        Description\n      }\n      messagesReceived {\n        _id\n        TextMessage\n        receiverSeen\n      }\n      posts {\n        _id\n      }\n      comments {\n        _id\n      }\n    }\n    success\n    resolverError {\n      message\n      code\n      detail\n      name\n    }\n    error {\n      message\n      item\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription MessageDeleted($channelId: String!) {\n  messageDeleted(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"): (typeof documents)["subscription MessageDeleted($channelId: String!) {\n  messageDeleted(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription MessageUpdatedSubscription($channelId: String!) {\n  messageUpdated(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"): (typeof documents)["subscription MessageUpdatedSubscription($channelId: String!) {\n  messageUpdated(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription NewMessageSubscription($channelId: String!) {\n  newMessage(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"): (typeof documents)["subscription NewMessageSubscription($channelId: String!) {\n  newMessage(channelId: $channelId) {\n    _id\n    sender {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    receiver {\n      _id\n      lastName\n      firstName\n      isActive\n      username\n    }\n    TextMessage\n    createdAt\n    senderId\n    receiverSeen\n    receiverID\n    channelID\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;