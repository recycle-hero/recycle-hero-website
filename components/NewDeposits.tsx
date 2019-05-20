import { Fragment } from "react";
import { gql } from "apollo-boost";
import { Subscription } from "react-apollo";
import { Card, Spin } from "antd";

import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import styled from "@emotion/styled";

const DEPOSITS_SUBSCRIPTION = gql`
  subscription OnCreateWaste {
    onCreateWaste {
      id
      predictedWasteClass
      actualWasteClass
      createdAt
      imageUrl
      geoTag
      xonecoor
      yonecoor
      xtwocoor
      ytwocoor
    }
  }
`;

interface IWasteData {
  geoTag: string;
  imageUrl: string;
  predictedWasteClass: string;
  xonecoor: number;
  xtwocoor: number;
  yonecoor: number;
  ytwocoor: number;
  user: {
    name: string;
  };
}

const SmallImage = styled.img`
  max-width: 150px;
  height: auto;
`;

function renderNewDeposit(deposit: IWasteData) {
  return (
    <Card title={deposit.predictedWasteClass} style={{ width: 300 }}>
      <SmallImage src={deposit.imageUrl} />
      <p>{deposit.user && `User: ${deposit.user.name}`}</p>
      <p>
        Does this look right? If not,{" "}
        <a href="/classify-images">help train our model</a>
      </p>
    </Card>
  );
}

export const NewDeposits = () => {
  if (typeof window !== "undefined") {
    const { client } = require("../api/subscriptionClient");

    return (
      <ApolloProvider client={client as any}>
        <Rehydrated>
          <Subscription subscription={DEPOSITS_SUBSCRIPTION}>
            {subscriptionUpdate => {
              const { loading, data } = subscriptionUpdate;
              if (loading) {
                return <Spin tip="Loading" />;
              }

              const { onCreateWaste } = data;

              return (
                <Fragment>
                  <h4>New deposits: </h4>
                  {subscriptionUpdate &&
                    !loading &&
                    renderNewDeposit(onCreateWaste)}
                </Fragment>
              );
            }}
          </Subscription>
        </Rehydrated>
      </ApolloProvider>
    );
  }
  return null;
};
