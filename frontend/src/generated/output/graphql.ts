/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  Description: Scalars['String']['output'];
  IconName: Scalars['String']['output'];
  Name: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  members?: Maybe<Array<Member>>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChannelResponse = {
  __typename?: 'ChannelResponse';
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<NotFoundErrorType>>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: Member;
  description: Scalars['String']['output'];
  memberId: Scalars['String']['output'];
  parentComment?: Maybe<Comment>;
  post: Post;
  postId: Scalars['String']['output'];
  replies?: Maybe<Array<Comment>>;
  replyId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  votes?: Maybe<Array<Vote>>;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  TextMessage: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  channel: Channel;
  channelID: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  receiver: Member;
  receiverID: Scalars['String']['output'];
  receiverSeen: Scalars['Boolean']['output'];
  sender: Member;
  senderExists: Scalars['Boolean']['output'];
  senderExistsInChannel: Scalars['Boolean']['output'];
  senderId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Member = {
  __typename?: 'Member';
  _id: Scalars['String']['output'];
  channels: Array<Channel>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  messagesReceived?: Maybe<Array<DirectMessage>>;
  messagesSent?: Maybe<Array<DirectMessage>>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  votes?: Maybe<Array<Vote>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Login: UserResponse;
  Logout: Scalars['Boolean']['output'];
  Register: UserResponse;
  clearChannels: Scalars['Boolean']['output'];
  clearUsers: Scalars['Boolean']['output'];
  createChannel: ChannelResponse;
  createMessage: MessageStatus;
  createPost: PostStatus;
  deleteChannel: Scalars['Boolean']['output'];
  deleteMessage: MessageStatus;
  deleteMessageTable: Scalars['Boolean']['output'];
  deletePost: PostStatus;
  deleteVote: VoteStatus;
  joinChannel: Scalars['Boolean']['output'];
  leaveChannel: Scalars['Boolean']['output'];
  seeMessage: MessageStatus;
  updateMessage: MessageStatus;
  updatePost: PostStatus;
  voteComment: VoteStatus;
  votePost: VoteStatus;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  UserCreationInput: UserCreationInput;
  password: Scalars['String']['input'];
};


export type MutationCreateChannelArgs = {
  description: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['String']['input'];
  message: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  channelId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationDeleteVoteArgs = {
  voteId: Scalars['String']['input'];
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSeeMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateMessageArgs = {
  channelId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  description: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationVoteCommentArgs = {
  commentId: Scalars['String']['input'];
  isUpvote: Scalars['Boolean']['input'];
};


export type MutationVotePostArgs = {
  isUpvote: Scalars['Boolean']['input'];
  postId: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String']['output'];
  channel: Channel;
  channelID: Scalars['String']['output'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  creator: Member;
  description: Scalars['String']['output'];
  memberId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  votes?: Maybe<Array<Vote>>;
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<UserStatus>;
  channels: Array<Channel>;
  getAll: Array<DirectMessage>;
  getAllMyPosts: PostStatus;
  getAllReceivedMessages: Array<DirectMessage>;
  getAllSentMessages: Array<DirectMessage>;
  getChannel: Channel;
  getCommentVotes: VoteStatus;
  getMyMessagesInChannel: Array<DirectMessage>;
  getMyPost: PostStatus;
  getMyVotes: VoteStatus;
  getPostVotes: VoteStatus;
  getUserMessages: Array<DirectMessage>;
  users: Array<Member>;
};


export type QueryGetAllMyPostsArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryGetAllReceivedMessagesArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetAllSentMessagesArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryGetChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryGetCommentVotesArgs = {
  commentId: Scalars['String']['input'];
};


export type QueryGetMyMessagesInChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryGetMyPostArgs = {
  channelId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type QueryGetPostVotesArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetUserMessagesArgs = {
  channelId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageDeleted: DirectMessage;
  messageSeen: DirectMessage;
  messageUpdated: DirectMessage;
  newMessage: DirectMessage;
};


export type SubscriptionMessageDeletedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionMessageSeenArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionMessageUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['String']['input'];
};

export type UserCreationInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ResolverError>>;
  user?: Maybe<Member>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String']['output'];
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  member: Member;
  memberId: Scalars['String']['output'];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type MessageStatus = {
  __typename?: 'messageStatus';
  data?: Maybe<DirectMessage>;
  notFoundError?: Maybe<Array<NotFoundErrorType>>;
  resolverError?: Maybe<Array<ResolverError>>;
  success: Scalars['Boolean']['output'];
};

export type NotFoundErrorType = {
  __typename?: 'notFoundErrorType';
  item: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type PostStatus = {
  __typename?: 'postStatus';
  error?: Maybe<Array<NotFoundErrorType>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  resolverError?: Maybe<Array<ResolverError>>;
  success: Scalars['Boolean']['output'];
};

export type ResolverError = {
  __typename?: 'resolverError';
  code: Scalars['String']['output'];
  detail: Scalars['String']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserStatus = {
  __typename?: 'userStatus';
  error?: Maybe<Array<NotFoundErrorType>>;
  resolverError?: Maybe<Array<ResolverError>>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<Member>;
};

export type VoteStatus = {
  __typename?: 'voteStatus';
  downVotedUsers?: Maybe<Array<Member>>;
  error?: Maybe<Array<NotFoundErrorType>>;
  resolverError?: Maybe<Array<ResolverError>>;
  success: Scalars['Boolean']['output'];
  upVotedUsers?: Maybe<Array<Member>>;
  vote?: Maybe<Vote>;
  votes?: Maybe<Array<Vote>>;
};

export type ResolverErrorFragment = { __typename?: 'resolverError', message: string, code: string, detail: string, name: string } & { ' $fragmentName'?: 'ResolverErrorFragment' };

export type UserFieldsFragment = { __typename?: 'Member', username: string, lastName: string, firstName: string, email: string, _id: string, isActive: boolean, createdAt: any, updatedAt: any, messagesReceived?: Array<{ __typename?: 'DirectMessage', _id: string, TextMessage: string }> | null, channels: Array<{ __typename?: 'Channel', _id: string, Name: string, IconName: string, Description: string }> } & { ' $fragmentName'?: 'UserFieldsFragment' };

export type CreateChannelMutationVariables = Exact<{
  description: Scalars['String']['input'];
  iconName: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'ChannelResponse', errors?: Array<{ __typename?: 'notFoundErrorType', message: string, item: string }> | null, channel?: { __typename?: 'Channel', _id: string, createdAt: any, updatedAt: any, Name: string, Description: string, IconName: string, posts?: Array<{ __typename?: 'Post', _id: string }> | null, members?: Array<{ __typename?: 'Member', _id: string }> | null } | null } };

export type CreateMessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  channelId: Scalars['String']['input'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'messageStatus', success: boolean, data?: { __typename?: 'DirectMessage', senderId: string, receiverID: string, TextMessage: string, _id: string, channelID: string, receiverSeen: boolean, sender: { __typename?: 'Member', firstName: string, lastName: string, username: string }, receiver: { __typename?: 'Member', username: string, lastName: string, firstName: string } } | null, notFoundError?: Array<{ __typename?: 'notFoundErrorType', message: string, item: string }> | null, resolverError?: Array<{ __typename?: 'resolverError', message: string, code: string, detail: string, name: string }> | null } };

export type JoinChannelMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  channelId: Scalars['String']['input'];
}>;


export type JoinChannelMutation = { __typename?: 'Mutation', joinChannel: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'UserResponse', user?: { __typename?: 'Member', _id: string, createdAt: any, updatedAt: any, firstName: string, lastName: string, isActive: boolean, username: string, email: string } | null, errors?: Array<{ __typename?: 'resolverError', message: string, code: string, detail: string, name: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', Logout: boolean };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String']['input'];
  UserCreationInput: UserCreationInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', Register: { __typename?: 'UserResponse', user?: { __typename?: 'Member', _id: string, createdAt: any, updatedAt: any, firstName: string, lastName: string, isActive: boolean, username: string, email: string } | null, errors?: Array<{ __typename?: 'resolverError', message: string, code: string, detail: string, name: string }> | null } };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', _id: string, Name: string, IconName: string, Description: string }> };

export type GetChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type GetChannelQuery = { __typename?: 'Query', getChannel: { __typename?: 'Channel', _id: string, Name: string, IconName: string, Description: string, members?: Array<{ __typename?: 'Member', _id: string, username: string, email: string, firstName: string, lastName: string }> | null, posts?: Array<{ __typename?: 'Post', _id: string }> | null } };

export type GetMyMessagesInChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type GetMyMessagesInChannelQuery = { __typename?: 'Query', getMyMessagesInChannel: Array<{ __typename?: 'DirectMessage', _id: string, sender: { __typename?: 'Member', _id: string, lastName: string, firstName: string, isActive: boolean, username: string }, receiver: { __typename?: 'Member', _id: string, lastName: string, firstName: string, isActive: boolean, username: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me?: { __typename?: 'userStatus', success: boolean, user?: { __typename?: 'Member', username: string, lastName: string, email: string, _id: string, firstName: string, channels: Array<{ __typename?: 'Channel', _id: string, Name: string, IconName: string, Description: string }>, messagesReceived?: Array<{ __typename?: 'DirectMessage', _id: string, TextMessage: string, receiverSeen: boolean }> | null, posts?: Array<{ __typename?: 'Post', _id: string }> | null, comments?: Array<{ __typename?: 'Comment', _id: string }> | null } | null, resolverError?: Array<{ __typename?: 'resolverError', message: string, code: string, detail: string, name: string }> | null, error?: Array<{ __typename?: 'notFoundErrorType', message: string, item: string }> | null } | null };

export type MessageDeletedSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageDeletedSubscription = { __typename?: 'Subscription', messageDeleted: { __typename?: 'DirectMessage', senderId: string, receiverID: string, TextMessage: string, _id: string, channelID: string, receiverSeen: boolean, sender: { __typename?: 'Member', firstName: string, lastName: string, username: string }, receiver: { __typename?: 'Member', username: string, lastName: string, firstName: string } } };

export type MessageSeenSubscriptionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageSeenSubscriptionSubscription = { __typename?: 'Subscription', messageSeen: { __typename?: 'DirectMessage', senderId: string, receiverID: string, TextMessage: string, _id: string, channelID: string, receiverSeen: boolean, sender: { __typename?: 'Member', firstName: string, lastName: string, username: string }, receiver: { __typename?: 'Member', username: string, lastName: string, firstName: string } } };

export type MessageUpdatedSubscriptionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageUpdatedSubscriptionSubscription = { __typename?: 'Subscription', messageUpdated: { __typename?: 'DirectMessage', senderId: string, receiverID: string, TextMessage: string, _id: string, channelID: string, receiverSeen: boolean, sender: { __typename?: 'Member', firstName: string, lastName: string, username: string }, receiver: { __typename?: 'Member', username: string, lastName: string, firstName: string } } };

export type NewMessageSubscriptionSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type NewMessageSubscriptionSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'DirectMessage', senderId: string, receiverID: string, TextMessage: string, _id: string, channelID: string, receiverSeen: boolean, sender: { __typename?: 'Member', firstName: string, lastName: string, username: string }, receiver: { __typename?: 'Member', username: string, lastName: string, firstName: string } } };

export const ResolverErrorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ResolverError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"resolverError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ResolverErrorFragment, unknown>;
export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"messagesReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"IconName"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}}]}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"iconName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconName"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"IconName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverID"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelID"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notFoundError"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resolverError"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const JoinChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}]}]}}]} as unknown as DocumentNode<JoinChannelMutation, JoinChannelMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"usernameOrEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameOrEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserCreationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"UserCreationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserCreationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"IconName"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}}]}}]}}]} as unknown as DocumentNode<ChannelsQuery, ChannelsQueryVariables>;
export const GetChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"IconName"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<GetChannelQuery, GetChannelQueryVariables>;
export const GetMyMessagesInChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyMessagesInChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyMessagesInChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyMessagesInChannelQuery, GetMyMessagesInChannelQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"IconName"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"resolverError"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MessageDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverID"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelID"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>;
export const MessageSeenSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageSeenSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageSeen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverID"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelID"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<MessageSeenSubscriptionSubscription, MessageSeenSubscriptionSubscriptionVariables>;
export const MessageUpdatedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageUpdatedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverID"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelID"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<MessageUpdatedSubscriptionSubscription, MessageUpdatedSubscriptionSubscriptionVariables>;
export const NewMessageSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessageSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverID"}},{"kind":"Field","name":{"kind":"Name","value":"TextMessage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"channelID"}},{"kind":"Field","name":{"kind":"Name","value":"receiverSeen"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>;