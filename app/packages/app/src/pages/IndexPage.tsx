import { Snackbar } from "@fiftyone/core";
import React from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Nav from "../components/Nav";
import { Route } from "../routing";
import { IndexPageQuery } from "./__generated__/IndexPageQuery.graphql";
import { Starter } from "@fiftyone/core";

const IndexPageQueryNode = graphql`
  query IndexPageQuery($search: String = "", $count: Int, $cursor: String) {
    config {
      colorBy
      colorPool
      colorscale
      multicolorKeypoints
      showSkeletons
    }
    allDatasets: datasets(search: "") {
      total
    }
    ...NavFragment
    ...configFragment
  }
`;

const IndexPage: Route<IndexPageQuery> = ({ prepared }) => {
  const queryRef = usePreloadedQuery(IndexPageQueryNode, prepared);
  const totalDatasets = queryRef?.allDatasets?.total;

  return (
    <>
      <Nav fragment={queryRef} hasDataset={false} />
      <Starter mode={totalDatasets === 0 ? "ADD_DATASET" : "SELECT_DATASET"} />
      <Snackbar />
    </>
  );
};

export default IndexPage;
