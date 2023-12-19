import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Content } from "./Content";
import { Channel } from "./Channel";
import { DirectMessage } from "./DirectMessage";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Vote } from "./Vote";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Member extends Content {
  @Field(() => String)
  @Column()
  firstName!: string;

  @Field(() => String)
  @Column()
  lastName!: string;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive: boolean;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [Channel])
  @ManyToMany(() => Channel, (channel) => channel.members)
  channels: Channel[];

  @Field(() => [DirectMessage], { nullable: true })
  @OneToMany(() => DirectMessage, (message) => message.sender, {
    onDelete: "CASCADE",
    cascade: true,
  })
  messagesSent: DirectMessage[];

  @Field(() => [DirectMessage], { nullable: true })
  @OneToMany(() => DirectMessage, (message) => message.receiver, {
    onDelete: "CASCADE",
    cascade: true,
  })
  messagesReceived: DirectMessage[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (post) => post.creator)
  comments: Comment[];

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, (vote) => vote.member)
  votes: Vote[];
}
