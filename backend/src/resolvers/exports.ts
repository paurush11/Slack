import { Channel } from "../entity/Channel";
import { DirectMessage } from "../entity/DirectMessage";
import { Member } from "../entity/Member";
import { InputType, Field, ObjectType } from "type-graphql";

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
class messageStatus {
  @Field()
  success: Boolean;

  @Field(() => DirectMessage, { nullable: true })
  data?: DirectMessage;

  @Field(() => [notFoundErrorType], { nullable: true })
  error?: notFoundErrorType[];
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
};
