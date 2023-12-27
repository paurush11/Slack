import { Post } from "../entity/Post";
import { Channel } from "../entity/Channel";
import { DirectMessage } from "../entity/DirectMessage";
import { Member } from "../entity/Member";
import { InputType, Field, ObjectType } from "type-graphql";
import { Comment } from "../entity/Comment";
import { Vote } from "../entity/Vote";

@InputType()
class UserCreationInput {
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  phoneNumber: string;
}

@ObjectType()
class resolverError {
  @Field()
  message: string;
  @Field()
  code: string;
  @Field()
  detail: string;
  @Field()
  name: string;
}
@ObjectType()
class notFoundErrorType {
  @Field()
  message: string;
  @Field()
  item: string;
}

@ObjectType()
class ChannelResponse {
  @Field(() => Channel, { nullable: true })
  channel?: Channel;
  @Field(() => [notFoundErrorType], { nullable: true })
  errors?: notFoundErrorType[];
}
@ObjectType()
class postStatus {
  @Field()
  success: Boolean;
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
  @Field(() => [notFoundErrorType], { nullable: true })
  error?: notFoundErrorType[];
  @Field(() => [resolverError], { nullable: true })
  resolverError?: resolverError[];
}
@ObjectType()
class userStatus {
  @Field()
  success: Boolean;
  @Field(() => Member, { nullable: true })
  user?: Member;
  @Field(() => [notFoundErrorType], { nullable: true })
  error?: notFoundErrorType[];
  @Field(() => [resolverError], { nullable: true })
  resolverError?: resolverError[];
}
@ObjectType()
class voteStatus {
  @Field()
  success: Boolean;
  @Field(() => [Member], { nullable: true })
  upVotedUsers?: [Member];
  @Field(() => [Member], { nullable: true })
  downVotedUsers?: [Member];
  @Field(() => Vote, { nullable: true })
  vote?: Vote;
  @Field(() => [Vote], { nullable: true })
  votes?: Vote[];
  @Field(() => [notFoundErrorType], { nullable: true })
  error?: notFoundErrorType[];
  @Field(() => [resolverError], { nullable: true })
  resolverError?: resolverError[];
}
@ObjectType()
class commentStatus {
  @Field()
  success: Boolean;
  @Field(() => Comment, { nullable: true })
  comment?: Comment;
  @Field(() => Post, { nullable: true })
  posts?: Post;
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
  @Field(() => [notFoundErrorType], { nullable: true })
  error?: notFoundErrorType[];
  @Field(() => [resolverError], { nullable: true })
  resolverError?: resolverError[];
}

@ObjectType()
class messageStatus {
  @Field()
  success: Boolean;
  @Field(() => DirectMessage, { nullable: true })
  data?: DirectMessage;
  @Field(() => [notFoundErrorType], { nullable: true })
  notFoundError?: notFoundErrorType[];
  @Field(() => [resolverError], { nullable: true })
  resolverError?: resolverError[];
}

@ObjectType()
class UserResponse {
  @Field(() => [resolverError], { nullable: true })
  errors?: resolverError[];
  @Field(() => Member, { nullable: true })
  user?: Member;
}

const MESSAGE_ADDED_TOPIC = "MESSAGE_ADDED";
const MESSAGE_UPDATED_TOPIC = "MESSAGE_UPDATED";
const MESSAGE_DELETED_TOPIC = "MESSAGE_DELETED";
const MESSAGE_SEEN_TOPIC = "MESSAGE_SEEN";

export {
  MESSAGE_ADDED_TOPIC,
  MESSAGE_UPDATED_TOPIC,
  MESSAGE_DELETED_TOPIC,
  MESSAGE_SEEN_TOPIC,
  UserResponse,
  resolverError,
  UserCreationInput,
  messageStatus,
  ChannelResponse,
  postStatus,
  userStatus,
  voteStatus,
  commentStatus
};
