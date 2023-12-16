import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
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

  @Field(() => String)
  @Column()
  channelID: string;

  @Field(() => String)
  @Column()
  memberId: string;

  @Field(() => Channel)
  @ManyToOne(() => Channel, (channel) => channel.messages)
  @JoinColumn({ name: "channelID" })
  channel!: Channel;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.messages)
  @JoinColumn({ name: "memberId" })
  sender!: Member;
}
