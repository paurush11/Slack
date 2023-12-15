import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
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
  description: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.comments)
  creator!: Member;

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.comment, {
    onDelete: "CASCADE",
  })
  votes: Vote[];
}
