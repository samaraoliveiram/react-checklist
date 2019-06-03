import React, { Component } from "react";
import { Card as MCard, H5, Icon } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { Add } from "./AddButton";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import { SwipeAble } from "./SwipeCard";

interface IList {
  _id: string;
  title: string;
  description: string;
  todos: ITodo[];
  done: boolean;
}

interface ITodo {
  done: boolean;
}

interface ListState {
  lists: IList[];
  done: boolean;
}

const Wrapper = styled.div`
  margin-top: ${theme.sizes.lg};
`;

const Card = styled(MCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-radius: 0px;
`;

class List extends Component<RouteComponentProps, ListState> {
  state = {
    lists: [],
    done: false
  };

  loadList = async () => {
    const lists: IList[] = await fetch("/api/lists").then(r => r.json());
    this.setState({ lists });
  };

  componentDidMount() {
    this.loadList();
  }

  removeItem = (arrayLists: IList[], id: string): IList[] => {
    return arrayLists.filter(item => (item._id == id ? false : true));
  };

  deleteList = async (listID: string) => {
    this.setState(prevState => ({
      lists: this.removeItem(prevState.lists, listID)
    }));
    const list = await fetch(`/api/lists/${listID}`, {
      method: "DELETE"
    })
      .then(r => {
        return r.json();
      })
      .catch(err => {
        console.error(err);
        alert("Error on delete List");
      });
  };

  editList = async (list: IList) => {
    this.props.history.push(`/lists/${list._id}/edit`, list);
  };

  goCard = async (id: string) => {
    this.props.history.push(`/lists/${id}`);
  };

  render() {
    return (
      <>
        {this.state.lists &&
          this.state.lists.map((list: IList) => (
            <Wrapper key={list._id}>
              <SwipeAble
                onClick={() => this.goCard(list._id)}
                onSwipeRight={() => this.editList(list)}
                onSwipeLeft={() => this.deleteList(list._id)}
                size="big"
              >
                <Card elevation={2}>
                  <div>
                    <H5>{list.title}</H5>
                    <p>{list.description}</p>
                  </div>
                  <div>
                    {list.done ? <Icon icon="tick" iconSize={30} /> : null}
                  </div>
                </Card>
              </SwipeAble>
            </Wrapper>
          ))}
        <Link to={`/lists/create`}>
          <Add />
        </Link>
      </>
    );
  }
}

export default withRouter(List);
