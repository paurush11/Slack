import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Content } from "./Content";
import { Post } from "./Post";
import { Member } from "./Member";
import { Vote } from "./Vote";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment extends Content {
  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  post!: Post;

  @Field(() => String)
  @Column()
  memberId!: string;

  @Field(() => String)
  @Column()
  postId!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  replyId?: string;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.comments)
  @JoinColumn({ name: "memberId" })
  creator!: Member;

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.comment, {
    onDelete: "CASCADE",
  })
  votes: Vote[];

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: "replyId" })
  parentComment?: Comment;

  // Add a field for replies
  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];
}
