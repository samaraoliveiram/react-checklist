import React, { Component } from "react";
import {
  Card as MCard,
  H5,
  Button as MButton,
  Icon,
  H6
} from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { formatedDate } from "../lib/formatDate";
import { Link } from "react-router-dom";

interface ITodo {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}

interface TodoState {
  title: string;
  description: string;
  todos: ITodo[];
}

type Props = {
  list: string;
};

const Card = styled(MCard)`
  margin: ${theme.sizes.lg} ${theme.sizes.sm} 0px ${theme.sizes.sm};
  padding: ${theme.sizes.sm} ${theme.sizes.md} ${theme.sizes.sm};
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Check = styled.div`
  background-color: ${theme.colors.base.grey};
  width: ${theme.sizes.lg};
  height: ${theme.sizes.lg};
  position: relative;
  flex-shrink: 0;
  margin-right: 5px;
`;
const Icon2 = styled(Icon)`
  position: absolute;
  height: 100px;
  margin-top: -5px;
`;

const Info = styled.div`
  margin: 0px 4px 0px;
`;

const Date = styled.div`
  text-align: center;
`;

const Button = styled(MButton)`
  border-radius: 100%;
  border-color: ${theme.colors.base.dark};
  border-width: 2px;
  border-style: solid;
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const Box = styled.div`
  height: 20vh;
  background-color: ${theme.colors.base.dark};
  box-shadow: 2px 2px 5px ${theme.colors.base.shadow};
  padding: ${theme.sizes.sm};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default class Todos extends Component<Props, TodoState> {
  state = {
    title: "",
    description: "",
    todos: []
  };

  toggleTodo = async (todo: ITodo) => {
    let newValue = !todo.done;
    this.setState(prevState => ({
      ...prevState,
      todos: updateTodos(prevState.todos, { ...todo, done: newValue })
    }));

    const resp: ITodo = await fetch(`/api/todos/${todo._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        done: newValue
      })
    }).then(r => {
      return r.json();
    });
    this.setState(prevState => ({
      ...prevState,
      todos: updateTodos(prevState.todos, resp)
    }));

    function updateTodos(array: ITodo[], todo: ITodo) {
      return array.map(item => (item._id === todo._id ? todo : item));
    }
  };

  loadList = async () => {
    const list = await fetch(`/api/lists/${this.props.list}`).then(r =>
      r.json()
    );
    this.setState({
      title: list.title,
      description: list.description,
      todos: list.todos
    });
  };

  componentDidMount() {
    this.loadList();
  }

  render() {
    const toggleTodo = this.toggleTodo;
    return (
      <>
        <Box>
          <div>
            <Link to="/lists">Home</Link>
          </div>
          <div style={{ textAlign: "right" }}>
            <H5>{this.state.title}</H5>
            <H6>{this.state.description}</H6>
          </div>
        </Box>
        {this.state.todos.map((todo: ITodo) => (
          <Card key={todo._id} interactive={true} elevation={2}>
            <Check onClick={() => toggleTodo(todo)}>
              {todo.done ? <Icon2 icon="tick" iconSize={40} /> : null}
            </Check>
            <Info>
              <H5 style={{ marginBottom: "3px" }}>{todo.title}</H5>
              <p style={{ marginBottom: "0px" }}>{todo.description}</p>
            </Info>
            <Date>
              <H6>{formatedDate.day(todo.date.toString())}</H6>
              <H6>{formatedDate.month(todo.date.toString())}</H6>
            </Date>
          </Card>
        ))}
        <Button>
          <Link to={`/lists/${this.props.list}/todo`}>
            <Icon
              icon="plus"
              iconSize={35}
              style={{
                color: theme.colors.base.dark
              }}
            />
          </Link>
        </Button>
      </>
    );
  }
}
