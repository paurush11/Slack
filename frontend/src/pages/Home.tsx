import MainComponent from "@/components/common/MainComponent";
import SideLayout from "@/components/common/SideLayout";
import Sidebar from "@/components/common/Sidebar";
import Layout from "@/components/layout/Layout";
import { MeDocument } from "@/generated/output/graphql";
import { useQuery } from "@apollo/client";
import { Grid, Paper, styled } from "@mui/material";
import React from "react";

interface HomeProps {
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ toggleTheme }) => {
  const { loading, data, error } = useQuery(MeDocument);
  console.log(data?.Me);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <Layout toggleTheme={toggleTheme} data={data}>
      {!loading && data && <Sidebar data={data} />}
      <Grid container spacing={0} display={"flex"}>
        <Grid item xs={2} height={"100%"} flexDirection={"column"}>
          <SideLayout data={data} />
        </Grid>
        <Grid item xs={10}>
          <MainComponent />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
