import PropTypes from "prop-types";
import createApolloProxy from "react-cosmos-apollo-proxy";

import { client } from "./api/apolloClient";

const ApolloProxy = createApolloProxy({
  clientOptions: client
});

export default [ApolloProxy];
