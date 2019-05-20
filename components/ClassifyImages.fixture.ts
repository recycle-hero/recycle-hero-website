import { ClassifyImages } from "./ClassifyImages";

const fakeData = {
  items: [
    {
      id: "6913789e-d369-428f-b4d2-e2f9e6bca3df",
      user: null,
      predictedWasteClass: "plastic",
      actualWasteClass: "trash",
      createdAt: "2019-05-19T08:40:27.309Z",
      imageUrl: "test",
      geoTag: "blah",
      xonecoor: 10,
      yonecoor: 20,
      xtwocoor: 30,
      ytwocoor: 40,
      __typename: "Waste"
    },
    {
      id: "1b573b10-2a2c-4415-80c0-b68908b82d04",
      user: null,
      predictedWasteClass: "glass",
      actualWasteClass: "glass",
      createdAt: "2019-05-19T09:03:52.408Z",
      imageUrl:
        "https://cdn11.bigcommerce.com/s-neo29sbo9q/images/stencil/original/products/30050/29134/BP400836-WB__84884.1545340541.jpg",
      geoTag: "blah",
      xonecoor: 10,
      yonecoor: 20,
      xtwocoor: 150,
      ytwocoor: 200,
      __typename: "Waste"
    },
    {
      id: "4618cef4-cd4b-474f-958f-ed6a422f6f51",
      user: null,
      predictedWasteClass: "plastic",
      actualWasteClass: null,
      createdAt: "2019-05-19T08:57:21.581Z",
      imageUrl:
        "https://cdn11.bigcommerce.com/s-neo29sbo9q/images/stencil/original/products/30050/29134/BP400836-WB__84884.1545340541.jpg",
      geoTag: "blah",
      xonecoor: 10,
      yonecoor: 20,
      xtwocoor: 30,
      ytwocoor: 40,
      __typename: "Waste"
    }
  ],
  nextToken: null,
  __typename: "ModelWasteConnection"
};

export default {
  component: ClassifyImages,
  apollo: {
    resolveWith: {
      listWastes: fakeData
    }
  }
};
