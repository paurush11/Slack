import React, { useEffect } from "react";
import MessagesView from "../Views/MessagesView";
import {
  GetMyMessagesInChannelDocument,
  MeQuery,
} from "@/generated/output/graphql";
import { useQuery } from "@apollo/client";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyMessagesInChannel,
  fetchMyMessagesInChannelError,
  fetchMyMessagesInChannelSuccess,
} from "@/store/myMessagesInChannelSlice";

interface MessagesControllerProps {}

export const MessagesController: React.FC<MessagesControllerProps> = ({}) => {
  const channelId = useSelector((state: RootState) => state.myData.channelId);
  const dispatch = useDispatch();
  const {
    data: messageData,
    loading,
    error,
  } = useQuery(GetMyMessagesInChannelDocument, {
    variables: {
      channelId: channelId,
    },
  });

  useEffect(() => {
    dispatch(fetchMyMessagesInChannel());
    if (messageData) {
      fetchMyMessagesInChannelSuccess(messageData);
    } else {
      fetchMyMessagesInChannelError(messageData);
    }
  }, [messageData, dispatch, error]);

  return <MessagesView />;
};
