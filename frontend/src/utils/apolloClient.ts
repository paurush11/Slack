import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { isServer } from "./isServer";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
    credentials: "include" as const,// Important for cookies
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

const createClient = (ctx?: any) => {
  let cookie;
  if (isServer()) {
    cookie = ctx?.req.headers.cookie;
  }

  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    headers: cookie
      ? {
          "x-forwarded-proto": "https", /// to set cookie in browser
          cookie,
        }
      : {
          "x-forwarded-proto": "https",
        },
  });

  return client;
};

export default createClient;
