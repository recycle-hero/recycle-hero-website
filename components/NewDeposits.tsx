import { Fragment } from 'react';
import { gql } from "apollo-boost";
import { Subscription } from "react-apollo";
import { ApolloProvider } from "react-apollo";

import { client } from "../api/apolloClient";

const DEPOSITS_SUBSCRIPTION = gql`
  subscription newDeposits {
    deposit(where: { mutation_in: [CREATED] }) {
      mutation
      node {
        type
        user {
          name
        }
      }
    }
  }
`;

export const NewDeposits = () => {
  if (typeof window !== "undefined") {
    return (
      <ApolloProvider client={client}>
        <Subscription subscription={DEPOSITS_SUBSCRIPTION}>
          {subscriptionUpdate => {
            const {
              loading
            } = subscriptionUpdate;
            if (!loading) debugger;

            return (
              <Fragment>
                <h4>
                  New deposits:{" "}
                </h4>
                {subscriptionUpdate && !loading && depositAdded.content}
              </Fragment>
            );
          }}
        </Subscription>
      </ApolloProvider>
    );
  }
  return null;
};
