import Sidebar from "@/components/common/Sidebar";
import Layout from "@/components/layout/Layout";
import { MeDocument } from "@/generated/output/graphql";
import { myContext } from "@/interfaces/allProps";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

interface HomeProps {
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ toggleTheme }) => {
  const { loading, data, error } = useQuery(MeDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <Layout toggleTheme={toggleTheme}>{!loading && data && <Sidebar data={data} />}</Layout>;
};

export default Home;
