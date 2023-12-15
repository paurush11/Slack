import { Column, Entity, ManyToOne } from "typeorm";
import { Content } from "./Content";
import { Member } from "./Member";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Vote extends Content {
  @Field(() => Int)
  @Column({ type: "int" })
  value!: Number;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.votes)
  member: Member;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.votes, { nullable: true })
  post: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.votes, { nullable: true })
  comment: Comment;
}
