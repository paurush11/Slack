import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { DirectMessage } from "../entity/DirectMessage";
import { resolverError } from "./exports";
import { throwNotFoundError, throwResolverError } from "../utils/commonFunctions";

@Resolver()
export class MessageResolver {
    @Query(() => [DirectMessage])
    async getAllMessages(
        @Arg("channelId", () => String) channelId: string,
        @Arg("userId", () => String) userId: string,
    ) {
        return await DirectMessage.find({
            where:{
                channelID:channelId,
                memberId: userId
            }
        });
    }

    @Mutation(()=>DirectMessage || resolverError)
    async createMessage(
        @Arg("channelId", () => String) channelId: string,
        @Arg("receiverId", () => String) receiverId: string,
        @Arg("senderId", () => String) senderId: string,
        @Arg("message", () => String) messageText: string,
    ){
        try{
            const message =  await DirectMessage.create({
                channelID:channelId,
                memberId: senderId,
                receiverID: receiverId,
                Message:messageText
            });
    
            console.log(message);
            return message;
        }catch(e){
            return throwResolverError(e);
        }
    }
    @Mutation(()=>DirectMessage || resolverError)
    async updateMessage(
        @Arg("channelId", () => String) messageId: string,
        @Arg("message", () => String) messageText: string,
    ){
        try{
            const message =  await DirectMessage.findOne({
                where:{
                    _id: messageId,
                }
            });
            if(!message){
                throwNotFoundError("message");
                return;
            }
            message.Message = messageText;
            await message.save();
            return message;
        }catch(e){
            return throwResolverError(e);
        }
    }

    @Mutation(()=> Boolean || resolverError )
    async deleteMessage(
        @Arg("channelId", () => String) channelId: string,
        @Arg("receiverId", () => String) receiverId: string,
        @Arg("senderId", () => String) senderId: string,
    ){
        try{
            const message = await DirectMessage.findOne({
                where:{
                    channelID: channelId,
                memberId: senderId,
                receiverID: receiverId,
                }
            })
            if(!message){
               throwNotFoundError("message");
               return;
            }
            await DirectMessage.delete({
                channelID: channelId,
                memberId: senderId,
                receiverID: receiverId,
            })
            return true;
        }catch(e){
            return throwResolverError(e);
        }
    }

}