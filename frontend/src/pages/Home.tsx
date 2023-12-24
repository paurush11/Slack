import FindChannels from "@/components/common/FindChannels";
import MainComponent from "@/components/common/MainComponent";
import { SideLayout } from "@/components/common/SideLayout";
import Sidebar from "@/components/common/Sidebar";
import Layout from "@/components/layout/Layout";
import { MeDocument } from "@/generated/output/graphql";
import useSessionStorage from "@/utils/useSessionStorage";
import { useQuery } from "@apollo/client";
import { Grid, Paper, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

interface HomeProps {
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ toggleTheme }) => {
  const { loading, data, error } = useQuery(MeDocument);
  const [value, setValue, remove] = useSessionStorage("channelOpen", false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  useEffect(() => {
    if (data?.Me?.channels.length === 0 && !hasBeenClosed) {
      setValue(true);
    }
  }, [data, setValue, hasBeenClosed]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <Layout toggleTheme={toggleTheme} data={data}>
      {!loading && data?.Me && <Sidebar data={data} />}
      <Grid container spacing={0} display={"flex"}>
        <Grid item xs={2} height={"100%"} flexDirection={"column"}>
          <SideLayout data={data} />
        </Grid>
        <Grid item xs={10}>
          <MainComponent />
          {
            <FindChannels
              channelOpen={value}
              setValue={setValue}
              setHasBeenClosed={setHasBeenClosed}
            />
          }
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
