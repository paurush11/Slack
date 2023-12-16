import argon2 from "argon2";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Channel } from "../entity/Channel";
import { Member } from "../entity/Member";
import { throwResolverError } from "../utils/commonFunctions";
import { myContext } from "../utils/myContext";

@InputType()
class UserInput {
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
class resolverError {
  @Field()
  message: string;
  @Field()
  code : string;
  @Field()
  detail: string;
  @Field()
  name: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [resolverError], { nullable: true })
  errors?: resolverError[];
  @Field(() => Member, { nullable: true })
  user?: Member;
}

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({
      relations: ["channels"]
    });
  }

  @Mutation(()=> Boolean)
  async clearTable(){
    await AppDataSource.createQueryRunner().query('TRUNCATE TABLE member CASCADE');
    return  true;
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Ctx() ctx: myContext,
    @Arg("channelId", ()=>String) channelId: string,
    @Arg('data', ()=>UserInput) data: UserInput,
    @Arg('data', ()=>String) password: string,
  ) {
    
    const parentChannel = await Channel.findBy({
      _id: channelId
    })
    const hashedPassword = await argon2.hash(password);
    const user = await Member.create({...data, password: hashedPassword, channels:parentChannel})
    
    if(!parentChannel[0].members){
    parentChannel[0].members = [];
    }
    parentChannel[0].members.push(user);

    console.log(parentChannel)
  
    try{

      await user.save().then(e=>{
        console.log(e)
      });
      await parentChannel[0].save();

      
      
    }catch(Error){
     return {errors:[throwResolverError(Error)]};
    }
    return {user};
  }
}
