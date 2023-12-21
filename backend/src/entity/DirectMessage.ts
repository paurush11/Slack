import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Content } from "./Content";
import { Member } from "./Member";
import { Channel } from "./Channel";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class DirectMessage extends Content {
  @Field(() => String)
  @Column()
  TextMessage: string;

  @Field(() => String)
  @Column()
  channelID: string;

  @Field(() => String)
  @Column()
  senderId: string;

  @Field(() => String)
  @Column()
  receiverID: string;

  @Field(() => Channel)
  @Column(() => Channel)
  channel: Channel;

  @Field(() => Boolean)
  @Column({ default: false })
  receiverSeen: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  senderExists: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  senderExistsInChannel: boolean;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.messagesSent)
  @JoinColumn({ name: "senderId" })
  sender: Member;

  @Field(() => Member)
  @ManyToOne(() => Member, (member) => member.messagesReceived)
  @JoinColumn({ name: "receiverID" })
  receiver: Member;
}
