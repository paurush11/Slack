import React, { useEffect } from "react";
import ChannelView from "@/components/Views/ChannelView";
import { ChannelViewControllerProps } from "@/interfaces/allProps";
import { useMutation, useQuery } from "@apollo/client";
import { GetChannelDocument } from "@/generated/output/graphql";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyChannelData,
  fetchMyChannelDataSuccess,
} from "@/store/channelSlice";

const ChannelViewController: React.FC<ChannelViewControllerProps> = ({ }) => {
  const channelId = useSelector((state: RootState) => state.myData.channelId);
  const dispatch = useDispatch();
  const {
    data: ChannelData,
    loading,
    error,
  } = useQuery(GetChannelDocument, {
    variables: {
      channelId: channelId,
    },
  });

  useEffect(() => {
    dispatch(fetchMyChannelData());
    if (ChannelData) {
      dispatch(fetchMyChannelDataSuccess(ChannelData));
    } else {
      dispatch(fetchMyChannelDataSuccess(error));
    }
  }, [channelId, ChannelData, error]);

  return loading ? null : <ChannelView />;
};

export default ChannelViewController;
