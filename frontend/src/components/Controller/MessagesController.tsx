import React, { useEffect, useState } from "react";
import MessagesView from "../Views/MessagesView";
import {
  GetAllMessagesInChannelDocument,
  GetMyMessagesInChannelDocument,
  MeQuery,
  NewMessageSubscriptionDocument,
} from "@/generated/output/graphql";
import { useQuery, useSubscription } from "@apollo/client";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyMessagesInChannel,
  fetchMyMessagesInChannelError,
  fetchMyMessagesInChannelSuccess,
} from "@/store/myMessagesInChannelSlice";
import { Message } from "@/interfaces/allProps";

interface MessagesControllerProps { }

export const MessagesController: React.FC<MessagesControllerProps> = ({ }) => {
  const channelId = useSelector((state: RootState) => state.myData.channelId);
  const messageReceiver = useSelector((state: RootState) => state.myData.messageReceiverId)
  const [messagesInChannel, setMessagesInChannel] = useState<Message[]>([])
  const dispatch = useDispatch();
  const {
    data: messagesInChannelData,
    loading: messagesInChannelLoading,
    error,
    refetch
  } = useQuery(GetAllMessagesInChannelDocument, {
    variables: {
      channelId: channelId,
    },
  });

  const { data: newMessages, loading: newMessagesLoading, error: newMessagesError } = useSubscription(NewMessageSubscriptionDocument, {
    variables: { channelId: channelId }
  });
  useEffect(() => {
    if (!messagesInChannelLoading && messagesInChannelData) {
      setMessagesInChannel(messagesInChannelData.getAllMessagesInChannel)
      refetch()
    }
  }, [messagesInChannelData])
  useEffect(() => {
    if (!newMessagesLoading && newMessages) {
      console.log("here")
      console.log(newMessages)
      setMessagesInChannel(prevMessages => [...prevMessages, newMessages.newMessage]);
    }
  }, [newMessages, messagesInChannelData])




  return <MessagesView messagesInChannel={messagesInChannel} setMessagesInChannel={setMessagesInChannel} refetch={refetch} />;
};
