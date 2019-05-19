import React, { Component } from "react";
import { History } from "history";
import { Card as MCard, H5, Button as MButton, Icon } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
import { Link } from "react-router-dom";
import SwipeToDelete from "react-swipe-to-delete-component";

interface IList {
  _id: string;
  title: string;
  description: string;
}

interface ListState {
  lists: IList[];
}

const Card = styled(MCard)`
  border-radius: 0px;
`;
const Wrapper = styled.div`
  margin-top: ${theme.sizes.lg};
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

class List extends Component<{}, ListState> {
  state = {
    lists: []
  };

  loadList = async () => {
    const lists: IList[] = await fetch("/api/lists").then(r => r.json());
    this.setState({ lists });
  };

  componentDidMount() {
    this.loadList();
  }

  // deleteList = async (listID: string) => {
  // onDelete={() => this.deleteList(list._id)}
  //   const list = await fetch(`/api/lists/${listID}`, {
  //     method: "DELETE"
  //   })
  //     .then(r => {
  //       return r.json();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       alert("Error on delete List");
  //     });
  // };

  render() {
    return (
      <>
        {this.state.lists.map((list: IList) => (
          <Wrapper key={list._id}>
            <SwipeToDelete>
              <Link to={`/lists/${list._id}`}>
                <Card elevation={2}>
                  <H5>{list.title}</H5>
                  <p>{list.description}</p>
                </Card>
              </Link>
            </SwipeToDelete>
          </Wrapper>
        ))}
        <Button>
          <Icon
            icon="plus"
            iconSize={35}
            style={{
              color: theme.colors.base.dark
            }}
          />
        </Button>
      </>
    );
  }
}

export default List;
