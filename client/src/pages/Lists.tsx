import React from "react";
import Welcome from "../components/Nav";
import List from "../components/List";
import { RouteComponentProps } from "react-router";

const ListsPage: React.FC<RouteComponentProps> = ({}) => {
  return (
    <>
      <Welcome /> <List />
    </>
  );
};

export default ListsPage;
