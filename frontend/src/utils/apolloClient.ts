import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { isServer } from "./isServer";
import { onError } from "@apollo/client/link/error";
import { NextPage, NextPageContext } from "next";
import { useMemo } from "react";

let globalApolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Your GraphQL endpoint
  credentials: "include", // Important for cookies
  headers: {"x-forwarded-proto": "https"},
});
// const authLink = new HttpLink({
//     uri: 'http://localhost:4000/graphql', // e.g., 'http://localhost:4000/graphql'
// });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`);
  }
  if (graphQLErrors) {
    graphQLErrors.forEach(({ cause, message, locations, path }) => {
      console.error(
        `[GraphQLErrors Error]: Cause: ${cause}, Message: ${message}, Locations: ${locations}, Path: ${path}`,
      );
    });
  }
});

const ssrMode = isServer();
const createClient = (
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext,
) => {
  const cache = new InMemoryCache().restore(initialState || {});

  const apolloClient = new ApolloClient({
    ssrMode,
    link: from([errorLink, httpLink]),
    cache,
  });

  return apolloClient;
};

const initApolloClient = (
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext,
) => {
  if (ssrMode) {
    return createClient(initialState as NormalizedCacheObject, ctx);
  }

  if (!globalApolloClient) {
    globalApolloClient = createClient(initialState as NormalizedCacheObject);
  }

  return globalApolloClient;
};

export { createClient, initApolloClient };
