import { Member } from "../entity/Member";
import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class UserCreationInput {
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  username: string;
  @Field()
  email: string;
}

@ObjectType()
export class resolverError {
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
export class UserResponse {
  @Field(() => [resolverError], { nullable: true })
  errors?: resolverError[];
  @Field(() => Member, { nullable: true })
  user?: Member;
}