/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any };
};

export type Channel = {
  __typename?: "Channel";
  Description: Scalars["String"]["output"];
  IconName: Scalars["String"]["output"];
  Name: Scalars["String"]["output"];
  _id: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  members?: Maybe<Array<Member>>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChannelResponse = {
  __typename?: "ChannelResponse";
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<NotFoundErrorType>>;
};

export type Comment = {
  __typename?: "Comment";
  _id: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  creator: Member;
  description: Scalars["String"]["output"];
  memberId: Scalars["String"]["output"];
  post: Post;
  postId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  votes?: Maybe<Array<Vote>>;
};

export type DirectMessage = {
  __typename?: "DirectMessage";
  TextMessage: Scalars["String"]["output"];
  _id: Scalars["String"]["output"];
  channel: Channel;
  channelID: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  receiver: Member;
  receiverID: Scalars["String"]["output"];
  receiverSeen: Scalars["Boolean"]["output"];
  sender: Member;
  senderExists: Scalars["Boolean"]["output"];
  senderExistsInChannel: Scalars["Boolean"]["output"];
  senderId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Member = {
  __typename?: "Member";
  _id: Scalars["String"]["output"];
  channels: Array<Channel>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  isActive: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  messagesReceived?: Maybe<Array<DirectMessage>>;
  messagesSent?: Maybe<Array<DirectMessage>>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
  votes?: Maybe<Array<Vote>>;
};

export type Mutation = {
  __typename?: "Mutation";
  clearChannels: Scalars["Boolean"]["output"];
  clearUsers: Scalars["Boolean"]["output"];
  createChannel: ChannelResponse;
  createMessage: DirectMessage;
  deleteChannel: Scalars["Boolean"]["output"];
  deleteMessage: MessageStatus;
  deleteMessageTable: Scalars["Boolean"]["output"];
  joinChannel: Scalars["Boolean"]["output"];
  leaveChannel: Scalars["Boolean"]["output"];
  login: UserResponse;
  register: UserResponse;
  seeMessage: MessageStatus;
  updateMessage: MessageStatus;
};

export type MutationCreateChannelArgs = {
  description: Scalars["String"]["input"];
  iconName: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationCreateMessageArgs = {
  channelId: Scalars["String"]["input"];
  message: Scalars["String"]["input"];
  receiverId: Scalars["String"]["input"];
  senderId: Scalars["String"]["input"];
};

export type MutationDeleteChannelArgs = {
  channelId: Scalars["String"]["input"];
};

export type MutationDeleteMessageArgs = {
  id: Scalars["String"]["input"];
};

export type MutationJoinChannelArgs = {
  channelId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationLeaveChannelArgs = {
  channelId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  usernameOrEmail: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  data: UserCreationInput;
  password: Scalars["String"]["input"];
};

export type MutationSeeMessageArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUpdateMessageArgs = {
  channelId: Scalars["String"]["input"];
  message: Scalars["String"]["input"];
};

export type Post = {
  __typename?: "Post";
  _id: Scalars["String"]["output"];
  channel: Channel;
  channelID: Scalars["String"]["output"];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars["DateTime"]["output"];
  creator: Member;
  description: Scalars["String"]["output"];
  memberId: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  votes?: Maybe<Array<Vote>>;
};

export type Query = {
  __typename?: "Query";
  Me?: Maybe<Member>;
  channel: Array<Channel>;
  getAll: Array<DirectMessage>;
  getAllReceivedMessages: Array<DirectMessage>;
  getAllSentMessages: Array<DirectMessage>;
  getAllUserMessages: Array<DirectMessage>;
  users: Array<Member>;
};

export type QueryGetAllReceivedMessagesArgs = {
  channelId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetAllSentMessagesArgs = {
  channelId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type QueryGetAllUserMessagesArgs = {
  channelId: Scalars["String"]["input"];
  senderId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  messageDeleted: DirectMessage;
  messageSeen: DirectMessage;
  messageUpdated: DirectMessage;
  newMessage: DirectMessage;
};

export type UserCreationInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<ResolverError>>;
  user?: Maybe<Member>;
};

export type Vote = {
  __typename?: "Vote";
  _id: Scalars["String"]["output"];
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  member: Member;
  memberId: Scalars["String"]["output"];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  value: Scalars["Int"]["output"];
};

export type MessageStatus = {
  __typename?: "messageStatus";
  data?: Maybe<DirectMessage>;
  error?: Maybe<Array<NotFoundErrorType>>;
  success: Scalars["Boolean"]["output"];
};

export type NotFoundErrorType = {
  __typename?: "notFoundErrorType";
  item: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type ResolverError = {
  __typename?: "resolverError";
  code: Scalars["String"]["output"];
  detail: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  Me?: {
    __typename?: "Member";
    username: string;
    lastName: string;
    email: string;
    _id: string;
    firstName: string;
    channels: Array<{
      __typename?: "Channel";
      _id: string;
      Name: string;
      IconName: string;
      Description: string;
    }>;
    messagesReceived?: Array<{
      __typename?: "DirectMessage";
      _id: string;
    }> | null;
  } | null;
};

export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "Me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "channels" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      { kind: "Field", name: { kind: "Name", value: "Name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "IconName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "Description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "messagesReceived" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
