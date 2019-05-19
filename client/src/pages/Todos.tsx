import React from "react";
import { RouteChildrenProps } from "react-router";

import Todos from "../components/Todos";

type Props = RouteChildrenProps<{ id: string }>;

export default class TodosPage extends React.Component<Props> {
  render() {
    const id = this.props.match && this.props.match.params.id;
    return <>{id ? <Todos list={id} /> : <div>Lista não encontrada</div>}</>;
  }
}
