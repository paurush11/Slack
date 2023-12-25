import SmallSideLayout from "@/components/Views/SmallSideLayoutView";
import FindChannels from "@/components/common/FindChannels";
import MainComponent from "@/components/common/MainComponent";
import { SideLayout } from "@/components/common/SideLayout";
import Layout from "@/components/layout/Layout";
import { MeDocument, NotFoundErrorType, ResolverError } from "@/generated/output/graphql";
import { notAuth } from "@/utils/notAuth";
import useSessionStorage from "@/utils/useSessionStorage";
import { useQuery } from "@apollo/client";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

interface HomeProps {
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ toggleTheme }) => {
  const { loading, data, error } = useQuery(MeDocument);
  const [findYourChannelsOpen, setFindYourChannelsOpen, remove] =
    useSessionStorage("findYourChannelsOpen", false);
  const [isClickedInMainCompValue, setIsClickedInMainCompValue] =
    useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [sideBarSize, setSideBarSize] = useState(0.8);
  const [errors, setErrors] = useState<NotFoundErrorType[] | ResolverError[] | undefined>()
  const [useSmallLayout, setUseSmallLayout] = useState(false);

  const [contentMainComponent, setContentMainComponent] =
    useState<React.JSX.Element>(<Box></Box>);
  const handleSideLayout = (content: React.JSX.Element) => {
    setContentMainComponent(content);
  };

  useEffect(() => {
    if (!data?.Me) {
      notAuth()
    }
    if (data?.Me?.success === false) {
      if (data.Me.error) {
        setErrors(data.Me.error as NotFoundErrorType[])
        notAuth()
      } else {
        setErrors(data.Me.resolverError as ResolverError[])
        notAuth()
      }
    }
  }, [data])
  console.log(errors)
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
      setSideBarSize(0.8);
    } else {
      setSideBarSize(2);
    }
  }, [useSmallLayout]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <Layout
      toggleTheme={toggleTheme}
      data={data}
      useSmallLayout={useSmallLayout}
      setUseSmallLayout={setUseSmallLayout}
    >


      {/* {!loading && data?.Me && <Sidebar data={data} />} */}
      {!loading && (
        <Grid container spacing={0} display={"flex"}>
          <Grid item xs={sideBarSize} height={"100%"} flexDirection={"column"}>
            {sideBarSize === 0.8 ? (
              <SmallSideLayout />
            ) : (
              <SideLayout
                data={data}
                handleSideLayout={handleSideLayout}
                setIsClickedInMainComp={setIsClickedInMainCompValue}
                isClickedInMainComp={isClickedInMainCompValue}
              />
            )}
          </Grid>
          <Grid item xs={12 - sideBarSize}>
            <MainComponent contentMainComponent={contentMainComponent} />
            {errors && <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errors && errors[0].message} — <strong>check it out!</strong>
            </Alert>}
            {

              <FindChannels
                channelOpen={findYourChannelsOpen}
                setValue={setFindYourChannelsOpen}
                setHasBeenClosed={setHasBeenClosed}
                setIsClickedInMainComp={setIsClickedInMainCompValue}
                data={data}
              />
            }
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
