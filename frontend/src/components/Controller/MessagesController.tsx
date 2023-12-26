import React from "react";
import MessagesView from "../Views/MessagesView";
import {
  GetMyMessagesInChannelDocument,
  MeQuery,
} from "@/generated/output/graphql";
import { useQuery } from "@apollo/client";

interface MessagesControllerProps {
  
  selectedChannelValue: string;
}

export const MessagesController: React.FC<MessagesControllerProps> = ({
 
  selectedChannelValue,
}) => {
  const {
    data: messageData,
    loading,
    error,
  } = useQuery(GetMyMessagesInChannelDocument, {
    variables: {
      channelId: selectedChannelValue,
    },
  });

  return <MessagesView messageData={messageData} />;
};
