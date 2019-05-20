import 'isomorphic-unfetch';
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';

import { APP_SYNC_URI, API_KEY } from './config';

const httpLink = new HttpLink({
  uri: APP_SYNC_URI,
  headers: {
    'x-api-key': API_KEY
  }
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
