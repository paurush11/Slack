import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
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
  
  @Field(() => String)
  @Column()
  memberId: string;
  
  @Field(() => String, {nullable: true})
  @Column()
  commentId: string;
  
  @Field(() => String, {nullable: true})
  @Column()
  postId: string;
  
  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.votes)
  @JoinColumn({ name: "memberId" })
  member: Member;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.votes, { nullable: true })
  @JoinColumn({ name: "postId" })
  post: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.votes, { nullable: true })
  @JoinColumn({ name: "commentId" })
  comment: Comment;



}
