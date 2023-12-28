import SmallSideLayout from "@/components/Views/SmallSideLayoutView";
import FindChannels from "@/components/common/FindChannels";
import MainComponent from "@/components/common/MainComponent";
import { SideLayout } from "@/components/common/SideLayout";
import Layout from "@/components/layout/Layout";
import {
  MeDocument,
  NotFoundErrorType,
  ResolverError,
} from "@/generated/output/graphql";
import {
  fetchUserError,
  fetchUserStart,
  fetchUserSuccess,
} from "@/store/meSlice";
import { RootState } from "@/store/store";
import { notAuth } from "@/utils/notAuth";
import useSessionStorage from "@/utils/useSessionStorage";
import { useQuery } from "@apollo/client";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HomeProps { }

const Home: React.FC<HomeProps> = ({ }) => {
  const { loading, data, error } = useQuery(MeDocument);
  const dispatch = useDispatch();
  const [findYourChannelsOpen, setFindYourChannelsOpen, remove] =
    useSessionStorage("findYourChannelsOpen", false);
  const [isClickedInMainCompValue, setIsClickedInMainCompValue] =
    useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [sideBarSize, setSideBarSize] = useState(0.8);
  const [errors, setErrors] = useState<
    NotFoundErrorType[] | ResolverError[] | undefined
  >();
  const useSmallLayout = useSelector(
    (state: RootState) => state.smallLayout.smallLayout,
  );
  const [
    selectedChannelValue,
    setSelectedChannelValue,
    removeSelectedChannelValue,
  ] = useSessionStorage("selectedChannelValue", "null");


  useEffect(() => {
    dispatch(fetchUserStart());
    if (data) {
      dispatch(fetchUserSuccess(data));
    } else if (error) {
      dispatch(fetchUserError(error));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (!loading && !data?.Me) {
      notAuth();
    }
    if (data?.Me?.success === false) {
      if (data.Me.error) {
        setErrors(data.Me.error as NotFoundErrorType[]);
        notAuth();
      } else {
        setErrors(data.Me.resolverError as ResolverError[]);
        notAuth();
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      (data?.Me?.user?.channels.length === 0 && !hasBeenClosed) ||
      isClickedInMainCompValue
    ) {
      setFindYourChannelsOpen(true);
    }
  }, [data, setFindYourChannelsOpen, hasBeenClosed, isClickedInMainCompValue]);
  useEffect(() => {
    if (useSmallLayout) {
      setSideBarSize(1);
    } else {
      setSideBarSize(2);
    }
  }, [useSmallLayout]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Layout>
      {/* {!loading && data?.Me && <Sidebar data={data} />} */}
      {!loading && (
        <Grid container spacing={0} display={"flex"}>
          <Grid item xs={sideBarSize} height={"100%"} flexDirection={"column"}>
            {sideBarSize === 1 ? (
              <SmallSideLayout />
            ) : (
              <SideLayout

                setIsClickedInMainComp={setIsClickedInMainCompValue}
                isClickedInMainComp={isClickedInMainCompValue}
                selectedChannelValue={selectedChannelValue}
                setSelectedChannelValue={setSelectedChannelValue}
              />
            )}
          </Grid>
          <Grid item xs={12 - sideBarSize}>
            <MainComponent />
            {errors && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errors && errors[0].message} — <strong>check it out!</strong>
              </Alert>
            )}
            {
              <FindChannels
                channelOpen={findYourChannelsOpen}
                setValue={setFindYourChannelsOpen}
                setHasBeenClosed={setHasBeenClosed}
                setIsClickedInMainComp={setIsClickedInMainCompValue}
              />
            }
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
