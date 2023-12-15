import { Member } from "../entity/Member";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({});
  }
}
