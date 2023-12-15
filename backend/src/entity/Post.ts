import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Content } from "./Content";
import { Comment } from "./Comment";
import { Member } from "./Member";
import { Channel } from "./Channel";
import { Vote } from "./Vote";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Post extends Content {
  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.posts)
  creator: Member;

  @Field(() => Channel)
  @ManyToOne(() => Channel, (channel) => channel.posts)
  channel: Channel;

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.post, {
    onDelete: "CASCADE", /// deleting post deletes all votes
  })
  votes: Vote[];
}
