import React, { Component } from "react";
import { Card as MCard, H5, Button, Icon, H6 } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { Add } from "./AddButton";
import { SwipeAble } from "./SwipeCard";
import { formatedDate } from "../lib/formatDate";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

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
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Check = styled.div`
  border-style: solid;
  border-color: ${theme.colors.base.lighter};
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

const Info = styled.div`
  margin: 0px 4px 0px;
`;

const Date = styled.div`
  text-align: center;
`;

const Box = styled.div`
  height: 20vh;
  background-color: ${theme.colors.base.darkest};
  box-shadow: 2px 2px 5px ${theme.colors.base.darker};
  padding: ${theme.sizes.sm};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MH5 = styled(H5)`
  color: ${theme.colors.base.lightest};
`;
const MH6 = styled(H6)`
  color: ${theme.colors.base.lightest};
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
        console.error(err);
        alert("Error on delete Todo");
      });
  };

  editList = async (todo: ITodo) => {
    console.log(todo._id);
    this.props.history.push(`/todo/${todo._id}/edit`, todo);
  };

  render() {
    const toggleTodo = this.toggleTodo;
    return (
      <>
        <Box>
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
            <MH5>{this.state.title}</MH5>
            <MH6>{this.state.description}</MH6>
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
                <Date>
                  <H6>{formatedDate.day(todo.date.toString())}</H6>
                  <H6>{formatedDate.month(todo.date.toString())}</H6>
                </Date>
                <Info>
                  <H5 style={{ marginBottom: "3px" }}>{todo.title}</H5>
                  <p style={{ marginBottom: "0px" }}>{todo.description}</p>
                </Info>
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
