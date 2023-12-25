import React from "react";
import ChannelView from "@/components/Views/ChannelView";
import { ChannelViewControllerProps } from "@/interfaces/allProps";
import { useMutation, useQuery } from "@apollo/client";
import { GetChannelDocument } from "@/generated/output/graphql";

const ChannelViewController: React.FC<ChannelViewControllerProps> = ({
  channelId,
  data,
}) => {
  const {
    data: ChannelData,
    loading,
    error,
  } = useQuery(GetChannelDocument, {
    variables: {
      channelId: channelId,
    },
  });

  return loading ? null : <ChannelView data={ChannelData} />;
};

export default ChannelViewController;
