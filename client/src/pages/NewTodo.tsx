import React from "react";
import NewTodo from "../components/NewTodo";
import { RouteComponentProps } from "react-router";

const NewTodoPage: React.FC<RouteComponentProps<{ id: string }>> = ({
  match
}) => {
  return (
    <>
      <NewTodo listID={match.params.id} />
    </>
  );
};

export default NewTodoPage;
