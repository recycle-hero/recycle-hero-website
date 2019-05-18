import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

import { ContaminantChart } from "../components/ContaminantChart";
import { NewDeposits } from "../components/NewDeposits";
import { Layout } from "../components/Layout";

function Home() {
  return (
    <Layout title="Smart Bin - Home" currentPage="home">
      <Typography>
        <Paragraph>
          Australia's recycling{" "}
          <a href="https://theconversation.com/chinas-recycling-ban-throws-australia-into-a-very-messy-waste-crisis-95522">
            contamination rate is currently 6-10%
          </a>
          . Recycling Hero gamifies recycling so people learn what they can and
          can't recycle. Our goal is to reduce the contamination rate to 0.5%
          through our machine vision powered smart bins.
        </Paragraph>
        <Divider />
        <Title level={2}>The Problem</Title>
        <ContaminantChart />
        <Divider />
        <NewDeposits />
      </Typography>
    </Layout>
  );
}

export default Home;
