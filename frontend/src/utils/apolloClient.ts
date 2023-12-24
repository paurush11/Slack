import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  NormalizedCacheObject,
  ApolloProvider,
  split,
} from "@apollo/client";
import { isServer } from "./isServer";
import { onError } from "@apollo/client/link/error";
import { NextPage, NextPageContext } from "next";
import { useMemo } from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

let globalApolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Your GraphQL endpoint
  credentials: "include", // Important for cookies
  headers: { "x-forwarded-proto": "https" },
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
  }),
);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
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
const createMyClient = (
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext,
) => {
  const cache = new InMemoryCache().restore(initialState || {});

  const apolloClient = new ApolloClient({
    ssrMode,
    link: from([errorLink, splitLink]),
    cache,
  });

  return apolloClient;
};

const initApolloClient = (
  initialState?: NormalizedCacheObject,
  ctx?: NextPageContext,
) => {
  if (ssrMode) {
    return createMyClient(initialState as NormalizedCacheObject, ctx);
  }

  if (!globalApolloClient) {
    globalApolloClient = createMyClient(initialState as NormalizedCacheObject);
  }

  return globalApolloClient;
};

export { createMyClient, initApolloClient };
