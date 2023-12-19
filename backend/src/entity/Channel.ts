import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Content } from "./Content";
import { Member } from "./Member";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Channel extends Content {
  @Field(() => String)
  @Column()
  Name: string;

  @Field(() => String)
  @Column()
  Description: string;

  @Field(() => [Member], { nullable: true })
  @ManyToMany(() => Member, (member) => member.channels, {
    cascade: true, // Changes to the members collection will be cascaded to the join table
  }) /// A channel can Have multiple Members
  @JoinTable() // Each member can have muntiple channels, /// channel is the owning side
  members: Member[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.channel, {
    onDelete: "CASCADE", /// Deleting a channel, deletes all the posts
  })
  posts: Post[];
}
