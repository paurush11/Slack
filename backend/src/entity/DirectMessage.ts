import { Column, Entity, ManyToOne } from "typeorm";
import { Content } from "./Content";
import { Member } from "./Member";
import { Channel } from "./Channel";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class DirectMessage extends Content {
  @Field(() => String)
  @Column(() => String)
  Message!: string;

  @Field(() => Channel)
  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel!: Channel;

  @Field(() => Member)
  @ManyToOne(() => Member)
  sender!: Member;
}
