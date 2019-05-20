import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

import { ClassifyImages } from "../components/ClassifyImages";
import { Layout } from "../components/Layout";

import { client } from "../api/apolloClient";
import { ApolloProvider } from "react-apollo";

function ClassifyImagesPage() {
  return (
    <Layout title="Recycle Hero - Classify Images" currentPage="classify">
      <Typography>
        <Title level={2}>Help us Make our Smart Bin Smarter</Title>
        <Paragraph>
          There are lots of different types of recyclable materials and rubbish.
          Our smart bin sometimes gets confused so we need your help to train
          its neural network.
        </Paragraph>
        <ApolloProvider client={client}>
          <ClassifyImages />
        </ApolloProvider>
        <Divider />
      </Typography>
    </Layout>
  );
}

export default ClassifyImagesPage;
