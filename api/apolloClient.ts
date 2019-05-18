import 'isomorphic-unfetch';
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';

const isBrowser = typeof window !== 'undefined';

const wsLink = isBrowser ? new WebSocketLink({
  uri: 'wss://eu1.prisma.sh/jeremy-nagel-a1529c/recycle-hero-api-2/dev',
  options: {
    reconnect: true
  }
}) : null;

const httpLink = new HttpLink({
  uri: "https://eu1.prisma.sh/jeremy-nagel-a1529c/recycle-hero-api-2/dev"
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = isBrowser ? split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
) : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
