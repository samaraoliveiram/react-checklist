import React, { Component } from "react";
import { Card as MCard, Icon } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { Add } from "./AddButton";
import { SwipeAble } from "./SwipeCard";
import { formatedDate } from "../lib/formatDate";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import { Box } from "./Header";
import { H3, H4, P } from "./Text";

interface ITodo {
  _id: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
  list: string;
}

interface TodoState {
  title: string;
  description: string;
  todos: ITodo[];
}

interface Props extends RouteComponentProps {
  list: string;
}

const Wrapper = styled.div`
  margin-top: ${theme.sizes.lg};
`;

const Card = styled(MCard)`
  height: 100%;
  padding: ${theme.sizes.sm};
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Check = styled.div`
  border-style: solid;
  border-color: ${theme.colors.base.ligh};
  border-width: 5px;
  border-radius: 5%;
  opacity: 0.7;
  width: ${theme.sizes.xl};
  height: ${theme.sizes.xl};
  position: relative;
  flex-shrink: 0;
  margin-right: 5px;
`;
const Icon2 = styled(Icon)`
  border-width: 4px;
  margin-top: -24px;
  margin-left: -8px;
  color: ${theme.colors.secondary.blue};
`;

class Todos extends Component<Props, TodoState> {
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
  removeItem = (arrayLists: ITodo[], id: string): ITodo[] => {
    return arrayLists.filter(item => (item._id == id ? false : true));
  };

  deleteTodo = async (todoID: string) => {
    this.setState(prevState => ({
      todos: this.removeItem(prevState.todos, todoID)
    }));
    const list = await fetch(`/api/todos/${todoID}`, {
      method: "DELETE"
    })
      .then(r => {
        return r.json();
      })
      .catch(err => {
        alert("Error on delete Todo");
      });
  };

  editList = async (todo: ITodo) => {
    this.props.history.push(`/todo/${todo._id}/edit`, todo);
  };

  render() {
    const toggleTodo = this.toggleTodo;
    return (
      <>
        <Box>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Link to="/lists">
                <Icon
                  icon="chevron-left"
                  iconSize={30}
                  style={{ marginBottom: "10px" }}
                />
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <H3 light>{this.state.title}</H3>
              <P light>{this.state.description}</P>
            </div>
          </div>
        </Box>
        {this.state.todos.map((todo: ITodo) => (
          <Wrapper key={todo._id}>
            <SwipeAble
              onClick={() => toggleTodo(todo)}
              onSwipeRight={() => this.editList(todo)}
              onSwipeLeft={() => this.deleteTodo(todo._id)}
              size="small"
            >
              <Card elevation={2}>
                <div style={{ textAlign: "center" }}>
                  <H4 style={{ margin: 0 }}>
                    {formatedDate.day(todo.date.toString())}
                  </H4>
                  <P style={{ margin: 0 }}>
                    {formatedDate.month(todo.date.toString())}
                  </P>
                </div>
                <div style={{ margin: "0 2px" }}>
                  <H4 style={{ margin: 0 }}>{todo.title}</H4>
                  <p style={{ marginBottom: "0px" }}>{todo.description}</p>
                </div>
                <Check>
                  {todo.done ? <Icon2 icon="tick" iconSize={65} /> : null}
                </Check>
              </Card>
            </SwipeAble>
          </Wrapper>
        ))}
        <Link to={`/lists/${this.props.list}/todo/create`}>
          <Add />
        </Link>
      </>
    );
  }
}

export default withRouter(Todos);
