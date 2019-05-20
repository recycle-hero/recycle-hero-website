import { Fragment, useState } from "react";
import { ApolloError, gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";
import {
  Alert,
  Button,
  Divider,
  Form,
  Radio,
  Select,
  Spin,
  Typography
} from "antd";

import Boundingbox from "react-bounding-box";

const { Title } = Typography;
const RadioGroup = Radio.Group;
const Option = Select.Option;

// TODO - filtering to retrieve unclassified images
// not working properly
const GET_UNCLASSIFIED_WASTE_IMAGES = gql`
  query ListWastes(
    $filter: ModelWasteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWastes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          name
        }
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
      nextToken
    }
  }
`;

const listWasteVariables = {
  limit: 50,
  filter: {
    actualWasteClass: {
      ne: null
    }
  }
};

const UPDATE_WASTE_LABEL_MUTATION = gql`
  mutation UpdateWaste($input: UpdateWasteInput!) {
    updateWaste(input: $input) {
      id
      actualWasteClass
    }
  }
`;

function handleChangeLabelCorrect(isLabelCorrect, setLabelCorrect) {
  setLabelCorrect(isLabelCorrect);
}

function showTrainingInterface(predictedLabel, userLabel, setUserLabel) {
  return (
    <>
      <Typography>
        <Title level={3}>What is this object?</Title>
      </Typography>
      <Select
        defaultValue={predictedLabel}
        value={userLabel}
        onChange={label => {
          setUserLabel(label);
        }}
      >
        <Option value="hard_plastic">Recyclable Plastic</Option>
        <Option value="glass">Recyclable Glass</Option>
        <Option value="metal">Recyclable Metal</Option>
        <Option value="paper">Clean Paper/Cardboard</Option>
        <Option value="soft_plastic">Soft Plastic</Option>
        <Option value="organic">Organic (food scraps)</Option>
        <Option value="trash">Non-recyclable</Option>
      </Select>
    </>
  );
}

function showLabelInterface(
  wasteID,
  predictedLabel,
  userLabel,
  setUserLabel,
  setCurrentWasteData,
  isLabelCorrect,
  setLabelCorrect
) {
  return (
    <Mutation mutation={UPDATE_WASTE_LABEL_MUTATION}>
      {(updateWasteLabel, { data, loading }) => {
        if (typeof data !== 'undefined' && data.updateWaste) {
          setCurrentWasteData(null);
          setUserLabel(null);
          setLabelCorrect(true);
          // TODO call refetch
        }
        return (
          <Form>
            <RadioGroup
              onChange={e => {
                handleChangeLabelCorrect(e.target.value, setLabelCorrect);
              }}
              value={isLabelCorrect}
            >
              <Radio value={true}>Spot on</Radio>
              <Radio value={false}>Not quite</Radio>
            </RadioGroup>
            {!isLabelCorrect &&
              showTrainingInterface(predictedLabel, userLabel, setUserLabel)}
            <Button
              loading={loading}
              onClick={() => {
                updateWasteLabel({
                  variables: {
                    input: {
                      id: wasteID,
                      actualWasteClass: userLabel || predictedLabel
                    }
                  }
                });
              }}
            >
              Make the bin smarter
            </Button>
          </Form>
        );
      }}
    </Mutation>
  );
}

interface IQueryResponse {
  loading: boolean;
  error?: ApolloError;
  data: any;
}

function renderImage(wasteItem) {
  // TODO backend supplies image with bounding box
  // currently no need for this
  const boundingBoxParams = {
    image: wasteItem.imageUrl,
    boxes: [
      // coord(0,0) = top left corner of image
      // [x, y, width, height]
      {
        coord: [
          wasteItem.xonecoor,
          wasteItem.yonecoor,
          wasteItem.xtwocoor - wasteItem.xonecoor,
          wasteItem.ytwocoor - wasteItem.yonecoor
        ],
        label: wasteItem.predictedWasteClass
      }
    ]
  };

  return <Boundingbox {...boundingBoxParams} />;
  // return <SmallImage src={wasteItem.imageUrl} />;
}

export const ClassifyImages = () => {
  const [isLabelCorrect, setLabelCorrect] = useState(true);
  const [userLabel, setUserLabel] = useState();
  const [currentWasteData, setCurrentWasteData] = useState(null);
  return (
    <Query
      query={GET_UNCLASSIFIED_WASTE_IMAGES}
      variables={listWasteVariables}
      skip={!!currentWasteData}
    >
      {(queryResponse: IQueryResponse) => {
        const { loading, error, data } = queryResponse;
        if (loading) {
          return <Spin tip="Loading.." />;
        }

        if (typeof error !== "undefined") {
          return <Alert message={error} type="error" />;
        }

        // TODO fix query so we don't have to double check
        // that actualWasteClass is null
        const wasteItem =
          currentWasteData ||
          data.listWastes.items.find(item => !item.actualWasteClass);

        if (!wasteItem) {
          return (
            <span>
              The bin has nothing left to ask you. Go put another piece of
              rubbish in.
            </span>
          );
        }

        setCurrentWasteData(wasteItem);

        return (
          <Fragment>
            <h4>Is the smart bin right?</h4>
            {renderImage(wasteItem)}
            <Divider />
            {showLabelInterface(
              wasteItem.id,
              wasteItem.predictedWasteClass,
              userLabel,
              setUserLabel,
              setCurrentWasteData,
              isLabelCorrect,
              setLabelCorrect
            )}
          </Fragment>
        );
      }}
    </Query>
  );
};
